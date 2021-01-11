import { Box, Chip } from '@material-ui/core';
import React from 'react';
import {
	Create,
	FormDataConsumer,
	FormTab,
	SelectInput,
	TabbedForm,
	TextField,
	TextInput,
} from 'react-admin';

import { Resources } from 'Constants';
import {
	AvatarField,
	BaseFilter,
	DataGrid,
	Edit,
	ImageLinkInput,
	LinkField,
	List,
	locations,
} from 'Custom';
import { ResourceMeta } from 'types';

const SlidesFilter = (props: any) => (
	<BaseFilter {...props}>
		<SelectInput
			allowEmpty
			alwaysOn
			choices={locations}
			emptyText="All"
			source="location"
		/>
	</BaseFilter>
);

const SlidesList = (props: any) => (
	<List filters={<SlidesFilter />} {...props}>
		<DataGrid>
			<TextField source="title" />
			<TextField source="description" />
			<AvatarField alt="title" source="coverImage" variant="rounded" />
			<LinkField source="link" />
			<TextField source="location" />
		</DataGrid>
	</List>
);

const SlidesEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="title" />
			<TextInput fullWidth multiline rows={3} source="description" />
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="coverImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<Box display="flex">
				<Chip label="Slider 16:9" />
				<Chip label="Mega Menu 2:3" />
				<Chip label="Home Section 16:9" />
				<Chip label="popup width 70px" />
			</Box>
			<TextInput fullWidth source="link" />
			<SelectInput
				allowEmpty
				choices={locations}
				emptyText="Disabled"
				source="location"
			/>
		</FormTab>
	</Edit>
);

const SlidesCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<TabbedForm>
			<FormTab label="Details">
				<TextInput source="title" />
				<TextInput fullWidth multiline rows={3} source="description" />
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="coverImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<TextInput fullWidth source="link" />
				<SelectInput
					allowEmpty
					choices={locations}
					emptyText="Disabled"
					source="location"
				/>
			</FormTab>
		</TabbedForm>
	</Create>
);

export const Slides: ResourceMeta = {
	list: SlidesList,
	create: SlidesCreate,
	edit: SlidesEdit,
	options: { icon: 'announcement', label: 'Slides', subMenu: 'All' },
	name: Resources.SLIDES,
};
