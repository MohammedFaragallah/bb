import { all } from 'redux-saga/effects';

import { DataProvider } from '../types';
import accumulate from './accumulate';
import callback from './callback';
import fetch from './fetch';

/**
 * @param {Object} dataProvider A Data Provider function
 */
const admin = (dataProvider: DataProvider) =>
	function* admin() {
		yield all([fetch(dataProvider)(), accumulate(), callback()]);
	};

export default admin;
