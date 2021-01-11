import { produce } from 'immer';
import { Reducer } from 'redux';

import { ActionTypes } from '@types';
import { LocaleReducerAction, LocaleState } from 'Store';
import { DefaultLanguage, getLocale } from 'localization';

const locale = getLocale(DefaultLanguage.code);

// TODO: add preferredLanguage as a prop to locale

const initialState: LocaleState = {
	locale,
};

export const localeReducer: Reducer<LocaleState, LocaleReducerAction> = (
	state = initialState,
	action,
) => {
	switch (action.type) {
		case ActionTypes.CHANGE_LANGUAGE: {
			const locale = getLocale(action.payload);

			return produce(state, draft => {
				draft.locale = locale;
				draft.preferredLanguage = locale.code;
			});
		}

		default:
			return state;
	}
};
