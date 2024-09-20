const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/auth');
const incomeRoutes = require('./routes/income');  
const expenseCategoryRoutes = require('./routes/expenseCategory');
const expseneRoutes = require('./routes/expense');
const reportRoutes = require('./routes/reports');
const resourceRoutes = require('./routes/educationalResource');
//dotenv.config();


// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

//to allow remote request from this URL
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};


const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api", dataRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense-category", expenseCategoryRoutes);
app.use("/api/expense", expseneRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 5000;
console.log('port is', process.env.PORT);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
