import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiArrowNarrowUp } from 'react-icons/hi';
import { FaMoneyBillAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import { LuCroissant } from 'react-icons/lu';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { billIsExpires, formateDate } from '../helpers/dateHelpers';
import { ModalAlert } from './ModalAlert';

export default function DashboardComp() {
	const [totalBills, setTotalBills] = useState(0);
	const [lastMonthBills, setLastMonthBills] = useState(0);
	const [lastDayBills, setLastDayBills] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [billIdToDelete, setBillIdToDelete] = useState('');
	const { currentUser } = useSelector((state) => state.user);

	const validCheckDate = (date) => {
		const now = new Date(date);
		let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();
		return formateDate(tomorrow);
	};

	const deleteBill = async () => {
		setShowModal(false);
		try {
			const res = await fetch('/api/bill/delete/' + billIdToDelete, {
				method: 'DELETE',
			});
			const data = await res.json();
			if (res.ok) {
				setLastDayBills((prev) => prev.filter((bill) => bill._id !== billIdToDelete));
				setShowModal(false);
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		const fetchAllBills = async () => {
			try {
				const res = await fetch('/api/bill/all?sort=desc');
				const data = await res.json();
				if (res.ok) {
					setTotalBills(data.totalBills);
					setLastMonthBills(data.totalLastMonthBills);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		const fetchLatestBills = async () => {
			try {
				const res = await fetch('/api/bill/latest');
				const data = await res.json();
				if (res.ok) {
					setLastDayBills(data.latestBills);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		fetchLatestBills();
		fetchAllBills();
	}, [currentUser]);

	return (
		<div className='p-3 md:mx-auto'>
			<div className='flex-wrap flex gap-4 justify-center'>
				<div className='flex flex-col p-3 bg-white dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
					<div className='flex justify-between'>
						<div className=''>
							<h3 className='text-gray-500 text-md uppercase'>З&apos;їдено булочок</h3>
							<p className='text-2xl'>0</p>
						</div>
						<LuCroissant className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
					</div>
					<div className='flex  gap-2 text-sm'>
						<span className='text-green-500 flex items-center'>
							<HiArrowNarrowUp />0
						</span>
						<div className='text-gray-500'>За минулий місяць</div>
					</div>
				</div>
				<div className='flex flex-col p-3 bg-white dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
					<div className='flex justify-between'>
						<div className=''>
							<h3 className='text-gray-500 text-md uppercase'>Всього замовлень</h3>
							<p className='text-2xl'>{totalBills}</p>
						</div>
						<FaMoneyCheckAlt className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
					</div>
					<div className='flex  gap-2 text-sm'>
						<span className='text-green-500 flex items-center'>
							<HiArrowNarrowUp />
							{lastMonthBills}
						</span>
						<div className='text-gray-500'>За минулий місяць</div>
					</div>
				</div>
				<div className='flex flex-col p-3 bg-white dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
					<div className='flex justify-between'>
						<div className=''>
							<h3 className='text-gray-500 text-md uppercase'>Всього витрачено</h3>
							<p className='text-2xl'>300</p>
						</div>
						<FaMoneyBillAlt className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
					</div>
					<div className='flex  gap-2 text-sm'>
						<span className='text-green-500 flex items-center'>
							<HiArrowNarrowUp />
							50
						</span>
						<div className='text-gray-500'>За минулий місяць</div>
					</div>
				</div>
			</div>
			<div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
				<div className='md:w-full flex flex-col shadow-md p-2 rounded-md bg-white dark:bg-gray-800 [&>*:nth-child(n+2)]:mt-3'>
					<div className='flex justify-between  p-3 font-semibold'>
						<h1 className='text-center p-2'>Останні чеки</h1>
						<Link to={'/dashboard?tab=bills'}>
							<Button
								className='bg-gradient-to-br from-[#70b441] to-[#0e803c] enabled:hover:bg-gradient-to-bl'
								outline
							>
								Всі Чеки
							</Button>
						</Link>
					</div>
					{lastDayBills &&
						lastDayBills.map((bill) => (
							<div key={bill._id}>
								<h3 className='py-2 font-bold text-gray-700 dark:text-gray-200'>
									Чек на {validCheckDate(bill.createdAt)}
								</h3>
								<Table hoverable className='border-2 md:text-center'>
									<Table.Head>
										<Table.HeadCell className='max-w-[300px]'>Страва</Table.HeadCell>
										<Table.HeadCell className='p-0'>Кількість</Table.HeadCell>
										<Table.HeadCell className=''>Ціна</Table.HeadCell>
									</Table.Head>
									<Table.Body className='divide-y'>
										{bill.items.map(({ food, quantity }) => {
											return (
												<Table.Row key={bill._id + food._id}>
													<Table.Cell className='max-w-[300px]'>
														<h2>{food.name}</h2>
													</Table.Cell>
													<Table.Cell>
														<p>{quantity}</p>
													</Table.Cell>
													<Table.Cell className='whitespace-nowrap'>{food.price} грн.</Table.Cell>
												</Table.Row>
											);
										})}
										<Table.Row className='font-medium'>
											{billIsExpires(bill.createdAt) ? (
												<Table.Cell className='text-center'>Чек поверненню не підлягає</Table.Cell>
											) : (
												<Table.Cell className='px-0 md:px-6 relative'>
													<Button
														className='absolute left-[60%] top-[50%] translate-y-[-50%] translate-x-[-50%] bg-gradient-to-bl from-[#b44141] to-[#800e0e] md:static md:transform-none'
														disabled={billIsExpires(bill.createdAt)}
														onClick={() => {
															setShowModal(true);
															setBillIdToDelete(bill._id);
														}}
													>
														Відмінити
													</Button>
												</Table.Cell>
											)}
											<Table.Cell colSpan={2} className='pr-0 text-center whitespace-pre-line'>
												<h3 className='text-center md:flex md:justify-center gap-2'>
													<div>Загальна ціна</div>
													<div className='text-lime-600 dark:text-lime-500'>
														{bill.totalPrice} грн.
													</div>
												</h3>
											</Table.Cell>
										</Table.Row>
									</Table.Body>
								</Table>
							</div>
						))}
				</div>
			</div>
			<ModalAlert showModal={showModal} setShowModal={setShowModal} handleDeleteBill={deleteBill} />
		</div>
	);
}
