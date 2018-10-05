const rules = {
  email: {
    required: "Email is required",
    email: "This field must be email"
  },
  name: {
    required: "Name is required",
    string: true,
    maxLength: 6,
    minLength: 2
  },
  roles: {
    required: true,
    array: true
  }
};
const validator = require("./index")(rules);

test("validate", async () => {
  const params = {
    email: "ycgarrido@gmail.com",
    name: "Yulier",
    roles: []
  };
  let result = undefined;
  await validator.validate(params, "", ({ errors }) => {
    result = errors;
  });
  expect(result).toEqual(undefined);
});
