import {
	IconButton,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import uniq from 'lodash/uniq';
import React from 'react';
import { ArrayParam, useQueryParams, withDefault } from 'use-query-params';

import { FilterItemProps } from '@types';

interface Props extends FilterItemProps<string> {}

export const FilterListItem: React.FC<Props> = props => {
	const { value, type, label = value } = props;

	const [{ [type]: alias = [] }, setQuery] = useQueryParams({
		[type]: withDefault(ArrayParam, []),
	});

	const selected = alias?.includes(value);

	const onClick = () => setQuery({ [type]: uniq([...alias, value]) });
	const onClear = () =>
		setQuery({ [type]: alias?.filter(item => item !== value) });

	return (
		<ListItem button dense divider onClick={onClick} selected={selected}>
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
