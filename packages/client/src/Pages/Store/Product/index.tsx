import {
	Box,
	Card,
	CardHeader,
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	makeStyles,
	MenuItem,
	useTheme,
} from '@material-ui/core';
import { Store } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { number, object } from 'yup';

import {
	CartResponseSchema,
	CartStatus,
	CategorySchema,
	CommentsTypes,
	ProductFlavorResponseSchema,
	ProductSchema,
	ProductSizeSchema,
} from '@types';
import {
	ArticleBody,
	Breadcrumbs,
	Button,
	Image as LoaderImage,
	Loading,
	LoginLink,
	NotFound,
	Page,
	Typography,
} from 'Components';
import { Comments } from 'Components/Feedback';
import { ButtonsInputNumber, FlavorSelect, Select } from 'Components/Inputs';
import { DataTypes, FIRST_ITEM, Paths, Resources } from 'Constants';
import { imageURL } from 'Helpers';
import { useAddToCart, useTranslation } from 'Hooks';
import { FlavorRating } from 'Pages/Store/Product/FlavorRating';
import { MagnifiersHint } from 'Pages/Store/Product/MagnifiersHint';
import { Reviews } from 'Pages/Store/Product/Reviews';
import { SizePrice } from 'Pages/Store/Product/SizePrice';
import { CartSelector, UserSelector } from 'Selectors';
import { useQueryWithStore } from 'core';

interface ValidationOptions {
	sizes?: number[];
	flavors?: number[];
}

const CartItemValidationSchema = ({
	sizes = [],
	flavors = [],
}: ValidationOptions) =>
	object().shape({
		quantity: number().integer().min(1).required(),
		flavor: number().oneOf(flavors).integer().required(),
		size: number().oneOf(sizes).integer().required(),
	});

const useStyles = makeStyles(theme => {
	const { spacing } = theme;

	return {
		helperText: {
			marginLeft: spacing(2),
		},
	};
});

interface Props {}

export const Product: React.FC<Props> = () => {
	const { productId, categoryId } = useParams();

	const classes = useStyles();
	const cart = useSelector(CartSelector);
	const user = useSelector(UserSelector);
	const [addToCart, { loading }] = useAddToCart();
	const { breakpoints, direction } = useTheme();
	const translate = useTranslation();

	const label = 'pageTitle.store';

	const { data: carts } = useQueryWithStore<CartResponseSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.CARTS,
		payload: {
			filter: { userId: user?.id, status: CartStatus.DELIVERED },
		},
	});

	const { data: products, isPreviousData } = useQueryWithStore<ProductSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCTS,
		payload: {
			filter: {
				id: productId,
				categoryId,
			},
		},
	});

	const product = products?.[FIRST_ITEM];

	const { data: category } = useQueryWithStore<CategorySchema>({
		type: DataTypes.GET_ONE,
		resource: Resources.CATEGORIES,
		payload: { id: categoryId },
	});

	const { data: sizes } = useQueryWithStore<ProductSizeSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCT_SIZES,
		payload: {
			filter: { productId: product?.id },
		},
	});

	const { data: flavors } = useQueryWithStore<ProductFlavorResponseSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCT_FLAVORS,
		payload: {
			filter: {
				productSizeId: { $in: sizes?.map(item => item.id) },
				quantity: { $gt: 0 },
			},
		},
	});

	const currentSize = sizes?.[FIRST_ITEM];
	const currentFlavor = flavors?.find(
		item => item.productSizeId === currentSize?.id,
	);

	if (isPreviousData && !product)
		return (
			<NotFound
				helpfulLinks={[{ label, to: Paths.STORE }]}
				message="Couldn't find this Product"
			/>
		);

	if (!product || !category || !currentSize || !currentFlavor)
		return <Loading />;

	return (
		<Page customDisplayPrint titles={[product.name, label]}>
			<Helmet>
				<meta content={product.name} name="title" />
				<meta content={product.description} name="description" />
				<meta content={product.name} property="og:title" />
				<meta content={product.description} property="og:description" />
				<meta content={imageURL(currentSize, 'product')} property="og:image" />
			</Helmet>
			<Breadcrumbs
				paths={[
					{ label, to: Paths.STORE, icon: <Store /> },
					{
						label: category.name,
						to: {
							pathname: Paths.STORE,
							search: `?category=${category.id}`,
						},
					},
				]}
			/>
			<Formik
				initialValues={{
					flavor: currentFlavor.id,
					size: currentSize.id,
					quantity: 1,
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const { size, flavor, quantity } = values;

					const cs = sizes?.find(item => item.id === size);
					const cf = flavors?.find(item => item.id === flavor);

					try {
						if (!cs || !cf || !cart) return;

						addToCart({
							price: cs.price,
							productFlavorId: cf.id,
							cartId: cart.id,
							quantity,
						});
					} catch (error) {
						setSubmitting(false);
					}
				}}
				validationSchema={CartItemValidationSchema({
					sizes: sizes?.map(item => Number(item.id)),
					flavors: flavors?.map(item => Number(item.id)),
				})}
			>
				{({ isSubmitting, values, isValid }) => {
					const { size, flavor } = values;
					const selectedSize = sizes?.find(item => item.id === size);
					const currentFlavors = flavors?.filter(
						item => item.productSizeId === selectedSize?.id,
					);
					const selectedFlavor = currentFlavors?.find(
						item => item.id === flavor,
					);

					const owner = Boolean(
						carts?.find(cart =>
							cart.items.find(item => item.productFlavorId === flavor),
						),
					);

					const image = new Image();
					image.src = imageURL(selectedSize, 'product');

					return (
						<Grid container spacing={2}>
							<Grid item md={8} sm={12}>
								<Box
									sx={{
										mb: 2,
									}}
								>
									<Grid container spacing={2}>
										<Grid item sm={4}>
											<SideBySideMagnifier
												fillAvailableSpace={false}
												imageSrc={imageURL(selectedSize, 'product')}
												inPlaceMinBreakpoint={breakpoints.values.sm}
												renderOverlay={active => (
													<MagnifiersHint active={active} />
												)}
												switchSides={direction === 'rtl'}
											/>
										</Grid>
										<Grid item sm={8}>
											<Box
												sx={{
													fontSize: 28,
													fontWeight: 600,
												}}
											>
												{product.name}
											</Box>
											<Box>{product.description}</Box>
										</Grid>
									</Grid>
								</Box>
							</Grid>
							<Grid item md={4} sm={12}>
								<Form>
									<FormControl fullWidth>
										<Field
											component={Select}
											fullWidth
											margin="dense"
											name="size"
											variant="outlined"
										>
											{sizes?.map(option => (
												<MenuItem key={option.id} value={option.id}>
													{option.name}
												</MenuItem>
											))}
										</Field>

										<Box
											sx={{
												mb: 1,
											}}
										>
											<FormHelperText className={classes.helperText}>
												{sizes?.length && (
													<>
														{translate(
															{ id: 'store.sizes' },
															{ sizes: sizes?.length },
														)}{' '}
														{translate(
															{ id: 'store.available' },
															{ available: sizes?.length },
														)}
													</>
												)}
											</FormHelperText>
										</Box>
									</FormControl>

									<Box
										sx={{
											mb: 1,
										}}
									>
										<Field
											component={FlavorSelect}
											flavors={flavors}
											fullWidth
											margin="dense"
											name="flavor"
											variant="outlined"
										>
											{currentFlavors?.map(option => (
												<MenuItem key={option.id} value={option.id}>
													{option.name}
												</MenuItem>
											))}
										</Field>
										<FormHelperText className={classes.helperText}>
											{currentFlavors?.length && (
												<>
													{translate(
														{ id: 'store.flavors' },
														{ flavors: currentFlavors?.length },
													)}{' '}
													{translate(
														{ id: 'store.available' },
														{ available: currentFlavors?.length },
													)}
												</>
											)}
										</FormHelperText>
									</Box>
									<Box
										sx={{
											mx: 2,
										}}
									>
										<SizePrice price={selectedSize?.price} />
										<FlavorRating id={selectedFlavor?.id} />
									</Box>
									<Box
										sx={{
											mt: 1,
										}}
									>
										<Grid container spacing={2}>
											<Grid item xs={6}>
												<Field
													component={ButtonsInputNumber}
													id="quantity"
													min={0}
													name="quantity"
												/>
											</Grid>
											<Grid item xs={6}>
												<LoginLink>
													<Button
														aria-label="add to cart"
														color="secondary"
														disabled={!isValid || loading}
														fullWidth
														pending={isSubmitting || loading}
														style={{ height: '100%', width: '100%' }}
														type="submit"
														variant="contained"
													>
														{translate('store.addToCart')}
													</Button>
												</LoginLink>
											</Grid>
										</Grid>
									</Box>
								</Form>
							</Grid>
							<Grid item md={8} xs={12}>
								<Card>
									<CardHeader
										title={
											<Typography fontSize="big" fontWeight={700}>
												{translate('store.overview')}
											</Typography>
										}
									/>
									<Box
										component={Divider}
										sx={{
											mx: '16px !important',
										}}
									/>
									<Box
										sx={{
											p: 2,
										}}
									>
										<ArticleBody articleBody={product.articleBody} />
									</Box>
								</Card>
								{selectedFlavor?.id && (
									<Box
										sx={{
											mt: 2,
										}}
									>
										<Reviews allowed={owner} id={selectedFlavor.id} />
									</Box>
								)}
							</Grid>
							<Grid item md={4} xs={12}>
								{selectedFlavor?.id && (
									<>
										<LoaderImage
											src={imageURL(selectedFlavor, 'facts')}
											width="100%"
										/>
										<Comments
											allowed={owner}
											allowedMsg="Only verified buyers are allowed to comment on this"
											id={selectedFlavor?.id}
											sx={{ mt: 0 }}
											target="productFlavorId"
											type={CommentsTypes.product}
										/>
									</>
								)}
							</Grid>
						</Grid>
					);
				}}
			</Formik>
		</Page>
	);
};
