import { useDispatch, useSelector } from 'react-redux';

import { CartItemSchema, FeathersRecord, SomeOptional } from '@types';
import { DataTypes, Resources } from 'Constants';
import { CartSelector } from 'Selectors';
import { enqueueSnackbar, getCart } from 'Store';
import { useMutation } from 'core';

export const useAddToCart = () => {
	const cart = useSelector(CartSelector);
	const [mutate, state] = useMutation();
	const dispatch = useDispatch();

	const addToCart = (
		data: SomeOptional<CartItemSchema, keyof FeathersRecord>,
		add = true,
	) => {
		const addedBefore = cart?.items.find(
			item => item.productFlavorId === data.productFlavorId,
		);
		const prevId = data.id || addedBefore?.id;

		delete data.id;
		delete data.createdAt;
		delete data.updatedAt;

		const payload = {
			id: prevId,
			data: {
				...data,
				quantity: data.quantity + ((add ? addedBefore?.quantity : 0) || 0),
			},
		};

		mutate(
			{
				type: prevId ? DataTypes.UPDATE : DataTypes.CREATE,
				resource: Resources.CART_ITEMS,
				payload,
			},
			{
				onSuccess: () => {
					dispatch(getCart());
					dispatch(
						enqueueSnackbar({
							message: 'ADDED A NEW ITEM TO YOUR CART SUCCESSFULLY',
							options: { variant: 'success' },
						}),
					);
				},
				onFailure: error => {
					dispatch(getCart());
					dispatch(
						enqueueSnackbar({
							message: error.message,
							options: { variant: 'warning' },
						}),
					);
				},
			},
		);
	};

	return [addToCart, state] as const;
};
