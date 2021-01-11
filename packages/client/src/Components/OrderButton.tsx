import { IconButton, Tooltip } from '@material-ui/core';
import { SwapVert, SwapVerticalCircle } from '@material-ui/icons';
import React from 'react';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';

import { Icon, ToggleIcon } from 'Components';
import { DEFAULT_ORDER } from 'Constants';

interface Props {}

export const OrderButton: React.FC<Props> = () => {
	const [{ order = DEFAULT_ORDER }, setQuery] = useQueryParams({
		order: withDefault(NumberParam, DEFAULT_ORDER),
	});

	return (
		<Tooltip title="ORDER BY">
			<IconButton
				aria-label="Toggle sorted"
				onClick={() => setQuery({ order: -order || DEFAULT_ORDER })}
			>
				<ToggleIcon
					offIcon={
						<Icon push="right">
							<SwapVert />
						</Icon>
					}
					on={order === DEFAULT_ORDER}
					onIcon={
						<Icon push="right">
							<SwapVerticalCircle />
						</Icon>
					}
				/>
			</IconButton>
		</Tooltip>
	);
};
