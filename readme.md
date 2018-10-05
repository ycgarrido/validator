# Validator

`@ycgarrido/validator` Validate the parameters of a request

### Install

```shell
npm i @ycgarrido/validator --save
```

### Test

```shell
npm run test
```

### Use

```js
const rules = {
    user: {
        store: {
            email: {
            "required": "Email is required",
            "email": "This field must be email"
            }
        }
    }
}

const validator = require("@ycgarrido/validator")(rules);

router.post('/user', (req, res) {
    validator.validate(req.body, 'user.store', ({errors}) => {
      //Save user
    });
  });
```

### Validations

| </br>Name | </br>Type           | </br>Summary                      |
| --------- | ------------------- | --------------------------------- |
| required  | `Boolean`, `String` | Define if field is required       |
| email     | `Boolean`, `String` | Define if field must be an email  |
| array     | `Boolean`, `String` | Define if field must be an array  |
| string    | `Boolean`, `String` | Define if field must be an string |
| maxLength | `Number`            | Define the field's max length     |
| minLength | `Number`            | Define the field's min length     |
