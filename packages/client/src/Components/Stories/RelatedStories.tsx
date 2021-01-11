import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListSubheader,
	makeStyles,
} from '@material-ui/core';
import React, { ReactNode } from 'react';

import { StorySchema } from '@types';
import { Link, Typography } from 'Components';
import { DataTypes, Resources } from 'Constants';
import { getDescription, imageURL, StoryURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { useQueryWithStore } from 'core';

const useStyle = makeStyles(theme => {
	const { spacing } = theme;

	return {
		relatedArticleAvatar: {
			marginRight: spacing(2),
			width: 100,
			minHeight: spacing(10),
			borderRadius: 0,
		},
	};
});

interface Props extends StorySchema {
	label: ReactNode;
	limit?: number;
}

export const RelatedStories: React.FC<Props> = props => {
	const RELATED_STORIES_DEFAULT_LIMIT = 5;
	const {
		label,
		categoryId,
		id,
		limit = RELATED_STORIES_DEFAULT_LIMIT,
	} = props;

	const classes = useStyle();
	const translate = useTranslation();

	const { data: related } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			pagination: { page: 1, perPage: limit },
			filter: { approved: true, categoryId, id: { $nin: [id] } },
		},
	});

	if (!related) return null;

	return (
		<List
			disablePadding
			subheader={
				<ListSubheader>
					{translate(
						{ id: 'label.related' },
						{ label: translate(label?.toString()) },
					)}
				</ListSubheader>
			}
		>
			{related.map((story, index) => (
				<Link key={story.id} to={StoryURL(story)}>
					<ListItem
						alignItems="flex-start"
						button
						divider={index < related.length - 1}
					>
						<ListItemAvatar>
							<Avatar
								alt={story.title}
								className={classes.relatedArticleAvatar}
								src={imageURL(story, 'featured')}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography color="textPrimary" fontWeight={500}>
									{story.title}
								</Typography>
							}
							secondary={getDescription(story)}
						/>
					</ListItem>
				</Link>
			))}
		</List>
	);
};
