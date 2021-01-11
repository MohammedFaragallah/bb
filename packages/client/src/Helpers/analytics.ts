import 'autotrack';

import * as Sentry from '@sentry/browser';
import { initialize, ga } from 'react-ga';

import { PRODUCTION } from 'Constants';

// if (process.env.NODE_ENV !== PRODUCTION) {
// 	const whyDidYouRender = require('@welldone-software/why-did-you-render');
// 	whyDidYouRender(React);
// }
const { NODE_ENV, REACT_APP_ANALYTICS_API_KEY } = process.env;

if (NODE_ENV === PRODUCTION) {
	Sentry.init({
		dsn: 'https://cfba4aaf1e8245ab842258fabc136b93@sentry.io/1543148',
	});

	initialize(REACT_APP_ANALYTICS_API_KEY as string);

	ga('require', 'cleanUrlTracker');
	ga('require', 'eventTracker');
	ga('require', 'impressionTracker');
	ga('require', 'maxScrollTracker');
	ga('require', 'mediaQueryTracker');
	ga('require', 'outboundFormTracker');
	ga('require', 'outboundLinkTracker');
	ga('require', 'pageVisibilityTracker');
	ga('require', 'socialWidgetTracker');
	ga('require', 'urlChangeTracker');
}
