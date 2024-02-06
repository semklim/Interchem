import { useEffect, useState, memo, useRef } from 'react';
import FoodCard from '../components/FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentShift } from '../redux/cart/cartSlice';
import { billIsExpires } from '../helpers/dateHelpers';

export default memo(function Home() {
	const [foods, setFoods] = useState([]);
	const { currentShift, bill } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const tomorrow = useRef(new Date());

	const onChangeHandle = (e) => {
		dispatch(setCurrentShift(e.target.value));
	};

	useEffect(() => {
		const fetchFoods = async () => {
			const res = await fetch('/api/food-by-shift?shift=' + currentShift);
			const data = await res.json();
			const now = new Date(data.food[0].createdAt);
			const isExpires = billIsExpires(now.toISOString());
			if (isExpires) {
				setFoods([]);
			} else {
				setFoods(data.food);
				tomorrow.current = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
			}
		};
		fetchFoods();
	}, [currentShift]);
	return (
		<div className='max-w-6xl mx-auto px-3 flex flex-col'>
			<h1 className='flex flex-col text-center text-4xl font-bold mt-2 lg:font-extrabold lg:text-6xl'>
				Меню
				<span className='text-xl'>
					на{' '}
					<span className='capitalize'>
						{new Intl.DateTimeFormat('uk', {
							year: '2-digit',
							month: '2-digit',
							day: '2-digit',
							weekday: 'short',
						}).format(tomorrow.current)}
					</span>
				</span>
			</h1>
			<form className='flex items-center text-xl justify-evenly my-6 sm:text-xl sm:justify-center sm:gap-20 select-none'>
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
			{foods && foods.length > 0 ? (
				<div className='flex flex-wrap gap-4 mb-3 sm:max-w-3xl mx-auto select-none'>
					{foods.map((food) => (
						<FoodCard
							key={food._id}
							food={food}
							billQuantity={bill[food._id] && bill[food._id].quantity}
						/>
					))}
				</div>
			) : (
				<div className=' mt-40 flex justify-center items-center flex-col flex-auto text-2xl text-center select-none'>
					<h1 className='my-3 font-semibold uppercase'>Меню оновлюється.</h1>
					<p>Зачекайте будь-ласка.</p>
				</div>
			)}
		</div>
	);
});
