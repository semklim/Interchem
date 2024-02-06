import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
	const { theme } = useSelector((state) => state.theme);
	return (
		<div className={theme}>
			<div className='bg-gray-50 text-neutral-900 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen flex flex-col-reverse md:flex-col transition-all duration-500'>
				{children}
			</div>
		</div>
	);
}
