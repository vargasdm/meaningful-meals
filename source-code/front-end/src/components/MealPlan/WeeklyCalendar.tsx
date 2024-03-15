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

function CalendarDay(props: any) {
	return (
		<div className='calendar-day'>
			<h2>{props.name}</h2 >
		</div>
	)
}

export default function WeeklyCalendar() {
	const namedCalendarDays: any = DAY_NAMES.map(
		dayName => <CalendarDay name={dayName} />
	);

	// namedCalendarDays = <className='weekly-calendar'>
	// 	{namedCalendarDays}
	// </ol>;

	return (
		// <>
		// </>
		<div className='weekly-calendar'>
			{namedCalendarDays}
		</div>
	);
}