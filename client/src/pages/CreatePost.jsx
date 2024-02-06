import { Alert, Button, TextInput, Select } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';

import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
	const [formData, setFormData] = useState({ shift: 'first' });
	const [publishError, setPublishError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch('/api/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				setPublishError(data.message);
				return;
			}

			if (res.ok) {
				setPublishError(null);
				e.target.name.value = '';
				e.target.price.value = '';
			}
		} catch (error) {
			setPublishError('Something went wrong');
		}
	};
	return (
		<div className='p-3 max-w-3xl mx-auto min-h-screen'>
			<h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-4 sm:flex-row justify-between'>
					<Select onChange={(e) => setFormData({ ...formData, shift: e.target.value })}>
						<option value='first' defaultValue={'first'}>
							Перша зміна
						</option>
						<option value='second'>Друга зміна</option>
					</Select>
					<TextInput
						type='text'
						placeholder='name'
						required
						id='name'
						className='flex-1'
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
				</div>
				<TextInput
					type='text'
					placeholder='price'
					required
					id='price'
					className='flex-1'
					onChange={(e) => setFormData({ ...formData, price: e.target.value })}
				/>
				<Button type='submit' gradientDuoTone='purpleToPink'>
					Publish
				</Button>
				{publishError && (
					<Alert className='mt-5' color='failure'>
						{publishError}
					</Alert>
				)}
			</form>
		</div>
	);
}
