import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const useStyles = makeStyles(theme => {
	return {
		parallax: {
			height: '90vh',
			maxHeight: '1000px',
			overflow: 'hidden',
			position: 'relative',
			backgroundPosition: 'center center',
			backgroundSize: 'cover',
			margin: '0',
			padding: '0',
			border: '0',
			display: 'flex',
			alignItems: 'center',
		},
		filter: {
			'&:before': {
				background: 'rgba(0, 0, 0, 0.5)',
			},
			'&:after,&:before': {
				position: 'absolute',
				zIndex: '1',
				width: '100%',
				height: '100%',
				display: 'block',
				left: '0',
				top: '0',
				content: "''",
			},
		},
		small: {
			height: '380px',
		},
		med: {
			height: '550px',
		},
	};
});

interface Props extends BoxProps {
	filter?: boolean;
	med?: boolean;
	small?: boolean;
	image: string;
}

export const Parallax: React.FC<Props> = props => {
	const { filter, className, children, style, image, small, med } = props;
	const classes = useStyles();

	const windowScrollTop = useRef(window.pageYOffset / 3);
	const [transform, setTransform] = useState(
		`translate3d(0,${windowScrollTop.current}px,0)`,
	);

	const resetTransform = useCallback(() => {
		windowScrollTop.current = window.pageYOffset / 3;
		setTransform(`translate3d(0,${windowScrollTop.current}px,0)`);
	}, [windowScrollTop]);

	useEffect(() => {
		window.addEventListener('scroll', resetTransform);
		return () => {
			window.removeEventListener('scroll', resetTransform);
		};
	}, [resetTransform]);

	const parallaxClasses = clsx({
		[classes.parallax]: true,
		[classes.filter]: filter,
		[classes.small]: small,
		[classes.med]: med,
		className,
	});

	return (
		<Box
			className={parallaxClasses}
			style={{
				...style,
				backgroundImage: `url(${image})`,
				transform,
			}}
		>
			{children}
		</Box>
	);
};
