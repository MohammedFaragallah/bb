import {
	Box,
	Hidden,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import clsx from 'clsx';
import { Field, Form, Formik } from 'formik';
import {
	bindMenu,
	bindTrigger,
	usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useState } from 'react';
import { FormattedRelativeTime } from 'react-intl';
import { useDispatch } from 'react-redux';

import { CommentSchema, Identifier, ResponseCommentSchema } from '@types';
import { Button, Typography } from 'Components';
import { CommentValidationSchema } from 'Components/Feedback/Comments/Comments';
import { TextField } from 'Components/Inputs';
import { DataTypes, MILLE_SECONDS } from 'Constants';
import { useTranslation } from 'Hooks';
import { enqueueSnackbar } from 'Store';
import { useMutation } from 'core';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;
	const radius = spacing(2.5);

	return {
		msg: {
			padding: spacing(1, 2, 1.25),
			borderRadius: spacing(0.5),
			display: 'inline-block',
			wordBreak: 'break-all',
		},
		rightRow: {
			textAlign: 'right',
		},
		right: {
			borderTopLeftRadius: radius,
			borderBottomLeftRadius: radius,
			backgroundColor: palette.grey[900],
			color: palette.grey[50],
		},
		rightFirst: {
			borderTopRightRadius: radius,
		},
		rightLast: {
			borderBottomRightRadius: radius,
		},
	};
});

interface Props {
	renderTime: boolean;
	msg: ResponseCommentSchema;
	setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
	serviceName?: string;
}

export const Message: React.FC<Props> = props => {
	const { renderTime, setRefresh, msg, serviceName } = props;
	const classes = useStyles();
	const [edit, setEdit] = useState(false);
	const [mutate, { loading }] = useMutation();
	const dispatch = useDispatch();
	const translate = useTranslation();

	const popupState = usePopupState({
		variant: 'popover',
		popupId: String(msg.id),
	});

	const updateComment = (id: Identifier, comment?: CommentSchema) =>
		mutate(
			{
				type: comment ? DataTypes.UPDATE : DataTypes.DELETE,
				resource: serviceName,
				payload: { id, data: comment },
			},
			{ onSuccess: () => setRefresh?.(true) },
		);

	return (
		<Box
			className={classes.rightRow}
			sx={{
				width: '100%',
			}}
		>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{edit ? (
					<Formik
						initialValues={{ comment: msg.comment }}
						onSubmit={async ({ comment }, { resetForm }) => {
							try {
								await (msg.comment !== comment &&
									updateComment(msg.id, { ...msg, comment }));
								resetForm();
								setEdit(false);
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
						{({ isValid, dirty, values }) => (
							<Form>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex',
										flexDirection: 'row',
										p: 2,
									}}
								>
									<Box
										sx={{
											mr: 2,
										}}
									>
										<Field
											component={TextField}
											fullWidth
											id="comment"
											label="comment"
											margin="dense"
											name="comment"
											variant="outlined"
										/>
									</Box>
									{msg.comment === values.comment ? (
										<Button
											aria-label="cancel edit"
											color="secondary"
											type="submit"
											variant="contained"
										>
											{translate('label.cancel')}
										</Button>
									) : (
										<Button
											aria-label="add comment"
											color="secondary"
											disabled={!isValid && !dirty}
											pending={loading}
											type="submit"
											variant="contained"
										>
											{translate('label.confirm')}
										</Button>
									)}
								</Box>
							</Form>
						)}
					</Formik>
				) : (
					<Typography
						align="left"
						className={clsx(classes.msg, classes.right, classes.rightFirst)}
						fontWeight={500}
					>
						{msg.comment}
					</Typography>
				)}
				{edit ? null : (
					<Hidden smDown>
						<Box
							sx={{
								ml: 2,
							}}
						>
							<IconButton
								{...bindTrigger(popupState)}
								style={{ position: 'relative' }}
							>
								<MoreHoriz />
							</IconButton>
							<Menu
								disableScrollLock
								{...bindMenu(popupState)}
								anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
								getContentAnchorEl={null}
								transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							>
								<MenuItem
									onClick={() => {
										updateComment(msg.id);
										popupState.close();
									}}
								>
									Delete
								</MenuItem>
								<MenuItem
									onClick={() => {
										setEdit(true);
										popupState.close();
									}}
								>
									Edit
								</MenuItem>
							</Menu>
						</Box>
					</Hidden>
				)}
			</Box>
			{renderTime ? (
				<Typography align="left" fontWeight={300} push="left">
					<FormattedRelativeTime
						numeric="auto"
						updateIntervalInSeconds={60}
						value={(Date.parse(msg.updatedAt) - Date.now()) / MILLE_SECONDS}
					/>
				</Typography>
			) : (
				<Box
					sx={{
						mb: 0.5,
					}}
				/>
			)}
		</Box>
	);
};
