import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import { Cart } from './components/Cart';

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className='flex-auto'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route element={<PrivateRoute />}>
						<Route path='/dashboard' element={<Dashboard />} />
					</Route>
					<Route element={<OnlyAdminPrivateRoute />}>
						<Route path='/create-post' element={<CreatePost />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}
