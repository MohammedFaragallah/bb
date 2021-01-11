import { CategoriesTypes, CategorySchema, CloudinaryImage } from '@types';
import { Paths } from 'Constants';

type Entity = any;

interface HasImageEntity {
	[key: string]: CloudinaryImage | any;
}

export const imageURL = (
	entity: HasImageEntity | null | undefined,
	fieldName: string,
): string => entity?.[`${fieldName}Image`]?.secure_url || '';

export const CategoryURL = (entity: CategorySchema): string => {
	if (entity.type === CategoriesTypes.articles)
		return `${Paths.ARTICLES}/${entity?.id}`;

	if (entity.type === CategoriesTypes.exercises)
		return `${Paths.EXERCISES}?category=${entity.id}`;

	if (entity.type === CategoriesTypes.store)
		return `${Paths.STORE}?category=${entity.id}`;

	return '';
};

export const StoryCategoryURL = (entity: Entity) =>
	`${Paths.ARTICLES}/${entity?.categoryId}`;

export const ExerciseCategoryURL = (entity: Entity) =>
	`${Paths.EXERCISES}/${entity?.categoryId}`;

export const StoryURL = (entity: Entity): string =>
	`${Paths.ARTICLES}/${entity?.categoryId}/${entity?.id}`;

export const ProductUrl = (entity: Entity) =>
	`${Paths.STORE}/${entity?.categoryId}/${entity.productId || entity.id}`;

export const SportURL = (entity: Entity): string =>
	`${Paths.COMMUNITY}/${entity?.sportId || entity?.id}`;

export const ChampionURL = (entity: Entity): string =>
	`${Paths.COMMUNITY}/${entity?.sportId}/${entity?.id}`;
