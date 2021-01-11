import { cities, Countries } from 'Components/Countries';

const stringToChoice = (item: string) => ({ id: item, name: item });

export const egyptianCities = cities.map(stringToChoice);

export const countOpts = Countries.map(stringToChoice);
