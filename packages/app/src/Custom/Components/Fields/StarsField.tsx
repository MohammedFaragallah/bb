import { Icon, makeStyles } from '@material-ui/core';
import { Rating, RatingProps } from '@material-ui/lab';
import React from 'react';
import { FieldProps } from 'react-admin';

import { FeathersRecord } from 'types';

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		iconFilled: {
			color: palette.primary.main,
		},
		iconHover: {
			color: palette.primary.dark,
		},
	};
});

const StyledRating: React.FC<RatingProps> = props => {
	const classes = useStyles();
	return <Rating classes={classes} {...props} />;
};

interface Props extends FeathersRecord {
	stars: number;
}

export const StarsField: React.FC<FieldProps<Props>> = props => {
	const { record } = props;

	return record ? (
		<StyledRating icon={<Icon>favorite</Icon>} readOnly value={record.stars} />
	) : null;
};
