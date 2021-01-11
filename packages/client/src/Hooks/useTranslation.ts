import { IntlFormatters, MessageDescriptor, useIntl } from 'react-intl';

import { DEVELOPMENT } from 'Constants';

const { NODE_ENV } = process.env;

type Return = NonNullable<ReturnType<IntlFormatters['formatMessage']>>;

type UseTranslation = {
	(...args: Parameters<IntlFormatters['formatMessage']>): Return;
	(id: MessageDescriptor['id']): Return;
};

export const useTranslation = () => {
	const intl = useIntl();

	const translate: UseTranslation = (...args: any) => {
		const id = args[0];
		const regex = /^[a-z][\w-]*(?:\.[\w-]+)*$/;

		if (typeof id === 'string') {
			if (!regex.test(id)) {
				// if (NODE_ENV === DEVELOPMENT) console.log('useTranslation -> id', id);

				return id;
			}

			return intl.formatMessage({ id }) || '';
		}

		return (
			intl.formatMessage(
				...(args as Parameters<IntlFormatters['formatMessage']>),
			) || ''
		);
	};

	return translate;
};
