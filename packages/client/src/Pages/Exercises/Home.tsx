import {
	Box,
	Hidden,
	Icon,
	IconButton,
	Tooltip,
	Zoom,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { parse } from 'query-string';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import {
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'use-query-params';

import { ExerciseSchema } from '@types';
import {
	CenteredMessage,
	Loading,
	OrderButton,
	Page,
	SortsMenu,
} from 'Components';
import { ExerciseCard } from 'Components/Cards/ExerciseCard';
import { FilterPage } from 'Components/Filters';
import {
	DEFAULT_ORDER,
	DEFAULT_PER_PAGE_LIMIT,
	DEFAULT_SORT,
	Paths,
	Resources,
} from 'Constants';
import { alwaysArray } from 'Helpers';
import { useInfiniteQuery, useTranslation } from 'Hooks';
import {
	CategoriesFilter,
	EquipmentFilter,
	FitnessLevelFilter,
	MusclesFilter,
} from 'Pages/Exercises/Filters';
import { Pagination } from 'core';

const sorts = [
	{ label: 'Category', field: 'categoryId' },
	{ label: 'Equipment', field: 'equipment' },
	{ label: 'Fitness Level', field: 'fitnessLevel' },
	{ label: 'Muscle', field: 'muscle' },
	{ label: 'Name', field: 'name' },
	{ label: 'Type', field: 'type' },
];

interface Props {}

export const HomeExercise: React.FC<Props> = () => {
	const limit = DEFAULT_PER_PAGE_LIMIT;
	const location = useLocation();
	const navigate = useNavigate();
	const { muscle, equipment, fitnessLevel, category } = parse(location.search);
	const translate = useTranslation();

	const [{ sort = DEFAULT_SORT, order = DEFAULT_ORDER }] = useQueryParams({
		sort: withDefault(StringParam, DEFAULT_SORT),
		order: withDefault(NumberParam, DEFAULT_ORDER),
	});

	const [
		{ data: exercises, isPreviousData, isLoading: loading, total },
		loadMore,
	] = useInfiniteQuery<ExerciseSchema>({
		resource: Resources.EXERCISES,
		payload: {
			pagination: { perPage: limit } as Pagination,
			sort: { field: sort, order },
			filter: {
				muscle: { $in: alwaysArray(muscle) },
				equipment: { $in: alwaysArray(equipment) },
				fitnessLevel: { $in: alwaysArray(fitnessLevel) },
				categoryId: { $in: alwaysArray(category) },
			},
		},
	});

	const hasFilter = muscle || equipment || fitnessLevel || category;

	return (
		<Page titles={['pageTitle.exercises']}>
			<FilterPage
				MainFilters={<MusclesFilter label="Muscles" type="muscle" />}
				SecondaryFilters={[
					<EquipmentFilter
						key="equipment"
						label="Equipment"
						type="equipment"
					/>,
					<FitnessLevelFilter
						key="fitnessLevel"
						label="Fitness Levels"
						type="fitnessLevel"
					/>,
					<CategoriesFilter
						key="category"
						label="Exercise Category"
						type="category"
					/>,
				]}
				mainLabel="Muscles"
			>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
						mt: 1,
						width: '100%',
					}}
				>
					<Hidden xsDown>
						{total ? (
							<Box
								sx={{
									mr: 1,
								}}
							>
								{translate({ id: 'filter.results' }, { total })}
							</Box>
						) : null}
						<Box
							sx={{
								ml: 'auto',
							}}
						>
							{hasFilter ? (
								<Tooltip
									TransitionComponent={Zoom}
									placement="bottom"
									title="clear all filters"
								>
									<IconButton onClick={() => navigate(Paths.EXERCISES)}>
										<Icon>
											<Clear />
										</Icon>
									</IconButton>
								</Tooltip>
							) : null}
							<SortsMenu sorts={sorts} />
							<OrderButton />
						</Box>
					</Hidden>
				</Box>

				{isPreviousData && !exercises.length && (
					<CenteredMessage>
						No Exercises were found matching the selected filters.
					</CenteredMessage>
				)}

				{exercises.map(exercise => (
					<ExerciseCard exercise={exercise} key={exercise.id} />
				))}

				<Waypoint onEnter={loadMore}>
					<Box
						sx={{
							height: 16,
							width: '100%',
						}}
					/>
				</Waypoint>

				{loading && (
					<CenteredMessage>
						<Loading />
					</CenteredMessage>
				)}
			</FilterPage>
		</Page>
	);
};
