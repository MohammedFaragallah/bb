import loadable from '@loadable/component';
import {
	Box,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	MenuItem,
	OutlinedInput,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CategoriesTypes, CategorySchema, StorySchema } from '@types';
import { Button, Card, Loading } from 'Components';
import { Select, TextField } from 'Components/Inputs';
import {
	allAvailable,
	DataTypes,
	FIRST_ITEM,
	Paths,
	Resources,
} from 'Constants';
import { handleUploads } from 'Helpers';
import { useTranslation } from 'Hooks';
import { enqueueSnackbar } from 'Store';
import { useMutation, useQueryWithStore } from 'core';

const Editor = loadable(
	async () => {
		const { Editor } = await import('Pages/Profile/Wysiwyg');
		return Editor;
	},
	{
		fallback: <Loading />,
	},
);

interface Props {}

// TODO: create reusable edit(not approved)/create page
export const CreateArticle: React.FC<Props> = () => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState({ secure_url: '' });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const translate = useTranslation();

	const onDrop = useCallback(
		async acceptedFiles => {
			try {
				setLoading(true);
				const profileImage = await handleUploads(acceptedFiles[FIRST_ITEM]);
				setImage(profileImage);
				setLoading(false);
			} catch (error) {
				dispatch(
					enqueueSnackbar({
						message: error.message,
						options: {
							variant: 'warning',
						},
					}),
				);
				setLoading(false);
			}
		},
		[dispatch],
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
	});

	const { data: categories = [] } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CATEGORIES,
		payload: {
			...allAvailable,
			filter: { type: CategoriesTypes.articles },
		},
	});

	const [mutate] = useMutation();

	const createArticle = (data: Partial<StorySchema>) =>
		mutate(
			{
				type: DataTypes.CREATE,
				resource: Resources.STORIES,
				payload: { data },
			},
			{ onSuccess: () => navigate(`${Paths.PROFILE}${Paths.ARTICLES}`) },
		);

	const initialValues: Partial<StorySchema> = {
		categoryId: '',
		description: '',
		title: '',
		articleBody: '',
		video: '',
		featuredImage: { secure_url: '' },
	};

	return (
		<Card plain>
			<CardHeader subheader="Create new article" />
			<Divider />
			<Formik
				initialValues={initialValues}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						values.featuredImage = image;
						createArticle(values);
						setSubmitting(false);
					} catch (error) {
						alert(JSON.stringify({ error, values }));
						setSubmitting(false);
					}
				}}
			>
				{formProps => {
					return (
						<Form>
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<Field
											component={TextField}
											fullWidth
											label="Title"
											margin="dense"
											name="title"
											required
											variant="outlined"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<Box
											sx={{
												alignContent: 'center',
												alignItems: 'center',
												display: 'flex',
												height: '100%',
												justifyContent: 'center',
												width: '100%',
												justifyItems: 'center',
											}}
										>
											<Box
												{...getRootProps()}
												sx={{
													width: '100%',
												}}
											>
												<Button
													color="secondary"
													fullWidth
													pending={loading}
													variant="contained"
												>
													<input {...getInputProps()} />
													<>Upload Cover Picture</>
												</Button>
											</Box>
										</Box>
									</Grid>
									<Grid item md={12} xs={12}>
										<Field
											component={TextField}
											fullWidth
											label="Description"
											margin="dense"
											multiline
											name="description"
											rows={5}
											variant="outlined"
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<Field
											component={Select}
											fullWidth
											input={<OutlinedInput name="category" />}
											inputProps={{
												id: 'categoryId',
											}}
											margin="dense"
											name="categoryId"
											required
											variant="outlined"
										>
											{categories.map(option => {
												return (
													<MenuItem key={option.name} value={option.id}>
														{option.name}
													</MenuItem>
												);
											})}
										</Field>
									</Grid>
									<Grid item>
										<Field component={Editor} name="articleBody" required />
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions>
								<Button
									aria-label="save"
									color="secondary"
									pending={formProps.isSubmitting}
									type="submit"
									variant="contained"
								>
									{translate('label.submit')}
								</Button>
							</CardActions>
						</Form>
					);
				}}
			</Formik>
		</Card>
	);
};
