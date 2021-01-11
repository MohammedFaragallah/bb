import { produce } from 'immer';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useRef, useState } from 'react';

import { DataTypes, DEFAULT_OFFSET, Resources } from 'Constants';
import { getPage } from 'Helpers';
import { CoreRecord, Filter, Pagination, Sort, useQueryWithStore } from 'core';

export const useInfiniteQuery = <T extends CoreRecord = CoreRecord>(query: {
	resource: Resources;
	payload: { pagination: Pagination; sort?: Sort<T>; filter?: Filter<T> };
}) => {
	const [offset, setOffset] = useState(DEFAULT_OFFSET);
	const [all, setAll] = useState<T[]>([]);

	const limit = query.payload.pagination.perPage;

	// TODO: pass options
	const result = useQueryWithStore<T>({
		type: DataTypes.GET_LIST,
		...produce(query, draft => {
			draft.payload.pagination.page = getPage(offset, limit);
		}),
	});

	const { data, total } = result;
	const hasMore = all.length < Number(total);

	const sig = JSON.stringify(query);
	const sigRef = useRef(sig);

	useEffect(() => {
		if (data?.length) {
			if (sigRef.current !== sig) {
				sigRef.current = sig;
				setOffset(DEFAULT_OFFSET);
				setAll(data);
				// FIXME: investigate the need for uniqBy
			} else setAll(uniqBy([...all, ...data], 'id'));
		} else {
			if (sigRef.current !== sig) {
				sigRef.current = sig;
				setOffset(DEFAULT_OFFSET);
				setAll([]);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, sig]);

	const loadMore = () => {
		if (hasMore) setOffset(offset + limit);
	};

	return [{ ...result, data: all }, loadMore] as const;
};
