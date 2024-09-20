import React, {useContext, useEffect, useState} from 'react';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import api from './services/api'
import { UserProvider, useUser } from './services/UserContext.js'
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import UserDashboard from './components/User/Dashboard.js';
import UserIncome from './components/User/IncomeList.js';
import AdminDashboard from './components/Admin/Dashboard.js';
import AdminManageUsers from './components/Admin/ManageUsers';
import GuestHeader from './components/GuestHeader';
import GuestFooter from './components/GuestFooter';
import UserHeader from './components/UserHeader.js';
import UserFooter from './components/UserFooter';
import AdminHeader from './components/AdminHeader.js';
import AdminFooter from './components/AdminFooter';
import AddIncome from './components/User/AddIncome.js';
import ProtectedRoute from './components/protectedRoute.js';
import ExpenseCategoryPage from './components/User/ExpenseCategoryPage.js';
import ExpenseForm from './components/User/ExpenseForm.js';
import ExpenseList from './components/User/ExpenseList.js';
import ExpenseCategoryForm from './components/User/ExpenseCategoryForm.js';
import Reports from './components/User/Reports.js';
import CreateResource from './components/Admin/CreateResource';
import ViewResources from './components/User/ViewResources';
import ResourceDetail from './components/User/ResourceDetail';
import AdminResourceDetail from './components/Admin/AdminResourceDetail';
import ViewEducationalResources from './components/Admin/ViewEducationalResources.js';
import TermsAndConditions from './components/TermsAndConditions.js';
import PrivacyPolicy from './components/PrivacyPolicy.js';

function App() {
  //const userRole = "guest"; // This should be dynamically set based on user authentication
   // This should be dynamically set based on user authentication

   
const Header = () => {
  const { userRole, loading, error, userName, role } = useUser();

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  // if (error) {
  //     return <div>Error: {error}</div>;
  // }
console.log("role trial: ", role);
  switch (userRole) {
      case 'standard':
          return <UserHeader />;
      case 'admin':
           return <UserHeader />;
      default:
          return '';// <GuestHeader />;
  }
  
};


 // List of paths where the header should not be shown should be registed below
 const noHeaderPaths = ['/','/login', '/register'];


    return (
    <div className="App">
       <UserProvider>
    <Router>
      
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/user/" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        
        <Route path="/user/income" element={<ProtectedRoute> <UserIncome /> </ProtectedRoute>} />
        <Route path="/user/addincome" element={<ProtectedRoute><AddIncome /></ProtectedRoute>} />
        <Route path="/user/income/edit/:incomeId" element={<ProtectedRoute><AddIncome /> </ProtectedRoute>} />
        
        <Route path="/user/expenses" element={<ProtectedRoute> <ExpenseList /> </ProtectedRoute>} />
        <Route path="/user/expenses/add" element={<ProtectedRoute><ExpenseForm /> </ProtectedRoute>} />
        <Route path="/user/expenses/edit/:expenseId" element={<ProtectedRoute><ExpenseForm /> </ProtectedRoute>} />

        <Route path="/user/expenses/categories" element={<ProtectedRoute><ExpenseCategoryPage /> </ProtectedRoute>} />
        <Route path="/user/expenses/categories/add" element={<ProtectedRoute><ExpenseCategoryForm /> </ProtectedRoute>} />
        <Route path="/user/expenses/categories/edit/:categoryId" element={<ProtectedRoute><ExpenseCategoryForm /> </ProtectedRoute>} />
         
                <Route path="/user/resources" element={<ProtectedRoute><ViewResources /></ProtectedRoute>} />
                <Route path="/user/resources/:resourceId" element={<ProtectedRoute><ResourceDetail /></ProtectedRoute>} />
        <Route path="/user/reports" element={<ProtectedRoute><Reports /> </ProtectedRoute>} />
        
        
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/manage-users" element={<ProtectedRoute><AdminManageUsers /></ProtectedRoute>} />
        <Route path="/admin/resources/create" element={<ProtectedRoute><CreateResource /></ProtectedRoute>} />
        <Route path="/admin/resources/edit/:resourceId" element={<ProtectedRoute><CreateResource /></ProtectedRoute>} />
        <Route path="/admin/" element={<ProtectedRoute><ViewEducationalResources /> </ProtectedRoute>} />
        <Route path="/admin/resources" element={<ProtectedRoute><ViewEducationalResources /> </ProtectedRoute>} />
        <Route path="/admin/resources/:resourceId" element={<ProtectedRoute><AdminResourceDetail /></ProtectedRoute>} />
        
      </Routes>
      
    </Router>
    </UserProvider>
    </div>
  );
}



export default App;
