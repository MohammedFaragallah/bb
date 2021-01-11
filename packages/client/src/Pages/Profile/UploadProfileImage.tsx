import {
	Box,
	BoxProps,
	CircularProgress,
	IconButton,
	makeStyles,
	Tooltip,
	Zoom,
} from '@material-ui/core';
import { Camera } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from 'Components';
import { FIRST_ITEM } from 'Constants';
import { handleUploads } from 'Helpers';
import { UserSelector } from 'Selectors';
import { enqueueSnackbar, updateUser } from 'Store';

const useStyles = makeStyles(theme => {
	const { palette, spacing } = theme;

	return {
		fabProgress: {
			color: palette.secondary.main,
			position: 'absolute',
			marginLeft: 'auto',
			marginRight: 'auto',
			left: 0,
			right: 0,
			zIndex: 1,
		},
		upload: {
			position: 'absolute',
			bottom: spacing(-2),
			left: spacing(-2),
		},
	};
});

interface Props extends BoxProps {}

export const UploadProfileImage: React.FC<Props> = props => {
	const { children, ...rest } = props;
	const user = useSelector(UserSelector);

	const classes = useStyles();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const onDrop = useCallback(
		async acceptedFiles => {
			setLoading(true);
			try {
				const profileImage = await handleUploads(acceptedFiles[FIRST_ITEM]);

				dispatch(updateUser({ profileImage }, 'Profile Image'));

				setLoading(false);
			} catch (error) {
				dispatch(
					enqueueSnackbar({
						message: error.message,
						options: {
							variant: 'warning',
						},
					}),
				);
				setLoading(false);
			}
		},
		[dispatch],
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
	});

	if (!user) return null;

	return (
		<Box {...getRootProps()} className={classes.upload} {...rest}>
			<input {...getInputProps()} />
			<Tooltip
				TransitionComponent={Zoom}
				placement="bottom"
				title="Upload Profile Picture"
			>
				<IconButton disabled={loading}>
					<Icon bgColor="secondary" color="primary" shape="circular">
						<Camera />
					</Icon>
					{loading && (
						<CircularProgress className={classes.fabProgress} size={42} />
					)}
				</IconButton>
			</Tooltip>
		</Box>
	);
};
