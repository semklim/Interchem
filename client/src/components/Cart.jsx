import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from './CartItem';
import { CartHeader } from './CartHeader';
import { reset } from '../redux/cart/cartSlice';
import img from '../assets/choose-food.webp';
import { useNavigate } from 'react-router-dom';
export const Cart = () => {
	const { amountFood, bill, totalPrice, currentShift } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);
	const billArr = Object.values(bill).slice(1);

	const isHidden = amountFood > 0 ? '' : ' hidden';
	const imgStyle = amountFood > 0 ? ' hidden' : '';
	const aditionalStyle = amountFood > 0 ? '' : ' flex flex-col';
	const isDisabled = !currentUser
		? ' bg-neutral-500'
		: ' bg-gradient-to-bl from-[#70b441] to-[#0e803c]';

	const payHandler = async (e) => {
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
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

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
};
