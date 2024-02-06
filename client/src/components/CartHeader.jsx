import { memo } from 'react';

export const CartHeader = memo(function Header({ amountFood, currentShift }) {
	const headStyle =
		'text-xl font-bold inline-block border-b-2 border-stone-400 dark:border-stone-300 pb-1 text-stone-800 dark:text-stone-300';
	const shift = currentShift === 'first' ? 'Перша зміна' : 'Друга зміна';
	let word = '';
	switch (amountFood) {
		case 1: {
			word = 'страву';
			break;
		}

		case 2: {
			word = 'страви';
			break;
		}

		case 3: {
			word = 'страви';
			break;
		}

		case 4: {
			word = 'страви';
			break;
		}

		default: {
			word = 'страв';
			break;
		}
	}

	if (amountFood === 0) {
		return (
			<>
				<h1 className={headStyle}>Ви не обрали жодної страви</h1>
			</>
		);
	}

	return (
		<h1 className={headStyle}>
			Обрано {amountFood} {word}
			<span className='absolute -top-1 right-0 text-lg active rounded-lg ml-auto p-1'>{shift}</span>
		</h1>
	);
});
