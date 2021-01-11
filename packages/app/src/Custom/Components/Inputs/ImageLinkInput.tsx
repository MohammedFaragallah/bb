import {
	Icon,
	IconButton,
	InputAdornment,
	makeStyles,
	Tooltip,
} from '@material-ui/core';
import isUrl from 'is-url';
import get from 'lodash/get';
import React from 'react';
import { InputProps, TextInput } from 'react-admin';
import { Img } from 'react-image';

import { ImageLoader } from 'Custom';
import { checkImageURL } from 'Utils';

const useStyles = makeStyles(theme => {
	const { palette } = theme;

	return {
		success: { color: palette.success.main },
		error: { color: palette.error.main },
	};
});

const ImageLinkInput: React.FC<InputProps> = props => {
	const { formData, getSource, field, source, helperText } = props;
	const classes = useStyles();
	const meField = field || 'secure_url';
	const meSource = `${getSource?.(source) || source}.${meField}`;

	const imageLink = get(formData, meSource);
	const isImageLink = isUrl(imageLink) && checkImageURL(imageLink);

	const result = props.source.replace(/([A-Z])/g, ' $1');
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

	return (
		<>
			{isImageLink && (
				<Img
					alt={finalResult}
					height="auto"
					loader={<ImageLoader height={250} width={500} />}
					src={[imageLink]}
					width={500}
				/>
			)}
			<TextInput
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Tooltip title={isImageLink ? 'Valid' : 'Invalid'}>
								<IconButton>
									{isImageLink ? (
										<Icon className={classes.success}>done_all</Icon>
									) : (
										<Icon className={classes.error}>warning</Icon>
									)}
								</IconButton>
							</Tooltip>
						</InputAdornment>
					),
				}}
				fullWidth
				helperText={helperText}
				label={finalResult}
				source={meSource}
			/>
		</>
	);
};

export { ImageLinkInput };
