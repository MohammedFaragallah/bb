import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { ProductSchema, ProductSizeSchema } from '@types';
import { Image, ImageLoader, Link, Typography } from 'Components';
import { DataTypes, FIRST_ITEM, onlyOne, Resources } from 'Constants';
import { imageURL, ProductUrl } from 'Helpers';
import { useQueryWithStore } from 'core';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		root: {
			color: palette.grey[700],
			fontSize: spacing(2),
			width: '100%',
			paddingRight: spacing(1),
			maxHeight: 600,
		},
		imageContainer: {
			width: '100%',
			overflow: 'hidden',
			padding: 0,
			height: '350px',
		},
		image: {
			minWidth: '100%',
			width: '100%',
			minHeight: '100%',
		},
		contentContainer: {
			backgroundColor: palette.background.paper,
			textAlign: 'center',
		},
		content: {
			border: `1px solid ${palette.grey[400]}`,
			borderTop: 'none',
			marginTop: 0,
			padding: spacing(1),
			display: 'flex',
			flexDirection: 'column',
		},
	};
});
interface Props {
	product: ProductSchema;
}

export const ProductCard: React.FC<Props> = props => {
	const { product } = props;
	const classes = useStyles();

	const { data: sizes } = useQueryWithStore<ProductSizeSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCT_SIZES,
		payload: {
			...onlyOne,
			filter: {
				productId: product.id,
			},
		},
	});

	const size = sizes?.[FIRST_ITEM];

	return (
		<li className={classes.root}>
			<Link to={ProductUrl(product)}>
				<Box className={classes.imageContainer}>
					<Image
						alt={product.name}
						className={classes.image}
						loader={<ImageLoader className={classes.image} />}
						src={imageURL(size, 'product')}
					/>
				</Box>
				<Box className={classes.contentContainer}>
					<Box className={classes.content}>
						<Typography noWrap>{product.name}</Typography>
						<Typography>{size?.name}</Typography>
						<Typography>
							<FormattedNumber format="EGP" value={size?.price || 0} />
						</Typography>
					</Box>
				</Box>
			</Link>
		</li>
	);
};
