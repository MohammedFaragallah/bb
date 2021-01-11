import { singular } from 'pluralize';
import React from 'react';
import { Edit as RAEdit, TabbedForm } from 'react-admin';

import { EditToolBar } from 'Custom';

export const Edit = (props: any) => {
	const { children } = props;

	return (
		<RAEdit
			title={`${singular(props.options.label)} # ${props.id} Edit`}
			{...props}
		>
			<TabbedForm toolbar={<EditToolBar />}>{children}</TabbedForm>
		</RAEdit>
	);
};
