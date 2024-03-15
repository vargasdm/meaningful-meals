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

type MealPlanWeekProp = {
	firstDateOfWeek: number,
	// currentDayOfWeek: number
}

export default function MealPlanWeek(props: MealPlanWeekProp) {
	// const now: Date = new Date();
	// const today: number = now.getDay();

	// const namedCalendarDays: any = DAY_NAMES.map(
	// 	dayName => <MealPlanDay key={dayName} name={dayName} />
	// );

	const calendarDays = [];

	for (let i = 0; i < DAY_NAMES.length; i++) {
		const timestamp: number = (new Date()).setDate(props.firstDateOfWeek + i);
		const date: Date = new Date(timestamp);

		calendarDays.push(
			<MealPlanDay
				key={date.toString()}
				dayName={DAY_NAMES[i]}
				dateOfTheMonth={date.getDate()}
				month={date.getMonth()}
				year={date.getFullYear()}
			/>
		)
	}

	return (
		<div className='weekly-calendar'>
			{calendarDays}
		</div>
	);
}