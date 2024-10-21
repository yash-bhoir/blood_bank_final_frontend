import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import Contact from './components/contact/contact';
import Aboutus from './components/aboutus/aboutus';
import Dashboard from './components/dashboard/dashboard';
import Service from './components/services/service';
import './index.css';
import VerifyOtp from './components/ForgotPassword/VerifyOtp';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import MainForgotPasswordPage from './components/ForgotPassword/mainForgotPasswordPage';
import MainResetPasswordPage from './components/ForgotPassword/mainRestPasswordPage';
import Unauthorized from './utility/Unauthorized';
import ProtectedLayout from './utility/ProtectedRoute';
import NotFound from './utility/NotFound';
import MainSignup from './components/signup/mainSignup';
import MainSignin from './components/signin/mainSignin';


function App() {
  return (
    <Routes>
      <Route path="/signin" element={<MainSignin/>} />
      <Route path="/signup" element={<MainSignup />} />
      <Route path="/forgotPassword" element={<MainForgotPasswordPage />} />
      <Route path="/resetPassword" element={<MainResetPasswordPage />} />



      <Route element={<ProtectedLayout />}>

      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/service" element={<Service />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword userId={''} />} />
      <Route path="/notFound" element={<NotFound />} />

      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/notFound" />} />

    </Routes>
  );
}

export default App;
