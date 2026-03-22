import React, { useState } from 'react';
import { 
  LogOut, Trash2, Box, Zap, FileJson, 
  FileUp, X, Lightbulb, TrendingUp, 
  Package, ShoppingCart, CheckCircle2, AlertTriangle 
} from 'lucide-react';

const Products = () => {
  // 1. QUẢN LÝ TRẠNG THÁI MODAL
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  // 2. QUẢN LÝ DANH SÁCH SẢN PHẨM TRONG STATE (Để có thể Xóa)
  const [products, setProducts] = useState([
    { id: 'SP001', name: 'iPhone 15 Pro', sell: '28.900.000', cost: '25.000.000', cat: 'Điện thoại', stock: 5, lowStock: 10 },
    { id: 'SP002', name: 'Samsung Galaxy S24', sell: '24.900.000', cost: '22.000.000', cat: 'Điện thoại', stock: 100, lowStock: 10 },
    { id: 'SP003', name: 'MacBook Air M2', sell: '28.900.000', cost: '26.000.000', cat: 'Laptop', stock: 15, lowStock: 5 },
    { id: 'SP004', name: 'iPad Pro 11 inch', sell: '19.900.000', cost: '18.000.000', cat: 'Tablet', stock: 8, lowStock: 10 },
    { id: 'SP005', name: 'AirPods Pro', sell: '6.490.000', cost: '5.500.000', cat: 'Phụ kiện', stock: 25, lowStock: 10 },
  ]);

  // 3. HÀM XỬ LÝ XÓA SẢN PHẨM
  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" không?`)) {
      const newProducts = products.filter(p => p.id !== id);
      setProducts(newProducts);
    }
  };

  // Component phụ cho các nút chức năng (Action Cards)
  const ActionCard = ({ icon, label, onClick }) => (
    <div 
      onClick={onClick}
      style={{
        background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '15px',
        textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        cursor: 'pointer', transition: '0.2s'
      }} 
      onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'} 
      onMouseOut={e => e.currentTarget.style.background = '#f9fafb'}
    >
      {icon}
      <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{label}</span>
    </div>
  );

  return (
    <div className="page-container" style={{ background: '#f4f6f8', minHeight: '100%', position: 'relative' }}>
      
      {/* 1. HEADER */}
      <div className="chart-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="chart-title" style={{ fontSize: '24px', color: '#1a3353' }}>Quản lý Sản phẩm</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Danh mục và kho hàng sản phẩm</p>
        </div>
        <button className="refresh-btn" style={{ background: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>

      {/* 2. TOP STATS (Tự động cập nhật số liệu khi Xóa) */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: 'white', borderRadius: '12px', padding: '20px', borderTop: '4px solid #dc2626', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: '700' }}>TỔNG SẢN PHẨM</p>
          <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '5px 0' }}>{products.length}</h1>
          <p style={{ fontSize: '12px', color: '#0e9f6e', fontWeight: '600' }}>Đang kinh doanh</p>
        </div>
        <div style={{ flex: 1, background: 'white', borderRadius: '12px', padding: '20px', borderTop: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: '700' }}>SẮP HẾT HÀNG</p>
          <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '5px 0' }}>
            {products.filter(p => p.stock <= p.lowStock).length}
          </h1>
          <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600' }}>Cần nhập thêm</p>
        </div>
      </div>

      {/* 3. KHỐI DANH SÁCH & ACTION HUB */}
      <div className="white-box" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#111827' }}>Danh sách Sản phẩm</h3>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <ActionCard onClick={() => setShowAddModal(true)} icon={<Box size={24} style={{ color: '#3b82f6' }}/>} label="Thêm sản phẩm" />
          <ActionCard onClick={() => setShowPriceModal(true)} icon={<TrendingUp size={24} style={{ color: '#f59e0b' }}/>} label="Cập nhật giá" />
          <ActionCard onClick={() => setShowStockModal(true)} icon={<Package size={24} style={{ color: '#10b981' }}/>} label="Nhập kho" />
          <ActionCard icon={<FileUp size={24} style={{ color: '#6366f1' }}/>} label="Backup Excel" />
          <ActionCard icon={<Zap size={24} style={{ color: '#ef4444' }}/>} label="Upload Excel" />
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '10px', flex: 1 }}>
          <table className="data-table">
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ width: '40px' }}></th>
                <th>SẢN PHẨM</th>
                <th style={{ textAlign: 'center' }}>DANH MỤC</th>
                <th style={{ textAlign: 'right' }}>TỒN KHO</th>
                <th style={{ textAlign: 'right' }}>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td style={{ textAlign: 'center' }}><Zap size={18} style={{ color: '#f59e0b' }} /></td>
                  <td>
                    <p style={{ fontWeight: '700', fontSize: '14px', color: '#111827', margin: 0 }}>{p.name} ({p.id})</p>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                      Bán: {p.sell} VNĐ | Nhập: {p.cost} VNĐ
                    </p>
                  </td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#6b7280', fontSize: '13px' }}>{p.cat}</span></td>
                  <td style={{ textAlign: 'right', fontWeight: '700', fontSize: '14px' }}>
                    {p.stock} {p.stock <= p.lowStock ? <span title="Sắp hết hàng">⚠️</span> : <span>✅</span>}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>Danh sách sản phẩm trống.</p>
          )}
        </div>
      </div>

      {/* --- MODAL 1: THÊM SẢN PHẨM MỚI --- */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '450px' }}>
            <h3 style={modalTitleStyle}>Thêm sản phẩm mới</h3>
            <div style={formWrapperStyle}>
              <div><label style={labelStyle}>Tên sản phẩm:</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
              <div><label style={labelStyle}>Danh mục:</label><select className="pos-input" style={{ width: '100%' }}><option>Chọn danh mục</option></select></div>
              <div style={grid2ColStyle}>
                <div><label style={labelStyle}>Giá nhập:</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
                <div><label style={labelStyle}>Giá bán:</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
              </div>
              <div style={grid2ColStyle}>
                <div><label style={labelStyle}>Số lượng tồn:</label><input type="number" className="pos-input" style={{ width: '100%' }} /></div>
                <div><label style={labelStyle}>🔔 Tồn tối thiểu:</label><input type="number" className="pos-input" style={{ width: '100%', border: '2px solid #f59e0b' }} defaultValue="10" /></div>
              </div>
              <div style={footerStyle}>
                <button onClick={() => setShowAddModal(false)} style={btnCancelStyle}>Hủy</button>
                <button style={{ ...btnSaveStyle, background: '#2563eb' }}>Thêm sản phẩm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: CẬP NHẬT GIÁ --- */}
      {showPriceModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}><TrendingUp size={20} style={{ color: '#f59e0b' }} /> Cập nhật giá sản phẩm</h3>
            <div style={formWrapperStyle}>
              <div><label style={labelStyle}>Chọn sản phẩm:</label><select className="pos-input" style={{ width: '100%' }}><option>Chọn sản phẩm</option></select></div>
              <div style={grid2ColStyle}>
                <div><label style={labelStyle}>Giá nhập mới:</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
                <div><label style={labelStyle}>Giá bán mới:</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
              </div>
              <div style={footerStyle}>
                <button onClick={() => setShowPriceModal(false)} style={btnCancelStyle}>Hủy</button>
                <button style={{ ...btnSaveStyle, background: '#f59e0b' }}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: NHẬP KHO --- */}
      {showStockModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}><Package size={20} style={{ color: '#10b981' }} /> Nhập kho sản phẩm</h3>
            <div style={formWrapperStyle}>
              <div><label style={labelStyle}>Chọn sản phẩm:</label><select className="pos-input" style={{ width: '100%' }}><option>Chọn sản phẩm</option></select></div>
              <div><label style={labelStyle}>Số lượng nhập:</label><input type="number" className="pos-input" style={{ width: '100%' }} /></div>
              <div style={footerStyle}>
                <button onClick={() => setShowStockModal(false)} style={btnCancelStyle}>Hủy</button>
                <button style={{ ...btnSaveStyle, background: '#10b981' }}>Xác nhận nhập kho</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- STYLES ---
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' };
const modalTitleStyle = { fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#111827' };
const formWrapperStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const grid2ColStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '6px', color: '#374151' };
const footerStyle = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' };
const btnCancelStyle = { padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };
const btnSaveStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };

export default Products;