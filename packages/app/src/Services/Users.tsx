import React from 'react';
import {
	ArrayField,
	ArrayInput,
	BooleanField,
	ChipField,
	DateField,
	DateInput,
	EmailField,
	FormDataConsumer,
	FormTab,
	ImageField,
	ImageInput,
	NumberField,
	NumberInput,
	ReferenceField,
	SelectArrayInput,
	SelectInput,
	SimpleFormIterator,
	SingleFieldList,
	TextField,
	TextInput,
} from 'react-admin';

import { Resources } from 'Constants';
import {
	ArrayLinkField,
	BaseFilter,
	DataGrid,
	Edit,
	genderOptions,
	goalOptions,
	langOptions,
	List,
	roles,
	titleOptions,
	UserSummary,
} from 'Custom';
import { ResourceMeta } from 'types';

const UsersFilter = (props: any) => (
	<BaseFilter {...props}>
		<TextInput source="email" type="email" />
		<SelectInput allowEmpty alwaysOn choices={roles} source="roles" />
		<SelectInput
			allowEmpty
			alwaysOn
			choices={langOptions}
			source="preferredLanguage"
			style={{ width: 250 }}
		/>
		<TextInput alwaysOn label="User Name" source="userName" />
	</BaseFilter>
);

const UserList = (props: any) => (
	<List filters={<UsersFilter />} {...props}>
		<DataGrid
			except={[
				'isVerified',
				'verifyToken',
				'verifyShortToken',
				'verifyExpires',
				'verifyChanges.undefined',
				'resetToken',
				'resetShortToken',
				'resetExpires',
				'facebookId',
				'googleId',
				'biography',
				'certifications',
				'links',
				'secondAddressId',
				'email',
			]}
		>
			<UserSummary label="Summary" source="userName" />
			<TextField source="biography" />
			<TextField source="certifications" />
			<TextField source="preferredLanguage" />
			<TextField source="phone" />
			<TextField source="gender" />
			<NumberField
				options={{ style: 'unit', unit: 'centimeter' }}
				source="height"
			/>
			<NumberField
				options={{ style: 'unit', unit: 'kilogram' }}
				source="weight"
			/>
			<TextField source="goal" />
			<ArrayField source="links">
				<SingleFieldList>
					<ArrayLinkField />
				</SingleFieldList>
			</ArrayField>
			<DateField source="bornAt" />
			<ReferenceField reference={Resources.ADDRESSES} source="firstAddressId">
				<ChipField source="country" />
			</ReferenceField>
			<ReferenceField reference={Resources.ADDRESSES} source="secondAddressId">
				<ChipField source="country" />
			</ReferenceField>
			<EmailField source="email" target="_blank" />
			<TextField source="googleId" />
			<TextField source="facebookId" />
			<TextField source="roles" />
			<BooleanField source="isVerified" />
			<TextField source="verifyToken" />
			<DateField source="verifyShortToken" />
			<DateField source="verifyExpires" />
			<TextField source="verifyChanges.undefined" />
			<TextField source="resetToken" />
			<TextField source="resetShortToken" />
			<TextField source="resetExpires" />
		</DataGrid>
	</List>
);

const UserEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<ImageInput accept="image/*" source="profileImage">
				<ImageField source="src" title="title" />
			</ImageInput>
			<SelectArrayInput choices={titleOptions} source="titles" />
			<TextInput source="userName" />
			<TextInput fullWidth multiline rows={3} source="biography" />
			<SelectInput choices={langOptions} source="preferredLanguage" />
			<TextInput source="certifications" />
			<TextInput source="phone" />
			<NumberInput source="height" />
			<NumberInput source="weight" />
			<SelectInput choices={genderOptions} source="gender" />
			<SelectInput choices={goalOptions} source="goal" />
			<ArrayInput source="links">
				<SimpleFormIterator>
					<TextInput fullWidth source="links" />
				</SimpleFormIterator>
			</ArrayInput>
			<DateInput source="bornAt" />
			<TextInput source="email" type="email" />
			<SelectInput choices={roles} source="roles" />
			<FormDataConsumer>
				{({ formData, ...rest }) => (
					<>
						{formData.google && (
							<pre>{JSON.stringify(formData.google, undefined, 2)}</pre>
						)}
					</>
				)}
			</FormDataConsumer>
		</FormTab>
	</Edit>
);

export const Users: ResourceMeta = {
	list: UserList,
	edit: UserEdit,
	options: { icon: 'verified_user', label: 'Users', subMenu: 'All' },
	name: Resources.USERS,
};
