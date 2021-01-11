import { Box, BoxProps, makeStyles, Paper } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { object, string } from 'yup';

import { CommentsTypes, FeedbackProps, ResponseCommentSchema } from '@types';
import { Button, LoginLink, UserIsAuthenticated } from 'Components';
import { LeftMessage } from 'Components/Feedback/Comments/LeftMessage';
import { RightMessage } from 'Components/Feedback/Comments/RightMessage';
import { TextField } from 'Components/Inputs';
import { allAvailable, DataTypes, FIRST_ITEM, newestFirst } from 'Constants';
import { useTranslation } from 'Hooks';
import { UserSelector } from 'Selectors';
import { enqueueSnackbar } from 'Store';
import { useMutation, useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { spacing } = theme;

	return {
		comment: {
			marginRight: spacing(2),
		},
		list: {
			overflowY: 'hidden !important' as 'hidden',
		},
	};
});

export const CommentValidationSchema = object().shape({
	comment: string().ensure().trim().min(2, 'Too Short!').required('Required'),
});

interface Props
	extends FeedbackProps<CommentsTypes>,
		Omit<BoxProps, keyof FeedbackProps<CommentsTypes>> {}

export const Comments: React.FC<Props> = props => {
	const {
		type,
		target,
		id,
		resource,
		allowed = true,
		allowedMsg,
		...rest
	} = props;
	const params = useParams();
	const [mutate, { loading }] = useMutation();
	const [refresh, setRefresh] = useToggle(false);

	const translate = useTranslation();
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(UserSelector);

	const relationId = target || `${type}Id`;
	const serviceName = resource || `api/${type}-comments`;
	const ID = id || params[relationId];

	const { data: comments = [] } = useQueryWithStore<ResponseCommentSchema>(
		{
			type: DataTypes.GET_LIST,
			resource: serviceName,
			payload: {
				...allAvailable,
				...newestFirst,
				filter: { [relationId]: ID },
			},
		},
		{ onSuccess: () => setRefresh(false), refresh },
	);

	const addComment = (comment: string) =>
		mutate(
			{
				type: DataTypes.CREATE,
				resource: serviceName,
				payload: { data: { comment: comment.trim(), [relationId]: ID } },
			},
			{ onSuccess: () => setRefresh(true) },
		);

	//? organize comments by user
	const chat: ResponseCommentSchema[][] = [];
	const last = chat.length - 1;
	for (const val of comments) {
		if (val.userId === chat[last]?.[FIRST_ITEM].userId) chat[last].push(val);
		else chat.push([val]);
	}

	return (
		<Box
			component={Paper}
			{...rest}
			sx={{
				displayPrint: 'none',
				mb: 2,
				mt: 2,
			}}
		>
			<UserIsAuthenticated
				fallback={
					<Box
						sx={{
							p: 2,
						}}
					>
						<LoginLink>Login To Add Comment</LoginLink>
					</Box>
				}
			>
				{allowed ? (
					<Formik
						initialValues={{ comment: '' }}
						onSubmit={async ({ comment }, { resetForm }) => {
							try {
								await addComment(comment);
								resetForm();
							} catch (error) {
								dispatch(
									enqueueSnackbar({
										message: error.message,
										options: { variant: 'warning' },
									}),
								);
							}
						}}
						validationSchema={CommentValidationSchema}
					>
						{({ isValid, dirty }) => (
							<Form>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										p: 2,
									}}
								>
									<Field
										className={classes.comment}
										component={TextField}
										fullWidth
										id="comment"
										label="comment"
										name="comment"
										variant="outlined"
									/>
									<Button
										aria-label="add comment"
										color="secondary"
										disabled={!isValid && !dirty}
										pending={loading}
										type="submit"
										variant="contained"
									>
										{translate('message.add')}
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				) : (
					<Box
						sx={{
							p: 2,
						}}
					>
						{allowedMsg}
					</Box>
				)}
			</UserIsAuthenticated>
			{chat.length > 0 && (
				<Box
					sx={{
						p: 2,
						pt: 2,
					}}
				>
					{chat.map(messages => {
						const firstMessage = messages[FIRST_ITEM];
						const currentUser = firstMessage.userId === user?.id;
						const props = currentUser
							? { serviceName, setRefresh, ...rest }
							: {};
						const Message = currentUser ? RightMessage : LeftMessage;
						return (
							<Message key={firstMessage.id} messages={messages} {...props} />
						);
					})}
				</Box>
			)}
		</Box>
	);
};
