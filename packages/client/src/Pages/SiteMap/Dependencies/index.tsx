import { Link } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Typography } from 'Components';
import { Dependency } from 'Pages/SiteMap/Dependencies/Dependency';
import { deps } from 'Pages/SiteMap/Dependencies/deps';

interface Asset {
	gzip: number;
	name: string;
	size: number;
	type: string;
}

export interface DepSize {
	approximateSize: number;
	name: string;
}

export interface Dep {
	name: string;
	version: string;
	description: string;
	repository: string;
	size: number;
	gzip: number;
	assets: Asset[];
	dependencyCount: number;
	dependencySizes: DepSize[];
	hasJSModule: string;
	hasJSNext: boolean;
	hasSideEffects: boolean;
	peerDependencies: string[];
	scoped: boolean;
}

interface Props {}

export const Dependencies: React.FC<Props> = () => {
	const [state, setstate] = useState<Dep[]>([]);

	useEffect(() => {
		Promise.all(
			deps.map(async Dependency => {
				try {
					const { data } = await Axios.get(
						`https://bundlephobia.com/api/size?package=${Dependency[0]}@${Dependency[1]}`,
					);
					return data;
				} catch (error) {}
			}),
		).then(res => setstate(res));
	}, []);

	return (
		<>
			<Typography>
				App dependencies list updated with every build the information below are
				provided by{' '}
				<Link href="bundlephobia.com" rel="noopener noreferrer" target="_blank">
					bundlephobia.com
				</Link>
			</Typography>
			{state.filter(Boolean).map((dep, index) => {
				return <Dependency dep={dep} key={index} />;
			})}
		</>
	);
};
