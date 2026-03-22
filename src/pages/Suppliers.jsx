import React, { useState } from 'react';
import { 
  Building2, Search, ShoppingCart, Plus, Phone, 
  Mail, Trash2, User, X, Factory, Pencil
} from 'lucide-react';

const Suppliers = () => {
  // 1. QUẢN LÝ STATE
  const [suppliers, setSuppliers] = useState([
    { id: 'NCC001', name: 'Công ty TNHH ABC', type: 'Doanh nghiệp', phone: '024-3456-7890', email: 'abc@company.vn', address: 'Hà Nội' },
    { id: 'NCC002', name: 'Công ty XYZ', type: 'Cá nhân', phone: '028-3456-7891', email: 'xyz@company.vn', address: 'TP.HCM' },
  ]);

  // Trạng thái đóng mở các Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false); // Modal Tạo đơn mua
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // 2. HÀM XỬ LÝ
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa nhà cung cấp "${name}" không?`)) {
      setSuppliers(suppliers.filter(item => item.id !== id));
    }
  };

  const ActionCard = ({ icon, label, onClick }) => (
    <div onClick={onClick} style={actionCardStyle}
         onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} 
         onMouseOut={e => e.currentTarget.style.background = 'white'}>
      {icon}
      <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{label}</span>
    </div>
  );

  return (
    <div className="page-container" style={{ background: '#f4f6f8', minHeight: '100%' }}>
      
      {/* HEADER */}
      <div className="chart-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="chart-title" style={{ fontSize: '24px', color: '#1a3353' }}>Quản lý Nhà cung cấp</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Danh sách và thông tin nhà cung cấp</p>
        </div>
      </div>

      <div className="white-box" style={{ padding: '25px', flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
          Danh sách Nhà cung cấp ({suppliers.length})
        </h3>
        
        {/* ACTION HUB */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
          <ActionCard 
            onClick={() => setShowAddModal(true)}
            icon={<div style={{position: 'relative'}}><Building2 size={28} style={{ color: '#3b82f6' }}/><Plus size={14} style={{position:'absolute', top: -4, right: -4, color: '#3b82f6', fontWeight: 800}}/></div>} 
            label="Thêm nhà cung cấp" 
          />
          <ActionCard onClick={() => setShowSearchInput(!showSearchInput)} icon={<Search size={28} style={{ color: '#6366f1' }}/>} label="Tìm kiếm" />
          
          {/* NÚT TẠO ĐƠN MUA */}
          <ActionCard 
            onClick={() => setShowOrderModal(true)}
            icon={<ShoppingCart size={28} style={{ color: '#94a3b8' }}/>} 
            label="Tạo đơn mua" 
          />
        </div>

        {showSearchInput && (
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '12px', color: '#9ca3af' }} />
            <input type="text" placeholder="Tìm theo tên hoặc SĐT..." className="pos-input" style={{ width: '100%', paddingLeft: '45px', border: '2px solid #3b82f6' }} />
          </div>
        )}

        {/* DANH SÁCH NHÀ CUNG CẤP */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {suppliers.map((ncc) => (
            <div key={ncc.id} style={supplierRowStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                <div style={{ background: '#f0f4ff', padding: '10px', borderRadius: '8px' }}>
                  <Building2 size={20} style={{ color: '#4f46e5' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>{ncc.name} ({ncc.id})</p>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '4px' }}>
                    <span style={infoItemStyle}><User size={12}/> {ncc.type}</span>
                    <span style={infoItemStyle}><Phone size={12}/> {ncc.phone}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => {setSelectedSupplier(ncc); setShowEditModal(true)}} style={btnActionStyle('#3b82f6')}>Sửa</button>
                <button onClick={() => handleDelete(ncc.id, ncc.name)} style={btnActionStyle('#dc2626')}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL 1: TẠO ĐƠN MUA HÀNG (Ảnh a3a989.png) --- */}
      {showOrderModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '450px' }}>
            <h3 style={modalTitleStyle}>Tạo đơn mua hàng</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={labelStyle}>Nhà cung cấp:</label>
                <select className="pos-input" style={{ width: '100%' }}>
                  <option>Chọn nhà cung cấp</option>
                  {suppliers.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Tên sản phẩm:</label>
                <input type="text" className="pos-input" style={{ width: '100%' }} placeholder="Nhập tên sản phẩm..." />
              </div>

              <div>
                <label style={labelStyle}>Số lượng:</label>
                <input type="number" className="pos-input" style={{ width: '100%' }} placeholder="0" />
              </div>

              <div>
                <label style={labelStyle}>Giá mua:</label>
                <input type="text" className="pos-input" style={{ width: '100%' }} placeholder="VNĐ" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => setShowOrderModal(false)} style={btnHuyStyle}>Hủy</button>
                <button style={{ ...btnThemStyle, background: '#2563eb' }}>Tạo đơn mua</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÊM MỚI ( image_a3a50f.png ) */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}>🏭 Thêm nhà cung cấp mới</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div><label style={labelStyle}>Tên NCC: *</label><input className="pos-input" style={{width:'100%'}}/></div>
                <div><label style={labelStyle}>Loại: *</label><select className="pos-input" style={{width:'100%'}}><option>Chọn loại</option></select></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowAddModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={btnThemStyle}>Thêm nhà cung cấp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' };
const modalTitleStyle = { fontSize: '20px', fontWeight: '800', marginBottom: '25px', color: '#1a3353' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '14px', marginBottom: '8px', color: '#374151' };
const btnHuyStyle = { padding: '10px 25px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', fontWeight: '600', cursor: 'pointer' };
const btnThemStyle = { padding: '10px 25px', borderRadius: '8px', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer' };
const actionCardStyle = { background: 'white', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: '0.2s' };
const supplierRowStyle = { display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#fff', borderRadius: '10px', border: '1px solid #f3f4f6', justifyContent: 'space-between' };
const infoItemStyle = { fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' };
const btnActionStyle = (bg) => ({ background: bg, color: 'white', border: 'none', padding: '6px 15px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' });

export default Suppliers;