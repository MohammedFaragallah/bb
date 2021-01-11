import { Box, Card, CardHeader, Divider, Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';

import { CommentsTypes, EventSchema, LikesTypes, RatesTypes } from '@types';
import { ArticleBody, Page, Share, Typography } from 'Components';
import { Comments, Likes, Rates } from 'Components/Feedback';
import { DataTypes, Resources } from 'Constants';
import { useQueryWithStore } from 'core';

interface Props {}

export const Event: React.FC<Props> = () => {
	const { eventId } = useParams();

	const { data: event } = useQueryWithStore<EventSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.EVENTS,
		payload: { id: eventId },
	});

	if (!event) return null;

	return (
		<Page>
			<Grid container spacing={2} style={{ marginTop: 16 }}>
				<Grid item lg={8} sm={12}>
					<Card>
						<Box
							sx={{
								displayPrint: 'none',
							}}
						>
							<CardHeader
								title={
									<>
										<Typography style={{ fontWeight: 900 }}>
											{event.title}
										</Typography>
										<Divider />
									</>
								}
							/>
						</Box>
						<Box
							component="div"
							sx={{
								mb: { md: 4 },
								pl: 2,
								pr: 2,
							}}
						>
							<ArticleBody articleBody={event.articleBody} />
						</Box>
					</Card>
				</Grid>
				<Grid item lg={4} sm={12}>
					<Grid container>
						<Grid item lg={12} sm={6}>
							<Share title={event.title} />
						</Grid>
						<Grid item lg={12} sm={6}>
							<Likes type={LikesTypes.event} />
						</Grid>
						<Grid item lg={12} sm={6}>
							<Rates label="Rate this: " type={RatesTypes.event} />
						</Grid>
					</Grid>
					<Comments type={CommentsTypes.event} />
				</Grid>
			</Grid>
		</Page>
	);
};
