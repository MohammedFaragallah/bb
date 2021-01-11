import { CSSProperties } from 'react';

import { Color, Duration, Height, Opacity, Position, Width } from './types';

export const getLargeImageStyle = (
	positionX: Position,
	positionY: Position,
	active: boolean,
): CSSProperties => ({
	position: 'absolute',
	boxSizing: 'border-box',
	display: 'block',
	top: 0,
	left: 0,
	transform: `translate(${positionX}px, ${positionY}px)`,
	zIndex: 1,
	visibility: !active ? 'hidden' : 'visible',
	width: 'auto',
});

export const getZoomContainerStyle = (
	width: Width,
	height: Height,
	inPlace?: boolean,
	switchSides?: boolean,
): CSSProperties => {
	const style: CSSProperties = {
		position: 'absolute',
		boxSizing: 'border-box',
		pointerEvents: 'none',
		width: `${width}px`,
		height: `${height}px`,
		top: '0',
		overflow: 'hidden',
	};

	if (inPlace) {
		style.left = '0px';
	} else if (switchSides) {
		style.right = `${width}px`;
	} else {
		style.left = `${width}px`;
	}

	return style;
};

export const getOverlayCenterStyle = (
	width: Width,
	height: Height,
	left: Position,
	top: Position,
	opacity: Opacity,
	transitionSpeed: Duration,
	color: Color,
	backgroundImage: string,
	backgroundImageSize: CSSProperties['backgroundSize'],
): CSSProperties => {
	const backgroundStyle: CSSProperties = {};

	if (backgroundImage) {
		backgroundStyle.backgroundImage = `url("${backgroundImage}")`;
	}

	if (backgroundImageSize) {
		backgroundStyle.backgroundSize = backgroundImageSize;
	}

	return {
		position: 'absolute',
		width: `${width}px`,
		height: `${height}px`,
		left: 0,
		top: 0,
		boxSizing: 'border-box',
		transform: `translate(${left}px, ${top}px)`,
		border: `1px solid ${color}`,
		opacity,
		transition: `opacity ${transitionSpeed}s ease`,
		zIndex: 15,
		pointerEvents: 'none',
		...backgroundStyle,
	};
};

export const getOverlayTopStyle = (
	width: Width,
	height: Height,
	opacity: Opacity,
	transitionSpeed: Duration,
	backgroundColor: CSSProperties['backgroundColor'],
): CSSProperties => ({
	backgroundColor,
	position: 'absolute',
	boxSizing: 'border-box',
	top: 0,
	left: 0,
	width: `${width}px`,
	height: `${height}px`,
	zIndex: 10,
	transition: `opacity ${transitionSpeed}s ease`,
	opacity,
	transform: 'scale3d(1,1,1)',
	pointerEvents: 'none',
});

export const getOverlayLeftStyle = (
	width: Width,
	height: Height,
	top: Position,
	opacity: Opacity,
	transitionSpeed: Duration,
	backgroundColor: CSSProperties['backgroundColor'],
): CSSProperties => ({
	backgroundColor,
	position: 'absolute',
	boxSizing: 'border-box',
	width: `${width}px`,
	top: `${top}px`,
	left: 0,
	height: `${height}px`,
	zIndex: 10,
	transition: `opacity ${transitionSpeed}s ease`,
	opacity,
	transform: 'scale3d(1,1,1)',
	pointerEvents: 'none',
});

export const getOverlayRightStyle = (
	width: Width,
	height: Height,
	top: Position,
	opacity: Opacity,
	transitionSpeed: Duration,
	backgroundColor: CSSProperties['backgroundColor'],
): CSSProperties => ({
	backgroundColor,
	position: 'absolute',
	boxSizing: 'border-box',
	top: `${top}px`,
	right: 0,
	width: `${width}px`,
	height: `${height}px`,
	zIndex: 10,
	transition: `opacity ${transitionSpeed}s ease`,
	opacity,
	transform: 'scale3d(1,1,1)',
	pointerEvents: 'none',
});

export const getOverlayBottomStyle = (
	width: Width,
	height: Height,
	top: Position,
	opacity: Opacity,
	transitionSpeed: Duration,
	backgroundColor: CSSProperties['backgroundColor'],
): CSSProperties => ({
	backgroundColor,
	position: 'absolute',
	boxSizing: 'border-box',
	top: `${top}px`,
	width: `${width}px`,
	height: `${height}px`,
	zIndex: 10,
	transition: `opacity ${transitionSpeed}s ease`,
	opacity,
	transform: 'scale3d(1,1,1)',
	pointerEvents: 'none',
});

export const getMagnifierZoomStyle = (
	active: boolean,
	transitionSpeed: Duration,
) => ({
	position: 'relative',
	opacity: active ? 1 : 0,
	transition: `opacity ${transitionSpeed}s ease`,
});
