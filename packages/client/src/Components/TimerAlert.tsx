import {
	Box,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
} from '@material-ui/core';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Typography } from 'Components';
import { useTranslation } from 'Hooks';
import { setTimer } from 'Store';

const useStyles = makeStyles(theme => {
	return {
		action: {
			justifyContent: 'center',
		},
	};
});

const MIN = 0;
const SECONDS = 5;
const STEP = 10;
const MAX = 100;

interface Props {
	min?: number;
	seconds?: number;
	step?: number;
	max?: number;
	title: ReactNode;
	label?: ReactNode;
	action: () => void;
	open: boolean;
}

export const TimerAlert: React.FC<Props> = props => {
	const {
		min = MIN,
		seconds = SECONDS,
		step = STEP,
		max = MAX,
		title,
		label,
		action,
		open,
	} = props;
	const classes = useStyles();
	const [progress, setProgress] = useState(min);
	const dispatch = useDispatch();
	const translate = useTranslation();

	useEffect(() => {
		const timer = setInterval(() => {
			open && setProgress(pre => (pre >= max ? max : pre + step / seconds));
		}, max);
		return () => {
			clearInterval(timer);
			setProgress(min);
		};
	}, [max, min, open, seconds, step]);

	const toggle = (open: boolean) => {
		dispatch(setTimer(open));
	};

	useEffect(() => {
		if (open && progress >= max) action();
		return () => {
			dispatch(setTimer(false));
		};
	}, [action, dispatch, max, open, progress]);

	return (
		<Dialog onClose={toggle} open={open}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
						position: 'relative',
						width: '100%',
					}}
				>
					<CircularProgress
						color="secondary"
						size={200}
						value={progress}
						variant="determinate"
					/>
					<Box
						sx={{
							alignItems: 'center',
							bottom: 0,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							left: 0,
							position: 'absolute',
							right: 0,
							top: 0,
						}}
					>
						{label}
						<Typography color="secondary" variant="h1">
							{Math.floor((progress / MAX) * SECONDS)}
						</Typography>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions classes={{ root: classes.action }}>
				<Button
					color="secondary"
					onClick={() => toggle(false)}
					variant="contained"
				>
					{translate('label.cancel')}
				</Button>
				<Button
					color="secondary"
					onClick={() => {
						toggle(false);
						action();
					}}
					variant="contained"
				>
					{translate('label.confirm')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
