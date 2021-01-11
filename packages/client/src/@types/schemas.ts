import {
	AdsLocations,
	Article,
	CartStatus,
	CategoriesTypes,
	CloudinaryImage,
	Equipments,
	FeathersRecord,
	FitnessLevel,
	Forms,
	Gender,
	Goals,
	Identifier,
	LanguageCode,
	Muscles,
	Roles,
	Tile,
	Title,
} from '@types';

interface FeedbackSchema extends FeathersRecord {
	userId: Identifier;
}

interface LikeSchema extends FeedbackSchema {}

export interface CommentSchema extends FeedbackSchema {
	comment: string;
}

export interface StorySchema extends FeathersRecord, Article {
	title: string;
	featuredImage: CloudinaryImage;
	video: string;
	approved: boolean;
	userId: Identifier;
	categoryId: Identifier;
	likes: number;
	comments: number;
	views: number;
}

export interface CategorySchema extends FeathersRecord {
	name: string;
	description: string;
	type: CategoriesTypes;
	parentId: Identifier;
	len?: number;
}

export interface SlideSchema extends FeathersRecord {
	title: string;
	description: string;
	coverImage: CloudinaryImage;
	link: string;
	location: AdsLocations;
}

export interface RateSchema extends FeedbackSchema {
	stars: number;
}

export interface ResponseRateSchema extends RateSchema {}

export interface ResponseCommentSchema extends CommentSchema {
	profileImage: CloudinaryImage;
	userName: UserSchema['userName'];
}

export interface ResponseLikeSchema extends LikeSchema {
	profileImage: CloudinaryImage;
	userName: UserSchema['userName'];
}

export interface ChampionSchema extends FeathersRecord, Article {
	name: string;
	city: string;
	country: string;
	bornAt: string;
	class: string;
	height: number;
	weight: number;
	gender: Gender;
	profileImage: CloudinaryImage;
	coverImage: CloudinaryImage;
	album: Tile[];
	links: string[];
	sportId: Identifier;
}

export interface SportSchema extends FeathersRecord {
	name: string;
	class: string;
	coverImage: CloudinaryImage;
	description: string;
	width: number;
}

export interface EventSchema extends FeathersRecord, Article {
	title: string;
	coverImage: CloudinaryImage;
	hostName: string;
	location: string;
	startAt: Date;
	endAt: Date;
}

export interface ExerciseSchema extends FeathersRecord {
	name: string;
	startImage: CloudinaryImage;
	endImage: CloudinaryImage;
	video: string;
	muscle: Muscles;
	equipment: Equipments;
	fitnessLevel: FitnessLevel;
	cautions: string[];
	instructions: string[];
	notes: string[];
	userId: Identifier;
	categoryId: Identifier;
}

export interface UserSchema extends FeathersRecord {
	profileImage: CloudinaryImage;
	userName: string;
	biography: string;
	titles: Title[];
	certifications: string;
	preferredLanguage: LanguageCode;
	phone: string;
	gender: Gender;
	height: number;
	weight: number;
	goal: Goals;
	links: string[];
	bornAt: string;
	userId: Identifier;
	firstAddressId: Identifier;
	secondAddressId: Identifier;
	email: string;
	googleId?: string;
	facebookId?: string;
	// !authorization
	roles: Roles;
	// !authManagement
	isVerified: boolean;
	verifyToken: string;
	verifyShortToken: string;
	verifyExpires: string;
	verifyChanges: string[];
	resetToken: string;
	resetShortToken: string;
	resetExpires: string;
}

export interface AddressSchema extends FeathersRecord {
	address1: string;
	address2: string;
	region: string;
	city: string;
	country: string;
}

export interface StoreUser extends UserSchema {
	firstAddress: AddressSchema;
	secondAddress: AddressSchema;
}

interface CartSchema extends FeathersRecord {
	address: string;
	status: CartStatus;
	userId: Identifier;
}

export interface CartItemSchema extends FeathersRecord {
	price: number;
	quantity: number;
	cartId: Identifier;
	productFlavorId: Identifier;
}

export interface CartResponseSchema extends CartSchema {
	items: CartItemSchema[];
}

interface ProductFlavorSchema extends FeathersRecord {
	name: string;
	quantity: number;
	productSizeId: Identifier;
}

export interface ProductFlavorResponseSchema
	extends ProductFlavorSchema,
		Omit<ProductSizeSchema, keyof FeathersRecord>,
		Omit<ProductSchema, keyof FeathersRecord> {
	productName: ProductSchema['name'];
	sizeName: ProductSizeSchema['name'];
}

export interface ProductSizeSchema extends FeathersRecord {
	form: Forms;
	name: string;
	price: number;
	productImage: CloudinaryImage;
	productId: Identifier;
}

export interface OptionSchema<T extends unknown = unknown>
	extends FeathersRecord {
	name: string;
	value: T;
}

export interface ProductSizeResponseSchema
	extends ProductSizeSchema,
		Omit<ProductSchema, keyof FeathersRecord> {
	productName: string;
}

export interface ProductSchema extends FeathersRecord, Article {
	name: string;
	categoryId: Identifier;
}
