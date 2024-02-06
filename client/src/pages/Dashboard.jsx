import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
	const location = useLocation();
	const [tab, setTab] = useState('');
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get('tab');
		if (tabFromUrl) {
			setTab(tabFromUrl);
		}
	}, [location.search]);
	return (
		<div className='flex flex-col md:flex-row'>
			<div className='sticky top-0 z-10 md:static md:w-56 bg-gray-50 dark:bg-gray-800'>
				{/* Sidebar */}
				<DashSidebar />
			</div>
			{/* profile... */}
			{tab === 'profile' && <DashProfile />}
			{/* posts... */}
			{tab === 'posts' && <DashPosts />}
			{/* users */}
			{tab === 'users' && <DashUsers />}
			{/* comments  */}
			{tab === 'bills' && <DashComments />}
			{/* dashboard comp */}
			{tab === 'dash' && <DashboardComp />}
		</div>
	);
}
