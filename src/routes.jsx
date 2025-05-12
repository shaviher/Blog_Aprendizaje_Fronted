import { Navigate } from 'react-router-dom';
import DashboardPublication from './pages/publication/DashboardPublication.jsx';
import DetailPublication from './pages/publication/DetailPublication.jsx';

export const routes = [
  {
    path: '/publications/:id',
    element: <DetailPublication />
  },
  {
    path: '/publications',
    element: <DashboardPublication />
  },
  {
    path: '*',
    element: <Navigate to="/publications" replace />
  }
];
