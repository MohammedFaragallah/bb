import get from 'lodash/get';

const STORAGE_KEY = 'raColumnsConfig';

// Very basic storage helper
// values are stored in browser localStorage

const getRootValue = () => {
	try {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '');
	} catch (e) {
		return undefined;
	}
};

const setRootValue = (value: any) => {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	} catch (e) {}
};

export const LocalStorage = {
	get(key: any) {
		return get(getRootValue(), key);
	},
	set(key: any, value: any) {
		const oldValue = getRootValue();
		setRootValue({
			...oldValue,
			[key]: value,
		});
	},
};
