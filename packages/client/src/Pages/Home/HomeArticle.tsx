import { Box, makeStyles } from '@material-ui/core';
import { Comment } from '@material-ui/icons';
import React from 'react';
import CountUp from 'react-countup';

import { CategorySchema, StorySchema, UserSchema } from '@types';
import { Icon, Image, ImageLoader, Link, Typography } from 'Components';
import { DataTypes, Paths, Resources } from 'Constants';
import { getDescription, imageURL, StoryCategoryURL, StoryURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		root: {
			textAlign: 'center',
		},
		relative: {
			position: 'relative',
		},
		background: {
			backgroundColor: palette.background.paper,
			position: 'absolute',
			zIndex: 0,
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		},
		image: {
			width: '100%',
			height: 200,
		},
	};
});

interface Props {
	story: StorySchema;
}

export const HomeArticle: React.FC<Props> = props => {
	const { story } = props;
	const storyLink = StoryURL(story);
	const classes = useStyles();
	const translate = useTranslation();

	const { data: author } = useQueryWithStore<UserSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.USERS,
		payload: { id: story.userId },
	});

	const { data: category } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CATEGORIES,
		payload: { id: story.categoryId },
	});

	return story && category && author ? (
		<Box
			className={classes.root}
			sx={{
				mt: 4,
			}}
		>
			<Link to={storyLink}>
				<Image
					alt={story.title}
					className={classes.image}
					loader={<ImageLoader height="200px" width="100%" />}
					src={imageURL(story, 'featured')}
				/>
			</Link>
			<Box
				sx={{
					boxShadow: 2,
					mt: -8,
					mx: 2,
					pb: 0,
					position: 'relative',
					pt: 3,
					px: 2,
				}}
			>
				<Box className={classes.background} />
				<Link className={classes.relative} to={StoryCategoryURL(story)}>
					{category.name}
				</Link>
				<Link className={classes.relative} to={storyLink}>
					<Typography color="textSecondary" fontWeight={500} my={1}>
						{story.title}
					</Typography>
					<Typography>{getDescription(story)}</Typography>
				</Link>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						pb: 2,
						position: 'relative',
					}}
				>
					<Box>
						<Link to={`${Paths.PROFILE}/${story.userId}`}>
							{translate(
								{ id: 'author.writtenBy' },
								{ author: author.userName },
							)}
						</Link>
					</Box>
					<Link to={storyLink}>
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}
						>
							<Icon push="right">
								<Comment />
							</Icon>
							<CountUp delay={1} end={story.comments} />
						</Box>
					</Link>
				</Box>
			</Box>
		</Box>
	) : null;
};
