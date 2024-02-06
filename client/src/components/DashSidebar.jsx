import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaMoneyCheckAlt } from 'react-icons/fa';

export default function DashSidebar() {
	const location = useLocation();
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const [tab, setTab] = useState('');
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get('tab');
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);
	const handleSignout = async () => {
		try {
			const res = await fetch('/api/user/signout', {
				method: 'POST',
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				dispatch(signoutSuccess());
			}
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<Sidebar className='sticky top-0 w-full md:top-[64px] md:h-auto md:w-56'>
			<Sidebar.Items className='sticky top-0'>
				<Sidebar.ItemGroup className=''>
					<Sidebar.Item
						icon={HiArrowSmRight}
						className='cursor-pointer m-0 tetrttttr'
						onClick={handleSignout}
						theme={{ listItem: 'm-0' }}
					>
						Вийти
					</Sidebar.Item>
					{currentUser && (
						<Link to='/dashboard?tab=dash'>
							<Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie} as='div'>
								Головна Панель
							</Sidebar.Item>
						</Link>
					)}
					{currentUser && (
						<Link to='/dashboard?tab=bills'>
							<Sidebar.Item active={tab === 'bills' || !tab} icon={FaMoneyCheckAlt} as='div'>
								Усі Чеки
							</Sidebar.Item>
						</Link>
					)}
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}
