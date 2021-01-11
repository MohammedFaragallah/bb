import React, { cloneElement, ReactElement } from 'react';

interface Props {
	props: any;
	condition?: boolean;
}

export const TitleProps: React.FC<Props> = props => {
	const { children, condition = process.env.NODE_ENV !== 'production' } = props;

	return condition
		? cloneElement(children as ReactElement, {
				title: JSON.stringify(props.props, undefined, 2),
		  })
		: (children as ReactElement);
};
