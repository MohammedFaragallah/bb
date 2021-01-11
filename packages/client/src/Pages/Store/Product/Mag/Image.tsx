import noop from 'lodash/noop';
import React, { useRef, useState, DetailedHTMLProps } from 'react';

interface Props
	extends DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	> {
	onLoadRefresh: () => void;
}

export const Image: React.FC<Props> = props => {
	const { onLoad, onLoadRefresh = noop, src, alt, ...otherProps } = props;

	const [imageIdx, setImageIdx] = useState(0);
	const imageErrorRef = useRef(false);
	const imageArr = src?.constructor === Array ? src : [src];

	return (
		<img
			alt={alt}
			onError={error => {
				console.error(error);
				if (imageIdx < imageArr.length) {
					imageErrorRef.current = true;
					setImageIdx(idx => idx + 1);
				}
			}}
			onLoad={e => {
				onLoad?.(e);

				if (imageErrorRef.current) {
					onLoadRefresh();
				}
			}}
			src={imageArr[imageIdx]}
			{...otherProps}
		/>
	);
};

export default Image;
