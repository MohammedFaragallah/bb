import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'use-query-params';

import { ChampionSchema, SportSchema, StoriesViews, ViewGrids } from '@types';
import { Loading, Page, Settings } from 'Components';
import {
	DataTypes,
	DEFAULT_OFFSET,
	DEFAULT_ORDER,
	DEFAULT_PER_PAGE_LIMIT,
	DEFAULT_SORT,
	Resources,
} from 'Constants';
import { ChampionURL, getDescription, getPage, imageURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { useQueryWithStore } from 'core';

import { SportCard } from './SportsCard';

const viewsGrid: ViewGrids = {
	module: { xl: 3, lg: 3, md: 4, sm: 6, xs: 12 },
};

const sorts = [
	{ label: 'Last Updated', field: 'updatedAt' },
	{ label: 'Name', field: 'name' },
];

interface Props {
	defaultView?: StoriesViews;
	limit?: number;
}

export const Sport: React.FC<Props> = props => {
	const {
		defaultView = StoriesViews.module,
		limit = DEFAULT_PER_PAGE_LIMIT,
	} = props;
	const { sportId } = useParams();

	const translate = useTranslation();

	const label = translate('pageTitle.sports');

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

	const { data: champions, total } = useQueryWithStore<ChampionSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CHAMPIONS,
		payload: {
			pagination: { page: getPage(offset, limit), perPage: limit },
			sort: { field: sort, order },
			filter: { sportId },
		},
	});

	const { data: sport } = useQueryWithStore<SportSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.SPORTS,
		payload: { id: sportId },
	});

	if (!(champions && sport)) return <Loading />;

	return (
		<Page titles={[sport?.name, label]}>
			<Settings defaultView={defaultView} noView sorts={sorts} total={total}>
				<Grid container spacing={2}>
					{champions.map(champion => {
						const cardData = {
							to: ChampionURL(champion),
							title: champion.name,
							description: getDescription(champion),
							image: imageURL(champion, 'cover'),
						};

						return (
							<Grid
								item
								key={champion.id}
								lg={viewsGrid?.[view as StoriesViews]?.lg}
								md={viewsGrid?.[view as StoriesViews]?.md}
								sm={viewsGrid?.[view as StoriesViews]?.sm}
								xl={viewsGrid?.[view as StoriesViews]?.xl}
								xs={viewsGrid?.[view as StoriesViews]?.xs}
							>
								{view === 'module' && <SportCard {...cardData} />}
							</Grid>
						);
					})}
				</Grid>
			</Settings>
		</Page>
	);
};
