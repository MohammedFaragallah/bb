import axios from 'axios';
import throttle from 'lodash/throttle';

import { ActionTypes } from '@types';
import { store } from 'Store';

const { dispatch } = store;

const THROTTLE = 100;

throttle(
	() =>
		axios.interceptors.request.use(
			config => {
				dispatch({ type: ActionTypes.ADD_LOADING });

				return config;
			},
			error => {
				dispatch({ type: ActionTypes.REMOVE_LOADING });

				return Promise.reject(error);
			},
		),
	THROTTLE,
);

throttle(
	() =>
		axios.interceptors.response.use(
			response => {
				dispatch({ type: ActionTypes.REMOVE_LOADING });

				return response;
			},
			error => {
				dispatch({ type: ActionTypes.REMOVE_LOADING });

				return Promise.reject(error);
			},
		),
	THROTTLE,
);
