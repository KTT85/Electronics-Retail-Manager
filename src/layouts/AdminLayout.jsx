import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="main-wrapper">
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;