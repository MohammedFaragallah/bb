import React from 'react';
import {
	ChipField,
	FormDataConsumer,
	FormTab,
	ReferenceManyField,
	SelectInput,
	SingleFieldList,
	TextField,
	TextInput,
} from 'react-admin';

import { Resources } from 'Constants';
import {
	BaseFilter,
	countOpts,
	DataGrid,
	Edit,
	egyptianCities,
	List,
} from 'Custom';
import { ResourceMeta } from 'types';

const AddressesFilter = (props: any) => (
	<BaseFilter {...props}>
		<SelectInput allowEmpty alwaysOn choices={egyptianCities} source="city" />
		<SelectInput allowEmpty alwaysOn choices={countOpts} source="country" />
	</BaseFilter>
);

const AddressList = (props: any) => (
	<List filters={<AddressesFilter />} {...props}>
		<DataGrid>
			<TextField source="address1" />
			<TextField source="address2" />
			<TextField source="region" />
			<TextField source="city" />
			<TextField source="country" />
			<ReferenceManyField
				label="As First address"
				reference={Resources.USERS}
				target="firstAddressId"
			>
				<SingleFieldList>
					<ChipField source="userName" />
				</SingleFieldList>
			</ReferenceManyField>
			<ReferenceManyField
				label="As Second address"
				reference={Resources.USERS}
				target="secondAddressId"
			>
				<SingleFieldList>
					<ChipField source="userName" />
				</SingleFieldList>
			</ReferenceManyField>
		</DataGrid>
	</List>
);

const AddressEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="address1" />
			<TextInput source="address2" />
			<TextInput source="region" />
			<SelectInput choices={countOpts} source="country" />
			<FormDataConsumer>
				{({ formData, ...rest }) => (
					<>
						{formData.country && formData.country === 'Egypt' && (
							<SelectInput choices={egyptianCities} source="city" />
						)}
					</>
				)}
			</FormDataConsumer>
			<ReferenceManyField
				label="As First address"
				reference={Resources.USERS}
				target="firstAddressId"
			>
				<SingleFieldList>
					<ChipField source="userName" />
				</SingleFieldList>
			</ReferenceManyField>
			<ReferenceManyField
				label="As Second address"
				reference={Resources.USERS}
				target="secondAddressId"
			>
				<SingleFieldList>
					<ChipField source="userName" />
				</SingleFieldList>
			</ReferenceManyField>
		</FormTab>
	</Edit>
);

export const Addresses: ResourceMeta = {
	list: AddressList,
	edit: AddressEdit,
	options: { icon: 'my_location', label: 'Addresses', subMenu: 'All' },
	name: Resources.ADDRESSES,
};
