import {
	Badge,
	IconButton,
	makeStyles,
	Tooltip,
	Zoom,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'Components';
import { ACTION_ICONS_COLOR, Paths } from 'Constants';
import { useTranslation } from 'Hooks';
import { CartSelector, UserSelector } from 'Selectors';
import { getCart } from 'Store';

const useBadgeStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		badge: {
			right: spacing(1.5),
			top: spacing(1.5),
			backgroundColor: palette.grey[400],
			border: `2px solid ${palette.background.paper}`,
		},
	};
});

interface Props {}

export const CartHeaderIcon: React.FC<Props> = () => {
	const badgeClasses = useBadgeStyles();
	const cart = useSelector(CartSelector);
	const user = useSelector(UserSelector);
	const dispatch = useDispatch();
	const translate = useTranslation();

	useEffect(() => {
		if (user && !cart) dispatch(getCart());
	}, [cart, dispatch, user]);

	const count = cart?.items?.reduce((prev, next) => prev + next.quantity, 0);

	return (
		<Link aria-label="cart page" to={`${Paths.STORE}${Paths.CART}`}>
			<Tooltip
				TransitionComponent={Zoom}
				placement="bottom"
				title={translate('pageTitle.cart')}
			>
				<Badge
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					badgeContent={count}
					classes={badgeClasses}
					color="secondary"
				>
					<IconButton aria-label="cart">
						<ShoppingCart color={ACTION_ICONS_COLOR} />
					</IconButton>
				</Badge>
			</Tooltip>
		</Link>
	);
};
