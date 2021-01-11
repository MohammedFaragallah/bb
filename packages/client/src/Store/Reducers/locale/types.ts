import { ActionTypes, Language, LanguageCode } from '@types';

export interface LocaleState {
	locale: Language;
	preferredLanguage?: LanguageCode;
}

export interface ChangeLanguageAction {
	type: ActionTypes.CHANGE_LANGUAGE;
	payload: LanguageCode;
}

export type LocaleReducerAction = ChangeLanguageAction;
