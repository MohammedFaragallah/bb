import React from 'react';
import { NumberField, ReferenceManyField, TextField } from 'react-admin';

import { Resources } from 'Constants';
import { DataGrid } from 'Custom';

interface Props {}

export const ProductFlavorExpand: React.FC<Props> = props => {
	return (
		<ReferenceManyField
			label="Flavors"
			reference={Resources.PRODUCT_FLAVORS}
			target="productSizeId"
			{...props}
		>
			<DataGrid disableColumns>
				<TextField source="name" />
				<NumberField source="quantity" />
			</DataGrid>
		</ReferenceManyField>
	);
};
