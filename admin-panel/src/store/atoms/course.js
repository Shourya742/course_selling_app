/* eslint-disable no-unused-vars */
import { atom } from "recoil";

export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
