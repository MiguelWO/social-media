const express = require('express');
const connectDB = require('./DB/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const auth = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

// Connect to MongoDB
connectDB();

// Create new user
// const User = require('./schemas/user');
// const newUser = new User({
//     username: 'test',
//     email: 'wmiguel@gmail.com',
//     password : '123456',
// });
// newUser.save();



// Middleware
app.use(bodyParser.json());
app.use(cors(({ origin: true, credentials: true })));
app.use(express.json());
app.use(cookieParser());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//   const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// app.use(cors(corsOptions));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', auth, commentRoutes);


app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));