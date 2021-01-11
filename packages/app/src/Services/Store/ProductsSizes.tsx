import { Box, Chip } from '@material-ui/core';
import { parse } from 'query-string';
import React from 'react';
import {
	ChipField,
	Create,
	FormDataConsumer,
	FormTab,
	NumberField,
	NumberInput,
	RedirectionSideEffect,
	ReferenceField,
	ReferenceInput,
	ReferenceManyField,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	TopToolbar,
} from 'react-admin';

import { Resources } from 'Constants';
import {
	AddNewButton,
	AvatarField,
	BaseFilter,
	DataGrid,
	Edit,
	formChoices,
	ImageLinkInput,
	List,
	ProductFlavorExpand,
} from 'Custom';
import { rowClick } from 'Utils';
import { ResourceMeta } from 'types';

const ProductSizesFilter = (props: any) => (
	<BaseFilter {...props}>
		<ReferenceInput
			allowEmpty
			alwaysOn
			reference={Resources.PRODUCTS}
			source="productId"
		>
			<SelectInput optionText="name" />
		</ReferenceInput>
		<SelectInput
			allowEmpty
			alwaysOn
			choices={formChoices}
			emptyText="All"
			source="form"
		/>
	</BaseFilter>
);

const ProductSizeList = (props: any) => (
	<List {...props} filters={<ProductSizesFilter />}>
		<DataGrid expand={<ProductFlavorExpand />} rowClick={rowClick}>
			<TextField source="name" />
			<AvatarField alt="name" source="productImage" />
			<TextField source="form" />
			<NumberField
				options={{ style: 'currency', currency: 'EGP' }}
				source="price"
			/>
			<ReferenceField reference={Resources.PRODUCTS} source="productId">
				<ChipField source="name" />
			</ReferenceField>
		</DataGrid>
	</List>
);

const ProductEditActions = ({ data }: any) => (
	<TopToolbar>
		<AddNewButton
			label="add flavor"
			record={data}
			target="productSizeId"
			where={Resources.PRODUCT_FLAVORS}
		/>
	</TopToolbar>
);

const ProductSizeEdit = (props: any) => (
	<Edit {...props} actions={<ProductEditActions />}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="name" />
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="productImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<Box display="flex">
				<Chip label="Product 1:1" />
			</Box>
			<SelectInput choices={formChoices} source="form" />
			<NumberInput source="price" />
			<ReferenceField reference={Resources.PRODUCTS} source="productId">
				<ChipField source="name" />
			</ReferenceField>
		</FormTab>
		<FormTab label="Flavors">
			<ReferenceManyField
				reference={Resources.PRODUCT_FLAVORS}
				target="productSizeId"
			>
				<DataGrid disableColumns>
					<TextField source="name" />
					<NumberField source="quantity" />
				</DataGrid>
			</ReferenceManyField>
		</FormTab>
	</Edit>
);

const redirect: RedirectionSideEffect = (basePath, id, data) =>
	`/${Resources.PRODUCTS}/${data.productId}/1`;

const ProductSizeCreate = (props: any) => {
	let { productId: post_id_string } = parse(props.location.search);
	if (Array.isArray(post_id_string)) post_id_string = post_id_string[0];
	const productId = post_id_string ? parseInt(post_id_string, 10) : 1;

	return (
		<Create title={`${props.options.label} Create`} {...props}>
			<SimpleForm redirect={redirect}>
				<TextInput source="name" />
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="productImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<Box display="flex">
					<Chip label="Product 1:1" />
				</Box>
				<SelectInput choices={formChoices} source="form" />
				<NumberInput source="price" />
				<ReferenceInput
					defaultValue={productId}
					reference={Resources.PRODUCTS}
					source="productId"
				>
					<SelectInput optionText="name" />
				</ReferenceInput>
			</SimpleForm>
		</Create>
	);
};

export const ProductSizes: ResourceMeta = {
	list: ProductSizeList,
	create: ProductSizeCreate,
	edit: ProductSizeEdit,
	options: { icon: 'single_bed', label: 'Product Sizes', subMenu: 'Store' },
	name: Resources.PRODUCT_SIZES,
};
