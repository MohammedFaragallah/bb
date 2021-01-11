import { Icon, Toolbar } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import { Button, Datagrid, DatagridProps } from 'react-admin';

import { LocalStorage } from './LocalStorage';
import { SelectionDialog } from './SelectionDialog';
import { Selection } from './types';

const arrayToSelection = (values: string[]) =>
	values.reduce((selection: Selection, columnName) => {
		selection[columnName] = true;
		return selection;
	}, {});

export interface CustomizableDatagridProps extends DatagridProps {
	defaultColumns?: string[];
	resource?: string;
	storage?: {
		get: (resourceName: string) => Selection;
		set: (resourceName: string, selectedColumns: Selection) => Selection;
	};
	except?: string[];
	buttonLabel?: string;
	disableColumns?: boolean;
}

interface State {
	modalOpened: boolean;
	selection: Selection;
}

// CustomizableDatagrid allows to show/hide columns dynamically
// the preferences are stored in local storage
export class CustomizableDatagrid extends Component<
	CustomizableDatagridProps,
	State
> {
	state = {
		modalOpened: false,
		selection: this.getInitialSelection(),
	};

	static defaultProps = {
		defaultColumns: [],
		except: [],
		storage: LocalStorage,
		buttonLabel: 'columns',
		classes: {},
	};

	getColumnNames() {
		const { children } = this.props;

		return (
			React.Children.map(children, (field: any) => field?.props?.source) || []
		);
	}

	getColumnLabels() {
		const { children } = this.props;

		return React.Children.map(
			children,
			(field: any) =>
				field && {
					source: field.props?.source,
					label: field.props?.label,
				},
		)?.filter(item => item?.source);
	}

	getInitialSelection(): Selection {
		const { defaultColumns, resource, storage, except } = this
			.props as Required<CustomizableDatagridProps>;

		const previousSelection = storage.get(resource) as Selection;

		// if we have a previously stored value, let's return it
		if (!isEmpty(previousSelection)) return previousSelection;

		// if defaultColumns are set let's return them
		if (!isEmpty(defaultColumns)) return arrayToSelection(defaultColumns);

		// otherwise we fallback on the default behaviour : display all columns
		const defaults = arrayToSelection(this.getColumnNames());

		return Object.assign(
			{},
			defaults,
			{
				id: false,
				createdAt: false,
				updatedAt: false,
			},
			...except.map((item: string) => ({ [item]: false })),
		);
	}

	// updates the storage with the internal state value
	updateStorage = () => {
		const { storage, resource } = this
			.props as Required<CustomizableDatagridProps>;
		storage.set(resource, this.state.selection);
	};

	toggleColumn = (columnName: string) => {
		const previousSelection = this.state.selection;
		const selection = {
			...previousSelection,
			[columnName]: !previousSelection[columnName],
		};
		this.setState({ selection }, this.updateStorage);
	};

	handleOpen = () => this.setState({ modalOpened: true });
	handleClose = () => this.setState({ modalOpened: false });

	renderChild = (child: any) => {
		const source = child?.props?.source;
		const { selection } = this.state;

		// Show children without source, or children explicitly visible
		if ((!source || selection[source]) && child) {
			return React.cloneElement(child, {});
		}

		return null;
	};

	render() {
		const {
			children,
			defaultColumns,
			buttonLabel,
			disableColumns,
			storage,
			...rest
		} = this.props;
		const { selection, modalOpened } = this.state;

		return (
			<>
				{disableColumns ? null : (
					<>
						<Toolbar style={{ justifyContent: 'flex-end' }}>
							<Button
								aria-label="add"
								label={buttonLabel}
								onClick={this.handleOpen}
							>
								<Icon>view_column</Icon>
							</Button>
						</Toolbar>
						{modalOpened && (
							<SelectionDialog
								columns={this.getColumnLabels()}
								onClose={this.handleClose}
								onColumnClicked={this.toggleColumn}
								selection={selection}
							/>
						)}
					</>
				)}
				<Datagrid {...rest}>
					{React.Children.map(children, this.renderChild)}
				</Datagrid>
			</>
		);
	}
}
