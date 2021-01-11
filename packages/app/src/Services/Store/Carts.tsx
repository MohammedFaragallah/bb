import React from 'react';
import {
	ChipField,
	FormTab,
	NumberField,
	ReferenceField,
	ReferenceInput,
	ReferenceManyField,
	ResourceComponentProps,
	SelectInput,
	TextField,
	TextInput,
} from 'react-admin';

import { RegisterResources, Resources } from 'Constants';
import {
	BaseFilter,
	cartEditStatus,
	cartStatus,
	DataGrid,
	Edit,
	List,
} from 'Custom';
import { rowClick } from 'Utils';
import { ResourceMeta } from 'types';

const CartsFilter = (props: any) => (
	<BaseFilter {...props}>
		<ReferenceInput
			allowEmpty
			alwaysOn
			reference={Resources.USERS}
			source="userId"
		>
			<SelectInput optionText="userName" />
		</ReferenceInput>
		<SelectInput alwaysOn choices={cartStatus} source="status" />
	</BaseFilter>
);

const CartItemExpand = (props: any) => (
	<ReferenceManyField
		reference={RegisterResources.CART_ITEMS}
		target="cartId"
		{...props}
	>
		<DataGrid disableColumns edit={false}>
			<NumberField
				options={{ style: 'currency', currency: 'EGP' }}
				source="price"
			/>
			<NumberField source="quantity" />
			<ReferenceField
				reference={Resources.PRODUCT_FLAVORS}
				source="productFlavorId"
			>
				<ChipField source="name" />
			</ReferenceField>
			<ReferenceField
				label="Product Size"
				reference={Resources.PRODUCT_FLAVORS}
				source="productFlavorId"
			>
				<ReferenceField
					reference={Resources.PRODUCT_SIZES}
					source="productSizeId"
				>
					<ChipField source="name" />
				</ReferenceField>
			</ReferenceField>
			<ReferenceField
				label="Product"
				reference={Resources.PRODUCT_FLAVORS}
				source="productFlavorId"
			>
				<ReferenceField
					reference={Resources.PRODUCT_SIZES}
					source="productSizeId"
				>
					<ReferenceField
						label="Product"
						reference={Resources.PRODUCTS}
						source="productId"
					>
						<ChipField source="name" />
					</ReferenceField>
				</ReferenceField>
			</ReferenceField>
		</DataGrid>
	</ReferenceManyField>
);

export const CartList: React.FC<ResourceComponentProps> = (props: any) => (
	<List filters={<CartsFilter />} {...props}>
		<DataGrid expand={<CartItemExpand />} rowClick={rowClick}>
			<ReferenceField reference={Resources.USERS} source="userId">
				<ChipField source="userName" />
			</ReferenceField>
			<NumberField
				options={{ style: 'currency', currency: 'EGP' }}
				source="total"
			/>
			<ChipField source="status" />
			<TextField source="address" />
		</DataGrid>
	</List>
);

const CartEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<SelectInput allowEmpty choices={cartEditStatus} source="status" />
			<TextInput fullWidth source="address" />
		</FormTab>
	</Edit>
);

export const Carts: ResourceMeta = {
	list: CartList,
	edit: CartEdit,
	options: {
		icon: 'shopping_cart',
		label: 'Carts',
		subMenu: 'Store',
	},
	name: Resources.CARTS,
};
