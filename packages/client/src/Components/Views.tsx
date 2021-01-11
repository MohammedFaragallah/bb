import { TypographyProps } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Identifier } from '@types';
import { Typography } from 'Components';
import { DataTypes, Resources } from 'Constants';
import { useTranslation } from 'Hooks';
import { VisitedSelector } from 'Selectors';
import { addVisited } from 'Store';
import { useMutation } from 'core';

interface Props extends TypographyProps {
	storyId: Identifier;
	views: number;
	weight?: number;
}

export const Views: React.FC<Props> = props => {
	const { storyId, views, ...rest } = props;
	const dispatch = useDispatch();
	const visited = useSelector(VisitedSelector);
	const translate = useTranslation();
	const [mutate] = useMutation();

	const addView = useCallback(
		() =>
			mutate({
				type: DataTypes.CREATE,
				resource: Resources.STORY_VIEWS,
				payload: { data: { storyId } },
			}),
		[mutate, storyId],
	);

	useEffect(() => {
		if (!visited.includes(storyId)) {
			addView();
			dispatch(addVisited(storyId));
		}
	}, [dispatch, storyId, addView, visited]);

	return (
		<Typography {...rest}>
			{' | '}
			{translate({ id: 'label.views' }, { views })}
		</Typography>
	);
};

Views.defaultProps = {
	weight: 300,
	display: 'inline',
	views: 1,
};
