import React, { ReactElement, ReactNode } from 'react';

interface Props {
	condition?: boolean;
	wrapper: (children: ReactNode) => ReturnType<React.FC>;
}

export const ConditionalWrapper: React.FC<Props> = ({
	condition,
	wrapper,
	children,
}) => (condition ? wrapper?.(children) : (children as ReactElement));
