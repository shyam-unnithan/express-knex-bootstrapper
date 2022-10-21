# ExpressJS Knex Bootrapper

### This bootstrap provides the following functionalities

ExpressJS Authentication services to

- Register User
- Authenticate User
- Change Password for user

The authentication works on bcrypt encrypted password stored in database.

### Generating Token

You can use the crypto NodeJS library to generate the TOKEN

Run node
> const crypto = require('crypto')
> crypto.randomBytes(128).toString('hex')

Use the string provided to update env/.env.development TOKEN_SECRET