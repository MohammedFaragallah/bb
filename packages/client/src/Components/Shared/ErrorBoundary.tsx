import { Container, Link } from '@material-ui/core';
import React, { Component, ErrorInfo } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';

import { CenteredMessage } from 'Components';
import { Paths } from 'Constants';

interface BoundaryState {
	error: Error | null;
	info: ErrorInfo | null;
}

export class ErrorBoundary extends Component<any, BoundaryState> {
	state: BoundaryState = { error: null, info: null };

	static getDerivedStateFromError(error: any) {
		// Update state so the next render will show the fallback UI.
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		this.setState({ error, info });
	}

	render() {
		const { error } = this.state;
		const { children } = this.props;

		if (error !== null) {
			return (
				<Container component="main">
					<Helmet>
						<title>
							{[
								<FormattedMessage id="label.error" />,
								process.env.REACT_APP_NAME,
							].join(' | ')}
						</title>
					</Helmet>
					<CenteredMessage>
						<FormattedMessage id="label.error" />
						<Link color="textPrimary" href={Paths.HOME} underline="none">
							<FormattedMessage id="label.go" />{' '}
							<FormattedMessage id="pageTitle.home" />
						</Link>
					</CenteredMessage>
				</Container>
			);
		}

		return children || null;
	}
}
