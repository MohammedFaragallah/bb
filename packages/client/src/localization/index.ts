import flatten from 'flat';
import { IntlConfig } from 'react-intl';

import { Direction, Language, LanguageCode, Languages } from '@types';

export const LocalizationLanguages: Languages = {
	ar: {
		code: LanguageCode.ar,
		label: 'عربى',
		dir: Direction.rtl,
		isoCode: 'ar_AR',
		fonts: ['Cairo'],
	},
	en: {
		code: LanguageCode.en,
		label: 'English',
		dir: Direction.ltr,
		isoCode: 'en_US',
		fonts: ['Poppins'],
	},
};

export const DefaultLanguage: Language = LocalizationLanguages.en;

export const getTranslatedMessages = (languageCode: Language['code']) =>
	flatten<JSON, IntlConfig['messages']>(
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require(`localization/messages/${languageCode}`),
	);

export const getLocale = (languageCode: Language['code']) =>
	LocalizationLanguages[languageCode];
