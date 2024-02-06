import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashComments() {
	const { currentUser } = useSelector((state) => state.user);
	const [bills, setBills] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [billIdToDelete, setBillIdToDelete] = useState('');
	useEffect(() => {
		const fetchAllBills = async () => {
			try {
				const res = await fetch('/api/bill/all?sort=desc');
				const data = await res.json();
				if (res.ok) {
					setBills(data.allBills);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchAllBills();
	}, [currentUser._id]);

	const handleShowMore = async () => {
		const startIndex = bills.length;
		try {
			const res = await fetch(`/api/bill/all?startIndex=${startIndex}`);
			const data = await res.json();
			if (res.ok) {
				setBills((prev) => [...prev, ...data.allBills]);
				if (data.allBills.length < 9) {
					setShowMore(false);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeleteBill = async () => {
		setShowModal(false);
		try {
			const res = await fetch(`/api/bill/delete/${billIdToDelete}`, {
				method: 'DELETE',
			});
			const data = await res.json();
			if (res.ok) {
				setBills((prev) => prev.filter((bill) => bill._id !== billIdToDelete));
				setShowModal(false);
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='table-auto overflow-auto md:mx-auto p-3'>
			{bills.length > 0 && (
				<>
					<Table hoverable className='text-center shadow-md'>
						<Table.Head>
							<Table.HeadCell>Дата замовлення</Table.HeadCell>
							<Table.HeadCell>Страви</Table.HeadCell>
							<Table.HeadCell>Сума</Table.HeadCell>
							<Table.HeadCell>Відмінити</Table.HeadCell>
						</Table.Head>
						{bills.map((bill) => (
							<Table.Body className='divide-y' key={bill._id}>
								<Table.Row className='bg-white border-2 dark:border-gray-700 dark:bg-gray-800'>
									<Table.Cell>{new Date(bill.orderedAt).toLocaleDateString('uk')}</Table.Cell>
									<Table.Cell>
										<Table className='text-center border-2'>
											<Table.Head>
												<Table.HeadCell>Страва</Table.HeadCell>
												<Table.HeadCell>Кількість</Table.HeadCell>
											</Table.Head>
											<Table.Body>
												{bill.items.map(({ food: { name, _id }, quantity }) => (
													<Table.Row key={_id + bill._id}>
														<Table.Cell className='border-2'>{name}</Table.Cell>
														<Table.Cell className='border-2'>{quantity}</Table.Cell>
													</Table.Row>
												))}
											</Table.Body>
										</Table>
									</Table.Cell>
									<Table.Cell>{bill.totalPrice} грн.</Table.Cell>
									<Table.Cell>
										<span
											onClick={() => {
												setShowModal(true);
												setBillIdToDelete(bill._id);
											}}
											className='font-medium text-red-500 hover:underline cursor-pointer'
										>
											Відмінити
										</span>
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						))}
					</Table>
					{showMore && (
						<button
							onClick={handleShowMore}
							className='w-full text-teal-500 self-center text-sm py-7'
						>
							Show more
						</button>
					)}
				</>
			)}
			<Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						<HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
						<h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
							Ви впевнені, що хочете відмінити замовлення?
						</h3>
						<div className='flex justify-center gap-4'>
							<Button color='failure' onClick={handleDeleteBill}>
								Так
							</Button>
							<Button color='gray' onClick={() => setShowModal(false)}>
								Ні
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
