import { CSSProperties } from 'react';
import { Identifier, Record, ResourceProps } from 'react-admin';

import { Gender, Roles, Title } from 'enums';

export interface FeathersRecord extends Record {
	createdAt: string;
	updatedAt: string;
}

interface ReadingTime {
	text: string;
	minutes: number;
	time: number;
	words: number;
}

interface Image {
	secure_url: string;
}

export interface Story extends FeathersRecord {
	id: Identifier;
	title: string;
	description: string;
	readingTime: ReadingTime;
	articleBody: string;
	featuredImage: Image;
	video: string;
	approved: boolean;
	userId: Identifier;
	categoryId: Identifier;
	likes: number;
	comments: number;
	views: number;
}

export interface User extends FeathersRecord {
	profileImage: Image;
	userName: string;
	biography: string;
	titles: Title[];
	certifications: string;
	preferredLanguage: string;
	phone: string;
	gender: Gender;
	height: number;
	weight: number;
	goal: string;
	links: string[];
	bornAt: string;
	firstAddressId: Identifier;
	secondAddressId: Identifier;
	email: string;
	password: string;
	googleId: string;
	facebookId: string;
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

export interface ResourceMeta extends ResourceProps {
	options: {
		label: string;
		subMenu: string;
		icon: string;
	};
}

export type SquareSize = CSSProperties['width'] | CSSProperties['height'];
