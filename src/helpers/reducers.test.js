import { flow } from "lodash/fp";

import { setInterview } from "./reducers";

import state, { addInterview } from "helpers/__fixtures__/state";

describe("selectors", () => {
  describe("setInterview", () => {
    it("should return state with new interview when interview is not null", () => {
      expect(
        setInterview(state, 2, {
          student: "Archie Cohen",
          interviewer: 1
        })
      ).toMatchSnapshot();
    });

    it("should return state with no interview when interview is not null", () => {
      const testState = JSON.parse(JSON.stringify(state));

      testState.appointments["2"].interview = {
        student: "Archie Cohen",
        interviewer: 1
      };

      expect(setInterview(testState, 2, null)).toMatchSnapshot();
    });

    it("should return state with one interview when interview is created and cancelled", () => {
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

      expect(setInterview(testState, 3, null)).toMatchSnapshot();
    });
  });
});
