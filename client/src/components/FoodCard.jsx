import { useDispatch } from 'react-redux';
import {
	addFoodToBill,
	decrementFood,
	deleteFoodFromBill,
	incrementFood,
} from '../redux/cart/cartSlice';
import { memo, useState } from 'react';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';

export default memo(function FoodCard({ food, billQuantity = 0 }) {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(billQuantity);

	const incrementHandler = (e) => {
		if (quantity <= 0) {
			dispatch(addFoodToBill(food));
		} else {
			dispatch(incrementFood({ id: food._id }));
		}
		if (quantity < 3) setQuantity((prev) => (prev += 1));
	};

	const decrementHandler = (e) => {
		if (quantity > 1) {
			dispatch(decrementFood({ id: food._id }));
		} else {
			dispatch(deleteFoodFromBill({ id: food._id }));
		}
		setQuantity((prev) => (prev -= 1));
	};

	return (
		<div
			className={
				'group h-[90px] relative p-5 shadow-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white overflow-hidden rounded-lg transition-all flex-[1_1_49%] sm:flex-[1_1_40%] flex items-center duration-200'
			}
		>
			<div>
				<h2 className='headerName font-bold text-xl lg:text-2xl'>{food.name}</h2>
				<p className='headerPrice font-medium text-lime-600 dark:text-lime-500  text-xl'>
					{food.price} грн.
				</p>
			</div>
			<div className=' absolute bottom-2 right-2 flex justify-start items-center lg:justify-center mt-3 gap-4 '>
				{quantity > 0 && (
					<>
						<button>
							<LuMinusCircle
								className='text-lime-600 dark:text-lime-500'
								size={25}
								onClick={decrementHandler}
							/>
						</button>
						<span className='select-none text-lg font-bold'>{quantity}</span>
					</>
				)}
				<button>
					<LuPlusCircle
						className='text-lime-600 dark:text-lime-500'
						size={25}
						onClick={incrementHandler}
					/>
				</button>
			</div>
		</div>
	);
});
