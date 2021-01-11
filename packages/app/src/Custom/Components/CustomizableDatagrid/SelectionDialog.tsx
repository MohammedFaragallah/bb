import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	Icon,
} from '@material-ui/core';
import React, { Component } from 'react';
import { FieldTitle } from 'react-admin';

import { Column, Selection } from './types';

interface Props {
	columns: Column[];
	selection: Selection;
	onColumnClicked: (columnName: string) => void;
	onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	resource?: string;
}

export class SelectionDialog extends Component<Props> {
	static defaultProps = {
		columns: [],
	};

	onColumnClicked: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => void = ({ target: { value: columnName } }) => {
		this.props.onColumnClicked(columnName);
	};

	render() {
		const { columns, selection, onClose, resource } = this.props;

		return (
			<Dialog
				aria-labelledby="ra-columns-dialog-title"
				maxWidth="xs"
				onClose={onClose}
				open
			>
				<DialogTitle id="ra-columns-dialog-title">Configuration</DialogTitle>
				<DialogContent>
					<FormGroup>
						{columns.map(({ source, label }, index: number) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={!!selection[source]}
										color="primary"
										onChange={this.onColumnClicked}
										value={source}
									/>
								}
								key={`${index}${source}`}
								label={
									<FieldTitle
										label={label}
										resource={resource}
										source={source}
									/>
								}
							/>
						))}
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={this.props.onClose}>
						<Icon>close</Icon>
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
