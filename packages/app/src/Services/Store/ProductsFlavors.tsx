import { parse } from 'query-string';
import React from 'react';
import {
	ChipField,
	Create,
	FormDataConsumer,
	FormTab,
	NumberField,
	NumberInput,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	RedirectionSideEffect,
} from 'react-admin';

import { Resources } from 'Constants';
import { DataGrid, Edit, ImageLinkInput, List } from 'Custom';
import { ResourceMeta } from 'types';

const ProductFlavorList = (props: any) => (
	<List {...props}>
		<DataGrid>
			<TextField source="name" />
			<NumberField source="quantity" />
			<ReferenceField
				reference={Resources.PRODUCT_SIZES}
				source="productSizeId"
			>
				<ChipField source="name" />
			</ReferenceField>
			<ReferenceField
				label="Product"
				reference={Resources.PRODUCT_SIZES}
				source="productSizeId"
			>
				<ReferenceField reference={Resources.PRODUCTS} source="productId">
					<ChipField source="name" />
				</ReferenceField>
			</ReferenceField>
		</DataGrid>
	</List>
);

const ProductFlavorEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="name" />
			<NumberInput source="quantity" />
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="factsImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<ReferenceField
				reference={Resources.PRODUCT_SIZES}
				source="productSizeId"
			>
				<ChipField source="name" />
			</ReferenceField>
			<ReferenceField
				label="Product"
				reference={Resources.PRODUCT_SIZES}
				source="productSizeId"
			>
				<ReferenceField reference={Resources.PRODUCTS} source="productId">
					<ChipField source="name" />
				</ReferenceField>
			</ReferenceField>
		</FormTab>
	</Edit>
);

const redirect: RedirectionSideEffect = (basePath, id, data) =>
	`/${Resources.PRODUCT_SIZES}/${data.productSizeId}/1`;

const ProductFlavorCreate = (props: any) => {
	let { productSizeId: post_id_string } = parse(props.location.search);
	if (Array.isArray(post_id_string)) post_id_string = post_id_string[0];
	const productSizeId = parseInt(String(post_id_string), 10) || undefined;

	return (
		<Create title={`${props.options.label} Create`} {...props}>
			<SimpleForm redirect={redirect}>
				<TextInput source="name" />
				<NumberInput source="quantity" />
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="factsImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<ReferenceInput
					defaultValue={productSizeId}
					filter={{ productSizeId }}
					reference={Resources.PRODUCT_SIZES}
					source="productSizeId"
				>
					<SelectInput optionText="name" />
				</ReferenceInput>
			</SimpleForm>
		</Create>
	);
};

export const ProductFlavors: ResourceMeta = {
	list: ProductFlavorList,
	create: ProductFlavorCreate,
	edit: ProductFlavorEdit,
	options: { icon: 'fullscreen', label: 'Product Flavors', subMenu: 'Store' },
	name: Resources.PRODUCT_FLAVORS,
};
