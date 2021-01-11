import { createGenerateClassName } from '@material-ui/styles';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const generateClassName = createGenerateClassName({
	productionPrefix: 'FREGO',
});

export const checkImageURL = (url: string) =>
	url?.match(/\.(jpeg|jpg|gif|png)$/) != null;

export const rowClick =
	process.env.NODE_ENV !== 'production' ? 'expand' : undefined;
