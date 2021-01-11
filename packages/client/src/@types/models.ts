import { CloudinaryImage } from '@types';

export interface ReadingTime {
	text: string;
	minutes: number;
	time: number;
	words: number;
}

export interface FeathersRecord {
	id: Identifier;
	createdAt: string;
	updatedAt: string;
}

export interface Tile {
	tileImage: CloudinaryImage;
	caption: string;
}

export declare type Identifier = string | number;
