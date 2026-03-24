import React, { useState } from 'react';
import { 
  User, Lock, Bell, LogOut, Camera, Save, 
  ShieldCheck, Mail, Phone, MapPin, Building
} from 'lucide-react';

const Settings = () => {
  // Quản lý tab đang chọn
  const [activeTab, setActiveTab] = useState('profile');

  // Quản lý dữ liệu người dùng (Mock data)
  const [userInfo, setUserInfo] = useState({
    name: 'Admin',
    email: 'admin@123.com',
    phone: '0987654321',
    role: 'Quản trị viên cấp cao',
    address: 'Hà Nội, Việt Nam'
  });

  // Xử lý đăng xuất
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?")) {
      alert("Đã đăng xuất thành công!");
      // Thêm logic chuyển hướng về trang Login ở đây
    }
  };

  return (
    <div className="page-container" style={{ background: '#f4f7f9', height: '100vh', overflowY: 'auto', padding: '25px' }}>
      
      {/* HEADER */}
      <div className="chart-header" style={{ marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Cài đặt hệ thống</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Quản lý thông tin tài khoản và bảo mật</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* ==========================================
            CỘT TRÁI: MENU CÀI ĐẶT
        ========================================== */}
        <div style={{ width: '280px', background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          
          {/* Avatar mini */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9', marginBottom: '20px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '800' }}>
              K
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1a3353' }}>{userInfo.name}</h4>
              <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>{userInfo.role}</span>
            </div>
          </div>

          {/* Các nút Tab */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <TabButton 
              active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}
              icon={<User size={18} />} label="Thông tin cá nhân" 
            />
            <TabButton 
              active={activeTab === 'security'} onClick={() => setActiveTab('security')}
              icon={<Lock size={18} />} label="Bảo mật & Mật khẩu" 
            />
            <TabButton 
              active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')}
              icon={<Bell size={18} />} label="Cài đặt thông báo" 
            />
            
            <div style={{ height: '1px', background: '#f1f5f9', margin: '10px 0' }}></div>
            
            <button onClick={handleLogout} style={{ ...tabBtnStyle, color: '#ef4444' }} onMouseOver={e => e.currentTarget.style.background = '#fef2f2'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
              <LogOut size={18} /> Đăng xuất
            </button>
          </div>
        </div>

        {/* ==========================================
            CỘT PHẢI: NỘI DUNG TƯƠNG ỨNG
        ========================================== */}
        <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          
          {/* NỘI DUNG TAB: THÔNG TIN CÁ NHÂN */}
          {activeTab === 'profile' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User color="#2563eb" /> Hồ sơ cá nhân
              </h3>

              {/* Phần Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: '800', color: '#2563eb' }}>
                    K
                  </div>
                  <button style={{ position: 'absolute', bottom: 0, right: 0, background: '#2563eb', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid white' }}>
                    <Camera size={16} />
                  </button>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#1a3353' }}>Ảnh đại diện</h4>
                  <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#6b7280' }}>Định dạng JPG, PNG hoặc GIF. Dung lượng tối đa 2MB.</p>
                  <button style={btnWhiteStyle}>Tải ảnh mới lên</button>
                </div>
              </div>

              {/* Form Thông tin */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                <div>
                  <label style={labelStyle}><User size={14} style={{ display: 'inline', marginRight: '5px' }}/> Họ và tên:</label>
                  <input type="text" style={inputStyle} defaultValue={userInfo.name} />
                </div>
                <div>
                  <label style={labelStyle}><Building size={14} style={{ display: 'inline', marginRight: '5px' }}/> Chức vụ:</label>
                  <input type="text" style={{ ...inputStyle, background: '#f8fafc', color: '#6b7280' }} defaultValue={userInfo.role} readOnly />
                </div>
                <div>
                  <label style={labelStyle}><Mail size={14} style={{ display: 'inline', marginRight: '5px' }}/> Email:</label>
                  <input type="email" style={inputStyle} defaultValue={userInfo.email} />
                </div>
                <div>
                  <label style={labelStyle}><Phone size={14} style={{ display: 'inline', marginRight: '5px' }}/> Số điện thoại:</label>
                  <input type="text" style={inputStyle} defaultValue={userInfo.phone} />
                </div>
                <div style={{ gridColumn: '1 / span 2' }}>
                  <label style={labelStyle}><MapPin size={14} style={{ display: 'inline', marginRight: '5px' }}/> Địa chỉ:</label>
                  <input type="text" style={inputStyle} defaultValue={userInfo.address} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => alert("Đã lưu thông tin!")} style={{ ...btnBlueStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} /> Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {/* NỘI DUNG TAB: BẢO MẬT & ĐỔI MẬT KHẨU */}
          {activeTab === 'security' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck color="#10b981" /> Đổi mật khẩu
              </h3>

              <div style={{ background: '#fffbeb', border: '1px solid #fde047', padding: '15px 20px', borderRadius: '8px', marginBottom: '30px', fontSize: '13px', color: '#854d0e', lineHeight: '1.6' }}>
                <strong>Khuyến nghị bảo mật:</strong> Mật khẩu mới nên dài ít nhất 8 ký tự, bao gồm cả chữ hoa, chữ thường, số và ký tự đặc biệt để đảm bảo an toàn cho tài khoản.
              </div>

              <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Mật khẩu hiện tại:</label>
                  <input type="password" style={inputStyle} placeholder="Nhập mật khẩu hiện tại..." />
                </div>
                <div>
                  <label style={labelStyle}>Mật khẩu mới:</label>
                  <input type="password" style={inputStyle} placeholder="Nhập mật khẩu mới..." />
                </div>
                <div>
                  <label style={labelStyle}>Xác nhận mật khẩu mới:</label>
                  <input type="password" style={inputStyle} placeholder="Nhập lại mật khẩu mới..." />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => alert("Đổi mật khẩu thành công!")} style={{ ...btnBlueStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={18} /> Cập nhật mật khẩu
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NỘI DUNG TAB: THÔNG BÁO */}
          {activeTab === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell color="#f59e0b" /> Tùy chỉnh thông báo
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                <ToggleOption title="Thông báo đơn hàng mới" desc="Nhận thông báo khi có đơn hàng mới được tạo" defaultChecked={true} />
                <ToggleOption title="Cảnh báo tồn kho" desc="Gửi email khi có sản phẩm chạm mức tồn kho tối thiểu" defaultChecked={true} />
                <ToggleOption title="Báo cáo doanh thu tuần" desc="Nhận email báo cáo tổng kết kinh doanh mỗi sáng thứ 2" defaultChecked={false} />
                <ToggleOption title="Đăng nhập thiết bị lạ" desc="Cảnh báo bảo mật khi phát hiện đăng nhập bất thường" defaultChecked={true} />
              </div>

              <div style={{ marginTop: '40px' }}>
                <button onClick={() => alert("Đã lưu cài đặt thông báo!")} style={{ ...btnBlueStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Save size={18} /> Lưu cài đặt
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- COMPONENTS PHỤ ---

// Nút Tab Menu
const TabButton = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    style={{ 
      ...tabBtnStyle, 
      background: active ? '#eff6ff' : 'transparent',
      color: active ? '#2563eb' : '#4b5563',
      fontWeight: active ? '700' : '600',
    }}
  >
    {icon} {label}
  </button>
);

// Option Bật/Tắt (Mô phỏng Toggle)
const ToggleOption = ({ title, desc, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '10px' }}>
      <div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: '700', color: '#1a3353' }}>{title}</h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>{desc}</p>
      </div>
      <div 
        onClick={() => setChecked(!checked)}
        style={{ width: '44px', height: '24px', background: checked ? '#10b981' : '#d1d5db', borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
      >
        <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '22px' : '2px', transition: '0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
      </div>
    </div>
  );
}

// --- STYLES ---
const tabBtnStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', width: '100%', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: '0.2s', textAlign: 'left' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '14px', marginBottom: '8px', color: '#374151' };
const inputStyle = { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', transition: '0.2s' };
const btnBlueStyle = { padding: '12px 25px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)' };
const btnWhiteStyle = { padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: 'pointer', fontSize: '13px' };

export default Settings;