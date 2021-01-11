import { Box } from '@material-ui/core';
import React from 'react';
import { useBattery } from 'react-use';

interface Props {}

export const Battery: React.FC<Props> = () => {
	const batteryState = useBattery();

	if (!batteryState.isSupported) {
		return (
			<Box>
				<span>Battery sensor</span> : <strong>not supported</strong>
			</Box>
		);
	}

	if (!batteryState.fetched) {
		return (
			<Box>
				<span>Battery sensor</span> : <strong>supported</strong> <br />
				<span>Battery state</span> : <strong>fetching</strong>
			</Box>
		);
	}

	return (
		<Box>
			<span>Battery sensor</span> : <strong>supported</strong> <br />
			<span>Battery state</span> : <strong>fetched</strong> <br />
			<span>Charge level</span> :
			<strong> {(batteryState.level * 100).toFixed(0)}%</strong> <br />
			<span>Charging</span> :
			<strong> {batteryState.charging ? 'yes' : 'no'}</strong> <br />
			<span>Charging time</span> :<strong> {batteryState.chargingTime}</strong>
			<br />
			<span>Discharging time</span> :
			<strong> {batteryState.dischargingTime}</strong>
		</Box>
	);
};
