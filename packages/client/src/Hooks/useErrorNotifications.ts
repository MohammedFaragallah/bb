import { FeathersErrorJSON } from '@feathersjs/errors';
import { useDispatch } from 'react-redux';

import { enqueueSnackbar } from 'Store';

export const useErrorNotifications = () => {
	const dispatch = useDispatch();

	const notify = (error: FeathersErrorJSON) => {
		dispatch(
			enqueueSnackbar({
				message: error.message,
				options: { variant: 'warning' },
			}),
		);

		error?.errors?.forEach(
			(item: Error) =>
				item?.message &&
				dispatch(
					enqueueSnackbar({
						message: item.message,
						options: { variant: 'warning' },
					}),
				),
		);
	};

	return notify;
};
