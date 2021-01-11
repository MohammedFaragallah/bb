import { useMediaQuery, useTheme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import axios from 'axios';
import random from 'lodash/random';
import { SocialIconProps } from 'react-icons-context';

import { SubString } from '@types';

export const getSocials = (
	entity: { links?: string[] },
	options?: SocialIconProps, //? e.g. size
): SocialIconProps[] | undefined =>
	entity.links?.map(link => ({ href: link, ...options }));

export const getDescription = (
	entity?: { description?: string },
	substring: SubString = SubString.medSubString,
) => entity?.description?.substring(0, substring) || '';

export const useWidth = (): Breakpoint => {
	const theme = useTheme();
	const keys = [...theme.breakpoints.keys].reverse();

	return keys.reduce((output: Breakpoint, key: Breakpoint) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const matches = useMediaQuery(theme.breakpoints.only(key));
		return matches ? key : output;
	}, 'xs');
};

export const handleUploads = async (file: Blob) => {
	const {
		REACT_APP_CLOUDINARY_UPLOAD_PRESET,
		REACT_APP_CLOUDINARY_API_KEY,
		REACT_APP_CLOUDINARY_CLOUD_NAME,
	} = process.env;

	const formData = new FormData();

	formData.append('file', file);
	formData.append(
		'upload_preset',
		REACT_APP_CLOUDINARY_UPLOAD_PRESET as string,
	);
	formData.append('api_key', REACT_APP_CLOUDINARY_API_KEY as string);

	return axios
		.post(
			`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/upload` as string,
			formData,
			{
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
			},
		)
		.then(({ data }) => data);
};

export const generate = (
	maximum: number,
	theCount: number,
	min: number,
	max: number,
) => {
	const array = [];
	let currentSum = 0;
	for (let i = 0; i < theCount - 1; i++) {
		array[i] = random(min, max);
		currentSum += array[i];
	}
	array[theCount - 1] = maximum - currentSum;
	return array;
};

export const getAge = (date?: string) => {
	if (!date) return;
	const today = new Date();
	const birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

export const getPage = (offset: number, limit: number) =>
	offset / limit + 1 || 1;

export const alwaysArray = <T = string>(value?: T | T[]): T[] | undefined =>
	value ? (Array.isArray(value) ? value : [value]) : undefined;

export const stringToChoice = (item: string) => ({ id: item, name: item });
