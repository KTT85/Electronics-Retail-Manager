import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn load lại trang
    
    // Giả lập quá trình xử lý đăng nhập/đăng ký
    if (isLogin) {
      alert("Đăng nhập thành công! Chào mừng trở lại.");
      navigate('/'); // Chuyển hướng vào trang chủ (Dashboard)
    } else {
      alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập.");
      setIsLogin(true); // Chuyển về form đăng nhập
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <div style={{ background: 'white', width: '100%', maxWidth: '420px', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
        
        {/* Logo / Tiêu đề */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ width: '60px', height: '60px', background: '#2563eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)' }}>
            <ShieldCheck size={32} color="white" />
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>
            {isLogin ? 'Đăng nhập hệ thống' : 'Tạo tài khoản mới'}
          </h2>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#64748b' }}>
            Phần mềm Quản lý Bán hàng KTT85
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Form Đăng ký sẽ có thêm trường Họ tên */}
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={20} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
              <input 
                type="text" placeholder="Họ và tên" required
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={20} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
            <input 
              type="email" placeholder="Email đăng nhập" required
              style={inputStyle}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
            <input 
              type="password" placeholder="Mật khẩu" required
              style={inputStyle}
            />
          </div>

          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
              <input 
                type="password" placeholder="Xác nhận lại mật khẩu" required
                style={inputStyle}
              />
            </div>
          )}

          {isLogin && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Quên mật khẩu?</a>
            </div>
          )}

          <button type="submit" style={btnSubmitStyle}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'} <ArrowRight size={18} />
          </button>

        </form>

        {/* Chuyển đổi giữa Đăng nhập / Đăng ký */}
        <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#64748b' }}>
          {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
          <span 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer' }}
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </span>
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const inputStyle = { 
  width: '100%', 
  padding: '14px 15px 14px 45px', 
  borderRadius: '12px', 
  border: '1px solid #cbd5e1', 
  fontSize: '15px', 
  outline: 'none',
  background: '#f8fafc',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box'
};

const btnSubmitStyle = { 
  width: '100%', 
  padding: '14px', 
  borderRadius: '12px', 
  border: 'none', 
  background: '#2563eb', 
  color: 'white', 
  fontSize: '16px', 
  fontWeight: '700', 
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)',
  transition: 'background 0.2s'
};

export default Auth;