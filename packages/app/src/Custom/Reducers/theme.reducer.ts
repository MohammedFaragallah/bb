import { AnyAction } from 'redux';

const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (theme: string) => ({
	type: CHANGE_THEME,
	payload: theme,
});

const initialState = { type: 'light', direction: 'ltr' };

export const themeReducer = (
	state = initialState,
	{ type, payload }: AnyAction,
) => {
	switch (type) {
		case CHANGE_THEME:
			return { ...state, ...payload };

		case CHANGE_DIRECTION:
			return { ...state, ...payload };

		default:
			return state;
	}
};
