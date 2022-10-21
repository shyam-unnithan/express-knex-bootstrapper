const express = require('express');
const cors = require('cors');
// eslint-disable-next-line no-undef
const port = process.env.APP_PORT || 3000;
const dotenv = require('dotenv');
// eslint-disable-next-line no-undef
dotenv.config({ path: `../env/.env.${process.env.NODE_ENV}` });
const app = express();
const auth = require('./http/middleware/auth.middleware');

//Use Connect Timeout Middleware for connection timeout
const timeout = require('connect-timeout');

const corsOptions = {
  // eslint-disable-next-line no-undef
  origin: [process.env.CORS_URL],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// eslint-disable-next-line no-undef
app.use(timeout(process.env.WEB_TIMEOUT));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware
app.all('*', auth);
// Endpoints
app.use('/api', require('./http/routes/auth.api.v1').router);

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
