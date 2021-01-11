import { Box, Grid, makeStyles, SvgIconProps } from '@material-ui/core';
import { AccountBalance, Help, Phone, Public } from '@material-ui/icons';
import React from 'react';

import { Icon, Typography } from 'Components';

const useStyles = makeStyles(theme => {
	const { spacing, palette } = theme;

	return {
		root: {
			margin: spacing(2),
		},
		rightBorder: {
			borderRight: `1px solid ${palette.grey[400]}`,
			paddingRight: spacing(1),
			marginRight: spacing(1),
		},
		icon: {
			fontSize: spacing(6),
		},
	};
});

interface Props {}

export const Masters: React.FC<Props> = () => {
	const classes = useStyles();

	const iconsProps: SvgIconProps = {
		className: classes.icon,
		color: 'action',
	};

	return (
		<Grid className={classes.root} container spacing={2}>
			<Grid item md={4}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Box
						className={classes.rightBorder}
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Box
							sx={{
								m: 2,
							}}
						>
							<AccountBalance {...iconsProps} />
						</Box>
						<Typography color="textSecondary" fontSize="small">
							Money Back Guarantee
						</Typography>
					</Box>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Icon color="disabled" push="right">
							<Help />
						</Icon>
						<Typography color="textSecondary" fontSize="small">
							Details
						</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid item md={4}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Box
						sx={{
							m: 2,
						}}
					>
						<Public {...iconsProps} />
					</Box>
					<Typography color="textSecondary" fontSize="small">
						32,000,000+ Orders Shipped
					</Typography>
				</Box>
			</Grid>
			<Grid item md={4}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<Box
						className={classes.rightBorder}
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Box
							sx={{
								m: 2,
							}}
						>
							<Phone {...iconsProps} />
						</Box>
						<Typography color="textSecondary" fontSize="small">
							Customer Support
						</Typography>
					</Box>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Typography color="textSecondary" fontSize="small">
							***-***-***-*** Live Chat
						</Typography>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
