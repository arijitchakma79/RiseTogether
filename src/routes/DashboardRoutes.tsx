// src/routes/DashboardRoutes.tsx
import { Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout'
import HomePage from '../pages/dashboard/HomePage';
import SubmitRequestPage from '../pages/dashboard/SubmitRequestPage';
import MyRequestsPage from '../pages/dashboard/MyRequestPage';
import { ProtectedRoute } from '.';

const DashboardRoutes = (
  <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
    <Route index element={<HomePage />} />
    <Route path="submit" element={<SubmitRequestPage />} />
    <Route path="my-requests" element={<MyRequestsPage />} />
  </Route>
);

export default DashboardRoutes;
