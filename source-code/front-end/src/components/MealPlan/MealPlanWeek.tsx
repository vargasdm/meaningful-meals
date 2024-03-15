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

// function CalendarDay(props: any) {
// 	return (
// 		<div className='calendar-day'>
// 			<h2>{props.name}</h2 >
// 			<input
// 				type='button'
// 				value='Add Meal'
// 			/>
// 		</div>
// 	)
// }

export default function MealPlanWeek() {
	const namedCalendarDays: any = DAY_NAMES.map(
		dayName => <MealPlanDay name={dayName} />
	);

	return (
		<div className='weekly-calendar'>
			{namedCalendarDays}
		</div>
	);
}