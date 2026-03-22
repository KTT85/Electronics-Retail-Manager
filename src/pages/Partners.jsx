import React, { useState } from 'react';
import { 
  UserPlus, Search, Download, User, Phone, Mail, 
  MapPin, Trash2, Edit, Eye, Building2, X, FileText
} from 'lucide-react';

const Partners = () => {
  // 1. QUẢN LÝ DANH SÁCH KHÁCH HÀNG
  const [customers, setCustomers] = useState([
    { id: 'KH001', name: 'Nguyễn Văn A', type: 'Cá nhân', phone: '0901234567', email: 'nva@gmail.com', address: 'Hà Nội' },
    { id: 'KH002', name: 'Trần Thị B', type: 'Cá nhân', phone: '0912345678', email: 'ttb@gmail.com', address: 'TP.HCM' },
    { id: 'KH003', name: 'Lê Minh C', type: 'Doanh nghiệp', phone: '0923456789', email: 'lmc@minhchau.com', address: 'Đà Nẵng' },
  ]);

  // 2. TRẠNG THÁI MODAL
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // 3. CÁC HÀM XỬ LÝ
  const handleDelete = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xoá khách hàng ${id} không?`)) {
      setCustomers(customers.filter(kh => kh.id !== id));
    }
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleDetailClick = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
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
          <h2 className="chart-title" style={{ fontSize: '24px', color: '#1a3353' }}>Quản lý Khách hàng</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Danh sách và thông tin khách hàng</p>
        </div>
      </div>

      {/* KHỐI NỘI DUNG CHÍNH */}
      <div className="white-box" style={{ padding: '25px', flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Danh sách Khách hàng ({customers.length})</h3>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <ActionCard onClick={() => setShowAddModal(true)} icon={<UserPlus size={28} style={{ color: '#8b5cf6' }}/>} label="Thêm khách hàng" />
          <ActionCard onClick={() => setShowSearchInput(!showSearchInput)} icon={<Search size={28} style={{ color: '#3b82f6' }}/>} label="Tìm kiếm" />
          <ActionCard icon={<Download size={28} style={{ color: '#10b981' }}/>} label="Xuất báo cáo" />
        </div>

        {showSearchInput && (
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '12px', color: '#9ca3af' }} />
            <input type="text" placeholder="Tìm kiếm theo tên hoặc SĐT..." className="pos-input" style={{ width: '100%', paddingLeft: '45px', border: '2px solid #3b82f6' }} autoFocus />
          </div>
        )}

        {/* DANH SÁCH LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {customers.map((kh) => (
            <div key={kh.id} style={customerRowStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                <div style={{ background: '#f0f4ff', padding: '10px', borderRadius: '8px' }}>
                  {kh.type === 'Cá nhân' ? <User size={20} style={{ color: '#4f46e5' }} /> : <Building2 size={20} style={{ color: '#ea580c' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>{kh.name} ({kh.id})</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{kh.phone} | {kh.email} | {kh.address}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleDetailClick(kh)} style={btnActionStyle('#0e9f6e')}><Eye size={14}/> Chi tiết</button>
                <button onClick={() => handleEditClick(kh)} style={btnActionStyle('#3b82f6')}>Sửa</button>
                <button onClick={() => handleDelete(kh.id)} style={btnActionStyle('#dc2626')}><Trash2 size={14}/> Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: THÊM MỚI (Có Loại khách hàng) */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '550px' }}>
            <h3 style={modalTitleStyle}><UserPlus size={22} style={{ color: '#8b5cf6' }} /> Thêm khách hàng mới</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div><label style={labelStyle}>Tên khách hàng: *</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
              <div><label style={labelStyle}>Loại khách hàng: *</label><select className="pos-input" style={{ width: '100%' }}><option>Cá nhân</option><option>Doanh nghiệp</option></select></div>
            </div>
            <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Số điện thoại: *</label><input type="text" className="pos-input" style={{ width: '100%' }} /></div>
            <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Email:</label><input type="email" className="pos-input" style={{ width: '100%' }} /></div>
            <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Địa chỉ:</label><textarea className="pos-input" style={{ width: '100%', height: '60px', paddingTop: '10px', resize: 'none' }}></textarea></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowAddModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={{ ...btnThemStyle, background: '#2563eb' }}>Thêm khách hàng</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SỬA (Bỏ Loại khách hàng) */}
      {showEditModal && selectedCustomer && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '500px' }}>
            <h3 style={modalTitleStyle}><Edit size={22} style={{ color: '#3b82f6' }} /> Sửa thông tin: {selectedCustomer.id}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div><label style={labelStyle}>Tên khách hàng: *</label><input type="text" className="pos-input" style={{ width: '100%' }} defaultValue={selectedCustomer.name} /></div>
              <div><label style={labelStyle}>Số điện thoại: *</label><input type="text" className="pos-input" style={{ width: '100%' }} defaultValue={selectedCustomer.phone} /></div>
              <div><label style={labelStyle}>Email:</label><input type="email" className="pos-input" style={{ width: '100%' }} defaultValue={selectedCustomer.email} /></div>
              <div><label style={labelStyle}>Địa chỉ:</label><textarea className="pos-input" style={{ width: '100%', height: '60px', paddingTop: '10px', resize: 'none' }} defaultValue={selectedCustomer.address}></textarea></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setShowEditModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={{ ...btnThemStyle, background: '#3b82f6' }}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CHI TIẾT (Khôi phục thiết kế chuẩn - Bỏ Công nợ) */}
      {showDetailModal && selectedCustomer && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '900px', padding: '30px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={24} style={{ color: '#4f46e5' }} /> Chi tiết khách hàng: {selectedCustomer.name}
            </h2>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #3b82f6', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '15px' }}>📋 Thông tin cơ bản</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                <p><strong>Mã KH:</strong> {selectedCustomer.id}</p><p><strong>Tên:</strong> {selectedCustomer.name}</p>
                <p><strong>Điện thoại:</strong> {selectedCustomer.phone}</p><p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p style={{ gridColumn: 'span 2' }}><strong>Địa chỉ:</strong> {selectedCustomer.address}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px' }}>
              <div style={{ ...statBox, background: '#7c3aed' }}><h4 style={statLabel}>2</h4><p style={statText}>Tổng đơn hàng</p></div>
              <div style={{ ...statBox, background: '#ec4899' }}><h4 style={statLabel}>64.290.000</h4><p style={statText}>Tổng tiền mua</p></div>
              <div style={{ ...statBox, background: '#06b6d4' }}><h4 style={statLabel}>64.290.000</h4><p style={statText}>Đã thanh toán</p></div>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px' }}>📊 Lịch sử đơn hàng (2)</h3>
            <table className="data-table" style={{ fontSize: '13px' }}>
              <thead><tr style={{ background: '#f9fafb' }}><th>Mã ĐH</th><th>Ngày/Giờ</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thanh toán</th><th style={{ textAlign: 'right' }}>Thao tác</th></tr></thead>
              <tbody>
                <tr><td><strong>DH006</strong></td><td>2026-03-15 16:45</td><td style={{ color: '#2563eb', fontWeight: '700' }}>28.900.000 VNĐ</td><td><span style={tagStyle('#fef3c7', '#d97706')}>Mới</span></td><td><span style={tagStyle('#def7ec', '#03543f')}>Đã thanh toán</span></td><td style={{ textAlign: 'right' }}><button style={smallBtnStyle}>Chi tiết</button></td></tr>
                <tr><td><strong>DH001</strong></td><td>2026-03-15 10:30</td><td style={{ color: '#2563eb', fontWeight: '700' }}>35.390.000 VNĐ</td><td><span style={tagStyle('#def7ec', '#03543f')}>Hoàn thành</span></td><td><span style={tagStyle('#def7ec', '#03543f')}>Đã thanh toán</span></td><td style={{ textAlign: 'right' }}><button style={smallBtnStyle}>Chi tiết</button></td></tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '25px' }}><button onClick={() => setShowDetailModal(false)} style={{ ...btnThemStyle, background: '#2563eb' }}>Đóng</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const actionCardStyle = { background: 'white', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
const customerRowStyle = { display: 'flex', alignItems: 'center', padding: '15px 20px', background: '#fff', borderRadius: '10px', border: '1px solid #f3f4f6', justifyContent: 'space-between' };
const btnActionStyle = (bg) => ({ background: bg, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' });
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' };
const modalTitleStyle = { fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '6px' };
const btnHuyStyle = { padding: '8px 20px', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white', fontWeight: '600', cursor: 'pointer' };
const btnThemStyle = { padding: '8px 20px', borderRadius: '6px', border: 'none', color: 'white', fontWeight: '600', cursor: 'pointer' };
const statBox = { padding: '15px', borderRadius: '12px', textAlign: 'center', color: 'white', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' };
const statLabel = { fontSize: '20px', fontWeight: '800', margin: '0' };
const statText = { fontSize: '12px', margin: '5px 0 0 0', opacity: '0.9' };
const tagStyle = (bg, color) => ({ background: bg, color: color, padding: '3px 10px', borderRadius: '15px', fontSize: '11px', fontWeight: '700' });
const smallBtnStyle = { background: '#2563eb', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' };

export default Partners;