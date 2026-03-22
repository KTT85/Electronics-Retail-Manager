import { Outlet, Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const POSLayout = () => {
  return (
    <div className="pos-container">
      <div className="pos-header">
        <h2>Màn hình Thu Ngân POS</h2>
        <Link to="/" className="back-btn"><Home size={20} /> Về Quản lý</Link>
      </div>
      <div className="pos-content">
        <Outlet />
      </div>
    </div>
  );
};
export default POSLayout;