import React from 'react';
import { useGeolocation } from 'react-use';

interface Props {}

export const GeoLocation: React.FC<Props> = () => {
	const state = useGeolocation();

	return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
