import {
	Box,
	Divider,
	Grid,
	Hidden,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import { sentenceCase } from 'change-case';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from 'react-use';

import {
	AddressesNames,
	CartStatus,
	ProductFlavorResponseSchema,
	StoreUser,
} from '@types';
import { Button, CoverImage, Typography } from 'Components';
import { allAvailable, DataTypes, Resources } from 'Constants';
import { imageURL } from 'Helpers';
import { useErrorNotifications, useTranslation } from 'Hooks';
import { CartSelector, UserSelector } from 'Selectors';
import { getCart } from 'Store';
import { useMutation, useQueryWithStore } from 'core';

const { REACT_APP_NAME } = process.env;

const payments = [
	{ name: 'Card type', detail: 'FAWRY' },
	{ name: 'Card holder', detail: REACT_APP_NAME },
	{ name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
	{ name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles(theme => {
	const { spacing, breakpoints } = theme;

	return {
		listItem: {
			padding: theme.spacing(1, 0),
		},
		total: {
			fontWeight: 700,
		},
		title: {
			marginTop: theme.spacing(2),
		},
		buttons: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		button: {
			marginTop: spacing(3),
			marginLeft: spacing(1),
		},
		info: {
			width: 150,
			[breakpoints.down('sm')]: {
				width: 'initial',
			},
		},
	};
});

interface Props {
	handleNext: () => void;
	handleBack: () => void;
}

export const Review: React.FC<Props> = props => {
	const { handleBack, handleNext } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const translate = useTranslation();
	const cart = useSelector(CartSelector);
	const notifyErrors = useErrorNotifications();
	const [mutate] = useMutation();

	const cartItems = cart?.items;
	const [
		addressName = AddressesNames.firstAddress,
	] = useLocalStorage<AddressesNames>('addressName');

	const user = useSelector(UserSelector) as StoreUser;
	const address = { ...user[addressName] };

	const { data: flavors } = useQueryWithStore<ProductFlavorResponseSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCT_FLAVORS,
		payload: {
			...allAvailable,
			filter: { id: { $in: cartItems?.map(item => item.productFlavorId) } },
		},
	});

	const invoiceTotal =
		cartItems?.reduce((prev, next) => prev + next.price * next.quantity, 0) ||
		0;

	const submitOrder = () => {
		const orderAddress: any = { ...address };

		delete orderAddress['id'];
		delete orderAddress['updatedAt'];
		delete orderAddress['createdAt'];

		mutate(
			{
				type: DataTypes.UPDATE,
				resource: Resources.CARTS,
				payload: {
					id: cart?.id,
					data: {
						...cart,
						status: CartStatus.WAITING,
						address: Object.entries(orderAddress)
							.map(item => item.join(': '))
							.join(', '),
					},
				},
			},
			{
				onSuccess: () => {
					dispatch(getCart());
					handleNext();
				},
				onFailure: errors => {
					dispatch(getCart());
					notifyErrors(errors);
				},
			},
		);
	};

	return (
		<>
			<List disablePadding>
				{cartItems?.map(cartItem => {
					const flavor = flavors?.find(
						flavor => flavor.id === cartItem.productFlavorId,
					);

					if (!flavor) return null;

					return (
						<ListItem alignItems="flex-start" divider key={cartItem.id}>
							<Hidden xsDown>
								<ListItemAvatar>
									<CoverImage size={70} src={imageURL(flavor, 'product')} />
								</ListItemAvatar>
							</Hidden>
							<ListItemText
								disableTypography
								primary={
									<Typography fontWeight={700}>{flavor.productName}</Typography>
								}
								secondary={
									<>
										<Typography color="textSecondary">
											{translate('store.size')}: {flavor.sizeName}
										</Typography>
										<Typography color="textSecondary">
											{translate('store.flavor')}: {flavor.name}
										</Typography>
									</>
								}
							/>
							<ListItemSecondaryAction className={classes.info}>
								<Box
									sx={{
										mt: 1,
									}}
								>
									<Box>
										{translate(
											{ id: 'label.items' },
											{ items: cartItem.quantity },
										)}
									</Box>
									{translate('label.total')}
									{': '}
									<FormattedNumber
										format="EGP"
										value={cartItem.price * cartItem.quantity}
									/>
								</Box>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
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
							<FormattedNumber format="EGP" value={invoiceTotal} />
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Grid component={Box} container spacing={2} sx={{ mx: '8px !important' }}>
				<Grid item sm={6} xs={12}>
					<Typography className={classes.title} gutterBottom variant="h6">
						{translate('steps.address')}
					</Typography>
					<Typography gutterBottom>To: {user.userName}</Typography>
					{Object.entries(address).map(item => (
						<Typography gutterBottom key={JSON.stringify(item)}>
							{sentenceCase(item[0])}
							{': '}
							{item[1]}
						</Typography>
					))}
				</Grid>
				<Grid container direction="column" item sm={6} xs={12}>
					<Typography className={classes.title} gutterBottom variant="h6">
						{translate('steps.payment')}
					</Typography>
					<Grid container>
						{payments.map(payment => (
							<React.Fragment key={payment.name}>
								<Grid item xs={6}>
									<Typography gutterBottom>{payment.name}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography gutterBottom>{payment.detail}</Typography>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Grid>
			</Grid>
			<Box className={classes.buttons}>
				<Button className={classes.button} onClick={handleBack}>
					{translate('label.previous')}
				</Button>
				<Button
					className={classes.button}
					color="secondary"
					onClick={submitOrder}
					variant="contained"
				>
					{translate('label.submit')}
				</Button>
			</Box>
		</>
	);
};
