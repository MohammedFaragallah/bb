/* eslint-disable react/style-prop-object */
import { Box, Divider, makeStyles } from '@material-ui/core';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import { useParams } from 'react-router-dom';

import { ChampionSchema, LikesTypes, RatesTypes, SportSchema } from '@types';
import {
	ArticleBody,
	Link,
	Loading,
	Page,
	Socials,
	Typography,
} from 'Components';
import { Likes, Rates } from 'Components/Feedback';
import { DataTypes, Resources } from 'Constants';
import { getAge, getSocials, imageURL, SportURL } from 'Helpers';
import { useTranslation } from 'Hooks';
import { Gallery } from 'Pages/Community/Champion/Gallery';
import { Parallax } from 'Pages/Community/Champion/Parallax';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { spacing, breakpoints, shadows, palette } = theme;

	return {
		root: {
			margin: spacing(0, 0, 2, 0),
		},
		profile: {
			textAlign: 'center',
		},
		name: {
			marginTop: spacing(-11),
		},
		profileAvatar: {
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			borderRadius: '50%',
			height: '200px',
			margin: spacing(0, 'auto'),
			transform: 'translate3d(0, -50%, 0)',
			width: '200px',
		},
		description: {
			color: palette.grey[900],
			margin: spacing(0, 'auto'),
			maxWidth: breakpoints.values.md,
			textAlign: 'center !important' as 'center',
		},
		main: {
			backgroundColor: palette.background.paper,
			position: 'relative',
			borderRadius: spacing(),
			boxShadow: shadows[2],
			margin: spacing(-15, 0, 0),
		},
		title: {
			marginTop: spacing(4),
			minHeight: spacing(4),
		},
	};
});

interface Props {}

export const Champion: React.FC<Props> = () => {
	const { championId, sportId } = useParams();

	const classes = useStyles();
	const translate = useTranslation();

	const { data: champion } = useQueryWithStore<ChampionSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CHAMPIONS,
		payload: { id: championId },
	});

	const { data: sport } = useQueryWithStore<SportSchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.SPORTS,
		payload: { id: sportId },
	});

	if (!(champion && sport)) return <Loading />;

	const {
		album = [],
		articleBody,
		bornAt,
		name,
		country,
		city,
		height,
		weight,
		class: championClass,
	} = champion;

	const age = getAge(bornAt);

	return (
		<Box className={classes.root}>
			<Parallax filter image={imageURL(champion, 'cover')} med />
			<Page titles={[name, translate('pageTitle.champion')]}>
				<Box className={classes.main}>
					<Box className={classes.profile}>
						<Box
							className={classes.profileAvatar}
							style={{
								backgroundImage: `url(${imageURL(champion, 'profile')})`,
							}}
						/>
						<Box className={classes.name}>
							<Socials socials={getSocials(champion)} />
							<Likes type={LikesTypes.champion} />
							<Rates label="Rate this: " type={RatesTypes.champion} />
							<Typography
								className={classes.title}
								fontSize="big"
								fontWeight={900}
							>
								{name} {age ? ` / ${age} years old` : null}
							</Typography>
							<Typography color="textSecondary" fontWeight={400}>
								{country} {country === 'Egypt' && city}
							</Typography>
							<Typography>
								<Link to={SportURL(sport)}>{sport.name}</Link> | {championClass}
							</Typography>
							<Typography>
								{translate('label.height')}
								{': '}
								<FormattedNumber
									style="unit"
									unit="centimeter"
									value={height}
								/>
								{' | '}
								{translate('label.weight')}
								{': '}
								<FormattedNumber style="unit" unit="kilogram" value={weight} />
							</Typography>
							<Box
								component={Divider}
								sx={{
									mx: '16px !important',
								}}
							/>
						</Box>
					</Box>
					<Box
						className={classes.description}
						sx={{
							m: 2,
						}}
					>
						<ArticleBody articleBody={articleBody} />
					</Box>
				</Box>
				<Gallery album={album} />
			</Page>
		</Box>
	);
};
