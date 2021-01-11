import { Description } from '@material-ui/icons';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'use-query-params';

import { CategorySchema, StoriesViews, StorySchema } from '@types';
import { Breadcrumbs, Loading, NotFound, Page, Settings } from 'Components';
import { EmptyCategory } from 'Components/Stories';
import { StoriesStackGrid } from 'Components/Stories/StoriesStackGrid';
import {
	DataTypes,
	DEFAULT_OFFSET,
	DEFAULT_ORDER,
	DEFAULT_PER_PAGE_LIMIT,
	DEFAULT_SORT,
	Paths,
	Resources,
} from 'Constants';
import { CategoryURL, getPage } from 'Helpers';
import { useQueryWithStore } from 'core';

const sorts = [
	{ label: 'Author', field: 'userId' },
	{ label: 'Title', field: 'title' },
];

interface Props {}

export const StoryTypeCat: React.FC<Props> = () => {
	const { categoryId } = useParams();

	const label = 'pageTitle.articles';
	const defaultView = StoriesViews.module;
	const limit = DEFAULT_PER_PAGE_LIMIT;

	const [
		{
			view = defaultView,
			sort = DEFAULT_SORT,
			order = DEFAULT_ORDER,
			offset = DEFAULT_OFFSET,
		},
	] = useQueryParams({
		view: withDefault(StringParam, defaultView),
		sort: withDefault(StringParam, DEFAULT_SORT),
		order: withDefault(NumberParam, DEFAULT_ORDER),
		offset: withDefault(NumberParam, DEFAULT_OFFSET),
	});

	const {
		data: category,
		isPreviousData: isPreviousCategory,
	} = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CATEGORIES,
		payload: { id: categoryId },
	});

	const {
		data: stories,
		total,
		isPreviousData: isPreviousStory,
	} = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			pagination: { page: getPage(offset, limit), perPage: limit },
			sort: { field: sort, order },
			filter: { approved: true, categoryId },
		},
	});

	if (!(category && stories)) {
		if (!(isPreviousCategory && isPreviousStory)) return <Loading />;
		return <NotFound message="Couldn't find this category" />;
	}

	return (
		<Page titles={[category.name, label]}>
			<Settings
				center={
					<Breadcrumbs
						paths={[
							{ label, to: Paths.ARTICLES, icon: <Description /> },
							{ label: category.name, to: CategoryURL(category) },
						]}
					/>
				}
				defaultView={defaultView}
				sorts={sorts}
				total={total}
			>
				<StoriesStackGrid
					fallback={<EmptyCategory category={category} label={label} />}
					stories={stories}
					view={view as StoriesViews}
				/>
			</Settings>
		</Page>
	);
};
