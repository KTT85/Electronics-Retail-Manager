import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Công cụ dùng để chuyển trang trong React
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn trang web bị load lại khi ấn nút Submit
    
    // Tạm thời giả lập đăng nhập thành công (Sau này sẽ gọi API Node.js ở đây)
    alert('Đăng nhập thành công! Chào mừng Quản lý.');
    
    // Đẩy người dùng vào trang Tổng quan
    navigate('/'); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập Hệ thống</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tên đăng nhập / Số điện thoại</label>
            <input type="text" placeholder="Nhập tài khoản (VD: admin)..." required />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu..." required />
          </div>
          <button type="submit" className="login-btn">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;