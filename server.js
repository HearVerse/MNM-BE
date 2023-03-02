const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const login = require("./routes/login");
const register = require("./routes/register");
const user = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options("*", cors());

app.use("/login", login);
app.use(`/register`, register);
app.use(`/user`, user);

app.use(`/upload`, express.static("upload"));

app.get('/', function (req, res) {
 return res.send('OK');
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.use((req, res, next) => {
    const error = new Error(
      "Route Not Found, Check Your Requested URL and Request Type"
    );
    // error.status = 404;
    res.json({
      error: {
        message: error.message,
      },
    });
});
