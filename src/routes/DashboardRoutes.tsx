// src/routes/DashboardRoutes.tsx
import { Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout'
import { MyRequestsPage, HomePage, SubmitDonationPage, SettingsPage } from '../pages';
import { ProtectedRoute } from '.';

const DashboardRoutes = (
  <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
    <Route index element={<HomePage />} />
    <Route path="submit-donation" element={<SubmitDonationPage />} />
    <Route path="my-requests" element={<MyRequestsPage />} />
    <Route path="settings" element={<SettingsPage/>}/>
  </Route>
);

export default DashboardRoutes;
