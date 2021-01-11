import { SvgIconProps } from '@material-ui/core';

export const JWT_COOKIE = 'frego-jwt';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

export enum Paths {
	HOME = '/',
	ARTICLES = '/articles',
	COMMUNITY = '/community',
	EVENTS = '/events',
	EXERCISES = '/exercises',
	NOT_FOUND = '/notfound',
	SITE_MAP = '/sitemap',
	TERMS = '/terms',
	PRIVACY = '/privacy',
	//? profile routes
	AUTHOR = '/author',
	PROFILE = '/profile',
	MAIN_ADDRESS = '/firstAddress',
	SECONDARY_ADDRESS = '/secondAddress',
	//? store routes
	STORE = '/store',
	CHECKOUT = '/checkout',
	CART = '/cart',
	//? auth routes
	AUTH = '/auth',
	LOGIN = '/login',
	SIGNUP = '/signup',
	FORGOT = '/forgot',
	RESET = '/reset',
	VERIFY = '/verify',
	CALLBACK = '/callback',
}

export enum AuthPaths {
	LOGIN = '/auth/login',
	SIGNUP = '/auth/signup',
	FORGOT = '/auth/forgot',
	RESET = '/auth/reset',
}

export const ACTION_ICONS_COLOR: SvgIconProps['color'] = 'action';

export const DEFAULT_PER_PAGE_LIMIT = 12;
export const SHORTEST_STRING = 2;
export const SHORTEST_PASSWORD = 6;
export const LIkes_LIMIT = 5;
export const FIRST_ITEM = 0;

const PAGINATION_MAX = 50;
export const MAX_USER_NAME_LENGTH = 50;
export const MILLE_SECONDS = 1000;

export const DEFAULT_SORT = 'updatedAt';
export const DEFAULT_ORDER = -1;
export const DEFAULT_OFFSET = 0;

export const IMPOSSIBLE_ID = 99999;

export enum DataTypes {
	CREATE = 'create',
	DELETE = 'delete',
	DELETE_MANY = 'deleteMany',
	GET_LIST = 'getList',
	GET_ONE = 'getOne',
	UPDATE = 'update',
	UPDATE_MANY = 'updateMany',
}

export const newestFirst = { sort: { field: DEFAULT_SORT, order: -1 } };
export const allAvailable = {
	pagination: { page: 1, perPage: PAGINATION_MAX },
};
export const onlyOne = { pagination: { page: 1, perPage: 1 } };

export const redirectBlacklist = [
	AuthPaths.LOGIN,
	AuthPaths.SIGNUP,
	Paths.NOT_FOUND,
];

export enum Resources {
	ADDRESSES = 'api/addresses',
	SLIDES = 'api/slides',
	CATEGORIES = 'api/categories',
	CHAMPIONS = 'api/champions',
	EVENTS = 'api/events',
	EXERCISES = 'api/exercises',
	SPORTS = 'api/sports',
	STORIES = 'api/stories',
	STORY_VIEWS = 'api/story-views',
	EVENT_COMMENTS = 'api/event-comments',
	EXERCISE_COMMENTS = 'api/exercise-comments',
	STORY_COMMENTS = 'api/story-comments',
	CHAMPION_LIKES = 'api/champion-likes',
	EVENT_LIKES = 'api/event-likes',
	EXERCISE_LIKES = 'api/exercise-likes',
	STORY_LIKES = 'api/story-likes',
	CHAMPION_RATES = 'api/champion-rates',
	EVENT_RATES = 'api/event-rates',
	EXERCISE_RATES = 'api/exercise-rates',
	STORY_RATES = 'api/story-rates',
	OPTIONS = 'api/options',
	AUTH_MANAGEMENT = 'authManagement',
	USERS = 'users',
	//? STORE RESOURCES
	CART_ITEMS = 'api/cart-items',
	CARTS = 'api/carts',
	PRODUCT_COMMENTS = 'api/product-comments',
	PRODUCT_FLAVORS = 'api/product-flavors',
	PRODUCT_RATES = 'api/product-rates',
	PRODUCT_SIZES = 'api/product-sizes',
	PRODUCTS = 'api/products',
}

export const intlFormats = {
	number: {
		EGP: {
			style: 'currency',
			currency: 'EGP',
		},
	},
};
