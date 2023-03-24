require('dotenv').config();
require('express-async-errors');

//security
const helmet = require ('helmet')
const cors = require ('cors')
const xssClean = require ('xss-clean')
const expressRateLimiter = require ('express-rate-limit')


const express = require('express');
const app = express();



const sendEmail = require ('./controllers/sendEmail')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use (expressRateLimiter({
  windowsMs:60 * 1000 * 15,
  max:100
}))
app.use(cors())
app.use(xssClean())
app.use(helmet())




app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1><a href=/send>send email</a>');
});
app.get('/send', sendEmail)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
