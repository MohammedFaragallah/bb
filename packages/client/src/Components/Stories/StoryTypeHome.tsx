import React from 'react';
import {
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'use-query-params';

import { CategorySchema, StoriesViews, StorySchema } from '@types';
import { Loading, Page, Settings } from 'Components';
import { StoriesGrid } from 'Components/Stories/StoriesGrid';
import {
	allAvailable,
	DataTypes,
	DEFAULT_ORDER,
	DEFAULT_PER_PAGE_LIMIT,
	DEFAULT_SORT,
	Resources,
} from 'Constants';
import { useInfiniteQuery } from 'Hooks';
import { Pagination, useQueryWithStore } from 'core';

const sorts = [
	{ label: 'Author', field: 'userId' },
	{ label: 'Category', field: 'categoryId' },
	{ label: 'Title', field: 'title' },
];

// TODO: add a stack grid component autoResponsive-react/react-stackGrid(!big bundle size)
// TODO: windows like arrange view

interface Props {}

export const StoryTypeHome: React.FC<Props> = () => {
	const limit = DEFAULT_PER_PAGE_LIMIT;
	const defaultView = StoriesViews.module;

	const [{ view = defaultView, sort, order = DEFAULT_ORDER }] = useQueryParams({
		view: withDefault(StringParam, defaultView),
		sort: withDefault(StringParam, DEFAULT_SORT),
		order: withDefault(NumberParam, DEFAULT_ORDER),
	});

	const [
		{ data: stories = [], isLoading },
		loadMore,
	] = useInfiniteQuery<StorySchema>({
		resource: Resources.STORIES,
		payload: {
			pagination: { perPage: limit } as Pagination,
			sort: { field: sort || DEFAULT_SORT, order },
			filter: { approved: true },
		},
	});

	const { data: categories = [] } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CATEGORIES,
		payload: { ...allAvailable },
	});

	return (
		<Page titles={['pageTitle.articles']}>
			<Settings defaultView={defaultView} sorts={sorts}>
				<StoriesGrid
					categories={categories}
					fallback={<Loading />}
					loadMore={loadMore}
					stories={stories}
					view={view as StoriesViews}
				/>
				{isLoading && <Loading />}
			</Settings>
		</Page>
	);
};
