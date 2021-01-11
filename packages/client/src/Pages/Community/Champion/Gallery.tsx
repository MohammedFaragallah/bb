import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';
import ImageZoom from 'react-medium-image-zoom';
import { useToggle } from 'react-use';

import { ChampionSchema } from '@types';
import { Image, ImageLoader } from 'Components';
import { imageURL, useWidth } from 'Helpers';

const getColsForWidth = (width: Breakpoint): number => {
	if (width === 'xs') return 1;
	if (width === 'sm') return 1;
	if (width === 'md') return 2;
	if (width === 'lg') return 3;
	return 4;
};

interface Props {
	album: ChampionSchema['album'];
}

export const Gallery: React.FC<Props> = props => {
	const { album } = props;
	const width = useWidth();

	const [, setOpen] = useToggle(false);

	return (
		<>
			<ImageList cols={getColsForWidth(width)}>
				{album.map((item, index) => {
					const { caption } = item;

					return (
						<ImageListItem key={index} onClick={setOpen}>
							<ImageZoom>
								<Image
									alt="Tile"
									loader={<ImageLoader height={180} width="100%" />}
									src={imageURL(item, 'tile')}
									style={{ width: '100%' }}
								/>
							</ImageZoom>
							<ImageListItemBar title={caption} />
						</ImageListItem>
					);
				})}
			</ImageList>
		</>
	);
};
