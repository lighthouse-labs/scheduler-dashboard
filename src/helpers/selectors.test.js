import { flow } from "lodash/fp";

import {
  getTotalInterviews,
  getLeastPopularTimeSlot,
  getInterviewsPerDay,
  getMostPopularDay
} from "./selectors";

import state, { addInterview } from "helpers/__fixtures__/state";

describe("selectors", () => {
  describe("getTotalInterviews", () => {
    it("should return 0 with no interviews scheduled", () => {
      expect(getTotalInterviews(state)).toBe(0);
    });

    it("should return 1 with a single interview scheduled", () => {
      const testState = addInterview(2, {
        student: "Archie Cohen",
        interviewer: 1
      })(state);

      expect(getTotalInterviews(testState)).toBe(1);
    });
  });

  describe("getLeastPopularTimeSlot", () => {
    it("should return a list when slots are equally unpopular", () => {
      expect(getLeastPopularTimeSlot(state)).toBe("12pm, 1pm");
    });

    it("should return the least popular when there are more fewer interviews booked for a time slot", () => {
      const testState = addInterview(2, {
        student: "Archie Cohen",
        interviewer: 1
      })(state);

      expect(getLeastPopularTimeSlot(testState)).toBe("12pm");
    });
  });

  describe("getMostPopularDay", () => {
    it("should return a list when there is a tie", () => {
      expect(getMostPopularDay(state)).toBe("Monday, Tuesday");
    });

    it("should return Monday when it has the most appointments", () => {
      const testState = addInterview(2, {
        student: "Archie Cohen",
        interviewer: 1
      })(state);

      expect(getMostPopularDay(testState)).toBe("Monday");
    });
  });

  describe("getInterviewsPerDay", () => {
    it("should return  when there are no interviews booked", () => {
      expect(getInterviewsPerDay(state)).toBe(0);
    });

    it("should return 0.5 when there is one interview booked over two days", () => {
      const testState = addInterview(2, {
        student: "Archie Cohen",
        interviewer: 1
      })(state);

      expect(getInterviewsPerDay(testState)).toBeCloseTo(0.5);
    });

    it("should return 1 when there are two interviews booked over two days", () => {
      const testState = flow([
        addInterview(2, {
          student: "Archie Cohen",
          interviewer: 1
        }),
        addInterview(3, {
          student: "Lydia Miller-Jones",
          interviewer: 2
        })
      ])(state);

      expect(getInterviewsPerDay(testState)).toBe(1);
    });
  });
});
