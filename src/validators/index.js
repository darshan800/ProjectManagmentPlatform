import { body } from "express-validator";

//user-registration
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("username must be atleast 3 charcaters long"),
    body("password").trim().notEmpty().withMessage("password is required"),
    body("fullname").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Invalid email"),

    body("password").notEmpty().withMessage("password is required"),
  ];
};

//user-change current password
const userChangeCurrentPassword = () => {
  return [
    body("oldPassword").notEmpty().withMessage("old password is required"),
    body("newPassword").notEmpty().withMessage("new password is required"),
  ];
};

//user-forgot password validator
const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
  ];
};

//user-resetforgot password validator
const userResetForgotPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("passwoord is required")];
};
export {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPassword,
  userForgotPasswordValidator,
  userResetForgotPasswordValidator,
};
