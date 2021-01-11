import isEqual from 'lodash/isEqual';
import { Reducer } from 'redux';

import { DataFetchActions } from '../../../core';
import { CoreRecord, FETCH_END } from '../../../types';
import getFetchedAt from '../../../util/getFetchedAt';

/**
 * A list of records indexed by id, together with their fetch dates
 *
 * Note that the fetchedAt property isn't enumerable.
 *
 * @example
 * {
 *      12: { id: 12, title: "hello" },
 *      34: { id: 34, title: "world" },
 *      fetchedAt: {
 *          12: new Date('2019-02-06T21:23:07.049Z'),
 *          34: new Date('2019-02-06T21:23:07.049Z'),
 *      }
 * }
 */
interface RecordSetWithDate {
	// FIXME: use [key: Identifier] once typeScript accepts any type as index (see https://github.com/Microsoft/TypeScript/pull/26797)
	[key: string]: CoreRecord | object;
	[key: number]: CoreRecord;
	fetchedAt: {
		// FIXME: use [key: Identifier] once typeScript accepts any type as index (see https://github.com/Microsoft/TypeScript/pull/26797)
		[key: string]: Date;
		[key: number]: Date;
	};
}

/**
 * Make the fetchedAt property non enumerable
 */
const hideFetchedAt = (records: RecordSetWithDate): RecordSetWithDate => {
	Object.defineProperty(records, 'fetchedAt', {
		enumerable: false,
		configurable: false,
		writable: false,
	});
	return records;
};

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
const addRecordsAndRemoveOutdated = (
	newRecords: CoreRecord[] = [],
	oldRecords: RecordSetWithDate,
): RecordSetWithDate => {
	const newRecordsById: any = {};
	newRecords.forEach(record => (newRecordsById[record.id] = record));

	const newFetchedAt = getFetchedAt(
		newRecords.map(({ id }) => id),
		oldRecords.fetchedAt,
	);

	const records: any = { fetchedAt: newFetchedAt };
	Object.keys(newFetchedAt).forEach(
		id =>
			(records[id] = newRecordsById[id]
				? isEqual(newRecordsById[id], oldRecords[id])
					? oldRecords[id] // do not change the record to avoid a redraw
					: newRecordsById[id]
				: oldRecords[id]),
	);

	return hideFetchedAt(records);
};

const addOneRecord = (
	newRecord: CoreRecord,
	oldRecords: RecordSetWithDate,
	date = new Date(),
): RecordSetWithDate => {
	const newRecordsById = {
		...oldRecords,
		[newRecord.id]: isEqual(newRecord, oldRecords[newRecord.id])
			? oldRecords[newRecord.id] // do not change the record to avoid a redraw
			: newRecord,
	};

	return Object.defineProperty(newRecordsById, 'fetchedAt', {
		value: { ...oldRecords.fetchedAt, [newRecord.id]: date },
		enumerable: false,
	});
};

const initialState = hideFetchedAt({ fetchedAt: {} });

const dataReducer: Reducer<RecordSetWithDate> = (
	previousState = initialState,
	{ payload, meta },
) => {
	if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
		return previousState;
	}

	switch (meta.fetchResponse) {
		case DataFetchActions.GET_LIST:
			return addRecordsAndRemoveOutdated(payload.data, previousState);
		case DataFetchActions.UPDATE:
		case DataFetchActions.CREATE:
		case DataFetchActions.GET_ONE:
			return addOneRecord(payload.data, previousState);
		default:
			return previousState;
	}
};

export default dataReducer;
