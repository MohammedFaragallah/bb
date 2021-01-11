import { Box, Container } from '@material-ui/core';
import React from 'react';

import { SlideSchema } from '@types';
import { Image, ImageLoader, InternalOrExternal } from 'Components';
import { imageURL } from 'Helpers';

interface Props {
	section?: SlideSchema;
}

export const SectionAD: React.FC<Props> = props => {
	const { section } = props;

	const imageLink = imageURL(section, 'cover');
	if (!section || !imageLink) return null;

	const height = '40vh';

	return (
		<Box
			component={Container}
			sx={{
				flex: '1 1 100%',
				maxHeight: height,
				mb: 2,
				overflow: 'hidden',
				width: '100%',
			}}
		>
			<InternalOrExternal link={section.link}>
				<Image
					alt={section.title}
					loader={<ImageLoader height={height} width="100%" />}
					src={imageLink}
					style={{ width: '100%', height: '100%' }}
				/>
			</InternalOrExternal>
		</Box>
	);
};
