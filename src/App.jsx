import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Partners from './pages/Partners';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import POSScreen from './pages/POSScreen';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import Employees from './pages/Employees';
import Auth from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn Đăng nhập */}
        <Route path="/login" element={<Auth />} />

        {/* Cụm chức năng của Admin */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="don-hang" element={<Orders />} />
          <Route path="san-pham" element={<Products />} />
          <Route path="kho-hang" element={<Inventory />} />
          <Route path="khach-hang" element={<Partners type="Khách hàng" />} />
          <Route path="bao-cao" element={<Reports />} />
          <Route path="cai-dat" element={<Settings />} />
          <Route path="danh-muc" element={<Categories />} />
          <Route path="nha-cung-cap" element={<Suppliers />} />
          <Route path="nhan-vien" element={<Employees />} />
        </Route>
        
        {/* Đường dẫn Màn hình thu ngân */}
        <Route path="/pos" element={<POSScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
