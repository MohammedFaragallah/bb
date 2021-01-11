import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { Link as RLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const RouterLink: React.FC<RouterLinkProps> = forwardRef<
	HTMLAnchorElement,
	RouterLinkProps
>((props, ref) => <RLink ref={ref} {...props} />);

export interface LinkProps extends MuiLinkProps<typeof RouterLink> {}

export const Link: React.FC<LinkProps> = forwardRef((props, ref) => {
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
