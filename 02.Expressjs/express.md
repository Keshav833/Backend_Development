# Express.js: Routes and Middleware

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## 1. Routes

Routing refers to how an application's endpoints (URIs) respond to client requests.

### Basic Routing
Structure: `app.METHOD(PATH, HANDLER)`

- `app`: The instance of express.
- `METHOD`: HTTP request method (get, post, put, delete, etc.).
- `PATH`: A path on the server.
- `HANDLER`: The function executed when the route is matched.

```javascript
const express = require('express');
const app = express();

// GET method route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST method route
app.post('/', (req, res) => {
  res.send('Got a POST request');
});
```

### Route Parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object.

```javascript
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
```

## 2. Middleware

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

### What can Middleware do?
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

### Types of Middleware

#### 1. Application-level Middleware
Bound to an instance of the app object by using `app.use()` or `app.METHOD()`.

```javascript
// This function executes for every request to the app
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Pass control to the next handler
});
```

#### 2. Built-in Middleware
Express has some built-in middleware functions.
- `express.static`: Serves static assets such as HTML files, images, and so on.
- `express.json`: Parses incoming requests with JSON payloads.
- `express.urlencoded`: Parses incoming requests with URL-encoded payloads.

```javascript
app.use(express.json()); // For parsing application/json
app.use(express.static('public')); // Serve files from 'public' directory
```

#### 3. Error-handling Middleware
Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three: `(err, req, res, next)`.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Middleware Execution Flow
Middleware functions are executed sequentially. If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

```javascript
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  res.send('Response from Middleware 2');
  // No next() here, so the cycle ends.
});
```