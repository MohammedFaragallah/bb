import React from 'react';
import {
	Create,
	DateField,
	DateInput,
	FormTab,
	NumberField,
	TabbedForm,
	TextField,
	TextInput,
} from 'react-admin';

import { RegisterResources, Resources } from 'Constants';
import {
	ArticleBodyTab,
	CommentsTab,
	DataGrid,
	Edit,
	EditToolBar,
	LikesTab,
	List,
	RatesTab,
} from 'Custom';
import { ResourceMeta } from 'types';

const EventList = (props: any) => (
	<List {...props}>
		<DataGrid except={['description']}>
			<TextField source="title" />
			<TextField source="description" />
			<TextField source="hostName" />
			<TextField source="location" />
			<NumberField source="likes" />
			<NumberField source="comments" />
			<DateField source="startAt" />
			<DateField source="endAt" />
		</DataGrid>
	</List>
);

const EventEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput source="title" />
			<TextInput source="hostName" />
			<TextInput source="location" />
			<DateInput source="startAt" />
			<DateInput source="endAt" />
		</FormTab>
		<ArticleBodyTab />
		<CommentsTab
			reference={RegisterResources.EVENT_COMMENTS}
			target="eventId"
		/>
		<RatesTab reference={RegisterResources.EVENT_RATES} target="eventId" />
		<LikesTab reference={RegisterResources.EVENT_LIKES} target="eventId" />
	</Edit>
);

const EventCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<TabbedForm toolbar={<EditToolBar />}>
			<FormTab label="Details">
				<TextInput source="title" />
				<TextInput source="hostName" />
				<TextInput source="location" />
				<DateInput source="startAt" />
				<DateInput source="endAt" />
			</FormTab>
			<ArticleBodyTab />
		</TabbedForm>
	</Create>
);

export const Events: ResourceMeta = {
	list: EventList,
	create: EventCreate,
	edit: EventEdit,
	options: { icon: 'event', label: 'Events', subMenu: 'All' },
	name: Resources.EVENTS,
};
