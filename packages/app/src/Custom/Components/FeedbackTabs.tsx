import React from 'react';
import {
	ChipField,
	FormTab,
	ReferenceField,
	ReferenceManyField,
	SingleFieldList,
} from 'react-admin';

import { RegisterResources, Resources } from 'Constants';
import { DataGrid, StarsField } from 'Custom';

interface Props {
	reference: Resources | RegisterResources;
	target: string;
	[k: string]: any;
}

export const CommentsTab: React.FC<Props> = props => {
	const { reference, target, ...rest } = props;
	return (
		<FormTab label="Comments" {...rest}>
			<ReferenceManyField label="" reference={reference} target={target}>
				<DataGrid edit={false}>
					<ReferenceField
						label="By"
						reference={Resources.USERS}
						source="userId"
					>
						<ChipField source="userName" />
					</ReferenceField>
					<ChipField source="comment" />
				</DataGrid>
			</ReferenceManyField>
		</FormTab>
	);
};

export const RatesTab: React.FC<Props> = props => {
	const { reference, target, ...rest } = props;
	return (
		<FormTab label="Rates" {...rest}>
			<ReferenceManyField label="" reference={reference} target={target}>
				<DataGrid edit={false}>
					<ReferenceField
						label="By"
						reference={Resources.USERS}
						source="userId"
					>
						<ChipField source="userName" />
					</ReferenceField>
					<StarsField source="stars" />
				</DataGrid>
			</ReferenceManyField>
		</FormTab>
	);
};

export const LikesTab: React.FC<Props> = props => {
	const { reference, target, ...rest } = props;

	return (
		<FormTab label="Likes" {...rest}>
			<ReferenceManyField label="" reference={reference} target={target}>
				<SingleFieldList>
					<ReferenceField
						label="By"
						reference={Resources.USERS}
						source="userId"
					>
						<ChipField source="userName" />
					</ReferenceField>
				</SingleFieldList>
			</ReferenceManyField>
		</FormTab>
	);
};
