import { Box, Divider, Grid, IconButton } from '@material-ui/core';
import { Delete, Done } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { number, object } from 'yup';

import { Identifier, ProductFlavorResponseSchema } from '@types';
import {
	Button,
	CenteredMessage,
	CoverImage,
	Link,
	Page,
	Typography,
} from 'Components';
import { ButtonsInputNumber } from 'Components/Inputs';
import { allAvailable, DataTypes, Paths, Resources } from 'Constants';
import { imageURL, ProductUrl } from 'Helpers';
import { useAddToCart, useTranslation } from 'Hooks';
import { CartSelector } from 'Selectors';
import { enqueueSnackbar, getCart } from 'Store';
import { useMutation, useQueryWithStore } from 'core';

const ValidationSchema = object().shape({
	quantity: number().integer().min(1).required(),
});

interface Props {}

export const Cart: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const [mutate] = useMutation();
	const cart = useSelector(CartSelector);
	const [addToCart, { loading }] = useAddToCart();
	const translate = useTranslation();

	const cartItems = cart?.items;

	const { data: flavors } = useQueryWithStore<ProductFlavorResponseSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCT_FLAVORS,
		payload: {
			...allAvailable,
			filter: { id: { $in: cartItems?.map(item => item.productFlavorId) } },
		},
	});

	const removeItem = (id: Identifier) =>
		mutate(
			{
				type: DataTypes.DELETE,
				resource: Resources.CART_ITEMS,
				payload: { id },
			},
			{
				onSuccess: () => {
					dispatch(getCart());
					dispatch(
						enqueueSnackbar({
							message: 'REMOVED ITEM FROM YOUR CART SUCCESSFULLY',
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

	return (
		<Page titles={['pageTitle.cart']}>
			{cart?.items.length ? (
				<>
					{cartItems?.map(cartItem => {
						const flavor = flavors?.find(
							flavor => flavor.id === cartItem.productFlavorId,
						);

						if (!flavor) return null;

						return (
							<Formik
								initialValues={{ quantity: cartItem.quantity }}
								key={cartItem.id}
								onSubmit={async (values, { setSubmitting }) => {
									const { quantity } = values;
									try {
										addToCart({ ...cartItem, quantity }, false);
									} catch (error) {
										setSubmitting(false);
									}
								}}
								validationSchema={ValidationSchema}
							>
								{({ values: { quantity } }) => (
									<Form>
										<Grid container spacing={2} style={{ margin: 8 }}>
											<Grid item md={8} sm={6} xs={12}>
												<Box
													sx={{
														display: 'flex',
													}}
												>
													<CoverImage
														size={70}
														src={imageURL(flavor, 'product')}
													/>
													<Box
														sx={{
															mr: 'auto',
														}}
													>
														<Link to={ProductUrl(flavor)}>
															<Typography fontWeight={700}>
																{flavor.productName}
															</Typography>
														</Link>
														<Typography color="textSecondary">
															{translate('store.size')}: {flavor.sizeName}
														</Typography>
														<Typography color="textSecondary">
															{translate('store.flavor')}: {flavor.name}
														</Typography>
													</Box>
												</Box>
											</Grid>
											<Grid
												item
												md={4}
												sm={6}
												style={{ display: 'flex', alignItems: 'center' }}
												xs={12}
											>
												<Box
													sx={{
														alignItems: 'center',
														display: 'flex',
														flexDirection: 'column',
														mr: 4,
														mt: { xs: 1, sm: 0 },
													}}
												>
													<Field
														component={ButtonsInputNumber}
														id={`quantity${cartItem.id}`}
														min={0}
														name="quantity"
													/>
													<Box
														sx={{
															mt: 1,
														}}
													>
														{translate('label.total')}
														{': '}
														<FormattedNumber
															format="EGP"
															value={flavor.price * quantity}
														/>
													</Box>
												</Box>
												{quantity !== cartItem.quantity ? (
													<IconButton disabled={loading} type="submit">
														<Done />
													</IconButton>
												) : (
													<IconButton
														disabled={loading}
														onClick={() => removeItem(cartItem.id)}
													>
														<Delete />
													</IconButton>
												)}
											</Grid>
										</Grid>
										<Box
											component={Divider}
											sx={{
												mx: '16px !important',
											}}
										/>
									</Form>
								)}
							</Formik>
						);
					})}
					<Grid container>
						<Grid item md={4} />
						<Grid item md={4} sm={6} />
						<Grid item md={4} sm={6} xs={12}>
							<Box
								sx={{
									fontWeight: 600,
									mr: { md: 4, xs: 0 },
									mx: { md: 0, xs: 2 },
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										my: 1,
									}}
								>
									{translate('label.total')}{' '}
									<Box>
										{translate(
											{ id: 'label.items' },
											{
												items: cartItems?.reduce(
													(prev, next) => prev + next.quantity,
													0,
												),
											},
										)}
									</Box>
								</Box>
								<Divider />
								<Box
									sx={{
										my: 1,
									}}
								>
									<FormattedNumber
										format="EGP"
										value={
											cartItems?.reduce(
												(prev, next) => prev + next.price * next.quantity,
												0,
											) || 0
										}
									/>
								</Box>
								<Link to={`${Paths.STORE}${Paths.CHECKOUT}`}>
									<Button
										aria-label="checkout"
										color="secondary"
										fullWidth
										type="submit"
										variant="contained"
									>
										{translate('store.checkout')}
									</Button>
								</Link>
							</Box>
						</Grid>
					</Grid>
				</>
			) : (
				<CenteredMessage>
					<Typography gutterBottom>¯\_(ツ)_/¯</Typography>
					<Typography gutterBottom>
						You don t have any items in your cart yet
					</Typography>
					<Link to={Paths.STORE}>
						<Typography>
							{translate('label.go')} {translate('pageTitle.store')}
						</Typography>
					</Link>
				</CenteredMessage>
			)}
		</Page>
	);
};
