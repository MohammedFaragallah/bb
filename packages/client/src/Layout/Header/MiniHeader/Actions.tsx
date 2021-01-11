import {
	Collapse,
	Divider,
	ListItem,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import { ExitToApp, Language } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'react-use';

import { Icon, LoginLink, Typography, UserIsAuthenticated } from 'Components';
import { useTranslation } from 'Hooks';
import { LocaleSelector } from 'Selectors';
import { changeLanguage, logout, setMiniMenu } from 'Store';
import { LocalizationLanguages } from 'localization';

const useStyles = makeStyles({
	listItemText: {
		paddingLeft: 0,
		marginLeft: 0,
	},
});

interface Props {}

export const MiniHeaderActions: React.FC<Props> = () => {
	const { locale } = useSelector(LocaleSelector);
	const dispatch = useDispatch();
	const [open, setOpen] = useToggle(false);
	const classes = useStyles();
	const translate = useTranslation();

	return (
		<>
			<Divider light />
			<ListItem aria-label="Change Language" button divider onClick={setOpen}>
				<Icon push="right" size="small">
					<Language />
				</Icon>
				<ListItemText
					className={classes.listItemText}
					primary={<Typography>{translate('nav.actions.language')}</Typography>}
				/>
			</ListItem>
			<Collapse in={open}>
				{Object.values(LocalizationLanguages).map(language => (
					<ListItem
						dense
						key={language.code}
						onClick={() => {
							dispatch(setMiniMenu(false));
							dispatch(changeLanguage(language.code));
						}}
						selected={locale.code === language.code}
					>
						<ListItemText inset primary={language.label} />
					</ListItem>
				))}
			</Collapse>
			<UserIsAuthenticated
				fallback={
					<LoginLink>
						<ListItem
							aria-label="Login"
							button
							color="textPrimary"
							onClick={() => dispatch(setMiniMenu(false))}
						>
							<Icon
								push="right"
								size="small"
								style={{ transform: 'rotate(180deg)' }}
							>
								<ExitToApp />
							</Icon>
							<ListItemText
								className={classes.listItemText}
								primary={<Typography>Login</Typography>}
							/>
						</ListItem>
					</LoginLink>
				}
			>
				<ListItem
					aria-label="Logout"
					button
					onClick={() => {
						dispatch(setMiniMenu(false));
						dispatch(logout());
					}}
				>
					<Icon push="right" size="small">
						<ExitToApp />
					</Icon>
					<ListItemText
						className={classes.listItemText}
						primary={<Typography>{translate('nav.actions.logout')}</Typography>}
					/>
				</ListItem>
			</UserIsAuthenticated>
		</>
	);
};
