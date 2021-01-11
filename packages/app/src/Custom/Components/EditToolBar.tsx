import { makeStyles } from '@material-ui/core';
import React from 'react';
import { DeleteButton, SaveButton, Toolbar } from 'react-admin';

const useStyles = makeStyles({
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});

export const EditToolBar: React.FC<any> = props => {
	const classes = useStyles();

	return (
		<Toolbar classes={classes} {...props}>
			<SaveButton />
			{!props.withDelete && <DeleteButton undoable={false} />}
		</Toolbar>
	);
};
