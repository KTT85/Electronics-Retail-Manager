import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Edit, Trash2, 
  ShieldCheck, UserCheck, UserX, Download, X, Save
} from 'lucide-react';

const Employees = () => {
  // --- STATE DỮ LIỆU NHÂN VIÊN ---
  const [employees, setEmployees] = useState([
    { id: 'NV001', name: 'Nguyễn Văn Admin', role: 'Quản trị viên', phone: '0988123456', email: 'admin@ktt85.com', status: 'Hoạt động' },
    { id: 'NV002', name: 'Trần Thu Ngân', role: 'Thu ngân', phone: '0977123456', email: 'thungan1@ktt85.com', status: 'Hoạt động' },
    { id: 'NV003', name: 'Lê Kho Hàng', role: 'Thủ kho', phone: '0966123456', email: 'kho1@ktt85.com', status: 'Hoạt động' },
    { id: 'NV004', name: 'Phạm Nghỉ Việc', role: 'Thu ngân', phone: '0955123456', email: 'nghiviec@ktt85.com', status: 'Ngừng hoạt động' },
  ]);

  // --- STATE TÌM KIẾM & MODAL ---
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});

  // --- THỐNG KÊ ---
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Hoạt động').length;
  const adminCount = employees.filter(e => e.role === 'Quản trị viên').length;
  const cashierCount = employees.filter(e => e.role === 'Thu ngân').length;

  // --- HÀM XỬ LÝ ---
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.phone.includes(searchQuery)
  );

  const handleOpenAdd = () => {
    setIsEdit(false);
    setCurrentEmployee({ id: '', name: '', role: 'Thu ngân', phone: '', email: '', status: 'Hoạt động' });
    setShowModal(true);
  };

  const handleOpenEdit = (emp) => {
    setIsEdit(true);
    setCurrentEmployee(emp);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa nhân viên ${id} không?`)) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentEmployee.name || !currentEmployee.phone) {
      return alert("Vui lòng nhập đầy đủ Tên và Số điện thoại!");
    }

    if (isEdit) {
      setEmployees(employees.map(e => e.id === currentEmployee.id ? currentEmployee : e));
      alert("Cập nhật thông tin nhân viên thành công!");
    } else {
      const newId = `NV00${employees.length + 1}`;
      setEmployees([{ ...currentEmployee, id: newId }, ...employees]);
      alert("Thêm nhân viên mới thành công!");
    }
    setShowModal(false);
  };

  return (
    <div className="page-container" style={{ background: '#f4f7f9', height: '100vh', overflowY: 'auto', padding: '25px' }}>
      
      {/* HEADER */}
      <div className="chart-header" style={{ marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Quản lý Nhân viên</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Thêm mới, phân quyền và quản lý tài khoản nội bộ</p>
        </div>
      </div>

      {/* THỐNG KÊ NHANH */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <StatCard title="TỔNG NHÂN VIÊN" value={totalEmployees} icon={<Users size={20} color="#3b82f6"/>} border="#3b82f6" />
        <StatCard title="QUẢN TRỊ VIÊN" value={adminCount} icon={<ShieldCheck size={20} color="#8b5cf6"/>} border="#8b5cf6" />
        <StatCard title="THU NGÂN" value={cashierCount} icon={<UserCheck size={20} color="#f59e0b"/>} border="#f59e0b" />
        <StatCard title="ĐANG HOẠT ĐỘNG" value={activeEmployees} icon={<UserCheck size={20} color="#10b981"/>} border="#10b981" />
      </div>

      {/* KHỐI NỘI DUNG CHÍNH */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        
        {/* Thanh công cụ: Tìm kiếm & Nút thêm mới */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div style={{ position: 'relative', width: '400px' }}>
            <Search size={18} color="#9ca3af" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
            <input 
              type="text" placeholder="Tìm kiếm theo mã NV, tên, số điện thoại..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ ...btnWhiteStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={18} /> Xuất Excel
            </button>
            <button onClick={handleOpenAdd} style={{ ...btnGreenStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserPlus size={18} /> Thêm nhân viên
            </button>
          </div>
        </div>

        {/* BẢNG DANH SÁCH NHÂN VIÊN */}
        <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>
                <th style={thStyle}>Mã NV</th>
                <th style={thStyle}>Họ và tên</th>
                <th style={thStyle}>Vai trò</th>
                <th style={thStyle}>Số điện thoại</th>
                <th style={thStyle}>Email</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Trạng thái</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? filteredEmployees.map((emp, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                  <td style={tdStyle}><strong>{emp.id}</strong></td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#1a3353' }}>{emp.name}</td>
                  <td style={tdStyle}>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: emp.role === 'Quản trị viên' ? '#ede9fe' : '#eff6ff', color: emp.role === 'Quản trị viên' ? '#7c3aed' : '#2563eb' }}>
                      {emp.role}
                    </span>
                  </td>
                  <td style={tdStyle}>{emp.phone}</td>
                  <td style={tdStyle}>{emp.email || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', background: emp.status === 'Hoạt động' ? '#d1fae5' : '#fee2e2', color: emp.status === 'Hoạt động' ? '#059669' : '#dc2626' }}>
                      {emp.status === 'Hoạt động' ? <UserCheck size={14}/> : <UserX size={14}/>}
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => handleOpenEdit(emp)} style={actionBtnStyle} title="Chỉnh sửa"><Edit size={16} color="#3b82f6" /></button>
                      <button onClick={() => handleDelete(emp.id)} style={actionBtnStyle} title="Xóa"><Trash2 size={16} color="#ef4444" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#6b7280' }}>Không tìm thấy nhân viên nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==============================================================
          MODAL: THÊM / SỬA NHÂN VIÊN
      ============================================================== */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '650px', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1a3353', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                {isEdit ? <Edit color="#3b82f6" /> : <UserPlus color="#10b981" />}
                {isEdit ? `Sửa thông tin: ${currentEmployee.id}` : 'Thêm nhân viên mới'}
              </h3>
              <X onClick={() => setShowModal(false)} style={{ cursor: 'pointer', color: '#6b7280' }} size={24} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Họ và tên: <span style={{color:'red'}}>*</span></label>
                <input type="text" style={inputStyle} value={currentEmployee.name} onChange={(e) => setCurrentEmployee({...currentEmployee, name: e.target.value})} placeholder="Nhập tên nhân viên" />
              </div>
              <div>
                <label style={labelStyle}>Số điện thoại: <span style={{color:'red'}}>*</span></label>
                <input type="text" style={inputStyle} value={currentEmployee.phone} onChange={(e) => setCurrentEmployee({...currentEmployee, phone: e.target.value})} placeholder="Nhập SĐT" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Email liên hệ:</label>
                <input type="email" style={inputStyle} value={currentEmployee.email} onChange={(e) => setCurrentEmployee({...currentEmployee, email: e.target.value})} placeholder="Email (Không bắt buộc)" />
              </div>
              <div>
                <label style={labelStyle}>Mật khẩu đăng nhập: {!isEdit && <span style={{color:'red'}}>*</span>}</label>
                <input type="password" style={inputStyle} placeholder={isEdit ? "Bỏ trống nếu không đổi MK" : "Tạo mật khẩu cho nhân viên"} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={labelStyle}>Vai trò (Phân quyền):</label>
                <select style={inputStyle} value={currentEmployee.role} onChange={(e) => setCurrentEmployee({...currentEmployee, role: e.target.value})}>
                  <option value="Thu ngân">Thu ngân (Bán hàng)</option>
                  <option value="Thủ kho">Thủ kho (Quản lý kho)</option>
                  <option value="Quản trị viên">Quản trị viên (Toàn quyền)</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Trạng thái tài khoản:</label>
                <select style={inputStyle} value={currentEmployee.status} onChange={(e) => setCurrentEmployee({...currentEmployee, status: e.target.value})}>
                  <option value="Hoạt động">Đang hoạt động</option>
                  <option value="Ngừng hoạt động">Ngừng hoạt động (Khóa)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
              <button onClick={() => setShowModal(false)} style={btnWhiteStyle}>Hủy bỏ</button>
              <button onClick={handleSave} style={{ ...btnBlueStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={18} /> {isEdit ? 'Lưu cập nhật' : 'Thêm nhân viên'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- COMPONENTS PHỤ & CSS INLINE ---

const StatCard = ({ title, value, icon, border }) => (
  <div style={{ flex: 1, background: 'white', padding: '20px', borderRadius: '12px', borderTop: `4px solid ${border}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ fontSize: '12px', fontWeight: '800', color: '#6b7280' }}>{title}</span>
      {icon}
    </div>
    <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1a3353', margin: 0 }}>{value}</h2>
  </div>
);

const thStyle = { padding: '15px', textAlign: 'left', fontWeight: '800', color: '#4b5563', fontSize: '14px' };
const tdStyle = { padding: '15px', fontSize: '14px', color: '#374151' };
const actionBtnStyle = { background: '#f1f5f9', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '16px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)', position: 'relative' };

const labelStyle = { display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '8px', color: '#374151' };
const inputStyle = { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' };

const btnWhiteStyle = { padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '700', cursor: 'pointer', fontSize: '14px' };
const btnGreenStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '14px' };
const btnBlueStyle = { padding: '10px 25px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '14px' };

export default Employees;