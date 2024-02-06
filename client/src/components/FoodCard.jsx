import { useDispatch } from 'react-redux';
import { addFoodToBill } from '../redux/cart/cartSlice';
import { memo, useState } from 'react';

export default memo(function FoodCard({ food, quantity = 0, currentShift, billShift = 'first' }) {
	const dispatch = useDispatch();
	const [newQuantity, setNewQuantity] = useState(quantity);
	let activeStyle =
		' active:dark:shadow-[0_3px_5px_2px_rgba(14,159,110,0.8)] active:dark:text-white active:shadow-[0_3px_5px_2px_rgba(14,159,110,0.8)] active:translate-y-1';

	if (newQuantity > 3 || currentShift !== billShift) {
		activeStyle =
			' active:dark:bg-red-600 active:dark:text-white active:bg-red-600 active:text-white';
	}

	const onClickHandle = (e) => {
		setNewQuantity((prev) => (prev += 1));
		dispatch(addFoodToBill(food));
	};

	return (
		<div
			className={
				'group h-[85px] lg:h-[60px] border-2 bg-stone-200 text-gray-900 dark:bg-slate-800 dark:text-white border-transparent overflow-hidden rounded-lg transition-all flex-[1_1_120px] lg:flex-[1_1_45%] text-center flex flex-col justify-strech items-center duration-200' +
				activeStyle
			}
			onClick={onClickHandle}
		>
			<h2 className='headerName flex-auto font-bold text-xl lg:text-2xl'>{food.name}</h2>
			<p className='headerPrice flex-initial font-medium text-lime-600 dark:text-lime-500  text-xl'>
				{food.price} грн.
			</p>
		</div>
	);
});
