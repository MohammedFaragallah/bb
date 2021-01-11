import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';
import React, { forwardRef } from 'react';
import {
	NavLink as RLink,
	NavLinkProps as RouterLinkProps,
} from 'react-router-dom';

const RouterLink: React.FC<RouterLinkProps> = forwardRef<
	HTMLAnchorElement,
	RouterLinkProps
>((props, ref) => <RLink ref={ref} {...props} />);

interface LinkProps extends MuiLinkProps<typeof RouterLink> {}

export const NavLink: React.FC<LinkProps> = forwardRef((props, ref) => {
	const { children, ...rest } = props;

	return (
		<MuiLink
			color="inherit"
			component={RouterLink}
			ref={ref}
			underline="none"
			{...rest}
		>
			{children}
		</MuiLink>
	);
});
