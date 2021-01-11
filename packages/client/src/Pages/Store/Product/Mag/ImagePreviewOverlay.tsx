import React, { CSSProperties } from 'react';

import {
	getOverlayBottomStyle,
	getOverlayCenterStyle,
	getOverlayLeftStyle,
	getOverlayRightStyle,
	getOverlayTopStyle,
} from './styles';
import { Duration, Height, Opacity, Position, Width } from './types';

export interface ImagePreviewOverlayProps {
	previewWidth: Width;
	previewHeight: Height;
	previewPosLeft: Position;
	previewPosRight: Position;
	previewPosTop: Position;
	previewPosBottom: Position;
	imageWidth: Width;
	imageHeight: Height;
	overlayOpacity?: Opacity;
	overlayBoxOpacity?: Opacity;
	active: boolean;
	transitionSpeed?: Duration;
	overlayBackgroundColor?: CSSProperties['color'];
	overlayBoxColor?: CSSProperties['color'];
	overlayBoxImage: string;
	overlayBoxImageSize?: CSSProperties['backgroundSize'];
}

export const ImagePreviewOverlay: React.FC<ImagePreviewOverlayProps> = props => {
	const {
		previewWidth,
		previewHeight,
		previewPosLeft,
		previewPosRight,
		previewPosTop,
		previewPosBottom,
		imageWidth,
		imageHeight,
		overlayOpacity,
		overlayBoxOpacity,
		active,
		transitionSpeed,
		overlayBackgroundColor,
		overlayBoxColor,
		overlayBoxImage,
		overlayBoxImageSize,
	} = props;
	const opacity = active ? overlayOpacity : 0;
	const boxOpacity = active ? overlayBoxOpacity : 0;
	return (
		<>
			<div
				style={getOverlayCenterStyle(
					previewWidth,
					previewHeight,
					previewPosLeft,
					previewPosTop,
					boxOpacity,
					transitionSpeed,
					overlayBoxColor,
					overlayBoxImage,
					overlayBoxImageSize,
				)}
			/>
			<div
				style={getOverlayTopStyle(
					imageWidth,
					previewPosTop,
					opacity,
					transitionSpeed,
					overlayBackgroundColor,
				)}
			/>
			<div
				style={getOverlayLeftStyle(
					previewPosLeft,
					previewHeight,
					previewPosTop,
					opacity,
					transitionSpeed,
					overlayBackgroundColor,
				)}
			/>
			<div
				style={getOverlayRightStyle(
					Number(imageWidth) - previewPosRight,
					previewHeight,
					previewPosTop,
					opacity,
					transitionSpeed,
					overlayBackgroundColor,
				)}
			/>
			<div
				style={getOverlayBottomStyle(
					imageWidth,
					Number(imageHeight) - previewPosBottom,
					previewPosBottom,
					opacity,
					transitionSpeed,
					overlayBackgroundColor,
				)}
			/>
		</>
	);
};

ImagePreviewOverlay.defaultProps = {
	overlayOpacity: 0.5,
	overlayBoxOpacity: 0.8,
	transitionSpeed: '0.4',
	overlayBackgroundColor: '#000',
	overlayBoxColor: '#fff',
	overlayBoxImage: '',
	overlayBoxImageSize: '',
};

export default ImagePreviewOverlay;
