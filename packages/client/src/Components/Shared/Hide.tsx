import { ReactElement } from 'react';

interface Props {
	hide?: boolean;
	fallback?: ReactElement;
}

export const Hide: React.FC<Props> = ({ hide, fallback, children }) =>
	hide ? fallback || null : (children as ReactElement);
