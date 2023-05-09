# Social Media App Backend
This is the backend for a social media app built using Node.js and Express.

### Prerequisites
Node.js (v12 or higher)
MongoDB
Getting Started
Clone the repository: git clone (https://github.com/MiguelWO/social-media.git)
Install dependencies: npm install

Create a .env file in the root directory and set the following environment variables:
PORT: the port number the server will run on (default is 3000)
MONGODB_URI: the URI for your MongoDB database
JWT_SECRET: a secret string used for signing JSON Web Tokens
Start the server: npm start
API Endpoints
The following endpoints are available:

### Auth Routes
POST /api/auth/register: Register a new user.

POST /api/auth/login: Log in an existing user and return a JSON Web Token.

### User Routes
GET /api/users: Get a list of all users.

GET /api/users/:id: Get a specific user by ID.

PUT /api/users/:id: Update a specific user by ID.

DELETE /api/users/:id: Delete a specific user by ID.


### Post Routes
GET /api/posts: Get a list of all posts.

GET /api/posts/:id: Get a specific post by ID.

POST /api/posts: Create a new post.

PUT /api/posts/:id: Update a specific post by ID.

DELETE /api/posts/:id: Delete a specific post by ID.


### Authentication
This app uses JSON Web Tokens (JWTs) for authentication. To access protected routes, clients must include a JWT in the Authorization header of their requests. The JWT is obtained by logging in with valid user credentials.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
