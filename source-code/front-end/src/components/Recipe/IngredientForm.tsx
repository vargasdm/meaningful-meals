import { useState } from "react"

type IngredientFormProps = {
	amount: number,
	unit: string,
	name: string,
	key: any
}

export default function IngredientForm(props: IngredientFormProps) {
	const [isEditing, setIsEditing] = useState(true);

	function handleSetEditing() {
		setIsEditing(!isEditing);
	}

	return (
		<div className='ingredient-form'>
			{!isEditing && `${props.amount ? props.amount : 0}`
				+ ` ${props.unit ? props.unit : 'Unit'}`
				+ ` ${props.name ? props.name : 'Name'}`}
			{isEditing &&
				<>
					<input
						type='text'
						name='amount'
						placeholder='Amount'
						size={16}
					/>
					<input
						type='text'
						name='unit'
						placeholder='Unit'
						size={16}
					/>
					<input
						type='text'
						name='name'
						placeholder='Name'
						size={32}
					/>
				</>
			}
			<i
				className='bi bi-pencil'
				onClick={handleSetEditing} />
		</div>
	)
}