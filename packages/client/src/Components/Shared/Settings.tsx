import {
	Box,
	BoxProps,
	Hidden,
	IconButton,
	Pagination,
} from '@material-ui/core';
import { ViewList, ViewModule } from '@material-ui/icons';
import React, { ReactElement } from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

import { SortMenuItem } from '@types';
import { Hide, OffsetNavigation, OrderButton, SortsMenu } from 'Components';
import { DEFAULT_PER_PAGE_LIMIT } from 'Constants';

interface Props extends BoxProps {
	defaultView: string;
	limit?: number;
	noView?: boolean;
	sorts: SortMenuItem[];
	total?: number;
	center?: ReactElement;
}

export const Settings: React.FC<Props> = props => {
	const {
		children,
		defaultView,
		limit = DEFAULT_PER_PAGE_LIMIT,
		noView,
		sorts,
		total,
		center,
		...rest
	} = props;

	const [{ view = defaultView }, setQuery] = useQueryParams({
		offset: NumberParam,
		view: StringParam,
	});

	// TODO: function to yield the nextView => allow more than two views
	const nextView = view === 'module' ? 'list' : 'module';

	return (
		<>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<Box
					sx={{
						mr: 'auto',
					}}
				>
					{total ? (
						<Hidden xsDown>
							<Pagination
								count={Math.ceil(total / limit)}
								onChange={(error, page) => {
									if (error) console.error(error);
									setQuery({ offset: (page - 1) * limit });
								}}
								variant="outlined"
							/>
						</Hidden>
					) : null}
				</Box>
				<Box
					sx={{
						mx: 'auto',
					}}
				>
					{center}
				</Box>
				<Box
					{...rest}
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						ml: 'auto',
					}}
				>
					<Hide hide={noView}>
						<Hidden smDown>
							<IconButton
								aria-label="Toggle layout"
								onClick={() => setQuery({ view: nextView })}
							>
								{view === 'module' ? <ViewList /> : <ViewModule />}
							</IconButton>
						</Hidden>
					</Hide>
					<SortsMenu sorts={sorts} />
					<OrderButton />
				</Box>
			</Box>
			{children}
			{total ? <OffsetNavigation limit={limit} total={total} /> : null}
		</>
	);
};
