import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/cart/cartSlice';
import { CartItem } from '../components/CartItem';
import { CartHeader } from '../components/CartHeader';
import img from '../assets/choose-food.webp';
export default function Cart() {
	const { amountFood, bill, totalPrice, currentShift } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);
	const [showThanks, setShowThanks] = useState(false);
	const billArr = Object.values(bill).slice(1);

	const isHidden = amountFood > 0 ? '' : ' hidden';
	const imgStyle = amountFood > 0 ? ' hidden' : '';
	const aditionalStyle = amountFood > 0 ? '' : ' flex flex-col';
	const isDisabled = !currentUser
		? ' bg-neutral-500'
		: ' bg-gradient-to-bl from-[#70b441] to-[#0e803c]';

	const payHandler = async () => {
		if (!currentUser) {
			return;
		}

		const createBill = {
			totalPrice,
			amountFood,
			currentShift,
			items: billArr,
			userId: currentUser._id,
		};
		try {
			const res = await fetch('/api/bill/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(createBill),
			});
			if (res.ok) {
				dispatch(reset());
				setShowThanks(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (showThanks) {
		return (
			<section className='flex flex-col min-h-[calc(100vh_-_104px)] m-5 relative'>
				<div className='flex justify-center flex-col items-center flex-auto'>
					<div className='flex-auto flex justify-center items-center'>
						<div className='py-5 bg-stone-200 text-gray-900 dark:bg-slate-800 dark:text-white rounded-lg'>
							<h1 className='font-bold text-4xl text-center'>
								Ви оформили замовлення <span className='text-lime-600 block mt-10'>Успішно!</span>
							</h1>
						</div>
					</div>
					<p className=' justify-items-end text-xl text-center'>
						Переглянути або відмінити чек можна в особистому кабінеті
					</p>
				</div>
			</section>
		);
	}
	return (
		<section className='flex flex-col min-h-[calc(100vh_-_104px)] m-5 relative'>
			<div className={'flex-auto' + aditionalStyle}>
				<CartHeader amountFood={amountFood} currentShift={currentShift} />
				{billArr.map((value) => {
					return <CartItem key={value.food._id} id={value.food._id} value={value} />;
				})}
				<h3 className={'flex justify-center items-center text-2xl gap-5 mt-5 font-bold' + isHidden}>
					<span>До сплати</span>
					<span className='font-extrabold text-lime-600 dark:text-lime-500'>{totalPrice} грн.</span>
				</h3>
				<div className={'flex flex-auto justify-center items-center h-full' + imgStyle}>
					<img src={img} alt='' />
				</div>
			</div>
			<div className={'mb-12 flex justify-center items-center' + isHidden}>
				<button
					className={'py-5 px-7 rounded-3xl text-white font-bold text-2xl uppercase' + isDisabled}
					disabled={!currentUser}
					onClick={payHandler}
				>
					{currentUser ? 'Оплатити' : 'Увійдіть для того щоб замовити'}
				</button>
			</div>
		</section>
	);
}
