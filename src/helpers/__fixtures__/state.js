export function addInterview(id, interview) {
  return state => ({
    ...state,
    days: state.days.map(day =>
      day.appointments.includes(id) ? { ...day, spots: day.spots - 1 } : day
    ),
    appointments: {
      ...state.appointments,
      [id]: {
        ...state.appointments[id],
        interview: interview
      }
    }
  });
}

export default {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 2
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [1, 2],
      spots: 2
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": { id: 3, time: "12pm", interview: null },
    "4": { id: 4, time: "1pm", interview: null }
  },
  interviewers: {
    "1": {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};
