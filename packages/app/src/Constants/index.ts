export const JWT_COOKIE = 'frego-jwt';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

export enum DataTypes {
	CREATE = 'create',
	DELETE = 'delete',
	DELETE_MANY = 'deleteMany',
	GET_LIST = 'getList',
	GET_MANY = 'getMany',
	GET_MANY_REFERENCE = 'getManyReference',
	GET_ONE = 'getOne',
	UPDATE = 'update',
	UPDATE_MANY = 'updateMany',
}

export enum Resources {
	ADDRESSES = 'api/addresses',
	SLIDES = 'api/slides',
	CARTS = 'api/carts',
	CATEGORIES = 'api/categories',
	CHAMPIONS = 'api/champions',
	EVENTS = 'api/events',
	EXERCISES = 'api/exercises',
	PRODUCT_FLAVORS = 'api/product-flavors',
	PRODUCT_SIZES = 'api/product-sizes',
	PRODUCTS = 'api/products',
	SPORTS = 'api/sports',
	STORIES = 'api/stories',
	USERS = 'users',
}

export enum RegisterResources {
	CART_ITEMS = 'api/cart-items',
	//? Feedback resources
	CHAMPION_LIKES = 'api/champion-likes',
	CHAMPION_RATES = 'api/champion-rates',
	EVENT_COMMENTS = 'api/event-comments',
	EVENT_LIKES = 'api/event-likes',
	EVENT_RATES = 'api/event-rates',
	EXERCISE_COMMENTS = 'api/exercise-comments',
	EXERCISE_LIKES = 'api/exercise-likes',
	EXERCISE_RATES = 'api/exercise-rates',
	PRODUCT_COMMENTS = 'api/product-comments',
	PRODUCT_RATES = 'api/product-rates',
	STORY_COMMENTS = 'api/story-comments',
	STORY_LIKES = 'api/story-likes',
	STORY_RATES = 'api/story-rates',
	STORY_VIEWS = 'api/story-views',
}
