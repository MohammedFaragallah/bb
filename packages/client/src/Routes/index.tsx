import loadable from '@loadable/component';
import React from 'react';
import { Routes } from 'react-router-dom';

import { Loading, Route } from 'Components';
import { Story, StoryTypeCat, StoryTypeHome } from 'Components/Stories';
import { Paths } from 'Constants';
import { Layout } from 'Layout';
import { AuthLayout } from 'Pages/Auth/AuthLayout';
import { Forgot } from 'Pages/Auth/Forgot';
import { Login } from 'Pages/Auth/Login';
import { Reset as ResetPage } from 'Pages/Auth/Reset';
import { Champion } from 'Pages/Community/Champion';
import { CommunityHome } from 'Pages/Community/Home';
import { Sport } from 'Pages/Community/Sport';
import { Event } from 'Pages/Events/Event';
import { EventsHome } from 'Pages/Events/Home';
import { Exercise } from 'Pages/Exercises/Exercise';
import { HomeExercise } from 'Pages/Exercises/Home';
import { NotFound } from 'Pages/NotFound';
import { Address } from 'Pages/Profile/Address';
import { CreateArticle } from 'Pages/Profile/CreateArticle';
import { Details } from 'Pages/Profile/Details';
import { PrivateProfileLayout } from 'Pages/Profile/PrivateProfileLayout';
import { ProfileStories } from 'Pages/Profile/ProfileStories';
import { AuthorDetails } from 'Pages/PublicProfile/AuthorDetails';
import { AuthorLayout } from 'Pages/PublicProfile/AuthorLayout';
import { AuthorStories } from 'Pages/PublicProfile/AuthorStories';
import { Reset } from 'Pages/Reset';
import { Cart } from 'Pages/Store/Cart';
import { Checkout } from 'Pages/Store/Checkout';
import { HomeStore } from 'Pages/Store/Home';
import { Product } from 'Pages/Store/Product';
import { ProductCat } from 'Pages/Store/ProductCat';

const fallback = { fallback: <Loading /> };

const loadablePage = (path: string) =>
	loadable(async () => {
		const Comp = await import(`Pages/${path}`);
		return Comp[path];
	}, fallback);

const Callback = loadablePage('Callback');
const Home = loadablePage('Home');
const SiteMap = loadablePage('SiteMap');
const Verify = loadablePage('Verify');
const Privacy = loadablePage('Privacy');
const Terms = loadablePage('Terms');

const Signup = loadable(async () => {
	const { Signup } = await import('Pages/Auth/Signup');
	return Signup;
}, fallback);

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
	return (
		<Layout>
			<Routes>
				<Route path={Paths.HOME}>
					<Home />
				</Route>
				<Route path={Paths.SITE_MAP}>
					<SiteMap />
				</Route>
				<Route path={Paths.ARTICLES}>
					<Route path="/">
						<StoryTypeHome />
					</Route>
					<Route path=":categoryId">
						<StoryTypeCat />
					</Route>
					<Route path=":categoryId/:storyId">
						<Story />
					</Route>
				</Route>
				<Route path={Paths.COMMUNITY}>
					<Route path="/">
						<CommunityHome />
					</Route>
					<Route path=":sportId">
						<Sport />
					</Route>
					<Route path=":sportId/:championId">
						<Champion />
					</Route>
				</Route>
				<Route path={Paths.EVENTS}>
					<Route path="/">
						<EventsHome />
					</Route>
					<Route path=":eventId">
						<Event />
					</Route>
				</Route>
				<Route path={Paths.STORE}>
					<Route path="/">
						<HomeStore />
					</Route>
					<Route path=":categoryId">
						<ProductCat />
					</Route>
					<Route path=":categoryId/:productId">
						<Product />
					</Route>
					<Route authenticated path={Paths.CART}>
						<Cart />
					</Route>
					<Route authenticated path={Paths.CHECKOUT}>
						<Checkout />
					</Route>
				</Route>
				<Route path={Paths.TERMS}>
					<Terms />
				</Route>
				<Route path={Paths.PRIVACY}>
					<Privacy />
				</Route>
				<Route path={Paths.EXERCISES}>
					<Route path="/">
						<HomeExercise />
					</Route>
					<Route path=":exerciseId">
						<Exercise />
					</Route>
				</Route>
				<Route
					authenticated
					element={<PrivateProfileLayout />}
					path={Paths.PROFILE}
				>
					<Route path="/">
						<Details />
					</Route>
					<Route path={Paths.ARTICLES}>
						<Route path="/">
							<ProfileStories />
						</Route>
						<Route path="/create">
							<CreateArticle />
						</Route>
					</Route>
					<Route path={Paths.MAIN_ADDRESS}>
						<Address />
					</Route>
					<Route path={Paths.SECONDARY_ADDRESS}>
						<Address />
					</Route>
					<Route element={<NotFound />} path="*" />
				</Route>
				<Route element={<AuthorLayout />} path={`${Paths.AUTHOR}/:userId`}>
					<Route path="/">
						<AuthorDetails />
					</Route>
					<Route path={Paths.ARTICLES}>
						<AuthorStories />
					</Route>
					<Route element={<NotFound />} path="*" />
				</Route>
				<Route authenticated={false} path={Paths.CALLBACK}>
					<Callback />
				</Route>
				<Route authenticated={false} element={<AuthLayout />} path={Paths.AUTH}>
					<Route path={Paths.LOGIN}>
						<Login />
					</Route>
					<Route path={Paths.SIGNUP}>
						<Signup />
					</Route>
					<Route path={Paths.FORGOT}>
						<Forgot />
					</Route>
					<Route path={Paths.RESET}>
						<ResetPage />
					</Route>
				</Route>
				<Route authenticated={false} path={Paths.VERIFY}>
					<Verify />
				</Route>
				<Route authenticated={false} path={Paths.RESET}>
					<Reset />
				</Route>
				<Route path={Paths.NOT_FOUND}>
					<NotFound />
				</Route>
				<Route element={<NotFound />} path="*" />
			</Routes>
		</Layout>
	);
};
