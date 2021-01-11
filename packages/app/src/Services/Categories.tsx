import { Chip } from '@material-ui/core';
import React from 'react';
import {
	Create,
	FormTab,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
} from 'react-admin';

import { Resources } from 'Constants';
import { BaseFilter, categories, DataGrid, Edit, List } from 'Custom';
import { ResourceMeta } from 'types';

const RootCategories = (props: any) => (
	<Chip label={props.record?.name || 'Root Category'} />
);

const CategoriesFilter = (props: any) => (
	<BaseFilter {...props}>
		<SelectInput allowEmpty alwaysOn choices={categories} source="type" />
	</BaseFilter>
);

const CategoriesList = (props: any) => (
	<List filters={<CategoriesFilter />} {...props}>
		<DataGrid>
			<TextField source="name" />
			<TextField source="description" />
			<TextField source="type" />
			<ReferenceField reference={Resources.CATEGORIES} source="parentId">
				<RootCategories source="id" />
			</ReferenceField>
		</DataGrid>
	</List>
);

const CategoriesEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput source="name" />
			<TextInput fullWidth multiline rows={3} source="description" />
			<ReferenceInput
				allowEmpty
				reference={Resources.CATEGORIES}
				source="parentId"
			>
				<SelectInput source="name" />
			</ReferenceInput>
		</FormTab>
	</Edit>
);

const CategoriesCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<SimpleForm>
			<TextInput source="name" />
			<TextInput fullWidth multiline rows={3} source="description" />
			<ReferenceInput
				allowEmpty
				reference={Resources.CATEGORIES}
				source="parentId"
			>
				<SelectInput source="name" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);

export const Categories: ResourceMeta = {
	list: CategoriesList,
	create: CategoriesCreate,
	edit: CategoriesEdit,
	options: { icon: 'category', label: 'Categories', subMenu: 'All' },
	name: Resources.CATEGORIES,
};
