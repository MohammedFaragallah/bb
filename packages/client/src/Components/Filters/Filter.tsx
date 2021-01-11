import {
	Box,
	Collapse,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { Clear, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { useLocalStorage } from 'react-use';
import { StringParam, useQueryParams } from 'use-query-params';

import { FilterProps } from '@types';
import { Icon, Show, ToggleIcon, Typography } from 'Components';

interface Props extends FilterProps {}

export const Filter: React.FC<Props> = props => {
	const { children, type, label } = props;
	const [query, setQuery] = useQueryParams({ [type]: StringParam });
	const [open, setOpen] = useLocalStorage(type, true);

	return (
		<>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<ListItem button onClick={() => setOpen(!open)}>
					<ListItemText disableTypography>
						<Typography fontWeight={600}>{label}</Typography>
					</ListItemText>
					<ToggleIcon
						offIcon={
							<Icon push="right">
								<KeyboardArrowDown />
							</Icon>
						}
						on={open}
						onIcon={
							<Icon push="right">
								<KeyboardArrowUp />
							</Icon>
						}
					/>
				</ListItem>
				<Show show={!isUndefined(query[type])}>
					<IconButton
						onClick={() => setQuery({ [type]: undefined })}
						size="small"
					>
						<Clear />
					</IconButton>
				</Show>
			</Box>
			<Collapse in={open}>
				<List dense disablePadding>
					{children}
				</List>
			</Collapse>
		</>
	);
};
