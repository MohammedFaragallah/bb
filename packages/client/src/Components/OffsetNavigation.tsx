import { Box, ButtonGroup } from '@material-ui/core';
import React from 'react';
import { NumberParam, useQueryParams, withDefault } from 'use-query-params';

import { Button } from 'Components';
import { DEFAULT_OFFSET } from 'Constants';
import { useTranslation } from 'Hooks';

interface Props {
	limit: number;
	total?: number;
}

export const OffsetNavigation: React.FC<Props> = props => {
	const { limit, total } = props;
	const translate = useTranslation();

	const [{ offset = DEFAULT_OFFSET }, setOffset] = useQueryParams({
		offset: withDefault(NumberParam, DEFAULT_OFFSET),
	});

	if (!total) return null;

	return (
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				m: 2,
				width: '100%',
				justifyItems: 'center',
			}}
		>
			<ButtonGroup
				aria-label="next/prev pages"
				color="secondary"
				size="large"
				variant="contained"
			>
				<Button
					disabled={offset - limit < 0}
					onClick={() => setOffset({ offset: offset - limit })}
				>
					{translate('label.previous')}
				</Button>
				<Button
					disabled={offset + limit >= total}
					onClick={() => setOffset({ offset: offset + limit })}
				>
					{translate('label.next')}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
