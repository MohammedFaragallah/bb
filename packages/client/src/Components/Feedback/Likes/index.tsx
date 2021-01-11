import {
	Avatar,
	AvatarGroup,
	Box,
	CircularProgress,
	IconButton,
	makeStyles,
} from '@material-ui/core';
import { ThumbUp, ThumbUpOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAudio } from 'react-use';

import { FeedbackProps, LikesTypes, ResponseLikeSchema } from '@types';
import { LoginLink, ToggleIcon, Typography } from 'Components';
import { allAvailable, DataTypes, LIkes_LIMIT } from 'Constants';
import { imageURL } from 'Helpers';
import { UserSelector } from 'Selectors';
import LinkSound from 'assets/like.mp3';
import { useMutation, useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		avatars: {
			marginLeft: spacing(2),
		},
		pop: {
			'&:hover': {
				marginLeft: 0,
				marginRight: spacing(1),
			},
		},
		fabProgress: {
			color: palette.secondary.main,
			position: 'absolute',
			marginLeft: 'auto',
			marginRight: 'auto',
			left: 0,
			right: 0,
			zIndex: 1,
		},
	};
});

interface Props extends FeedbackProps<LikesTypes> {}

export const Likes: React.FC<Props> = props => {
	const { type, resource, target, id, limit = LIkes_LIMIT } = props;
	const params = useParams();

	const [audio, , controls] = useAudio({ src: LinkSound });

	const classes = useStyles();
	const user = useSelector(UserSelector);
	const [mutate, { loading }] = useMutation();
	const [refresh, setRefresh] = useState(false);

	const relationId = target || `${type}Id`;
	const serviceName = resource || `api/${type}-likes`;
	const ID = id || params[relationId];
	const userId = user?.id;

	const { data: likes = [] } = useQueryWithStore<ResponseLikeSchema>(
		{
			type: DataTypes.GET_LIST,
			resource: serviceName,
			payload: {
				...allAvailable,
				filter: { [relationId]: ID },
			},
		},
		{ refresh, onSuccess: () => setRefresh(false) },
	);

	const like = () =>
		mutate(
			{
				type: DataTypes.CREATE,
				resource: serviceName,
				payload: { data: { [relationId]: ID } },
			},
			{
				onSuccess: () => {
					setRefresh(true);
					controls.play();
				},
			},
		);

	const disLike = ({ id }: ResponseLikeSchema) =>
		mutate(
			{
				type: DataTypes.DELETE,
				resource: serviceName,
				payload: { id },
			},
			{ onSuccess: () => setRefresh(true) },
		);

	const liked = likes.filter(like => like.userId === userId);

	return (
		<Box
			sx={{
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				displayPrint: 'none',
			}}
		>
			{/* //? outside conditional rendering */}
			{audio}
			<LoginLink>
				<IconButton
					disabled={loading || refresh}
					onClick={async () => {
						if (liked.length) liked.map(disLike);
						else like();
					}}
					style={{ position: 'relative' }}
				>
					<ToggleIcon
						offIcon={<ThumbUpOutlined />}
						on={Boolean(liked.length)}
						onIcon={<ThumbUp />}
					/>
					{(loading || refresh) && (
						<CircularProgress className={classes.fabProgress} size={42} />
					)}
				</IconButton>
			</LoginLink>
			{likes?.length ? (
				<>
					<Typography>{'Likes '} </Typography>
					<AvatarGroup className={classes.avatars}>
						{likes.slice(0, limit).map((like, index) => {
							const showLast = likes.length > limit && index === limit - 1;
							const more = likes.length - limit;

							return (
								<Avatar
									alt={like.userName}
									className={classes.pop}
									key={like.id}
									src={showLast ? undefined : imageURL(like, 'profile')}
									title={
										showLast ? `${more} more like this story` : like.userName
									}
								>
									{showLast ? <CountUp delay={0.5} end={more} /> : undefined}
								</Avatar>
							);
						})}
					</AvatarGroup>
				</>
			) : (
				<Typography>be the first to like this</Typography>
			)}
		</Box>
	);
};
