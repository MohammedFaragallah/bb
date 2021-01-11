import { List, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
	list: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	listItem: {
		width: 38,
		display: 'block-inline',
		height: 25,
		margin: 8,
		backgroundImage:
			'url(https://artifacts.bbcomcdn.com/@bbcom/bb-wrapper/40.3.1/sprite/footer-sprite-1x.png)',
	},
}));

interface Props {}

export const Payments: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<List className={classes.list}>
			{[
				'0 -106px',
				'-44px -76px',
				'0 -76px',
				'-114px 0',
				'-114px -60px',
				'-114px -30px',
			].map(item => (
				<li
					className={classes.listItem}
					key={item}
					style={{ backgroundPosition: item }}
				/>
			))}
		</List>
	);
};
