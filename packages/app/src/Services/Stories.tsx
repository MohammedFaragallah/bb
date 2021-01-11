import { Box, Chip, Icon, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import {
	BooleanField,
	BooleanInput,
	BulkDeleteButton,
	ChipField,
	Create,
	FormDataConsumer,
	FormTab,
	NumberField,
	ReferenceField,
	ReferenceInput,
	SelectInput,
	TabbedForm,
	TextField,
	TextInput,
} from 'react-admin';

import { RegisterResources, Resources } from 'Constants';
import {
	ArticleBodyTab,
	AvatarField,
	BaseFilter,
	BulkUpdateButton,
	CommentsTab,
	DataGrid,
	Edit,
	ImageLinkInput,
	LikesTab,
	LinkField,
	List,
	RatesTab,
} from 'Custom';
import { CategoryTypes } from 'enums';
import { ResourceMeta } from 'types';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		success: { color: palette.success.main, marginRight: spacing(1) },
		error: { color: palette.error.main, marginRight: spacing(1) },
	};
});

const ReviewsBulkActionButtons = (props: any) => {
	const classes = useStyles();

	return (
		<>
			<BulkUpdateButton patch={{ approved: true }} {...props}>
				<>
					<Icon className={classes.success}>thumb_up</Icon>
					<Typography>Approve</Typography>
				</>
			</BulkUpdateButton>
			<BulkUpdateButton patch={{ approved: false }} {...props}>
				<>
					<Icon className={classes.error}>thumb_down</Icon>
					<Typography>Disapprove</Typography>
				</>
			</BulkUpdateButton>
			<BulkDeleteButton {...props} />
		</>
	);
};

const StoriesFilter = (props: any) => (
	<BaseFilter {...props}>
		<ReferenceInput
			allowEmpty
			alwaysOn
			filter={{ type: CategoryTypes.articles }}
			reference={Resources.CATEGORIES}
			source="categoryId"
		>
			<SelectInput source="name" />
		</ReferenceInput>
		<ReferenceInput
			allowEmpty
			alwaysOn
			reference={Resources.USERS}
			source="userId"
		>
			<SelectInput optionText="userName" />
		</ReferenceInput>
		<BooleanInput source="approved" />
	</BaseFilter>
);

const StoryList = (props: any) => (
	<List
		bulkActionButtons={<ReviewsBulkActionButtons />}
		filters={<StoriesFilter />}
		{...props}
	>
		<DataGrid except={['description']}>
			<TextField source="title" />
			<TextField source="description" />
			<NumberField source="views" />
			<AvatarField alt="title" source="featuredImage" variant="rounded" />
			<LinkField source="video" />
			<BooleanField source="approved" />
			<NumberField source="likes" />
			<NumberField source="comments" />
			<ReferenceField
				label="Author"
				reference={Resources.USERS}
				source="userId"
			>
				<ChipField source="userName" />
			</ReferenceField>
			<ReferenceField reference={Resources.CATEGORIES} source="categoryId">
				<ChipField source="name" />
			</ReferenceField>
		</DataGrid>
		{/* // TODO: add button to preview story on client */}
	</List>
);

const StoryEdit = (props: any) => (
	<Edit {...props}>
		<FormTab label="Details">
			<TextInput readOnly source="id" />
			<TextInput fullWidth source="title" />
			<FormDataConsumer>
				{formDataProps => (
					<ImageLinkInput source="featuredImage" {...formDataProps} />
				)}
			</FormDataConsumer>
			<Box display="flex">
				<Chip label="Featured 3:2" />
			</Box>
			<TextInput fullWidth source="video" />
			<BooleanInput source="approved" />
			<ReferenceInput
				filter={{ type: CategoryTypes.articles }}
				reference={Resources.CATEGORIES}
				source="categoryId"
			>
				<SelectInput source="name" />
			</ReferenceInput>
		</FormTab>
		<ArticleBodyTab />
		<CommentsTab
			reference={RegisterResources.STORY_COMMENTS}
			target="storyId"
		/>
		<RatesTab reference={RegisterResources.STORY_RATES} target="storyId" />
		<LikesTab reference={RegisterResources.STORY_LIKES} target="storyId" />
	</Edit>
);

const StoryCreate = (props: any) => (
	<Create title={`${props.options.label} Create`} {...props}>
		<TabbedForm>
			<FormTab label="Details">
				<TextInput fullWidth source="title" />
				<FormDataConsumer>
					{formDataProps => (
						<ImageLinkInput source="featuredImage" {...formDataProps} />
					)}
				</FormDataConsumer>
				<TextInput fullWidth source="video" />
				<BooleanInput source="approved" />
				<ReferenceInput
					filter={{ type: CategoryTypes.articles }}
					reference={Resources.CATEGORIES}
					source="categoryId"
				>
					<SelectInput source="name" />
				</ReferenceInput>
			</FormTab>
			<ArticleBodyTab />
		</TabbedForm>
	</Create>
);

export const Stories: ResourceMeta = {
	list: StoryList,
	create: StoryCreate,
	edit: StoryEdit,
	options: { icon: 'post_add', label: 'Stories', subMenu: 'All' },
	name: Resources.STORIES,
};
