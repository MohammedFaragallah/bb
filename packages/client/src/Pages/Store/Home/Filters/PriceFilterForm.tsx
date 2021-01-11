import { Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { NumberParam, useQueryParams } from 'use-query-params';
import { number, object } from 'yup';

import { FilterProps } from '@types';
import { Button } from 'Components';
import { TextField } from 'Components/Inputs';
import { useTranslation } from 'Hooks';

const schema = object({
	gt: number().min(0),
	lt: number().min(0),
});

interface Props extends FilterProps {}

export const PriceFilterForm: React.FC<Props> = props => {
	const translate = useTranslation();

	const [query, setQuery] = useQueryParams({
		gt: NumberParam,
		lt: NumberParam,
	});

	const gtLabel = translate('label.moreThan');
	const ltLabel = translate('label.lessThan');
	const apply = translate('label.apply');

	return (
		<Box
			sx={{
				display: 'flex',
				mx: 2,
			}}
		>
			<Formik
				initialValues={query}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setQuery(values);
					} catch (error) {
						setSubmitting(false);
					}
				}}
				validationSchema={schema}
			>
				{({ isValid, dirty, errors }) => {
					return (
						<Form>
							<Box
								sx={{
									display: 'flex',
									my: 2,
								}}
							>
								<Box
									sx={{
										mr: 2,
									}}
								>
									<Field
										component={TextField}
										id="gt"
										label={gtLabel}
										min={0}
										name="gt"
										type="number"
									/>
								</Box>
								<Field
									component={TextField}
									id="lt"
									label={ltLabel}
									min={0}
									name="lt"
									type="number"
								/>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Button
									aria-label="filter prices"
									color="secondary"
									disabled={!isValid || !dirty}
									type="submit"
									variant="contained"
								>
									{apply}
								</Button>
							</Box>
						</Form>
					);
				}}
			</Formik>
		</Box>
	);
};
