import {
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { NumberParam, useQueryParams } from 'use-query-params';

import { FilterItemProps, SomeOptional } from '@types';
import { FromTo } from 'Pages/Store/Home/Filters';

interface Props
	extends SomeOptional<FilterItemProps<Partial<FromTo>>, 'type'> {}

export const FromToFilterListItem: React.FC<Props> = props => {
	const { value, label } = props;

	const [query, setQuery] = useQueryParams({
		gt: NumberParam,
		lt: NumberParam,
	});

	const selected = isEqual(query, value);
	const onClear = () => setQuery({ gt: undefined, lt: undefined });

	return (
		<ListItem
			button
			dense
			divider
			onClick={() => {
				setQuery(value);
			}}
			selected={selected}
		>
			<ListItemText primary={label} />
			{selected ? (
				<ListItemSecondaryAction>
					<IconButton
						aria-label="delete"
						edge="end"
						onClick={onClear}
						size="small"
					>
						<Clear />
					</IconButton>
				</ListItemSecondaryAction>
			) : null}
		</ListItem>
	);
};
