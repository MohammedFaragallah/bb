import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SlickSlider, { Settings } from 'react-slick';

import { SlideSchema } from '@types';
import { InternalOrExternal } from 'Components';
import { Dots } from 'Components/Slider/Dots';
import { Slide } from 'Components/Slider/Slide';
import { MILLE_SECONDS } from 'Constants';
import { LocaleSelector } from 'Selectors';

interface Props {
	slides: SlideSchema[];
}

export const Slider: React.FC<Props> = props => {
	const { slides } = props;
	const { locale } = useSelector(LocaleSelector);
	const [In, setIn] = useState(true);

	const settings: Settings = {
		afterChange: () => setIn(true),
		beforeChange: () => setIn(false),
		accessibility: true,
		arrows: false,
		autoplaySpeed: 3000,
		autoplay: true,
		centerMode: false,
		centerPadding: '50px',
		dots: true,
		customPaging: index => <Dots index={index} />,
		draggable: true,
		easing: 'linear',
		fade: false,
		focusOnSelect: true,
		infinite: true,
		initialSlide: 0,
		pauseOnDotsHover: false,
		pauseOnFocus: true,
		pauseOnHover: true,
		rtl: locale.dir === 'rtl',
		slidesToScroll: 1,
		slidesToShow: 1,
		speed: MILLE_SECONDS,
		swipeToSlide: false,
		swipe: true,
		touchMove: true,
		vertical: false,
	};

	return (
		<SlickSlider {...settings}>
			{slides.map(slide => (
				<InternalOrExternal key={slide.id} link={slide.link} underline="none">
					<Slide In={In} slide={slide} />
				</InternalOrExternal>
			))}
		</SlickSlider>
	);
};
