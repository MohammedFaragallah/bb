import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Sort } from '@material-ui/icons';
import {
	bindMenu,
	bindTrigger,
	usePopupState,
} from 'material-ui-popup-state/hooks';
import React from 'react';
import { StringParam, useQueryParams } from 'use-query-params';

import { SortMenuItem } from '@types';
import { DEFAULT_SORT } from 'Constants';

const defaultSorts: SortMenuItem[] = [
	{ label: 'Last Updated', field: 'updatedAt' },
];

interface Props {
	sorts: SortMenuItem[];
}

export const SortsMenu: React.FC<Props> = props => {
	const { sorts } = props;

	const popupState = usePopupState({
		variant: 'popover',
		popupId: 'store',
	});

	const [{ sort = DEFAULT_SORT }, setSort] = useQueryParams({
		sort: StringParam,
	});

	return (
		<>
			<Tooltip title="SORT BY">
				<IconButton aria-label="Toggle sorted" {...bindTrigger(popupState)}>
					<Sort />
				</IconButton>
			</Tooltip>
			<Menu disableScrollLock {...bindMenu(popupState)}>
				{[...sorts, ...defaultSorts].map(({ label, field }) => (
					<MenuItem
						key={field}
						onClick={() => {
							setSort({ sort: field });
							popupState.close();
						}}
						selected={field === sort}
					>
						{label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
