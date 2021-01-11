import React from 'react';

import { ResponseCommentSchema } from '@types';
import { Message } from 'Components/Feedback/Comments/Message';

interface Props {
	messages: ResponseCommentSchema[];
	setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
	serviceName?: string;
}

export const RightMessage: React.FC<Props> = props => {
	const { messages, ...rest } = props;

	return (
		<>
			{messages.map((msg, i) => {
				const preDate = new Date(messages[i - 1]?.updatedAt).getTime();

				const date = new Date(msg.updatedAt).getTime();

				// FIXME: only once per group
				const renderTime =
					messages.length === 1 || i === 0 || preDate - date < 6000;

				//? sub component to allow use of usePopupState hook for every comment
				return (
					<Message key={msg.id} msg={msg} renderTime={renderTime} {...rest} />
				);
			})}
		</>
	);
};
