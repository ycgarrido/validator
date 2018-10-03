module.exports = rules => {
  return {
    validate: (params, path, response, next) => {
      let rule = rules;
      let newPath = path.split(".");
      newPath.map(p => {
        if (rule && rule[p]) rule = rule[p];
        else rule = undefined;
        return p;
      });
      if (_.isObject(rule)) {
        let errors = {};
        for (let i in rule) {
          errors[i] = {};
          //Empty
          if (rule[i].required && _.isEmpty(params[i]))
            errors[i].required = _.isString(rule[i].required)
              ? rule[i].required
              : "This field is required";
          if (!_.isEmpty(params[i])) {
            //Email
            if (rule[i].email && !validate.isEmail(params[i]))
              errors[i].email = _.isString(rule[i].email)
                ? rule[i].email
                : "This field must be email";
            //Array
            if (rule[i].array) {
              let array = params[i];
              try {
                array = JSON.parse(array);
              } catch (Exception) {
                array = "";
              }
              if (!array || !_.isArray(array))
                errors[i].array = _.isString(rule[i].array)
                  ? rule[i].array
                  : "This field must be array";
            }
            //String
            if (rule[i].string && !validate.isAlphanumeric(params[i]))
              errors[i].string = _.isString(rule[i].string)
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
        if (!Object.keys(errors).length) next();
        else response.status(500).json({ fail: errors });
      }
    }
  };
};
