import {
	Box,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from '@material-ui/core';
import { Create, DynamicFeed, ExpandMore } from '@material-ui/icons';
import React from 'react';

import { ChampionSchema, ExerciseSchema, StorySchema } from '@types';
import { Icon, Link, Typography } from 'Components';
import { AuthPaths, DataTypes, FIRST_ITEM, Paths, Resources } from 'Constants';
import { ChampionURL, SportURL } from 'Helpers';
import { useQueryWithStore } from 'core';

interface Content {
	name: string;
	status: 'DONE' | 'WIP';
}

interface RouteProps {
	glob: string;
	description: string;
	notes: string[];
	contents: Content[];
	linkExample?: string;
}

interface Props {}

export const SiteMap: React.FC<Props> = () => {
	const { data: articles } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			pagination: { page: 1, perPage: 1 },
			filter: { approved: true },
		},
	});

	const article = articles?.[FIRST_ITEM];

	const { data: champion } = useQueryWithStore<ChampionSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CHAMPIONS,
		payload: { id: 1 },
	});

	const { data: exercise } = useQueryWithStore<ExerciseSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.EXERCISES,
		payload: { id: 1 },
	});

	const siteMap: RouteProps[] = [
		{
			glob: Paths.HOME,
			description: 'Home',
			notes: [],
			contents: [
				{
					name: 'Slider for ADS/announcements',
					status: 'DONE',
				},
				{ name: 'top articles', status: 'WIP' },
				{ name: 'top products', status: 'WIP' },
			],
		},
		{
			glob: Paths.SITE_MAP,
			description: 'SiteMap',
			notes: [],
			contents: [
				{
					name: 'general information',
					status: 'DONE',
				},
				{ name: 'routes', status: 'DONE' },
				{
					name: 'api services status',
					status: 'DONE',
				},
				{ name: 'Dependencies', status: 'DONE' },
			],
		},
		{
			glob: Paths.EXERCISES,
			description: 'All Exercises',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.EXERCISES}/exerciseId`,
			linkExample: `${Paths.EXERCISES}/${exercise?.id}`,
			description: 'single Exercise',
			notes: [],
			contents: [],
		},
		{
			glob: Paths.ARTICLES,
			description: 'All articles',
			notes: [],
			contents: [
				{
					name: 'view settings (view type - sort by)',
					status: 'WIP',
				},
			],
		},
		{
			glob: `${Paths.ARTICLES}/:categoryId`,
			linkExample: `${Paths.ARTICLES}/${article?.categoryId}`,
			description: 'All articles related to specific category',
			notes: ['unknown category redirect to not found'],
			contents: [],
		},
		{
			glob: `${Paths.ARTICLES}/:categoryId/:articleId`,
			linkExample: `${Paths.ARTICLES}/${article?.categoryId}/${article?.id}`,
			description: 'single article',
			notes: [],
			contents: [
				{ name: 'about author', status: 'DONE' },
				{ name: 'related articles', status: 'DONE' },
				{ name: 'add comment', status: 'DONE' },
				{ name: 'article comments', status: 'DONE' },
			],
		},
		{
			glob: AuthPaths.LOGIN,
			description: 'Login',
			notes: [],
			contents: [],
		},
		{
			glob: AuthPaths.SIGNUP,
			description: 'Signup',
			notes: [],
			contents: [],
		},
		{
			glob: Paths.COMMUNITY,
			description: 'All sports',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.COMMUNITY}/:sportId`,
			linkExample: SportURL(champion),
			description: 'All champions related to specific sport',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.COMMUNITY}/:sportId/:championId`,
			linkExample: ChampionURL(champion),
			description: 'single champion',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}/:userId`,
			linkExample: `${Paths.PROFILE}/1`,
			description: 'author public profile general information',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}/:userId${Paths.ARTICLES}`,
			linkExample: `${Paths.PROFILE}/1${Paths.ARTICLES}`,
			description: 'author approved articles',
			notes: [],
			contents: [],
		},
		{
			glob: Paths.PROFILE,
			description: 'Authenticated path / current user profile',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}${Paths.ARTICLES}`,
			description: 'authenticated user own articles',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}${Paths.ARTICLES}/create`,
			description: 'create new article',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}${Paths.MAIN_ADDRESS}`,
			description: 'current user main address for delivery',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}${Paths.SECONDARY_ADDRESS}`,
			description: 'current user secondary address for delivery',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.PROFILE}/*`,
			linkExample: `${Paths.PROFILE}/*`,
			description: 'Not found',
			notes: [],
			contents: [],
		},
		{
			glob: Paths.EVENTS,
			description: 'All events',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.EVENTS}/:eventId`,
			linkExample: `${Paths.EVENTS}/1`,
			description: 'single event',
			notes: [],
			contents: [],
		},
		//? Soon
		{
			glob: Paths.STORE,
			description: 'WIP',
			notes: [],
			contents: [],
		},
		{
			glob: `${Paths.STORE}/:productId`,
			description: 'WIP single product',
			notes: [],
			contents: [],
		},
		//? Common
		{
			glob: Paths.TERMS,
			description: 'terms of use',
			notes: [],
			contents: [],
		},
		{
			glob: Paths.PRIVACY,
			description: 'privacy policy',
			notes: [],
			contents: [],
		},
		{
			glob: Paths.NOT_FOUND,
			description: 'Not found',
			notes: [],
			contents: [],
		},
		{
			glob: '*',
			description: 'Not found',
			notes: [],
			contents: [],
		},
	];

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				textAlign: 'center',
			}}
		>
			{siteMap.map((route, index) => {
				const to = route.linkExample || route.glob;

				return (
					<Accordion key={index} style={{ width: '100%' }}>
						<AccordionSummary expandIcon={<ExpandMore />}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									width: '100%',
								}}
							>
								<Link to={to}>
									<Typography>{route.glob}</Typography>
								</Link>
								<Typography>{route.description}</Typography>
							</Box>
						</AccordionSummary>
						{(route.contents.length > 0 || route.notes.length > 0) && (
							<AccordionDetails>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									{route.contents.map(({ name, status }, index) => (
										<Box
											key={index}
											sx={{
												display: 'flex',
												flexDirection: 'row',
												width: '100%',
											}}
										>
											<Icon push="right">
												<DynamicFeed />
											</Icon>
											<Typography>
												{status} - {name}
											</Typography>
										</Box>
									))}
									{route.notes.map((note, index) => (
										<Box
											key={index}
											sx={{
												display: 'flex',
												flexDirection: 'row',
												width: '100%',
											}}
										>
											<Icon push="right">
												<Create />
											</Icon>
											<Typography>{note}</Typography>
										</Box>
									))}
								</Box>
							</AccordionDetails>
						)}
					</Accordion>
				);
			})}
		</Box>
	);
};
