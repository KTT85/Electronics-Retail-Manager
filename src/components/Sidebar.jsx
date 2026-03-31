import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Database, 
  Users, 
  FileText, 
  BarChart3, 
  Settings as SettingsIcon,
  Tags
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Tổng quan', icon: <LayoutDashboard size={18} /> },
    { path: '/khach-hang', label: 'Khách hàng', icon: <Users size={18} /> },
    { path: '/nha-cung-cap', label: 'Nhà cung cấp', icon: <ShoppingCart size={18} /> },
    { path: '/san-pham', label: 'Sản phẩm', icon: <Package size={18} /> },
    { path: '/danh-muc', label: 'Danh mục', icon: <Tags size={18} /> },
    { path: '/kho-hang', label: 'Kho hàng', icon: <Database size={18} /> },
    { path: '/don-hang', label: 'Đơn hàng', icon: <FileText size={18} /> },
    { path: '/nhan-vien', label: 'Nhân viên', icon: <Users size={18} /> },
    { path: '/pos', label: 'Bán hàng (POS)', icon: <ShoppingCart size={18} /> },
    { path: '/bao-cao', label: 'Báo cáo', icon: <BarChart3 size={18} /> },
    { path: '/cai-dat', label: 'Cài đặt', icon: <SettingsIcon size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-wrapper">
        <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Cua hang ban le</h2>
      </div>
      <nav className="nav-links">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;