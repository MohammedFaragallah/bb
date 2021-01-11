import { Box, Grid } from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { getUserLocales } from 'get-user-locale';
import React from 'react';
import { useSelector } from 'react-redux';

import { Environment, Icon, Page, Typography } from 'Components';
import { DEVELOPMENT } from 'Constants';
import { useWidth } from 'Helpers';
import { Battery } from 'Pages/SiteMap/Battery';
import { Dependencies } from 'Pages/SiteMap/Dependencies';
import { GeoLocation } from 'Pages/SiteMap/GeoLocation';
import { SiteMap as SitePlan } from 'Pages/SiteMap/SiteMap';
import { LocaleSelector } from 'Selectors';

const features = [
	'advanced seo enhancements',
	'fully responsive (desktop first)',
	'fuzzy full-text search',
	'google analytics/facebook pixel',
	'live chat',
	'multi language (english first)',
	'offline-capable',
	'pwa ready for google play store',
	'runtime error reporting',
	'social integrations',
];

const cautions = [
	'for the latest version clear your cache and localstorage or just use incognito mode (service worker!) ',
];

interface Props {}

export const SiteMap: React.FC<Props> = () => {
	const width = useWidth();
	const locale = useSelector(LocaleSelector);
	const { REACT_APP_NAME, NODE_ENV } = process.env;
	const locales = getUserLocales().join(', ');

	return (
		<Page titles={['SiteMap']}>
			<Typography style={{ marginTop: '0' }}>
				{cautions.map((caution, index) => (
					<Box
						component="span"
						key={index}
						sx={{
							display: 'block',
						}}
					>
						<Icon push="right">
							<Warning />
						</Icon>
						<Typography>{caution.toUpperCase()}</Typography>
					</Box>
				))}
			</Typography>
			<Typography>
				{features.map((feature, index) => (
					<Typography key={index}>{feature.toUpperCase()}</Typography>
				))}
			</Typography>
			<Grid container spacing={2}>
				<Grid item md={8} xs={12}>
					<SitePlan />
				</Grid>
				<Grid item md={4} xs={12}>
					<Typography>
						APP NAME :<strong> {REACT_APP_NAME}</strong>
					</Typography>
					<Typography>
						Current Language :<strong> {locale.locale.label}</strong>
					</Typography>
					<Typography>
						Width key : <strong> {width}</strong>
					</Typography>
					<Typography>
						Environment : <strong> {NODE_ENV || DEVELOPMENT}</strong>
					</Typography>
					<Typography>
						User locale : <strong> {locales}</strong>
					</Typography>
					<Battery />
					<GeoLocation />
					<Environment>
						<Dependencies />
					</Environment>
				</Grid>
			</Grid>
		</Page>
	);
};
