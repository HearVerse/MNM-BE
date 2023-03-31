# login.js in controllers

This is a Node.js module for user authentication using email and password. It uses the **express-async-handler** middleware to handle asynchronous operations and the **bcryptjs** library for password hashing and comparison. The module also imports the **UserModel** object from the **user.model.js** file and the **checkValidation** function from the **utils.js** file.

The main function exported by this module is **login**, which takes in a request (**req**) and a response (**res**) object from the Express.js framework. The **checkValidation** function is called to validate the incoming request and return any errors if present. If there are validation errors, the function returns a JSON response with the **success** key set to **false** and the **error** key set to the validation error message.

If the request is valid, the **email** and **password** fields are extracted from the request body. The **UserModel.findOne()** method is called to find the user associated with the provided email address. If no user is found, the function returns a JSON response with the **success** key set to **false** and the **error** key set to the message "Your email does not registered".

If a user is found, the function uses the **bcrypt.compare()** method to compare the provided password with the stored password hash. If the passwords match, the function returns a JSON response with the **success** key set to **true**. If the passwords do not match, the function returns a JSON response with the **success** key set to **false** and the **error** key set to the message "Invalid email or password".

Overall, this module provides a simple and secure way to authenticate users in a Node.js/Express.js web application using email and password.

# register.js in controllers

This is a Node.js module for user registration. It uses the **express-async-handle**r middleware to handle asynchronous operations and the **bcryptjs** library for password hashing. The module also imports the **UserModel** object from the **user.model.js** file and the **hashPassword** and **checkValidation** functions from the **utils.js** file.

The main function exported by this module is **register**, which takes in a request (**req**) and a response (**res**) object from the Express.js framework. The **checkValidation** function is called to validate the incoming request and return any errors if present. If there are validation errors, the function returns a JSON response with the **success** key set to **false** and the **error** key set to the validation error message.

If the request is valid, the **hashPassword** function is called to hash the password provided in the request body. The **UserModel.create()** method is then called to create a new user with the provided user data. If a user with the same email address already exists in the database, the **create()** method will fail and the function returns a JSON response with the **success** key set to **false** and the **error** key set to the message "Duplicate User".

If the user is successfully created, the function returns a JSON response with the **success** key set to **true**.

Overall, this module provides a simple and secure way to register new users in a Node.js/Express.js web application using email and password.

# user.js in controllers

This is a Node.js module that defines a **UserController** class with two methods to handle user-related HTTP requests in a web application. The module imports the **UserModel** object from the **user.model.js** file.

The **getUserById** method takes in a request (**req**) and a response (**res**) object from the Express.js framework. It uses the **UserModel.findOne()** method to find a user in the database with the ID provided in the request parameters. If the user is not found, the method returns a JSON response with the **success** key set to **false** and the **error** key set to the message "User not found". If the user is found, the method removes the **password** field from the user object using object destructuring and returns a JSON response with the **success** key set to **true** and the **info** key set to the user object without the password field.

The **updateUser** method also takes in a request (**req**) and a response (**res**) object from the Express.js framework. It uses the **UserModel.findOne()** method to find a user in the database with the ID provided in the request body. If the user is not found, the method returns a JSON response with the **success** key set to **false** and the **error** key set to the message "User not found". If the user is found, the method extracts the **id** field from the request body and the **profile\_image** field from the **req.files** object, and then uses the **UserModel.update()** method to update the user's data with the rest of the fields in the request body and the **profile\_image** field. If the update fails, the method returns a JSON response with the **success** key set to **false** and the **error** key set to the message "Update user info failed". If the update succeeds, the method checks the **affectedRows** field in the result object returned by the **update()** method to determine if the user was actually updated. The method then returns a JSON response with the **success** key set to **true** and the **message** key set to either "User not found" or "User updated successfully" depending on the value of **affectedRows**.

Overall, this module provides a simple and secure way to handle user-related HTTP requests in a Node.js/Express.js web application.

# db-connection.js

exports a class **DBConnection** which creates a connection pool to a MySQL database using the **mysql2** package. The class constructor takes the database connection information from the environment variables using the **dotenv** package.

The **DBConnection** class has a method called **checkConnection** which checks the status of the database connection by trying to get a connection from the pool. If there is an error, it logs the error message to the console. If the connection is successful, it releases the connection.

The class also has a method called **query** which executes a SQL query with the given values and returns a promise that resolves to the query result. If there is an error, the promise is rejected with the error.

The **DBConnection** class also exports a constant object **HttpStatusCodes** which maps MySQL error codes to HTTP status codes. The **query** method converts any MySQL error codes that are included in **HttpStatusCodes** to the corresponding HTTP status code.

Overall, this file is responsible for creating and managing a connection pool to a MySQL database and providing a method for executing SQL queries with error handling.

# validator.js

This code exports an object containing several functions to validate user input using the **express-validator** library and a middleware function to handle multi-part file uploads using **multer**.

- The **validateLogin** function validates a login request, ensuring that the email and password fields are present and valid.
- The **createUserSchema** function validates a user creation request, ensuring that the email and password fields are present and valid.
- The **uploadMulti** middleware function handles multi-part file uploads and sets the storage location for uploaded files. It also defines a filter function to ensure that only image files are accepted.

The **multer** package is a popular middleware for handling file uploads in Node.js. It provides various configuration options, including file storage location, filename generation, and file filtering. The **express-validator** package is a middleware for validating user input in Express.js applications. It provides various validators to validate user input and return appropriate error messages.

# user.model.js

This code defines a **UserModel** class that represents a user model in a database. It uses **query** method from the **db-connection.js** module to execute SQL queries on the database.

The class has the following methods:

- **find**: a method that finds and returns all users from the database if no parameters are passed or it finds and returns users matching the passed parameters. The method uses the **multipleColumnSet** function from the **utils** module to convert the passed parameters into a SQL query.
- **findOne**: a method that finds and returns a single user from the database based on the passed parameters. The method also uses the **multipleColumnSet** function to convert the passed parameters into a SQL query.
- **create**: a method that creates a new user in the database with the passed **email** and **password**.
- **update**: a method that updates the user in the database with the specified **id** using the passed parameters.
- **delete**: a method that deletes the user with the specified **id** from the database.

The class uses the **multipleColumnSet** function from the **utils** module to create the SQL queries based on the passed parameters.

# login.js in routes

This code exports an Express router that handles a POST request to the root path ("/") of the application. When a request is made to this path, the **validateLogin** middleware function is executed first to validate the input data. If the input data is valid, the **login** controller function is executed to handle the login request. The **login** function is imported from "../controllers/login" module.

# Register.js in routes

File is defining a router for handling the HTTP POST requests to register a new user.

The router is using the **createUserSchema** middleware function from **validator.js** to validate the incoming request data. If the data is valid, the **register** controller function is invoked to handle the request and register the new user.

Here's an overview of what the code in **register.js** is doing:

1. Import the necessary dependencies:
- **Router** from the **express** module.
- The **register** controller function.
- The **createUserSchema** middleware function from **validator.js**.
2. Create a new router instance with **Router()**.
3. Define a route handler for HTTP POST requests to the root path (**/**):
- Use the **createUserSchema** middleware to validate the incoming request data.
- Call the **register** controller function to handle the request and register the new user.
4. Export the router instance with **module.exports**

# user.js in routes

File defines two routes:

- a **GET** route for fetching a user by their ID, using the **getUserById** function from the **userController**.
- a **POST** route for updating a user, using the **updateUser** function from the **userController**. This route also uses the **uploadMulti** middleware from **validator.js**, which allows for multiple files to be uploaded as part of the request.

Note that the routes are prefixed with **/**, so a request for fetching a user by ID would look like **/user/:id**, and a request for updating a user would look like **/user/update**.

# utils.js

File exports several utility functions:

1. **getPlaceholderStringForArray**: This function takes an array as input and returns a string of comma-separated placeholders ("?, ?, ...") equal to the length of the array. It is used to generate placeholders for SQL queries.
2. **multipleColumnSet**: This function takes an object as input and returns an object with two properties: **columnSet** and **values**. **columnSet** is a string of comma-separated SQL column assignments ("key1 = ?, key2 = ?, ...") generated from the keys of the input object, and **values** is an array of the corresponding values.
3. **hashPassword**: This function takes a request object as input and hashes the **password** field of the request body using bcrypt.
4. **checkValidation**: This function takes a request and response object as input and checks for validation errors using the **validationResult** function from the **express-validator** library. If errors are found, it returns the errors object; otherwise, it returns false.
