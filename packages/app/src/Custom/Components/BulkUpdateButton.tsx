import React from 'react';
import {
	Record,
	Button,
	ButtonProps,
	useNotify,
	useRefresh,
	useUnselectAll,
} from 'react-admin';

import { app } from 'Helpers';

interface Props extends ButtonProps {
	selectedIds: any[];
	resource: string;
	patch: Partial<Record>;
}

const BulkUpdateButton: React.FC<Props> = props => {
	const { selectedIds, resource, ...rest } = props;
	const notify = useNotify();
	const unselectAll = useUnselectAll(resource);
	const refresh = useRefresh();

	const updateAll = async () => {
		try {
			await app
				.service(resource)
				.patch(null, props.patch, { query: { id: { $in: selectedIds } } });
			unselectAll();
			refresh();
		} catch (error) {
			notify('ra.page.error', 'warning');
		}
	};

	return <Button onClick={updateAll} {...rest} />;
};

export { BulkUpdateButton };
