import random from 'lodash/random';
import React from 'react';

import { AdsLocations, SlideSchema, SlotProps } from '@types';
import { Image, ImageLoader, InternalOrExternal } from 'Components';
import { DataTypes, FIRST_ITEM, Resources } from 'Constants';
import { imageURL } from 'Helpers';
import { useQueryWithStore } from 'core';

interface Props extends SlotProps {}

export const SlideSlot: React.FC<Props> = props => {
	const { section } = props;
	const index = section.split('/').slice(1, section.split('/').length)[
		FIRST_ITEM
	];

	const { data: slides = [] } = useQueryWithStore<SlideSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.SLIDES,
		payload: {
			pagination: { page: Number(index), perPage: 1 },
			filter: { location: AdsLocations.HOME_SECTION },
		},
	});

	const ad = slides[random(slides.length - 1)];

	if (!ad) return null;

	return (
		<InternalOrExternal link={ad.link} underline="none">
			<Image
				height="300px"
				loader={<ImageLoader height="300px" width="100%" />}
				src={imageURL(ad, 'cover')}
				width="100%"
			/>
		</InternalOrExternal>
	);
};
