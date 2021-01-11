import React from 'react';
import {
	ChipField,
	Create,
	FormTab,
	ReferenceField,
	ReferenceInput,
	ReferenceManyField,
	SelectInput,
	SingleFieldList,
	TabbedForm,
	TextField,
	TextInput,
	TopToolbar,
} from 'react-admin';

import { Resources } from 'Constants';
import {
	AddNewButton,
	ArticleBodyTab,
	AvatarField,
	BaseFilter,
	DataGrid,
	Edit,
	EditToolBar,
	List,
	ProductFlavorExpand,
} from 'Custom';
import { rowClick } from 'Utils';
import { CategoryTypes } from 'enums';
import { ResourceMeta } from 'types';

const ProductsFilter = (props: any) => (
	<BaseFilter {...props}>
		<ReferenceInput
			allowEmpty
			alwaysOn
			filter={{ type: CategoryTypes.store }}
			reference={Resources.CATEGORIES}
			source="categoryId"
		>
			<SelectInput source="name" />
		</ReferenceInput>
	</BaseFilter>
);

const ProductSizesExpand = (props: any) => (
	<ReferenceManyField
		reference={Resources.PRODUCT_SIZES}
		target="productId"
		{...props}
	>
		<DataGrid disableColumns>
			<TextField source="name" />
			<AvatarField alt="name" source="productImage" />
			<TextField source="form" />
			<ReferenceManyField
				label="Flavors"
				reference={Resources.PRODUCT_FLAVORS}
				target="productSizeId"
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceManyField>
		</DataGrid>
	</ReferenceManyField>
);

const ProductList = (props: any) => (
	<List filters={<ProductsFilter />} {...props}>
		<DataGrid
			except={['description']}
			expand={<ProductSizesExpand />}
			rowClick={rowClick}
		>
			<TextField source="name" />
			<TextField source="description" />
			<ReferenceField reference={Resources.CATEGORIES} source="categoryId">
				<ChipField source="name" />
			</ReferenceField>
			<ReferenceManyField
				label="Sizes"
				reference={Resources.PRODUCT_SIZES}
				target="productId"
			>
				<SingleFieldList>
					<ChipField source="name" />
				</SingleFieldList>
			</ReferenceManyField>
		</DataGrid>
	</List>
);

const ProductEditActions = ({ data }: any) => (
	<TopToolbar>
		<AddNewButton
			label="add size"
			record={data}
			target="productId"
			where={Resources.PRODUCT_SIZES}
		/>
	</TopToolbar>
);

const ProductEdit = (props: any) => (
	<Edit {...props} actions={<ProductEditActions />}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="name" />
			<ReferenceInput
				filter={{ type: CategoryTypes.store }}
				reference={Resources.CATEGORIES}
				source="categoryId"
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
		</FormTab>
		<FormTab label="Sizes">
			<ReferenceManyField
				label=""
				reference={Resources.PRODUCT_SIZES}
				target="productId"
			>
				<DataGrid expand={<ProductFlavorExpand />} rowClick={rowClick}>
					<TextField source="name" />
					<AvatarField alt="name" source="productImage" />
					<TextField source="form" />
				</DataGrid>
			</ReferenceManyField>
		</FormTab>
		<ArticleBodyTab />
	</Edit>
);

const ProductCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<TabbedForm toolbar={<EditToolBar />}>
			<FormTab label="Details">
				<TextInput source="name" />
				<ReferenceInput
					filter={{ type: CategoryTypes.store }}
					reference={Resources.CATEGORIES}
					source="categoryId"
				>
					<SelectInput optionText="name" />
				</ReferenceInput>
			</FormTab>
			<ArticleBodyTab />
		</TabbedForm>
	</Create>
);

export const Products: ResourceMeta = {
	list: ProductList,
	create: ProductCreate,
	edit: ProductEdit,
	options: { icon: 'shop', label: 'Products', subMenu: 'Store' },
	name: Resources.PRODUCTS,
};
