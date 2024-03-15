import { useState } from 'react';
import MealPlanDay from "./MealPlanDay";

const DAYS_PER_WEEK: number = 7;
const DAY_NAMES: string[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export default function MealPlanWeek() {
	// const [isAddingMeal, setAddingMeal] = useState(false);

	const namedCalendarDays: any = DAY_NAMES.map(
		dayName => <MealPlanDay key={dayName} name={dayName} />
	);

	return (
		<div className='weekly-calendar'>
			{namedCalendarDays}
		</div>
	);
}