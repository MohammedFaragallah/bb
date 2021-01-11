import { Link as MuiLink, LinkProps } from '@material-ui/core';
import React from 'react';

import { Link } from 'Components';

interface Props extends LinkProps {
	link: string;
}

export const InternalOrExternal: React.FC<Props> = props => {
	const { link, ...rest } = props;

	const linkRegex = new RegExp(window.location.host);
	const internal = linkRegex.test(link);

	const Component = internal ? Link : MuiLink;

	const options: any = {};
	if (internal) options.to = link.replace(/^.*\/\/[^/]+/, '');
	else {
		options.href = link;
		options.target = '_blank';
		options.rel = 'noopener noreferrer';
	}

	return <Component {...options} {...rest} />;
};
