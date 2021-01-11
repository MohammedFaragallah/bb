import { Box, Chip } from '@material-ui/core';
import React from 'react';
import {
	Create,
	FormDataConsumer,
	FormTab,
	TabbedForm,
	TextField,
	TextInput,
} from 'react-admin';

import { Resources } from 'Constants';
import {
	AvatarField,
	DataGrid,
	Edit,
	EditToolBar,
	ImageLinkInput,
	List,
} from 'Custom';
import { ResourceMeta } from 'types';

const SportList = (props: any) => (
	<List {...props}>
		<DataGrid>
			<TextField source="name" />
			<TextField source="class" />
			<AvatarField alt="name" source="coverImage" />
		</DataGrid>
	</List>
);

const SportEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="name" />
			<TextInput source="class" />
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="coverImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<Box display="flex">
				<Chip label="Cover 16:9" />
			</Box>
			<TextInput fullWidth multiline rows={3} source="description" />
		</FormTab>
	</Edit>
);

const SportCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<TabbedForm toolbar={<EditToolBar />}>
			<FormTab label="Details">
				<TextInput source="name" />
				<TextInput source="class" />
				<TextInput source="coverImage" />
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="coverImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<Box display="flex">
					<Chip label="Cover 16:9" />
				</Box>
			</FormTab>
			<TextInput fullWidth multiline rows={3} source="description" />
		</TabbedForm>
	</Create>
);

export const Sports: ResourceMeta = {
	list: SportList,
	create: SportCreate,
	edit: SportEdit,
	options: { icon: 'sports', label: 'Sports', subMenu: 'All' },
	name: Resources.SPORTS,
};
