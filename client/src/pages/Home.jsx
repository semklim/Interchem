import { useEffect, useState, memo } from 'react';
import FoodCard from '../components/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentShift } from '../redux/cart/cartSlice';

export default memo(function Home() {
	const [posts, setPosts] = useState([]);
	const { currentShift, bill } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const onChangeHandle = (e) => {
		dispatch(setCurrentShift(e.target.value));
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch('/api/food-by-shift?shift=' + currentShift);
			const data = await res.json();
			setPosts(data.food);
		};
		fetchPosts();
	}, [currentShift]);
	return (
		<div className='max-w-6xl mx-auto px-3 flex flex-col'>
			<h1 className='flex flex-col text-center text-4xl font-bold mt-2 lg:font-extrabold lg:text-6xl'>
				Меню
				<span className='text-xl'>
					{new Intl.DateTimeFormat('uk', {
						year: '2-digit',
						month: '2-digit',
						day: '2-digit',
					}).format(new Date())}
				</span>
			</h1>
			<form className='flex items-center text-xl justify-evenly my-6 lg:text-xl lg:justify-center lg:gap-20 select-none'>
				<label
					className={`${currentShift === 'first' && 'active rounded-lg font-bold'} p-2`}
					htmlFor='firstShift'
				>
					<input
						className='hidden'
						type='radio'
						name='shift'
						value='first'
						onChange={onChangeHandle}
						checked={currentShift === 'first'}
						id='firstShift'
					/>
					Перша змінa
				</label>
				<label
					className={`${currentShift === 'second' && 'active rounded-lg font-bold'} p-2`}
					htmlFor='secondShift'
				>
					<input
						className='hidden'
						type='radio'
						name='shift'
						value='second'
						id='secondShift'
						checked={currentShift === 'second'}
						onChange={onChangeHandle}
					/>
					Друга зміна
				</label>
			</form>
			{posts && posts.length > 0 && (
				<div className='flex flex-wrap gap-4 mb-3 lg:max-w-3xl mx-auto select-none'>
					{posts.map((food) => (
						<FoodCard
							key={food._id}
							food={food}
							quantity={bill[food._id] && bill[food._id].quantity}
							currentShift={currentShift}
							billShift={bill[food._id] && bill[food._id].shift}
						/>
					))}
				</div>
			)}
		</div>
	);
});
