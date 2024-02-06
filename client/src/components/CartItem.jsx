import { memo } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { LuPlusCircle, LuMinusCircle } from 'react-icons/lu';
import { decrementFood, deleteFoodFromBill, incrementFood } from '../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';

export const CartItem = memo(function Item({ id, value: { price, quantity, food } }) {
	const dispatch = useDispatch();

	const onClickHandler = (e) => {
		dispatch(deleteFoodFromBill({ id }));
	};

	const increment = (e) => {
		dispatch(incrementFood({ id }));
	};

	const decrement = (e) => {
		dispatch(decrementFood({ id }));
	};

	return (
		<section className='mx-auto max-w-6xl flex shadow-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white mt-8 px-5 py-2 dark:bg-slate-800 rounded-xl'>
			<div className='flex-auto text-xl'>
				<h2 className='font-bold'>{food.name}</h2>
				<p className='font-extrabold text-lime-600 dark:text-lime-500 lg:text-center'>
					{food.price} грн.
				</p>
				<div className='flex justify-start items-center lg:justify-center mt-3 gap-4'>
					<button>
						<LuMinusCircle size={25} onClick={decrement} />
					</button>
					<span className='select-none text-lg font-bold'>{quantity}</span>
					<button>
						<LuPlusCircle size={25} onClick={increment} />
					</button>
				</div>
			</div>
			<div className='flex justify-center items-center'>
				<button>
					<IoIosCloseCircleOutline
						className='text-red-700 dark:text-red-500'
						size={40}
						onClick={onClickHandler}
					/>
				</button>
			</div>
		</section>
	);
});
