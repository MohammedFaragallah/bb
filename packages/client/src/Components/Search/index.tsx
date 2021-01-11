import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	makeStyles,
} from '@material-ui/core';
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import {
	Configure,
	Hits,
	Index,
	InstantSearch,
	SearchBox,
} from 'react-instantsearch-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductHit } from 'Components/Search/Hits/ProductHit';
import { StoryHit } from 'Components/Search/Hits/StoryHit';
import { useTranslation } from 'Hooks';
import { SearchSelector } from 'Selectors';
import { setSearch } from 'Store';

const useStyles = makeStyles(theme => {
	const { spacing } = theme;

	return {
		'@global': {
			'.ais-Hits-list': {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			},
			'.ais-Hits-item': {
				width: '100% !important',
				margin: spacing(1, '!important'),
			},
		},
	};
});

const {
	REACT_APP_ALGOLIA_APP_ID: appId,
	REACT_APP_ALGOLIA_CLIENT_API_KEY: clientApiKey,
} = process.env;

const searchClient = algoliasearch(appId as string, clientApiKey as string);

interface Props {}

export const Search: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const search = useSelector(SearchSelector);
	const translate = useTranslation();

	useStyles();
	const handleClose = () => {
		dispatch(setSearch(false));
	};

	return (
		<InstantSearch indexName="dev_API_STORIES" searchClient={searchClient}>
			<Dialog
				aria-labelledby="form-dialog-title"
				disableScrollLock
				onClose={handleClose}
				open={search}
			>
				<DialogTitle id="form-dialog-title">
					<Box
						sx={{
							color: 'error.main',
							fontSize: 'large',
							fontWeight: 600,
							pb: 2,
						}}
					>
						This feature is using algolia trial plan and might stop working any
						time
					</Box>
					<SearchBox />
				</DialogTitle>
				<DialogContent>
					<Box>
						<Box
							sx={{
								fontSize: 'large',
								fontWeight: 600,
								pb: 2,
							}}
						>
							{translate('pageTitle.articles')}
						</Box>
						<Index indexName="dev_API_STORIES">
							<Hits hitComponent={StoryHit} />
							<Configure hitsPerPage={4} />
						</Index>
					</Box>
					<Box
						sx={{
							mt: 2,
						}}
					>
						<Divider />
						<Box
							sx={{
								fontSize: 'large',
								fontWeight: 600,
								pb: 2,
							}}
						>
							{translate('pageTitle.store')}
						</Box>
						<Index indexName="dev_API_PRODUCT_FLAVORS">
							<Hits hitComponent={ProductHit} />
							<Configure hitsPerPage={4} />
						</Index>
					</Box>
				</DialogContent>
			</Dialog>
		</InstantSearch>
	);
};
