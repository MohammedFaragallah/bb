import { Box, IconButton } from '@material-ui/core';
import { Print, Share as ShareIcon } from '@material-ui/icons';
import noop from 'lodash/noop';
import React from 'react';
import { SocialIcon } from 'react-icons-context';
import { useDispatch } from 'react-redux';
import {
	EmailShareButton,
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';

import { Icon, Typography } from 'Components';
import { setPrintMode } from 'Store';

interface Props {
	url?: string;
	title?: string;
	downloadable?: boolean;
}

export const Share: React.FC<Props> = props => {
	const { url = window.location.href, title, downloadable } = props;
	const dispatch = useDispatch();

	window.onafterprint = function () {
		dispatch(setPrintMode(false));
	};

	return (
		<Box
			sx={{
				alignContent: 'center',
				alignItems: 'center',
				display: 'flex',
				displayPrint: 'none',
				m: 2,
			}}
		>
			<Typography>{'Share with '} </Typography>
			{navigator?.share ? (
				<Box
					sx={{
						ml: 2,
						mr: 1,
					}}
				>
					<IconButton
						onClick={() => {
							if (navigator.share)
								navigator
									.share({ title, text: title, url })
									// TODO: add google analytics event
									.then(noop)
									.catch(noop);
						}}
					>
						<ShareIcon />
					</IconButton>
				</Box>
			) : (
				<>
					<Box
						sx={{
							ml: navigator?.share ? 0 : 2,
							mr: 1,
						}}
					>
						<FacebookShareButton quote={title} url={url}>
							<SocialIcon network="facebook" />
						</FacebookShareButton>
					</Box>
					<Box
						sx={{
							mr: 1,
						}}
					>
						<TwitterShareButton title={title} url={url}>
							<SocialIcon network="twitter" />
						</TwitterShareButton>
					</Box>
					<Box
						sx={{
							mr: 1,
						}}
					>
						<WhatsappShareButton title={title} url={url}>
							<SocialIcon network="whatsapp" />
						</WhatsappShareButton>
					</Box>
					<Box
						sx={{
							mr: 1,
						}}
					>
						<EmailShareButton subject={title} url={url}>
							<SocialIcon network="email" />
						</EmailShareButton>
					</Box>
					{downloadable && (
						<Box
							sx={{
								mr: 1,
							}}
						>
							<Icon
								bgColor="primary"
								onClick={() => {
									dispatch(setPrintMode(true));
									window.print();
								}}
								shape="circular"
								size="small"
							>
								<Print />
							</Icon>
						</Box>
					)}
				</>
			)}
		</Box>
	);
};
