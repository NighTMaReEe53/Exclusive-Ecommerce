import * as yup from "yup";

export const Registerschema = yup
  .object({
    username: yup
      .string()
      .required("Username Is Required")
      .min(3, "Min Character Of Username Is 3"),
    email: yup
      .string()
      .required("Email Is Required")
      .email("This Is Not An Email"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(6, "Min Character Of Password Is 6"),
  })
  .required();

export const Loginschema = yup
  .object({
    identifier: yup
      .string()
      .required("Email Is Required")
      .email("This Is Not An Email"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(6, "Min Character Of Password Is 6"),
  })
  .required();

export const CheckOut_schema = yup
  .object({
    city: yup
      .string()
      .required("City Input Is Required")
      .min(3, "Min Length Of City Is 3"),
    street: yup
      .string()
      .required("Street Input Is Required")
      .min(5, "Min Length Of Street Is 5"),
    phone: yup
      .string()
      .required("Phone Is Required")
      .min(11, "Min Length Of Number Is 11"),
  })
  .required();
export const Message_schema = yup
  .object({
    name: yup
      .string()
      .required("Name Input Is Required")
      .min(3, "Min Length Of Name Is 3"),
    email: yup
      .string()
      .required("Email Input Is Required")
      .email("This Is Not An Email"),
    phone: yup
      .string()
      .required("Phone Is Required")
      .min(11, "Min Length Of Phone Is 11"),
    message: yup
      .string()
      .required("Message Is Required")
      .min(8, "Min Length Of Message Is 8"),
  })
  .required();
