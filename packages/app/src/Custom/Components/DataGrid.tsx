import { makeStyles } from '@material-ui/core';
import React from 'react';
import { DateField, EditButton, TextField } from 'react-admin';

import { CustomizableDatagrid, CustomizableDatagridProps } from 'Custom';

const useStyles = makeStyles(theme => {
	const { palette } = theme;
	return {
		rowOdd: {
			backgroundColor:
				palette.type === 'dark' ? palette.grey.A700 : palette.grey[50],
		},
	};
});

interface Props extends CustomizableDatagridProps {
	ID?: boolean;
	except?: string[];
	edit?: boolean;
}

export const DataGrid: React.FC<Props> = props => {
	const { ID = true, edit = true, children, ...rest } = props;
	const classes = useStyles();

	return (
		<CustomizableDatagrid classes={classes} {...(rest as any)}>
			{ID ? <TextField source="id" /> : null}
			{children}
			<DateField source="createdAt" />
			<DateField source="updatedAt" />
			{edit ? <EditButton /> : null}
		</CustomizableDatagrid>
	);
};
