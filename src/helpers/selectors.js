import { flow, map, reduce, filter, join, minBy } from "lodash/fp";

export function getTotalInterviews(state) {
  return filter(appointment => appointment.interview)(state.appointments)
    .length;
}

export function getLeastPopularTimeSlot(state) {
  return flow([
    map(appointment => ({
      time: appointment.time,
      interview: appointment.interview ? 1 : 0
    })),
    reduce(
      (times, appointment) => ({
        ...times,
        [appointment.time]: times[appointment.time]
          ? times[appointment.time] + appointment.interview
          : appointment.interview
      }),
      {}
    ),
    map.convert({ cap: false })((count, time) => ({ time, count })),
    times => filter(time => time.count === minBy("count")(times).count)(times),
    map(time => time.time),
    join(", ")
  ])(state.appointments);
}

export function getMostPopularDay(state) {
  return flow([
    days => filter(day => day.spots === minBy("spots")(days).spots)(days),
    map(day => day.name),
    join(", ")
  ])(state.days);
}

export function getInterviewsPerDay(state) {
  return getTotalInterviews(state) / state.days.length || 0;
}
