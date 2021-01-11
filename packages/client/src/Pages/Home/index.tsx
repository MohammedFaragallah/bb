import { Box, Container, Grid } from '@material-ui/core';
import random from 'lodash/random';
import React from 'react';

import { AdsLocations, ProductSchema, SlideSchema, StorySchema } from '@types';
import { Loading, Page, Typography } from 'Components';
import { SectionAD } from 'Components/ADs';
import { SectionSlider } from 'Components/SectionSlider';
import { Slider } from 'Components/Slider';
import {
	allAvailable,
	DataTypes,
	newestFirst,
	Paths,
	Resources,
} from 'Constants';
import { useTranslation } from 'Hooks';
import { HomeArticle } from 'Pages/Home/HomeArticle';
import { ProductCard } from 'Pages/Home/ProductCard';
import { useQueryWithStore } from 'core';

const locationFilter = (location: AdsLocations) => (slide: SlideSchema) =>
	slide.location === location;

interface Props {}

export const Home: React.FC<Props> = () => {
	const translate = useTranslation();

	const { data: articles = [] } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			pagination: { page: 1, perPage: 3 },
			filter: { approved: true },
		},
	});

	const { data: slides = [] } = useQueryWithStore<SlideSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.SLIDES,
		payload: {
			...newestFirst,
			...allAvailable,
			filter: {
				location: {
					$in: [AdsLocations.SLIDER, AdsLocations.HOME_SECTION],
				},
			},
		},
	});

	const { data: products = [] } = useQueryWithStore<ProductSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCTS,
		payload: {
			pagination: { page: 1, perPage: 12 },
		},
	});

	const sections = slides.filter(locationFilter(AdsLocations.HOME_SECTION));

	if (!articles?.length || !products?.length) return <Loading />;

	return (
		<Page maxWidth={false} style={{ padding: 0 }} titles={['pageTitle.home']}>
			<Slider slides={slides.filter(locationFilter(AdsLocations.SLIDER))} />
			<Box
				sx={{
					mb: 4,
				}}
			>
				<Box component={Container}>
					<Typography align="center" fontSize={28} fontWeight={700} mt={2}>
						{translate('section.latestArticles')}
					</Typography>
					<Box
						sx={{
							mt: -4,
						}}
					>
						<Grid container spacing={2}>
							{articles.map(story => (
								<Grid item key={story.id} lg={4} md={4} sm={6} xs={12}>
									<HomeArticle story={story} />
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</Box>
			<SectionAD section={sections[random(sections.length - 1)]} />
			<SectionSlider
				action="view all"
				numberOfCards={{ xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
				title="top sellers"
				to={Paths.STORE}
			>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</SectionSlider>
		</Page>
	);
};
