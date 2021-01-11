import { Avatar, Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { FormattedRelativeTime } from 'react-intl';

import { ResponseCommentSchema } from '@types';
import { Typography } from 'Components';
import { MILLE_SECONDS } from 'Constants';
import { imageURL } from 'Helpers';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;
	const radius = spacing(2.5);

	return {
		msg: {
			padding: spacing(1, 2),
			borderRadius: spacing(0.5),
			display: 'inline-block',
			wordBreak: 'break-all',
		},
		leftRow: {
			textAlign: 'left',
		},
		left: {
			borderTopRightRadius: radius,
			borderBottomRightRadius: radius,
			backgroundColor: palette.background.paper,
			border: `2px solid ${palette.grey[300]}`,
		},
		leftFirst: {
			borderTopLeftRadius: radius,
		},
		leftLast: {
			borderBottomLeftRadius: radius,
		},
	};
});

interface Props {
	messages: ResponseCommentSchema[];
}

export const LeftMessage: React.FC<Props> = props => {
	const { messages } = props;
	const classes = useStyles();

	return (
		<>
			{messages.map((msg, i) => {
				const preDate = new Date(messages[i - 1]?.updatedAt).getTime();

				const date = new Date(msg.updatedAt).getTime();

				const renderTime =
					messages.length === 1 || i === 0 || preDate - date < 6000;

				return (
					<Box
						className={classes.leftRow}
						key={msg.id}
						sx={{
							display: 'flex',
						}}
					>
						<Avatar
							alt={msg.userName}
							sizes="small"
							src={imageURL(msg, 'profile')}
						/>
						<Box
							sx={{
								ml: 1,
							}}
						>
							<Typography
								align="left"
								className={clsx(classes.msg, classes.left, classes.leftFirst)}
								fontWeight={500}
							>
								{msg.comment}
							</Typography>
							{renderTime ? (
								<Typography fontWeight={300} push="left">
									<FormattedRelativeTime
										numeric="auto"
										updateIntervalInSeconds={60}
										value={
											(Date.parse(msg.updatedAt) - Date.now()) / MILLE_SECONDS
										}
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
					</Box>
				);
			})}
		</>
	);
};
