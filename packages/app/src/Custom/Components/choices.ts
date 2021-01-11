import { Countries } from 'Custom/Countries';
import {
	AdsLocations,
	CartEditStatuses,
	CartStatuses,
	CategoryTypes,
	Forms,
	Gender,
	Goals,
	LanguageCode,
	Roles,
	Title,
} from 'enums';

const stringToChoice = (item: string) => ({ id: item, name: item });

export const langOptions = [
	{ id: LanguageCode.ar, name: 'عربي' },
	{ id: LanguageCode.en, name: 'English' },
];

export const genderOptions = Object.values(Gender).map(stringToChoice);

export const titleOptions = Object.values(Title).map(stringToChoice);

export const roles = Object.values(Roles).map(stringToChoice);

export const goalOptions = Object.values(Goals).map(stringToChoice);

export const cartStatus = Object.values(CartStatuses).map(stringToChoice);

export const cartEditStatus = Object.values(CartEditStatuses).map(
	stringToChoice,
);

export const categories = Object.values(CategoryTypes).map(stringToChoice);

export const locations = Object.values(AdsLocations).map(stringToChoice);

export const formChoices = Object.values(Forms).map(stringToChoice);

export const egyptianCities = [
	'Alexandria',
	'Aswan',
	'Asyut',
	'Beheira',
	'Beni Suef',
	'Cairo',
	'Dakahlia',
	'Damietta',
	'Faiyum',
	'Gharbia',
	'Giza',
	'Ismailia',
	'Kafr El Sheikh',
	'Luxor',
	'Matruh',
	'Minya',
	'Monufia',
	'New Valley',
	'North Sinai',
	'Port Said',
	'Qalyubia',
	'Qena',
	'Red Sea',
	'Sharqia',
	'Sohag',
	'South Sinai',
	'Suez',
].map(stringToChoice);

export const countOpts = Countries.map(name => ({ id: name, name }));
