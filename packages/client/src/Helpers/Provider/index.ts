import auth from '@feathersjs/authentication-client';
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { JWT_COOKIE } from 'Constants';
import provider from 'Helpers/Provider/dataProvider';

axiosRetry(axios, { retries: 3 });

const authOptions = {
	cookie: JWT_COOKIE,
	storageKey: JWT_COOKIE,
};

const { REACT_APP_BACK_END_URI } = process.env;

const app = feathers();
const restClient = rest(REACT_APP_BACK_END_URI);

app.configure(restClient.axios(axios));
app.configure(auth(authOptions));

const dataProvider = provider(app);

export { app, dataProvider };
