const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/authMiddleware');
const Income = require('../models/Income')
const Expense = require('../models/Expense')

let month, year, startDate, endDate ;
let start, end;

//this function will get the queryString parameters and get them set
const getSetRouteParameters = (req) =>{
    
     ({ month, year, startDate, endDate } = req.query);


        // Convert month, year, startDate, and endDate to appropriate formats
        if (startDate && endDate) {
            start = new Date(startDate);
            start.setHours(0,0,0,0);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Include the end date up to the last millisecond
        } else if (month && year) {
            start = new Date(year, month - 1, 1);
            end = new Date(year, month, 1);
            end.setHours(23, 59, 59, 999); // Include the entire month
        } 
        // else {
        //     throw new Error('Invalid date parameters');
        // }
}

// Example: Total income and expense report
// GET: Total income and expense
router.get('/totals', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const totalIncome = await Income.aggregate([
            { $match: { userId } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);

        const totalExpenses = await Expense.aggregate([
            { $match: { userId } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);

        res.status(200).json({
            totalIncome: totalIncome[0]?.totalAmount || 0,
            totalExpenses: totalExpenses[0]?.totalAmount || 0
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Example: Monthly breakdown report
// GET: Monthly income and expense breakdown
router.get('/monthly-breakdown', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        getSetRouteParameters(req);
        let matchConditions = {
            userId
        }
       if (month !== undefined || startDate !== undefined) {
        
        matchConditions = {
            userId,
            date: {
                $gte: start,
                $lt: end
            }
        }
    }


        // Income aggregation pipeline
        const incomeByMonth = await Income.aggregate([
            { $match: matchConditions },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' }
                    },
                    totalIncome: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }  // Sort by year and month
        ]);

        // Expense aggregation pipeline
        const expenseByMonth = await Expense.aggregate([
            { $match: matchConditions },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' }
                    },
                    totalExpenses: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }  // Sort by year and month
        ]);

        // Flatten the data
        const allMonths = new Map();

        // Process income data
        incomeByMonth.forEach(({ _id: { month, year }, totalIncome }) => {
            const key = `${year}-${month}`;
            allMonths.set(key, { year, month, totalIncome, totalExpenses: 0 });
        });

        // Process expense data
        expenseByMonth.forEach(({ _id: { month, year }, totalExpenses }) => {
            const key = `${year}-${month}`;
            if (allMonths.has(key)) {
                allMonths.get(key).totalExpenses = totalExpenses;
            } else {
                allMonths.set(key, { year, month, totalIncome: 0, totalExpenses });
            }
        });

        // Convert the map to an array
        const result = Array.from(allMonths.values()).sort((a, b) => a.year - b.year || a.month - b.month);

        res.json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});




// Example: Category-wise expense report
// GET: Expense breakdown by category
router.get('/category-breakdown', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
       
        getSetRouteParameters(req);
        // Define match conditions based on the provided date filters
        let matchConditions = {
            userId
        }
       if (month !== undefined || startDate !== undefined) {
        
        matchConditions = {
            userId,
            date: {
                $gte: start,
                $lt: end
            }
        }
    }

        const expensesByCategory = await Expense.aggregate([
            { $match: matchConditions },
            {
                $group: {
                    _id: '$categoryId',
                    totalExpenses: { $sum: '$amount' }
                }
            },
            {
                $lookup: {
                    from: 'expensecategories',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $project: {
                    _id: 0,
                    categoryName: '$category.categoryName',
                    totalExpenses: 1
                }
            }
        ]);

        res.status(200).json(expensesByCategory);
    } catch (err) {
        console.log(err.message);  // Logging the error for debugging purposes
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.get('/income-source-breakdown', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        getSetRouteParameters(req);
        let matchConditions = {
            userId
        }
       if (month !== undefined || startDate !== undefined) {
        
        matchConditions = {
            userId,
            date: {
                $gte: start,
                $lt: end
            }
        }
    }


    const incomeBySource = await Income.aggregate([
        { $match: matchConditions },
        {
            $group: {
                _id: '$source',              // Group by the 'source' field
                totalIncome: { $sum: '$amount' }  // Calculate total income for each source
            }
        },
        {
            $project: {
                source: '$_id',            // Rename '_id' to 'source'
                totalIncome: 1,            // Include the totalIncome field
                _id: 0                      // Exclude the '_id' field from the final result
            }
        },
        { $sort: { source: 1 } }       // Sort by source
    ]);

      
        res.json(incomeBySource);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/all-expense', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        getSetRouteParameters(req);
        let matchConditions = {
            userId
        }
       if (month !== undefined || startDate !== undefined) {
        
        matchConditions = {
            userId,
            date: {
                $gte: start,
                $lt: end
            }
        }
    }
      
        const expenses = await Expense.aggregate([
            {
                $match: matchConditions 
            },
            {
                $lookup: {
                    from: 'expensecategories',  // Collection name in MongoDB (usually pluralized)
                    localField: 'categoryId',   // Field in Expense
                    foreignField: 'categoryId', // Field in ExpenseCategory
                    as: 'categoryDetails'
                }
            },
            {
                $unwind: '$categoryDetails'  // Flatten the array to get the category details
            },
            {
                $project: {
                    expenseId: 1,
                    userId: 1,
                    amount: 1,
                    date: 1,
                    description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    categoryId:1,
                    categoryName: '$categoryDetails.categoryName'
                }
            }
        ]);

        res.status(200).json(expenses);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/all-income', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        getSetRouteParameters(req);
        let query = {userId}
        if (start !== undefined ) {
            query.date = {$gte: start, $lt: end }
        }
        const incomes = await Income.find( query );
        res.status(200).json(incomes);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let users = await User;
        // if (!users) {
        //     return res.status(400).json({ message: 'Invalid email or password' });
        // }

        
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = router;
