import React from 'react';

import { Image } from './Image';
import {
	ImagePreviewOverlay,
	ImagePreviewOverlayProps,
} from './ImagePreviewOverlay';
import { getLargeImageStyle, getZoomContainerStyle } from './styles';
import { Dimensions, Duration, Position } from './types';
import { convertRange, invertNumber } from './utils';

export interface Props extends ImagePreviewOverlayProps {
	itemPosition: {
		x: number;
		y: number;
	};
	active: boolean;
	elementDimensions: Dimensions;
	elementOffset: {
		top: Position;
		left: Position;
	};
	itemDimensions: Dimensions;
	imageSrc: string;
	largeImageSrc: string;
	imageAlt: string;

	alwaysInPlace: boolean;
	switchSides?: boolean;
	fillAvailableSpace?: boolean;
	fillAlignTop?: boolean;
	fillGapLeft?: number;
	fillGapRight?: number;
	fillGapTop?: number;
	fillGapBottom?: number;
	zoomContainerBorder?: string;
	zoomContainerBoxShadow?: string;
	transitionSpeedInPlace?: Duration;
	inPlaceMinBreakpoint?: number;
	cursorStyle?: string;
	style?: React.CSSProperties;
	className?: string;
	renderOverlay?: (state: boolean) => React.ReactNode;
	onLoad?: (ev: React.SyntheticEvent) => void;
	onLoadRefresh: () => void;
	onLargeImageLoad?: (ev: React.SyntheticEvent) => void;
	onZoomStart?: () => void;
	onZoomEnd?: () => void;
}

export const SideBySideRenderer: React.FC<any> = props => {
	const {
		itemPosition,
		active,
		elementDimensions,
		elementOffset,
		itemDimensions,
		imageSrc,
		largeImageSrc,
		imageAlt,
		itemRef,
		overlayOpacity,
		overlayBoxOpacity,
		overlayBackgroundColor,
		overlayBoxColor,
		overlayBoxImage,
		overlayBoxImageSize,
		alwaysInPlace,
		transitionSpeed,
		transitionSpeedInPlace,
		renderOverlay,
		cursorStyle,
		onImageLoad,
		onLargeImageLoad,
		onLoadRefresh,
		switchSides,
		fillAvailableSpace,
		fillAlignTop,
		fillGapLeft,
		fillGapRight,
		fillGapTop,
		fillGapBottom,
		inPlaceMinBreakpoint,
		zoomContainerBorder,
		zoomContainerBoxShadow,
	} = props;

	const zoomContainerDimensions: any = {
		width: elementDimensions.width,
		height: elementDimensions.height,
	};

	const zoomContainerStyle: any = {};

	let availableWidth = 0;
	let availableHeight = 0;
	let windowWidth = 0;

	const zoomGapVertical = fillGapTop + fillGapBottom;
	const zoomGapHorizontal = fillGapLeft + fillGapRight;

	try {
		const { clientWidth, clientHeight } = document.documentElement;
		const { innerWidth } = window;
		availableWidth = clientWidth;
		availableHeight = clientHeight;
		windowWidth = innerWidth;
	} catch (e) {}

	let inPlace = alwaysInPlace || windowWidth < inPlaceMinBreakpoint;

	if (fillAvailableSpace && !inPlace) {
		const left = elementDimensions.width + elementOffset.left;

		if (fillAlignTop) {
			zoomContainerDimensions.height = Math.min(
				itemDimensions.height,
				availableHeight - elementOffset.top - zoomGapVertical + fillGapTop,
			);
			zoomContainerDimensions.top = fillGapTop;
		} else {
			zoomContainerDimensions.height = Math.min(
				itemDimensions.height,
				availableHeight - zoomGapVertical,
			);

			const offsetTop = -elementOffset.top + fillGapTop;

			const maxOffsetTop =
				availableHeight -
				elementOffset.top -
				(zoomContainerDimensions.height + fillGapBottom);

			const limitedTop = Math.max(offsetTop, maxOffsetTop);

			zoomContainerDimensions.top = limitedTop;
		}

		zoomContainerDimensions.top = Math.min(zoomContainerDimensions.top, 0);
		zoomContainerStyle.top = `${zoomContainerDimensions.top}px`;

		if (switchSides) {
			zoomContainerDimensions.width = Math.min(
				itemDimensions.width,
				elementOffset.left - zoomGapHorizontal,
			);
			zoomContainerDimensions.right = elementDimensions.width + fillGapRight;
			zoomContainerStyle.right = `${zoomContainerDimensions.right}px`;
		} else {
			zoomContainerDimensions.width = Math.min(
				itemDimensions.width,
				availableWidth - left - zoomGapHorizontal,
			);
			zoomContainerDimensions.left = elementDimensions.width + fillGapLeft;
			zoomContainerStyle.left = `${zoomContainerDimensions.left}px`;
		}
	} else {
		if (switchSides) {
			inPlace = inPlace || elementOffset.left < elementDimensions.width;
		} else {
			inPlace =
				inPlace ||
				elementDimensions.width * 2 + elementOffset.left > availableWidth;
		}
	}

	const legalSize = itemDimensions.width > elementDimensions.width;
	const isActive = legalSize && active;
	const transSpeed = inPlace ? transitionSpeedInPlace : transitionSpeed;

	const smallImageSize = {
		width: elementDimensions.width,
		height: elementDimensions.height,
	};

	const previewSize: any = {
		width: Math.floor(
			smallImageSize.width *
				(zoomContainerDimensions.width / itemDimensions.width),
		),
		height: Math.floor(
			smallImageSize.height *
				(zoomContainerDimensions.height / itemDimensions.height),
		),
	};

	let position = { x: 0, y: 0 };
	const itemPositionAdj = { ...itemPosition };

	const previewOffset = {
		x: inPlace ? 0 : previewSize.width / 2,
		y: inPlace ? 0 : previewSize.height / 2,
	};

	itemPositionAdj.x = Math.max(previewOffset.x, itemPositionAdj.x);
	itemPositionAdj.x = Math.min(
		smallImageSize.width - previewOffset.x,
		itemPositionAdj.x,
	);
	itemPositionAdj.y = Math.max(previewOffset.y, itemPositionAdj.y);
	itemPositionAdj.y = Math.min(
		smallImageSize.height - previewOffset.y,
		itemPositionAdj.y,
	);

	position = { ...itemPositionAdj };

	const zoomContainerSize = inPlace ? smallImageSize : zoomContainerDimensions;

	position.x = convertRange(
		previewOffset.x,
		smallImageSize.width - previewOffset.x,
		itemDimensions.width * -1 + zoomContainerSize.width,
		0,
		position.x,
	);
	position.y = convertRange(
		previewOffset.y,
		smallImageSize.height - previewOffset.y,
		itemDimensions.height * -1 + zoomContainerSize.height,
		0,
		position.y,
	);

	position.x = invertNumber(
		itemDimensions.width * -1 + zoomContainerSize.width,
		0,
		position.x,
	);
	position.y = invertNumber(
		itemDimensions.height * -1 + zoomContainerSize.height,
		0,
		position.y,
	);

	previewSize.left = Math.floor(itemPositionAdj.x - previewOffset.x) || 0;
	previewSize.right = Math.floor(itemPositionAdj.x + previewOffset.x) || 0;
	previewSize.top = Math.floor(itemPositionAdj.y - previewOffset.y) || 0;
	previewSize.bottom = Math.floor(itemPositionAdj.y + previewOffset.y) || 0;

	return (
		<div style={{ position: 'relative' }}>
			<Image
				alt={imageAlt}
				onLoad={onImageLoad}
				onLoadRefresh={onLoadRefresh}
				src={imageSrc}
				style={{
					width: '100%',
					display: 'block',
					cursor: legalSize ? cursorStyle : 'default',
				}}
			/>
			<div
				style={{
					...getZoomContainerStyle(
						zoomContainerSize.width,
						zoomContainerSize.height,
						inPlace,
						switchSides,
					),
					opacity: isActive ? '1' : '0',
					transition: `opacity ${transSpeed}s ease`,
					zIndex: '100',
					...zoomContainerStyle,
					border: zoomContainerBorder,
					boxShadow: zoomContainerBoxShadow,
				}}
			>
				<Image
					alt={imageAlt}
					onLoad={onLargeImageLoad}
					onLoadRefresh={onLoadRefresh}
					ref={itemRef}
					src={largeImageSrc || imageSrc}
					style={getLargeImageStyle(position.x, position.y, true)}
				/>
			</div>
			<ImagePreviewOverlay
				active={isActive && !inPlace}
				imageHeight={smallImageSize.height}
				imageWidth={smallImageSize.width}
				overlayBackgroundColor={overlayBackgroundColor}
				overlayBoxColor={overlayBoxColor}
				overlayBoxImage={overlayBoxImage}
				overlayBoxImageSize={overlayBoxImageSize}
				overlayBoxOpacity={overlayBoxOpacity}
				overlayOpacity={overlayOpacity}
				previewHeight={previewSize.height}
				previewPosBottom={previewSize.bottom}
				previewPosLeft={previewSize.left}
				previewPosRight={previewSize.right}
				previewPosTop={previewSize.top}
				previewWidth={previewSize.width}
				transitionSpeed={transSpeed}
			/>
			{renderOverlay ? renderOverlay(active) : null}
		</div>
	);
};

export default SideBySideRenderer;
