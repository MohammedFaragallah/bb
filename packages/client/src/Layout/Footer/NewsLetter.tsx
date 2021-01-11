import {
	Box,
	Grid,
	IconButton,
	InputBase,
	makeStyles,
} from '@material-ui/core';
import { AlternateEmail } from '@material-ui/icons';
import React from 'react';

import { Typography } from 'Components';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		root: {
			flip: false,
			backgroundColor: palette.background.paper,
			borderRadius: 25,
			boxShadow: '0 0 12px 0 rgba(0,0,0,0.12)',
			direction: 'ltr',
			fontSize: 14,
			minWidth: 300,
			paddingLeft: spacing(2),
		},
		iconButton: {
			flexShrink: 0,
		},
	};
});

interface Props {}

export const NewsLetter: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Grid item md={3} sm={12}>
			<Box
				sx={{
					mb: 2,
				}}
			>
				<Typography fontWeight={500} gutterBottom>
					JOIN OUR NEWSLETTER
				</Typography>
				<Typography display="block" variant="caption">
					Be the first to receive exciting news, features, and special offers.
				</Typography>
				<Typography display="block" gutterBottom variant="caption">
					enter you email below
				</Typography>
				<InputBase
					classes={{ root: classes.root }}
					endAdornment={
						<IconButton aria-label="email" className={classes.iconButton}>
							<AlternateEmail color="secondary" />
						</IconButton>
					}
					placeholder="example@gmail.com"
				/>
			</Box>
		</Grid>
	);
};
