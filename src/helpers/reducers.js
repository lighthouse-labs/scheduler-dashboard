import { filter } from "lodash/fp";

function getSpotsForDay(state, day) {
  const foundDay = state.days.find(d => d.name === day);

  if (!foundDay) throw new Error(`No Day Found: ${day}`);

  return filter(id => state.appointments[id].interview === null)(
    foundDay.appointments
  ).length;
}

export function setInterview(state, id, interview) {
  const appointments = {
    ...state.appointments,
    [id]: {
      ...state.appointments[id],
      interview
    }
  };

  return {
    ...state,
    days: state.days.map(day => ({
      ...day,
      spots: getSpotsForDay({ ...state, appointments }, day.name)
    })),
    appointments
  };
}
