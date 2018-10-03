# Validator

`@ycgarrido/validator` Validate the parameters of a request

## Use

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

const store = (req, res) {
    validator.validate(req.body, 'user.store', res, () => {
      //Save user
    });
  }

router.post('/user', store);
```
