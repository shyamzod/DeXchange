import { atom } from "recoil";

export const loggedin = atom({
  key: "loggedin",
  default: false,
});

export const loggedInUserName = atom({
  key: "loggedInUserName",
  default: "",
});

export const loggedInUserEmail = atom({
  key: "loggedInUserEmail",
  default: "",
});
