import { Hidden } from '@material-ui/core';
import React from 'react';

import { LargeHeader } from 'Layout/Header/LargeHeader';
import { MiniHeader } from 'Layout/Header/MiniHeader';

export const Header = () => (
	<>
		<Hidden smUp>
			<MiniHeader />
		</Hidden>
		<Hidden only="xs">
			<LargeHeader />
		</Hidden>
	</>
);
