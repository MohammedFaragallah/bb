import {
	AppBar,
	Dialog,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Toolbar,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useToggle } from 'react-use';

import { Identifier, StorySchema } from '@types';
import { Button, Link, Typography } from 'Components';
import { allAvailable, DataTypes, Resources } from 'Constants';
import { getDescription, StoryURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { useQueryWithStore } from 'core';

// TODO: refactor to display all stories articles may be exercises
interface Props {
	label: ReactNode;
	authorName: string;
	userId: Identifier;
}

export const AuthorStories: React.FC<Props> = props => {
	const { label, authorName, userId } = props;
	const { storyId } = useParams();
	const [open, setOpen] = useToggle(false);
	const translate = useTranslation();

	const { data: stories = [] } = useQueryWithStore<StorySchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.STORIES,
		payload: {
			...allAvailable,
			filter: { approved: true, id: { $nin: [storyId] }, userId },
		},
	});

	const translatedLabel = translate(String(label));

	return stories.length > 0 ? (
		<>
			<Button color="secondary" onClick={setOpen} variant="contained">
				{translate(
					{ id: 'author.viewAll' },
					{ label: translatedLabel, author: authorName },
				)}
			</Button>
			<Dialog
				disableRestoreFocus
				disableScrollLock
				onClose={() => setOpen(false)}
				open={open}
			>
				<AppBar position="relative">
					<Toolbar variant="dense">
						<IconButton
							aria-label="close"
							edge="start"
							onClick={() => setOpen(false)}
						>
							<Close />
						</IconButton>
						<Typography>
							{authorName} {translatedLabel}
						</Typography>
					</Toolbar>
				</AppBar>
				<List>
					{stories.map((story, index) => (
						<Link
							key={story.id}
							onClick={() => setOpen(false)}
							to={StoryURL(story)}
						>
							<ListItem button divider={index < stories.length - 1}>
								<ListItemText
									primary={
										<Typography color="textPrimary">{story.title}</Typography>
									}
									secondary={getDescription(story)}
								/>
							</ListItem>
						</Link>
					))}
				</List>
			</Dialog>
		</>
	) : null;
};
