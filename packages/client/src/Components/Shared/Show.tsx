import { ReactElement } from 'react';

interface Props {
	show?: boolean;
	fallback?: ReactElement;
}

export const Show: React.FC<Props> = ({ show, fallback, children }) =>
	show ? (children as ReactElement) : (fallback as ReactElement) || null;
