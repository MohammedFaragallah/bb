import { GridSize } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { OptionsObject, SnackbarMessage } from 'notistack';
import { CSSProperties, ReactNode } from 'react';
import { BasicDoc, Hit } from 'react-instantsearch-core';

import {
	Direction,
	Identifier,
	LanguageCode,
	ReadingTime,
	StoriesViews,
} from '@types';
import { LinkProps } from 'Components';
import { Resources } from 'Constants';

export interface SortMenuItem {
	label: string;
	field: string;
}

export type ViewGrids = {
	[key in StoriesViews]?: {
		[key in Breakpoint]?: GridSize;
	};
};

export interface FilterProps {
	type: string;
	label?: ReactNode;
}

export interface FilterItemProps<T extends unknown = unknown> {
	type: string;
	value: T;
	label?: ReactNode;
}

export interface IPData {
	ip: string;
	type: string;
	continent_code: string;
	continent_name: string;
	country_code: string;
	country_name: string;
	region_code: string;
	region_name: string;
	city: string;
	zip: string;
	latitude: number;
	longitude: number;
	location: {
		geoname_id: number;
		capital: string;
		languages: [
			{
				code: string;
				name: string;
				native: string;
			},
		];
		country_flag: string;
		country_flag_emoji: string;
		country_flag_emoji_unicode: string;
		calling_code: string;
		is_eu: boolean;
	};
	time_zone: {
		id: string;
		current_time: string;
		gmt_offset: number;
		code: string;
		is_daylight_saving: boolean;
	};
	currency: {
		code: string;
		name: string;
		plural: string;
		symbol: string;
		symbol_native: string;
	};
	connection: {
		asn: number;
		isp: string;
	};
}

export interface Article {
	description: string;
	readingTime: ReadingTime;
	articleBody: string;
}

export interface LabeledLink extends LinkProps {
	label: string;
}

export interface BreadcrumbPath extends LabeledLink {
	icon?: ReactNode;
}

export interface SlotProps {
	section: string;
}

export interface Notification {
	message: SnackbarMessage;
	options?: Omit<OptionsObject, 'defaultValue'>;
	dismissed?: boolean;
	key?: OptionsObject['key'];
}

export interface Language {
	code: LanguageCode;
	label: string;
	dir: Direction;
	isoCode: string;
	fonts: string[];
}

export type Languages = Record<LanguageCode, Language>;

export interface FeedbackProps<T> {
	type: T;
	limit?: number;
	target?: string;
	id?: Identifier;
	resource?: Resources;
	allowed?: boolean;
	allowedMsg?: string;
}

export interface HitProps<T = BasicDoc> {
	hit: Hit<T>;
}

export type SquareSize = CSSProperties['width'] | CSSProperties['height'];

type ColorTuple = [string, number];

export interface CloudinaryImage {
	url?: string;
	etag?: string;
	tags?: string[];
	type?: string;
	bytes?: number;
	pages?: number;
	width?: number;
	colors?: ColorTuple[];
	format?: string;
	height?: number;
	version?: number;
	asset_id?: string;
	public_id?: string;
	signature?: string;
	created_at?: string;
	secure_url: string;
	version_id?: string;
	access_mode?: string;
	placeholder?: false;
	predominant?: { [key: string]: ColorTuple[] };
	resource_type?: string;
	original_filename?: string;
}

export interface NotFoundLocationState {
	helpfulLinks?: LabeledLink[];
	message?: string;
}
