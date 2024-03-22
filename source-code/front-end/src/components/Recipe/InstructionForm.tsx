import { useState } from "react";

export default function InstructionForm(props: any) {
	const [body, setBody] = useState(props.body);

	function handleEdit() {
		// const newInstructions = [];

		// for (let i = 0; i < props.index; i++) {
		// 	newInstructions.push(props.instructions[i]);
		// }

		// newInstructions.push({
		// 	body: body,
		// 	id: props.id
		// })

		// for (let i = props.index + 1; i < props.instructions.length; i++) {
		// 	newInstructions.push(props.instructions[i]);
		// }

		// props.setInstructions(newInstructions);

	}

	function handleChangeBody(event: any) {
		// setBody(event.target.value);
		// handleEdit();
	}

	function handleDelete() {
		const newInstructions: any = [];

		for (let i = 0; i < props.index; i++) {
			newInstructions.push(props.instructions[i]);
		}

		for (let i = props.index + 1; i < props.instructions.length; i++) {
			newInstructions.push(props.instructions[i]);
		}

		props.setInstructions(newInstructions);
	}
	return (
		<>
			<textarea
				placeholder='Instructions'
				onChange={props.setBody}
			// value={body}
			/>
			<i className='bi bi-x' onClick={handleDelete} />
		</>
	);
}