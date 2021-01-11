import { Box } from '@material-ui/core';
import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import { HitProps, ProductFlavorResponseSchema } from '@types';
import { CoverImage, Link } from 'Components';
import { ProductUrl } from 'Helpers';

interface Props extends HitProps<ProductFlavorResponseSchema> {}

export const ProductHit: React.FC<Props> = props => {
	const { hit } = props;

	return (
		<Box
			sx={{
				display: 'flex',
			}}
		>
			<CoverImage size={40} src={props.hit.productImage?.secure_url} />
			<Link to={ProductUrl(hit)}>
				<Highlight attribute="productName" hit={props.hit} />
			</Link>
		</Box>
	);
};
