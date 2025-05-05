// src/routes/DashboardRoutes.tsx
import { Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout'
import { MyRequestsPage, HomePage, SubmitRequestPage, SettingsPage } from '../pages';
import { ProtectedRoute } from '.';

const DashboardRoutes = (
  <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
    <Route index element={<HomePage />} />
    <Route path="submit" element={<SubmitRequestPage />} />
    <Route path="my-requests" element={<MyRequestsPage />} />
    <Route path="settings" element={<SettingsPage/>}/>
  </Route>
);

export default DashboardRoutes;
