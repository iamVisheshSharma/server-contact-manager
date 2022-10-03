const express = require("express");
const contact = require("./routes");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const createError = require('http-errors');
const DB = require('./db');
require('dotenv').config();

DB();
const app = express();

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})
app.use("/contact", contact);

app.use((req, res, next) => {
	// const err = new Error("Not Found");
	// err.status = 404;
	// next(err);
	next(createError(404, "Not Found"))
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		error: {
			status: err.status || 500,
			message: err.message
		}
	})
})

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
