import { Box, Chip, makeStyles } from '@material-ui/core';
import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineSeparator,
} from '@material-ui/lab';
import isDate from 'lodash/isDate';
import React from 'react';
import ImageZoom from 'react-medium-image-zoom';

import { EventSchema } from '@types';
import {
	Image,
	ImageLoader,
	Link,
	Loading,
	Page,
	Typography,
} from 'Components';
import { allAvailable, DataTypes, Paths, Resources } from 'Constants';
import { getDescription, imageURL } from 'Helpers';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	return {
		root: {
			'&::before': {
				flex: 0,
				padding: 0,
			},
		},
	};
});

const formattedDate = (date: Date) => {
	const newDate = new Date(date);
	if (!isDate(newDate)) return;
	const day = String(newDate.getDate());
	const month = String(newDate.getMonth() + 1);
	const year = String(newDate.getFullYear());
	return `${day.length > 1 ? day : '0' + day}/${
		month.length > 1 ? month : '0' + month
	}/${year}`;
};

interface Props {}

export const EventsHome: React.FC<Props> = () => {
	const classes = useStyles();

	const { data: events = [] } = useQueryWithStore<EventSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.EVENTS,
		payload: {
			...allAvailable,
			sort: {
				field: 'startAt',
				order: 1,
			},
		},
	});

	if (!events.length) return <Loading />;

	return (
		<Page titles={['pageTitle.events']}>
			<Timeline>
				{events.map(event => {
					const { id, title, startAt, endAt } = event;

					return (
						<TimelineItem classes={{ root: classes.root }} key={id}>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Chip
									label={`${formattedDate(startAt)} ${endAt ? ' - ' : ''} ${
										endAt ? formattedDate(endAt) : ''
									}`}
								/>
								<Box
									sx={{
										bgcolor: 'background.paper',
									}}
								>
									<Link to={`${Paths.EVENTS}/${id}`}>
										<Typography fontWeight={700}>{title}</Typography>
										<Typography>{getDescription(event)}</Typography>
									</Link>
									<ImageZoom>
										<Image
											alt="Tile"
											loader={<ImageLoader height={300} width={400} />}
											src={imageURL(event, 'cover')}
											style={{ width: '100%' }}
										/>
									</ImageZoom>
								</Box>
							</TimelineContent>
						</TimelineItem>
					);
				})}
			</Timeline>
		</Page>
	);
};
