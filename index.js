const regExp = {
  email: !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  alphanumeric: /^[a-zA-Z0-9\s]{0,255}$/
};
module.exports = rules => {
  return {
    validate: (params, path, next) => {
      let rule = rules;
      if (path && path.trim() !== "") {
        let newPath = path.split(".");
        newPath.map(p => {
          if (rule && rule[p]) rule = rule[p];
          else rule = undefined;
          return p;
        });
      }
      if (rule instanceof Object) {
        let errors = {};
        for (let i in rule) {
          errors[i] = {};
          //Empty
          if (rule[i].required && !params[i])
            errors[i].required =
              typeof rule[i].required === "string"
                ? rule[i].required
                : "This field is required";
          if (params[i]) {
            //Email
            if (rule[i].email && new RegExp(regExp.email).test(params[i]))
              errors[i].email =
                typeof rule[i].email === "string"
                  ? rule[i].email
                  : "This field must be email";
            //Array
            if (rule[i].array && !Array.isArray(params[i])) {
              errors[i].array =
                typeof rule[i].array === "string"
                  ? rule[i].array
                  : "This field must be array";
            }
            //String
            if (
              rule[i].string &&
              !new RegExp(regExp.alphanumeric).test(params[i])
            )
              errors[i].string =
                typeof rule[i].array === "string"
                  ? rule[i].string
                  : "This field must be string";
            //Max length
            if (
              rule[i].maxLength &&
              params[i].toString().length > rule[i].maxLength
            )
              errors[i].maxLength = `Max length must be less than ${
                rule[i].maxLength
              }`;
            //Min length
            if (
              rule[i].minLength &&
              params[i].toString().length < rule[i].minLength
            )
              errors[i].minLength = `Min length must be greater than ${
                rule[i].minLength
              }`;
          }
          if (!Object.keys(errors[i]).length) delete errors[i];
        }
        if (!Object.keys(errors).length) next({ errors: undefined });
        else next({ errors });
      }
    }
  };
};
