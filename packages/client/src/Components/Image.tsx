import styled from '@emotion/styled';
import {
	compose,
	display,
	palette,
	positions,
	sizing,
	spacing,
	typography,
} from '@material-ui/system';
import React, { ComponentProps } from 'react';
import { Img, ImgProps } from 'react-image';

import { ImageLoader } from 'Components';

const styleFunction = compose(
	display,
	spacing,
	typography,
	palette,
	positions,
	sizing,
);

interface Props extends ImgProps {
	loaderProps?: ComponentProps<typeof ImageLoader>;
}

const ImageWithLoader: React.FC<Props> = props => {
	const { className, width, height, style, loaderProps, ...rest } = props;
	const sharedProps = { className, width, height, style };

	return (
		<Img
			loader={<ImageLoader {...sharedProps} {...loaderProps} />}
			{...sharedProps}
			{...rest}
		/>
	);
};

export const Image = styled(ImageWithLoader)(styleFunction);
