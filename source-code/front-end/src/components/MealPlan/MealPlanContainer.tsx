import MealPlanWeek from "./MealPlanWeek";
import './MealPlan.css';

export default function MealPlanContainer() {
	const now: Date = new Date();
	const currentDayOfWeek: number = now.getDay();
	const firstDateOfWeek: number = now.getDate() - currentDayOfWeek;

	return (
		<MealPlanWeek
			firstDateOfWeek={firstDateOfWeek}
			// currentDayOfWeek={currentDayOfWeek}
		/>
	)
}