import { Box } from '@material-ui/core';
import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import { HitProps, StorySchema } from '@types';
import { CoverImage, Link } from 'Components';
import { StoryURL } from 'Helpers';

interface Props extends HitProps<StorySchema> {}

export const StoryHit: React.FC<Props> = props => {
	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<CoverImage size={40} src={props.hit.featuredImage?.secure_url} />
			<Link to={StoryURL(props.hit)}>
				<Highlight attribute="title" hit={props.hit} />
			</Link>
		</Box>
	);
};
