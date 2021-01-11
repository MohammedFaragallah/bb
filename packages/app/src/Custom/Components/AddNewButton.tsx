import { Icon } from '@material-ui/core';
import React from 'react';
import { Button } from 'react-admin';
import { Link } from 'react-router-dom';

export const AddNewButton: React.FC<any> = ({ record, label, target, where }) =>
	record ? (
		<Button
			component={Link}
			label={label}
			to={{
				pathname: `/${where}/create`,
				search: `?${target}=${record.id}`,
			}}
		>
			<Icon>add_to_queue</Icon>
		</Button>
	) : null;
