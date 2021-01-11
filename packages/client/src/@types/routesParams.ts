export interface CategoryRouteParams {
	categoryId: string;
}

export interface StoryRouteParams extends CategoryRouteParams {
	storyId: string;
}

export interface SportRouteParams {
	sportId: string;
}

export interface ChampionRouteParams extends SportRouteParams {
	championId: string;
}

export interface EventRouteParams {
	eventId: string;
}

export interface ExerciseRouteParams {
	exerciseId: string;
}

export interface PublicProfileRouteParams {
	userId: string;
}

export interface ProductRouteParams extends CategoryRouteParams {
	productId: string;
}
