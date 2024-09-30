import { ILogin, IRegister } from "../interfaces/Index";

export const INPUT_REGISTER: IRegister[] = [
  {
    label: "username",
    name: "username",
    type: "text",
  },
  {
    label: "email",
    name: "email",
    type: "email",
  },
  {
    label: "password",
    name: "password",
    type: "password",
  },
];
export const INPUT_LOGIN: ILogin[] = [
  {
    label: "email",
    name: "identifier",
    type: "email",
  },
  {
    label: "password",
    name: "password",
    type: "password",
  },
];
