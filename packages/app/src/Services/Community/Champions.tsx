import { Box, Chip } from '@material-ui/core';
import React from 'react';
import {
	ArrayField,
	ArrayInput,
	Create,
	DateField,
	DateInput,
	FormDataConsumer,
	FormTab,
	NumberField,
	NumberInput,
	ReferenceField,
	ReferenceInput,
	required,
	SelectInput,
	SimpleFormIterator,
	SingleFieldList,
	TabbedForm,
	TextField,
	TextInput,
} from 'react-admin';

import { RegisterResources, Resources } from 'Constants';
import {
	ArrayLinkField,
	ArticleBodyTab,
	AvatarField,
	BaseFilter,
	countOpts,
	DataGrid,
	Edit,
	EditToolBar,
	egyptianCities,
	genderOptions,
	ImageLinkInput,
	LikesTab,
	List,
	RatesTab,
} from 'Custom';
import { ResourceMeta } from 'types';

const ChampionValidation = [required()];

const ChampionsFilter = (props: any) => (
	<BaseFilter {...props}>
		<SelectInput allowEmpty alwaysOn choices={egyptianCities} source="city" />
		<SelectInput allowEmpty alwaysOn choices={countOpts} source="country" />
	</BaseFilter>
);

const ChampionList = (props: any) => (
	<List filters={<ChampionsFilter />} {...props}>
		<DataGrid except={['links', 'description']}>
			<AvatarField alt="name" source="profileImage" />
			<TextField source="description" />
			<AvatarField alt="name" source="coverImage" variant="rounded" />
			<TextField source="name" />
			<TextField source="city" />
			<NumberField source="likes" />
			<TextField source="country" />
			<DateField source="bornAt" />
			<TextField source="class" />
			<NumberField
				options={{ style: 'unit', unit: 'centimeter' }}
				source="height"
			/>
			<NumberField
				options={{ style: 'unit', unit: 'kilogram' }}
				source="weight"
			/>
			<TextField source="gender" />
			<ArrayField source="links">
				<SingleFieldList>
					<ArrayLinkField />
				</SingleFieldList>
			</ArrayField>
			<ReferenceField reference={Resources.SPORTS} source="sportId">
				<TextField source="name" />
			</ReferenceField>
		</DataGrid>
	</List>
);

const ChampionEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="profileImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<Box display="flex">
				<Chip label="Profile 1:1" />
			</Box>
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="coverImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<Box display="flex">
				<Chip label="Cover 16:9" />
			</Box>
			<TextInput source="name" validate={ChampionValidation} />
			<SelectInput
				choices={countOpts}
				source="country"
				validate={ChampionValidation}
			/>
			<FormDataConsumer>
				{({ formData, ...rest }) => (
					<>
						{formData.country && formData.country === 'Egypt' && (
							<SelectInput
								choices={egyptianCities}
								source="city"
								validate={ChampionValidation}
							/>
						)}
					</>
				)}
			</FormDataConsumer>
			<DateInput source="bornAt" validate={ChampionValidation} />
			<TextInput source="class" validate={ChampionValidation} />
			<NumberInput source="height" validate={ChampionValidation} />
			<NumberInput source="weight" validate={ChampionValidation} />
			<SelectInput
				choices={genderOptions}
				source="gender"
				validate={ChampionValidation}
			/>
			<ArrayInput source="links">
				<SimpleFormIterator>
					<TextInput fullWidth source="links" />
				</SimpleFormIterator>
			</ArrayInput>
			<ReferenceInput
				reference={Resources.SPORTS}
				source="sportId"
				validate={ChampionValidation}
			>
				<SelectInput optionText="name" />
			</ReferenceInput>
			<TextInput readOnly source="likes" />
		</FormTab>
		<ArticleBodyTab />
		<FormTab label="album">
			<ArrayInput source="album">
				<SimpleFormIterator>
					<FormDataConsumer>
						{({ getSource, ...formDataProps }) => {
							const source = getSource?.('tileImage');
							return (
								source && <ImageLinkInput source={source} {...formDataProps} />
							);
						}}
					</FormDataConsumer>
					<Box display="flex">
						<Chip label="Tile 9:6" />
					</Box>
					<TextInput source="caption" />
				</SimpleFormIterator>
			</ArrayInput>
		</FormTab>
		<RatesTab
			reference={RegisterResources.CHAMPION_RATES}
			target="championId"
		/>
		<LikesTab
			reference={RegisterResources.CHAMPION_LIKES}
			target="championId"
		/>
	</Edit>
);

const ChampionCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<TabbedForm toolbar={<EditToolBar />}>
			<FormTab label="Details">
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="profileImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<Box display="flex">
					<Chip label="Profile 1:1" />
				</Box>
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="coverImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<Box display="flex">
					<Chip label="Cover 16:9" />
				</Box>
				<TextInput source="name" validate={ChampionValidation} />
				<SelectInput
					choices={countOpts}
					source="country"
					validate={ChampionValidation}
				/>
				<FormDataConsumer>
					{({ formData, ...rest }) => (
						<>
							{formData.country && formData.country === 'Egypt' && (
								<SelectInput
									choices={egyptianCities}
									source="city"
									validate={ChampionValidation}
								/>
							)}
						</>
					)}
				</FormDataConsumer>
				<DateInput source="bornAt" validate={ChampionValidation} />
				<TextInput source="class" validate={ChampionValidation} />
				<NumberInput source="height" validate={ChampionValidation} />
				<NumberInput source="weight" validate={ChampionValidation} />
				<SelectInput
					choices={genderOptions}
					source="gender"
					validate={ChampionValidation}
				/>
				<ArrayInput source="links">
					<SimpleFormIterator>
						<TextInput fullWidth source="links" />
					</SimpleFormIterator>
				</ArrayInput>
				<ReferenceInput
					reference={Resources.SPORTS}
					source="sportId"
					validate={ChampionValidation}
				>
					<SelectInput optionText="name" />
				</ReferenceInput>
			</FormTab>
			<ArticleBodyTab />
			<FormTab label="album">
				<ArrayInput source="album">
					<SimpleFormIterator>
						<FormDataConsumer>
							{({ getSource, ...formDataProps }) => {
								const source = getSource?.('tileImage');
								return (
									source && (
										<ImageLinkInput source={source} {...formDataProps} />
									)
								);
							}}
						</FormDataConsumer>
						<TextInput source="caption" />
					</SimpleFormIterator>
				</ArrayInput>
			</FormTab>
		</TabbedForm>
	</Create>
);

export const Champions: ResourceMeta = {
	list: ChampionList,
	create: ChampionCreate,
	edit: ChampionEdit,
	options: {
		icon: 'accessible_forward',
		label: 'Champions',
		subMenu: 'All',
	},
	name: Resources.CHAMPIONS,
};
