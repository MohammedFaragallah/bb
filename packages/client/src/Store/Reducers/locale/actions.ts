import { ReactNode } from 'react';

import { ActionTypes, LanguageCode } from '@types';
import { LocaleSelector, UserSelector } from 'Selectors';
import { enqueueSnackbar, GetState, updateUser } from 'Store';
import { LocalizationLanguages } from 'localization';

export const changeLanguage = (
	code: LanguageCode,
	message?: ReactNode,
) => async (dispatch: any, getState: GetState) => {
	const state = getState();
	const user = UserSelector(state);
	const { locale } = LocaleSelector(state);

	//? leave the default language if the discovered/requested language not supported
	if (!Object.keys(LocalizationLanguages).includes(code)) return;
	//? don't change unless different
	if (locale.code === code) return;

	await dispatch({ type: ActionTypes.CHANGE_LANGUAGE, payload: code });

	if (user?.id) {
		dispatch(updateUser({ preferredLanguage: code }, 'Preferred Language'));
	}

	await dispatch(
		enqueueSnackbar({
			message: message
				? message
				: code === LanguageCode.ar
				? 'تم تغيير اللغة'
				: 'Language Changed',
			options: {
				variant: 'success',
			},
		}),
	);
};
