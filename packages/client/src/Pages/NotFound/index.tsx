import React from 'react';
import { useLocation } from 'react-router-dom';

import { NotFoundLocationState } from '@types';
import { CenteredMessage, Link, Page, Typography } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';

interface Props {}

export const NotFound: React.FC<Props> = () => {
	const translate = useTranslation();
	const location: { state: NotFoundLocationState | null } = useLocation();

	const label = translate('label.notfound');
	const helpFul = translate('label.helpful');

	const message = location.state?.message || label;

	const helpfulLinks = location.state?.helpfulLinks;

	// TODO: we can't find any thing helpful here / useful links
	return (
		<Page titles={[label]}>
			<CenteredMessage>
				<Typography gutterBottom>¯\_(ツ)_/¯</Typography>
				<Typography gutterBottom>{message}</Typography>
				{helpfulLinks?.length && (
					<Typography gutterBottom>
						{`${helpFul} : `}
						{helpfulLinks.map(({ label, ...rest }, index) => (
							<Link key={`${label} ${index}`} {...rest}>
								{translate(label)}
							</Link>
						))}
					</Typography>
				)}
				<Link to={Paths.HOME}>
					<Typography>
						{translate('label.go')} {translate('pageTitle.home')}
					</Typography>
				</Link>
			</CenteredMessage>
		</Page>
	);
};
