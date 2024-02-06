/* eslint-disable no-unused-vars */
import { Button } from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { IoCart, IoCartOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { PiUserCircleThin } from 'react-icons/pi';

export default function Header() {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const { amountFood } = useSelector((state) => state.cart);
	const { theme } = useSelector((state) => state.theme);

	return (
		<nav className='w-full h-16 bg-white border-t-2 border-gray-400 dark:bg-gray-800 sticky bottom-0 md:border-t-0 md:border-b-2 md:top-0 flex items-center justify-center gap-10 z-20'>
			{currentUser ? (
				<NavLink to='/dashboard?tab=dash' className='rounded-full'>
					<PiUserCircleThin size={40} title={'Користувач'} />
				</NavLink>
			) : (
				<Link to='/sign-in'>
					<Button
						className='bg-gradient-to-br from-[#70b441] to-[#0e803c] enabled:hover:bg-gradient-to-bl'
						outline
					>
						Увійти
					</Button>
				</Link>
			)}
			<NavLink to='/' className='p-1 border-0 rounded-full'>
				<IoMdHome
					size={30}
					title={'Меню'}
					className='items-center flex justify-center  transition-all duration-75 ease-in group-hover:bg-opacity-0 group-enabled:group-hover:text-gray-200 dark:text-white w-full border border-transparent'
				></IoMdHome>
			</NavLink>
			<NavLink to='/cart' className='p-1 border-0 rounded-full relative'>
				{!amountFood ? (
					<IoCartOutline
						size={30}
						title={'Замовлення'}
						className='items-center flex justify-center transition-all duration-75 ease-in group-hover:bg-opacity-0 group-enabled:group-hover:text-gray-200 dark:text-white w-full border border-transparent'
					/>
				) : (
					<>
						<IoCart
							size={30}
							title={'Замовлення'}
							className='items-center flex justify-center transition-all duration-75 ease-in group-hover:bg-opacity-0 group-enabled:group-hover:text-gray-200 dark:text-white w-full border border-transparent'
						/>
						<div className='w-5 h-5 flex justify-center items-center text-center absolute bg-red-500 rounded-full text-white top-0 -right-2'>
							{amountFood}
						</div>
					</>
				)}
			</NavLink>
			<Button
				className='w-12 h-10 inline'
				color='gray'
				pill
				onClick={() => dispatch(toggleTheme())}
			>
				{theme === 'light' ? <FaSun /> : <FaMoon />}
			</Button>
		</nav>
	);
}
