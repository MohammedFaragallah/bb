import { Box, Container, makeStyles } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';
import SlickSlider from 'react-slick';

import { Link, Typography } from 'Components';
import { Arrow } from 'Components/SectionSlider';
import { MILLE_SECONDS } from 'Constants';
import { useWidth } from 'Helpers';
import { useTranslation } from 'Hooks';

const useStyles = makeStyles(theme => {
	return {
		root: {
			display: 'flex',
		},
		slider: {
			overflow: 'hidden',
		},
	};
});

interface Props {
	numberOfCards: Record<Breakpoint, number>;
	title: string;
	to: string;
	action: string;
}

export const SectionSlider: React.FC<Props> = props => {
	const { numberOfCards, children, to, title } = props;
	const classes = useStyles();
	const translate = useTranslation();
	const width = useWidth();

	return (
		<Box component={Container}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<Link to={to}>
					<Typography align="center" fontSize={28} fontWeight={700} my={2}>
						{translate(title).toString().toUpperCase()}
					</Typography>
				</Link>
			</Box>
			<Box
				className={classes.root}
				sx={{
					mb: 2,
				}}
			>
				<SlickSlider
					accessibility
					arrows
					className={classes.slider}
					draggable
					focusOnSelect
					infinite
					initialSlide={0}
					nextArrow={<Arrow direction="right" />}
					pauseOnFocus
					pauseOnHover
					prevArrow={<Arrow direction="left" />}
					slidesToScroll={numberOfCards[width]}
					slidesToShow={numberOfCards[width]}
					speed={MILLE_SECONDS}
					swipe
					touchMove
				>
					{children}
				</SlickSlider>
			</Box>
		</Box>
	);
};
