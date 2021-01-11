import { Link, LinkProps } from '@material-ui/core';
import React from 'react';

interface Props extends LinkProps {}

export const SmoothLink: React.FC<Props> = props => {
	const smoothScroll = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();

		const id = props.href?.slice(1);

		if (id) {
			const targetElement = document.getElementById(id);
			const rect = targetElement?.getBoundingClientRect();

			if (rect) {
				const top = rect.top + window.pageYOffset;

				window.scroll({ top, behavior: 'smooth' });
			}
		}
	};

	return <Link onClick={smoothScroll} underline="none" {...props} />;
};
