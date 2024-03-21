import { useState } from "react"

type IngredientFormProps = {
	index: number,
	ingredients: [],
	setIngredients: Function
	amount: number,
	unit: string,
	name: string,
	id: any
}

export default function IngredientForm(props: IngredientFormProps) {
	const [amount, setAmount] = useState(props.amount);
	const [unit, setUnit] = useState(props.unit);
	const [name, setName] = useState(props.name);

	function handleEdit() {
		const newIngredients = [];

		for (let i = 0; i < props.index; i++) {
			newIngredients.push(props.ingredients[i]);
		}

		newIngredients.push({
			amount: amount,
			unit: unit,
			name: name,
			id: props.id
		})

		for (let i = props.index + 1; i < props.ingredients.length; i++) {
			newIngredients.push(props.ingredients[i]);
		}

		props.setIngredients(newIngredients);
	}

	function handleChangeAmount(event: any) {
		setAmount(event.target.value);
		handleEdit();
	}

	function handleChangeUnit(event: any) {
		setUnit(event.target.value);
		handleEdit();
	}

	function handleChangeName(event: any) {
		setName(event.target.value);
		handleEdit();
	}

	function handleDelete() {
		const newIngredients: any = [];

		for (let i = 0; i < props.index; i++) {
			newIngredients.push(props.ingredients[i]);
		}

		for (let i = props.index + 1; i < props.ingredients.length; i++) {
			newIngredients.push(props.ingredients[i]);
		}

		props.setIngredients(newIngredients);
	}

	return (
		<div className='ingredient-form'>
			<input
				type='text'
				name='amount'
				placeholder='Amount'
				size={16}
				onChange={handleChangeAmount}
			/>
			<input
				type='text'
				name='unit'
				placeholder='Unit'
				size={16}
				onChange={handleChangeUnit}
			/>
			<input
				type='text'
				name='name'
				placeholder='Name'
				size={32}
				onChange={handleChangeName}
			/>
			<i className='bi bi-x' onClick={handleDelete} />
		</div>
	)
}