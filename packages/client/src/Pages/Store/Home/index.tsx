import {
	Box,
	ButtonBase,
	Grid,
	Hidden,
	IconButton,
	makeStyles,
	Tooltip,
	Zoom,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React from 'react';
import { FormattedNumber } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import {
	ArrayParam,
	NumberParam,
	StringParam,
	useQueryParams,
	withDefault,
} from 'use-query-params';

import {
	ProductSchema,
	ProductSizeResponseSchema,
	SortMenuItem,
	StoriesViews,
	ViewGrids,
} from '@types';
import {
	CenteredMessage,
	ConditionalWrapper,
	Icon,
	Image,
	ImageLoader,
	Link,
	Loading,
	OrderButton,
	Page,
	SortsMenu,
	Typography,
} from 'Components';
import { FilterPage } from 'Components/Filters';
import {
	allAvailable,
	DataTypes,
	DEFAULT_ORDER,
	DEFAULT_PER_PAGE_LIMIT,
	DEFAULT_SORT,
	IMPOSSIBLE_ID,
	Paths,
	Resources,
} from 'Constants';
import { alwaysArray, imageURL, ProductUrl } from 'Helpers';
import { useInfiniteQuery, useTranslation } from 'Hooks';
import {
	CategoriesFilter,
	FormsFilter,
	PriceFilter,
	PriceFilterForm,
} from 'Pages/Store/Home/Filters';
import { Pagination, useQueryWithStore } from 'core';

const viewsGrid: ViewGrids = {
	module: { xl: 4, lg: 4, md: 6, sm: 12, xs: 12 },
};

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		buttonBase: {
			display: 'inline-block',
			height: '100%',
			width: '100%',
		},
		productImage: {
			position: 'relative',
			paddingBottom: '100%',
			overflow: 'hidden',
			backgroundColor: palette.grey[100],
		},
		img: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
		},
	};
});

const productSorts = [{ label: 'Category', field: 'categoryId' }];

const sizeSorts = [
	{ label: 'Name', field: 'name' },
	{ label: 'Price', field: 'price' },
];

const sorts = [...productSorts, ...sizeSorts];

interface Props {
	limit?: number;
	view?: StoriesViews;
}

export const HomeStore: React.FC<Props> = props => {
	const { limit = DEFAULT_PER_PAGE_LIMIT, view = StoriesViews.module } = props;
	const translate = useTranslation();
	const navigate = useNavigate();
	const classes = useStyles();

	const [
		{ sort = DEFAULT_SORT, order = DEFAULT_ORDER, gt, lt, form, category },
	] = useQueryParams({
		sort: withDefault(StringParam, DEFAULT_SORT),
		order: withDefault(NumberParam, DEFAULT_ORDER),
		form: ArrayParam,
		gt: NumberParam,
		lt: NumberParam,
		category: ArrayParam,
	});

	const hasFilter = gt || lt || form || category;

	const allowedSortsField = (fields: SortMenuItem[]) =>
		fields.map(item => item.field).includes(sort) ? sort : DEFAULT_SORT;

	const { data: products } = useQueryWithStore<ProductSchema>({
		type: DataTypes.GET_LIST,
		resource: Resources.PRODUCTS,
		payload: {
			...allAvailable,
			sort: { field: allowedSortsField(productSorts), order },
			filter: { categoryId: { $in: alwaysArray(category) } },
		},
	});

	const ids = products?.map(item => item.id);

	const [
		{ data: sizes, isLoading, isPreviousData, total },
		loadMore,
	] = useInfiniteQuery<ProductSizeResponseSchema>({
		resource: Resources.PRODUCT_SIZES,
		payload: {
			pagination: { perPage: limit } as Pagination,
			sort: { field: allowedSortsField(sizeSorts), order },
			filter: {
				productId: {
					$in: category ? (ids?.length ? ids : [IMPOSSIBLE_ID]) : undefined,
				},
				form: { $in: alwaysArray(form) },
				price: { $gt: gt, $lt: lt },
			},
		},
	});

	const currentSizes = sizes.filter(item => ids?.includes(item.productId));

	return (
		<Page titles={['pageTitle.store']}>
			<FilterPage
				MainFilters={
					<CategoriesFilter
						label={translate('label.category')}
						type="category"
					/>
				}
				SecondaryFilters={[
					<FormsFilter
						key="form"
						label={translate('store.forms.label')}
						type="form"
					/>,
					<PriceFilter
						key="price"
						label={translate('store.price')}
						type="price"
					/>,
					<PriceFilterForm key="priceForm" type="price" />,
				]}
			>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
						mt: 1,
						width: '100%',
					}}
				>
					<Hidden xsDown>
						{total ? (
							<Box
								sx={{
									mr: 1,
								}}
							>
								{translate({ id: 'filter.results' }, { total })}
							</Box>
						) : null}
						<Box
							sx={{
								ml: 'auto',
							}}
						>
							{hasFilter ? (
								<Tooltip
									TransitionComponent={Zoom}
									placement="bottom"
									title="clear all filters"
								>
									<IconButton onClick={() => navigate(Paths.STORE)}>
										<Icon>
											<Clear />
										</Icon>
									</IconButton>
								</Tooltip>
							) : null}
							<SortsMenu sorts={sorts} />
							<OrderButton />
						</Box>
					</Hidden>
				</Box>

				{isPreviousData && !sizes.length && (
					<CenteredMessage>
						No Products were found matching the selected filters.
					</CenteredMessage>
				)}

				<Grid container spacing={2}>
					{currentSizes.map((size, index) => {
						const currentProduct = products?.find(
							item => item.id === size.productId,
						);

						return (
							<Grid
								item
								key={size.id}
								lg={viewsGrid?.[view]?.lg}
								md={viewsGrid?.[view]?.md}
								sm={viewsGrid?.[view]?.sm}
								xl={viewsGrid?.[view]?.xl}
								xs={viewsGrid?.[view]?.xs}
							>
								<Link to={ProductUrl(size)}>
									<Box
										sx={{
											boxShadow: 2,
											height: '100%',
											position: 'relative',
											width: '100%',
										}}
									>
										<ButtonBase className={classes.buttonBase}>
											<Box
												sx={{
													height: '100%',
												}}
											>
												<Box
													sx={{
														p: 2,
													}}
												>
													<Box className={classes.productImage}>
														<Image
															alt={`${currentProduct?.name} ${size.name}`}
															className={classes.img}
															loader={
																<ImageLoader
																	className={classes.img}
																	height="100%"
																	width="100%"
																/>
															}
															src={imageURL(size, 'product')}
														/>
													</Box>
												</Box>
												<Box
													sx={{
														pb: 2,
														px: 2,
													}}
												>
													<ConditionalWrapper
														condition={sizes.length === index + 1}
														key={size.id}
														wrapper={children => (
															<Waypoint onEnter={loadMore}>
																<Box>{children}</Box>
															</Waypoint>
														)}
													>
														<Typography fontWeight={600}>
															{size.productName}
														</Typography>
													</ConditionalWrapper>
													<Typography fontWeight={700}>{size.name}</Typography>
													<Typography color="textSecondary" fontWeight="bold">
														<FormattedNumber format="EGP" value={size.price} />
													</Typography>
												</Box>
											</Box>
										</ButtonBase>
									</Box>
								</Link>
							</Grid>
						);
					})}
				</Grid>

				{isLoading && (
					<CenteredMessage>
						<Loading />
					</CenteredMessage>
				)}
			</FilterPage>
		</Page>
	);
};
