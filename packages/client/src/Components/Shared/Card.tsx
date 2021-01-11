import { Card as MuiCard, CardProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => {
	const { spacing, shadows } = theme;

	return {
		root: {
			borderRadius: spacing(1),
			boxShadow: shadows[5],
			overflow: 'hidden',
			position: 'relative',
			width: '100%',
			wordWrap: 'break-word',
		},
		cardPlain: {
			background: 'transparent',
			boxShadow: 'none',
		},
		cardProfile: {
			marginTop: spacing(4),
			textAlign: 'center',
		},
	};
});

interface Props extends CardProps {
	plain?: boolean;
	profile?: boolean;
}

const Card: React.FC<Props> = props => {
	const { className, children, plain, profile, ...rest } = props;
	const classes = useStyles();
	const cardClasses = clsx(
		{
			[classes.cardPlain]: plain,
			[classes.cardProfile]: profile,
		},
		className,
	);
	return (
		<MuiCard className={cardClasses} {...rest}>
			{children}
		</MuiCard>
	);
};

export { Card };
