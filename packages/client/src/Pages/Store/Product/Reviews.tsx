import {
	Box,
	Card,
	CardHeader,
	Divider,
	Grid,
	LinearProgress,
	makeStyles,
	Rating,
} from '@material-ui/core';
import groupBy from 'lodash/groupBy';
import React from 'react';

import { Identifier, RatesTypes } from '@types';
import { Button, Typography } from 'Components';
import { useRate } from 'Components/Feedback';
import { useTranslation } from 'Hooks';

const useBorderLinearProgress = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		root: {
			width: '100%',
			height: spacing(1),
			borderRadius: spacing(0.5),
		},
		colorSecondary: {
			backgroundColor: palette.grey[palette.mode === 'light' ? 200 : 700],
		},
		bar: {
			borderRadius: spacing(0.5),
		},
	};
});

interface Props {
	id: Identifier;
	allowed: boolean;
}

export const Reviews: React.FC<Props> = props => {
	const { id, allowed } = props;
	const translate = useTranslation();
	const progressClasses = useBorderLinearProgress();

	const [rate, , { data: rates, total }] = useRate({
		type: RatesTypes.product,
		id,
		target: 'productFlavorId',
	});

	// TODO: should relate to (add rate allowed precision)
	const totalStars = 5;
	const starGroups = groupBy(rates, 'stars');

	return (
		<Card>
			<CardHeader
				title={
					<Typography fontSize="big" fontWeight={700}>
						{translate('Ratings & Reviews')}
					</Typography>
				}
			/>
			<Box
				component={Divider}
				sx={{
					mx: '16px !important',
				}}
			/>
			<Box
				sx={{
					my: 2,
				}}
			>
				<Grid container spacing={2}>
					<Grid container item sm={8}>
						<Grid item sm={6}>
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Typography fontSize={80} fontWeight={700}>
									{rate}
								</Typography>
								<Rating precision={0.1} readOnly value={rate} />
								<Typography my={1}>
									{translate(`${total} Review(s)`)}
								</Typography>
							</Box>
						</Grid>
						<Grid alignItems="center" container item sm={6}>
							{Array(totalStars)
								.fill(0)
								.map((item, index) => {
									const starLabel = totalStars - index;

									return (
										<React.Fragment key={`${item} ${index}`}>
											<Grid item sm={3}>
												<Typography>{starLabel} star</Typography>
											</Grid>
											<Grid item sm={9}>
												<LinearProgress
													classes={progressClasses}
													color="secondary"
													value={
														rates?.length && starGroups[starLabel]?.length
															? (starGroups[starLabel]?.length /
																	rates?.length) *
															  100
															: 0
													}
													variant="determinate"
												/>
											</Grid>
										</React.Fragment>
									);
								})}
						</Grid>
					</Grid>
					<Grid
						alignContent="center"
						container
						direction="column"
						item
						justifyContent="space-around"
						sm={4}
					>
						<Typography align="center" fontSize="24" fontWeight={700}>
							{translate('Rate this product')}
						</Typography>
						<Box>
							{!allowed && (
								<Typography align="center" fontWeight={400}>
									{translate('verified buyers only')}
								</Typography>
							)}
							<Rating disabled={!allowed} name="addAReview" size="large" />
						</Box>
						<Button color="secondary" disabled={!allowed} variant="contained">
							{translate('ADD A REVIEW')}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
};
