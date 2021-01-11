import {
	Avatar,
	Box,
	CardContent,
	Hidden,
	makeStyles,
} from '@material-ui/core';
import React from 'react';

import { ExerciseSchema, RatesTypes } from '@types';
import { CoverImage, Link, TitleProps, Typography } from 'Components';
import { useRate } from 'Components/Feedback';
import { Paths } from 'Constants';
import { imageURL } from 'Helpers';

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		root: {
			display: 'flex',
			width: '100%',
			alignItems: 'center',
		},
		avatar: {
			backgroundColor: palette.secondary.main,
			weight: 300,
		},
	};
});

interface Props {
	exercise: ExerciseSchema;
}

export const ExerciseCard: React.FC<Props> = props => {
	const { exercise } = props;
	const { id, name, muscle, equipment } = exercise;

	const classes = useStyles();
	const [rate, label] = useRate({ type: RatesTypes.exercise, id });

	return (
		<TitleProps props={exercise}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
					}}
				>
					<Hidden smDown>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							<CoverImage size={70} src={imageURL(exercise, 'start')} />
							<CoverImage size={70} src={imageURL(exercise, 'end')} />
						</Box>
					</Hidden>
					<CardContent style={{ paddingTop: 0 }}>
						<Link to={`${Paths.EXERCISES}/${id}`}>
							<Typography fontWeight={700}>{name}</Typography>
						</Link>
						<Box
							sx={{
								color: 'textSecondary',
								display: 'flex',
							}}
						>
							Muscle Targeted: <Box>{muscle}</Box>
						</Box>
						<Box
							sx={{
								color: 'textSecondary',
								display: 'flex',
							}}
						>
							Equipment Type: <Box>{equipment}</Box>
						</Box>
					</CardContent>
				</Box>
				<Hidden smDown>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
							width: 80,
						}}
					>
						{rate ? (
							<Avatar className={classes.avatar}>
								<Typography fontWeight={300}>{rate}</Typography>
							</Avatar>
						) : null}
						<Typography fontWeight={300}>{label}</Typography>
					</Box>
				</Hidden>
			</Box>
		</TitleProps>
	);
};
