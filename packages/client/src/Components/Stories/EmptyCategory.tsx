import React from 'react';

import { CategorySchema } from '@types';
import { CenteredMessage, Link, Typography } from 'Components';
import { Paths } from 'Constants';
import { useTranslation } from 'Hooks';

interface Props {
	category: CategorySchema;
	label: string;
}

export const EmptyCategory: React.FC<Props> = props => {
	const { category, label } = props;
	const translate = useTranslation();

	const translatedLabel = translate(label);

	return (
		<CenteredMessage sx={{ width: '100%' }}>
			<Typography>
				{translate(
					{ id: 'emptyCategory.message' },
					{ label: translatedLabel, categoryName: category.name },
				)}
			</Typography>
			<Link to={Paths.ARTICLES}>
				{translate(
					{ id: 'emptyCategory.helpfulLinks' },
					{ label: translatedLabel },
				)}
			</Link>
		</CenteredMessage>
	);
};
