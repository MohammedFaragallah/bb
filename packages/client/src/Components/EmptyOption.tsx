import { MenuItem } from '@material-ui/core';
import React from 'react';

interface Props {}

export const EmptyOption: React.FC<Props> = () => (
	<MenuItem key="null" style={{ height: 32 }} value={undefined} />
);
