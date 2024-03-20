import MealPlanDay from "./MealPlanDay";

const NUM_DAYS_PER_WEEK: number = 7;

type MealPlanWeekProp = {
	firstDateOfWeek: Date,
	setFirstDateOfWeek: Function
}

export default function MealPlanWeek(props: MealPlanWeekProp) {
	const calendarDays = [];

	for (let i = 0; i < NUM_DAYS_PER_WEEK; i++) {
		const date = new Date(
			props.firstDateOfWeek.getFullYear(),
			props.firstDateOfWeek.getMonth(),
			props.firstDateOfWeek.getDate() + i
		);

		calendarDays.push(
			// <div className='meal-plan-day-container' key={date.getTime()}>
			<MealPlanDay
				date={date}
				key={date.toString()}
			/>
			// </div>
		)
	}

	function changeFirstDateOfWeek(change: number) {
		return () => {
			let newFirstDateOfWeek: Date = new Date(props.firstDateOfWeek);

			newFirstDateOfWeek = new Date(
				newFirstDateOfWeek.setDate(props.firstDateOfWeek.getDate() + change)
			);

			props.setFirstDateOfWeek(
				newFirstDateOfWeek
			);
		}
	}

	return (
		<div className='weekly-calendar'>
			<i
				className='bi bi-arrow-left'
				onClick={changeFirstDateOfWeek(-NUM_DAYS_PER_WEEK)}
			/>
			{calendarDays}
			<i
				className='bi bi-arrow-right'
				onClick={changeFirstDateOfWeek(NUM_DAYS_PER_WEEK)}
			/>
		</div>
	);
}