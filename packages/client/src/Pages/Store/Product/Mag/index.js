import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import ReactInputPosition, {
	MOUSE_ACTIVATION,
	TOUCH_ACTIVATION,
} from 'react-input-position';

import { SideBySideRenderer } from './SideBySideRenderer';

const SideBySideMagnifier = props => {
	const {
		imageSrc,
		largeImageSrc,
		imageAlt,
		overlayOpacity,
		overlayBoxOpacity,
		overlayBackgroundColor,
		overlayBoxColor,
		overlayBoxImage,
		overlayBoxImageSize,
		cursorStyle,
		alwaysInPlace,
		transitionSpeed,
		transitionSpeedInPlace,
		renderOverlay,
		className,
		style,
		onLoad,
		onLargeImageLoad,
		switchSides,
		onZoomStart,
		onZoomEnd,
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

	return (
		<ReactInputPosition
			className={className}
			linkItemToActive
			mouseActivationMethod={MOUSE_ACTIVATION.HOVER}
			onActivate={onZoomStart}
			onDeactivate={onZoomEnd}
			style={style}
			touchActivationMethod={TOUCH_ACTIVATION.TOUCH}
			trackItemPosition
		>
			<SideBySideRenderer
				alwaysInPlace={alwaysInPlace}
				cursorStyle={cursorStyle}
				fillAlignTop={fillAlignTop}
				fillAvailableSpace={fillAvailableSpace}
				fillGapBottom={fillGapBottom}
				fillGapLeft={fillGapLeft}
				fillGapRight={fillGapRight}
				fillGapTop={fillGapTop}
				imageAlt={imageAlt}
				imageSrc={imageSrc}
				inPlaceMinBreakpoint={inPlaceMinBreakpoint}
				largeImageSrc={largeImageSrc}
				onLargeImageLoad={onLargeImageLoad}
				onLoad={onLoad}
				overlayBackgroundColor={overlayBackgroundColor}
				overlayBoxColor={overlayBoxColor}
				overlayBoxImage={overlayBoxImage}
				overlayBoxImageSize={overlayBoxImageSize}
				overlayBoxOpacity={overlayBoxOpacity}
				overlayOpacity={overlayOpacity}
				renderOverlay={renderOverlay}
				switchSides={switchSides}
				transitionSpeed={transitionSpeed}
				transitionSpeedInPlace={transitionSpeedInPlace}
				zoomContainerBorder={zoomContainerBorder}
				zoomContainerBoxShadow={zoomContainerBoxShadow}
			/>
		</ReactInputPosition>
	);
};

SideBySideMagnifier.propTypes = {
	imageSrc: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]),
	largeImageSrc: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.string),
	]),
	imageAlt: PropTypes.string,
	overlayOpacity: PropTypes.number,
	overlayBoxOpacity: PropTypes.number,
	overlayBackgroundColor: PropTypes.string,
	overlayBoxColor: PropTypes.string,
	overlayBoxImage: PropTypes.string,
	overlayBoxImageSize: PropTypes.string,
	cursorStyle: PropTypes.string,
	alwaysInPlace: PropTypes.bool,
	transitionSpeed: PropTypes.number,
	transitionSpeedInPlace: PropTypes.number,
	renderOverlay: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.object,
	onLoad: PropTypes.func,
	onLargeImageLoad: PropTypes.func,
	switchSides: PropTypes.bool,
	fillAvailableSpace: PropTypes.bool,
	fillAlignTop: PropTypes.bool,
	fillGapLeft: PropTypes.number,
	fillGapRight: PropTypes.number,
	fillGapTop: PropTypes.number,
	fillGapBottom: PropTypes.number,
	inPlaceMinBreakpoint: PropTypes.number,
	zoomContainerBorder: PropTypes.string,
	zoomContainerBoxShadow: PropTypes.string,
};

SideBySideMagnifier.defaultProps = {
	imageSrc: '',
	largeImageSrc: '',
	imageAlt: '',
	overlayOpacity: 0.5,
	overlayBoxOpacity: 0.8,
	overlayBackgroundColor: '#000',
	overlayBoxColor: '#fff',
	overlayBoxImage: '',
	overlayBoxImageSize: '',
	cursorStyle: 'crosshair',
	transitionSpeed: 0.4,
	transitionSpeedInPlace: 0.4,
	onLoad: noop,
	onLargeImageLoad: noop,
	fillAvailableSpace: true,
	fillAlignTop: false,
	fillGapLeft: 0,
	fillGapRight: 0,
	fillGapTop: 0,
	fillGapBottom: 0,
	inPlaceMinBreakpoint: 0,
	zoomContainerBorder: 'none',
	zoomContainerBoxShadow: 'none',
};

export default SideBySideMagnifier;
