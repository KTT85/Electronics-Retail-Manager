import React, { useState } from 'react';
import { 
  FolderPlus, PlusCircle, Download, Folder, 
  Tags, ShoppingCart, X, Edit3, Trash2
} from 'lucide-react';

const Categories = () => {
  // 1. Quản lý danh sách danh mục trong State
  const [categories, setCategories] = useState([
    { id: 'CAT001', name: 'Điện thoại', level: 1 },
    { id: 'CAT002', name: 'Laptop', level: 1 },
    { id: 'CAT003', name: 'Tablet', level: 1 },
    { id: 'CAT004', name: 'Phụ kiện', level: 1 },
    { id: 'CAT005', name: 'Sản phẩm', level: 1 },
    { id: 'CAT006', name: 'Bóng đá', level: 2 },
    { id: 'CAT007', name: 'Pickle Ball', level: 2 },
  ]);

  // 2. Trạng thái đóng/mở Modal
  const [showParentModal, setShowParentModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  // 3. Hàm xử lý Xóa
  const handleDelete = (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}" không?`)) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  // 4. Hàm xử lý khi bấm Sửa
  const handleEditClick = (cat) => {
    setSelectedCat(cat);
    setShowEditModal(true);
  };

  const ActionCard = ({ icon, label, onClick }) => (
    <div 
      onClick={onClick}
      style={actionCardStyle} 
      onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} 
      onMouseOut={e => e.currentTarget.style.background = 'white'}
    >
      {icon}
      <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{label}</span>
    </div>
  );

  return (
    <div className="page-container" style={{ background: '#f4f6f8', minHeight: '100%' }}>
      
      {/* HEADER */}
      <div className="chart-header" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="chart-title" style={{ fontSize: '24px', color: '#1a3353' }}>Quản lý Danh mục</h2>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Quản lý danh mục sản phẩm phân cấp</p>
        </div>
      </div>

      {/* TOP STATS */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ ...statBox, borderTop: '4px solid #fde68a' }}>
          <p style={statLabelText}>TỔNG DANH MỤC</p>
          <h1 style={statValue}>{categories.length}</h1>
        </div>
        <div style={{ ...statBox, borderTop: '4px solid #bbf7d0' }}>
          <p style={statLabelText}>DANH MỤC GỐC</p>
          <h1 style={statValue}>{categories.filter(c => c.level === 1).length}</h1>
        </div>
      </div>

      {/* KHỐI QUẢN LÝ DANH MỤC */}
      <div className="white-box" style={{ padding: '25px', flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#111827' }}>Quản lý Danh mục</h3>
        
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <ActionCard onClick={() => setShowParentModal(true)} icon={<FolderPlus size={28} style={{ color: '#f59e0b' }}/>} label="Thêm danh mục" />
          <ActionCard onClick={() => setShowChildModal(true)} icon={<PlusCircle size={28} style={{ color: '#3b82f6' }}/>} label="Thêm danh mục con" />
          <ActionCard icon={<Download size={28} style={{ color: '#10b981' }}/>} label="Xuất dữ liệu" />
        </div>

        <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '15px', color: '#4b5563' }}>Cấu trúc danh mục</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categories.map((cat) => (
            <div key={cat.id} style={categoryRowStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: '#f0fdf4', padding: '8px', borderRadius: '8px' }}>
                  <Folder size={18} style={{ color: cat.level === 1 ? '#f59e0b' : '#3b82f6' }} />
                </div>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '14px', margin: 0 }}>{cat.name}</p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>ID: {cat.id} | Cấp: {cat.level}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Nút Sửa */}
                <button 
                  onClick={() => handleEditClick(cat)}
                  style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Sửa
                </button>
                {/* Nút Xóa */}
                <button 
                  onClick={() => handleDelete(cat.id, cat.name)}
                  style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL SỬA DANH MỤC (Chuẩn theo ảnh bạn gửi) --- */}
      {showEditModal && selectedCat && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '450px' }}>
            <h3 style={modalTitleStyle}>Sửa danh mục</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Tên danh mục:</label>
              <input 
                type="text" 
                className="pos-input" 
                style={{ width: '100%', border: '2px solid #000' }} 
                defaultValue={selectedCat.name}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowEditModal(false)} style={btnCancelStyle}>Hủy</button>
              <button style={btnSaveStyle}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}

      {/* Các Modal Thêm khác giữ nguyên logic... */}
      {showParentModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}>Thêm danh mục mới</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Tên danh mục:</label>
              <input type="text" className="pos-input" style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowParentModal(false)} style={btnCancelStyle}>Hủy</button>
              <button style={btnSaveStyle}>Thêm danh mục</button>
            </div>
          </div>
        </div>
      )}

      {showChildModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={modalTitleStyle}>Thêm danh mục con</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Danh mục cha:</label>
              <select className="pos-input" style={{ width: '100%' }}><option>Chọn danh mục cha</option></select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Tên danh mục con:</label>
              <input type="text" className="pos-input" style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowChildModal(false)} style={btnCancelStyle}>Hủy</button>
              <button style={btnSaveStyle}>Thêm danh mục con</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- STYLES ---
const actionCardStyle = { background: 'white', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '20px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: '0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
const categoryRowStyle = { display: 'flex', alignItems: 'center', padding: '12px 20px', background: '#fff', borderRadius: '10px', border: '1px solid #f3f4f6', justifyContent: 'space-between' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '15px', padding: '25px' };
const modalTitleStyle = { fontSize: '20px', fontWeight: '800', marginBottom: '25px' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '16px', marginBottom: '10px' };
const btnCancelStyle = { padding: '10px 25px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', fontWeight: '600', cursor: 'pointer' };
const btnSaveStyle = { padding: '10px 25px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer' };
const statBox = { flex: 1, background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
const statLabelText = { fontSize: '11px', color: '#6b7280', fontWeight: '700' };
const statValue = { fontSize: '32px', fontWeight: '800', margin: '5px 0' };

export default Categories;