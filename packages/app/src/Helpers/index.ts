import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { JWT_COOKIE } from 'Constants';
import { authClient } from 'Helpers/authClient';
import { restClient } from 'Helpers/restClient';

axiosRetry(axios, { retries: 3 });
const app = feathers();

const { REACT_APP_BACK_END_URI } = process.env;

const restClientConfig = rest(REACT_APP_BACK_END_URI);

app.configure(restClientConfig.axios(axios));

const authOptions = {
	cookie: JWT_COOKIE,
	storageKey: JWT_COOKIE,
};

app.configure(auth(authOptions));

export const dataProvider = restClient(app);

export const authProvider = authClient(app);

export { app };
