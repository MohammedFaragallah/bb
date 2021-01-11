import { Grid } from '@material-ui/core';
import { Sports } from '@material-ui/icons';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageZoom from 'react-medium-image-zoom';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { CommentsTypes, ExerciseSchema, LikesTypes, RatesTypes } from '@types';
import {
	Breadcrumbs,
	Image,
	Loading,
	Page,
	Share,
	Show,
	Typography,
} from 'Components';
import { Comments, Likes, Rates } from 'Components/Feedback';
import { DataTypes, Paths, Resources } from 'Constants';
import { imageURL } from 'Helpers';
import { LabelsWithLinks } from 'Pages/Exercises/LabelsWithLinks';
import { useQueryWithStore } from 'core';

interface Props {}

export const Exercise: React.FC<Props> = () => {
	const { exerciseId } = useParams();

	const { data: exercise } = useQueryWithStore<ExerciseSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.EXERCISES,
		payload: { id: exerciseId },
	});

	if (!exercise) return <Loading />;

	const {
		muscle,
		equipment,
		name,
		video,
		notes,
		instructions,
		cautions,
		fitnessLevel,
		categoryId,
	} = exercise;

	// TODO: get category

	const startImage = imageURL(exercise, 'start');
	const endImage = imageURL(exercise, 'end');

	const label = 'pageTitle.exercises';

	return (
		<Page titles={[name, label]}>
			<Helmet>
				<meta content={name} name="title" />
				<meta content={name} name="description" />
			</Helmet>
			<Breadcrumbs
				paths={[
					{ label, to: Paths.EXERCISES, icon: <Sports /> },
					{
						label: exercise.muscle,
						to: `${Paths.EXERCISES}?muscle=${exercise.muscle}`,
					},
				]}
			/>
			<Typography
				align="center"
				fontWeight={900}
				gutterBottom
				style={{ width: '100%' }}
			>
				{name}
			</Typography>
			<Grid container item xs={12}>
				<Grid container spacing={1}>
					<Grid item sm={6} xs={12}>
						<LabelsWithLinks
							label="Category"
							param="category"
							value={String(categoryId)}
						/>
						<LabelsWithLinks
							label="Main Muscle Worked"
							param="muscle"
							value={muscle}
						/>
						<LabelsWithLinks
							label="Equipment"
							param="equipment"
							value={equipment}
						/>
						<LabelsWithLinks
							label="Fitness Level"
							param="fitnessLevel"
							value={fitnessLevel}
						/>
						{notes?.length > 0 && (
							<Typography>{notes.map(note => note)}</Typography>
						)}
					</Grid>
					<Show show={!isUndefined(video)}>
						<Grid item sm={6} xs={12}>
							<ReactPlayer light url={video} width="100%" />
						</Grid>
					</Show>
				</Grid>
				<Grid container spacing={1}>
					{startImage && (
						<Grid item sm={6} xs={12}>
							<Typography fontWeight={900}>Start Position</Typography>
							<ImageZoom>
								<Image alt={name} src={startImage} style={{ width: '100%' }} />
							</ImageZoom>
						</Grid>
					)}
					{endImage && (
						<Grid item sm={6} xs={12}>
							<Typography fontWeight={900}>End Position</Typography>
							<ImageZoom>
								<Image alt={name} src={endImage} style={{ width: '100%' }} />
							</ImageZoom>
						</Grid>
					)}
				</Grid>
				<Grid container spacing={1}>
					<Grid item sm={4} xs={12}>
						<ImageZoom>
							<Image
								alt={name}
								src="https://artifacts.bbcomcdn.com/@bbcom/exercises-app/2.0.0/img/guide-11.gif"
								style={{ width: '100%' }}
							/>
						</ImageZoom>
					</Grid>
					<Grid item sm={8} xs={12}>
						<Show show={instructions?.length > 0}>
							<Typography fontWeight={900}>Instructions</Typography>
							{instructions.map((instruction, index) => (
								<Typography key={index}>
									{index + 1}. {instruction}
								</Typography>
							))}
						</Show>
						<Show show={cautions?.length > 0}>
							<Typography fontWeight={900}>Cations</Typography>
							{cautions.map((instruction, index) => (
								<Typography key={index}>
									{index + 1}. {instruction}
								</Typography>
							))}
						</Show>
						<Share title={name} />
						<Likes type={LikesTypes.exercise} />
						<Rates label="Rate this: " type={RatesTypes.exercise} />
						<Comments type={CommentsTypes.exercise} />
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
};
