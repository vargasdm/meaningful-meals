import { useState } from "react";
import MealPlanWeek from "./MealPlanWeek";
import './MealPlan.css';

export default function MealPlanContainer() {
	const now: Date = new Date();

	const [firstDateOfWeek, setFirstDateOfWeek] = useState(
		new Date(
			new Date().setDate(now.getDate() - now.getDay())
		)
	);

	return (
		<>
			{/* <MealPlanWeekSwitch
				firstDateOfWeek={firstDateOfWeek}
				setFirstDateOfWeek={setFirstDateOfWeek}
			/> */}
			<MealPlanWeek
				firstDateOfWeek={firstDateOfWeek}
				setFirstDateOfWeek={setFirstDateOfWeek}
			/>
		</>
	)
}