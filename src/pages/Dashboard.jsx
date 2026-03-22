import React from 'react';
import { TrendingUp, DollarSign, Receipt, Users, Package, LogOut } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* HEADER XANH */}
      <header className="top-header">
        <div className="header-brand">
          <h1 className="header-main-title">Hệ thống Quản lý</h1>
          <p className="header-sub-title">Quản lý bán hàng doanh nghiệp Việt Nam</p>
        </div>
        <div className="header-right">
          <div className="user-avatar-circle">A</div>
          <button className="header-logout-btn"><LogOut size={16}/> Đăng xuất</button>
        </div>
      </header>

      {/* 4 THẺ CHỈ SỐ */}
      <div className="top-stats-banner">
        <div className="stat-banner-card border-green">
          <div className="stat-icon-circle bg-green-light"><DollarSign size={22}/></div>
          <div className="stat-content">
            <div className="stat-label">DOANH THU</div>
            <div className="stat-value">25,800,000</div>
            <div className="stat-sub">↗ +12.5%</div>
          </div>
        </div>
        <div className="stat-banner-card border-blue"><div className="stat-icon-circle bg-blue-light"><Receipt size={22}/></div>
          <div className="stat-content"><div className="stat-label">ĐƠN HÀNG</div><div className="stat-value">47</div><div className="stat-sub">↗ +8.2%</div></div>
        </div>
        <div className="stat-banner-card border-orange"><div className="stat-icon-circle bg-orange-light"><Users size={22}/></div>
          <div className="stat-content"><div className="stat-label">KHÁCH HÀNG</div><div className="stat-value">150</div><div className="stat-sub">↗ +5.1%</div></div>
        </div>
        <div className="stat-banner-card border-red"><div className="stat-icon-circle bg-red-light"><Package size={22}/></div>
          <div className="stat-content"><div className="stat-label">SẢN PHẨM</div><div className="stat-value">1,200</div><div className="stat-sub">↗ +2.3%</div></div>
        </div>
      </div>

      {/* BIỂU ĐỒ & HOẠT ĐỘNG */}
      <div className="dashboard-main-content">
        {/* CỘT TRÁI: BIỂU ĐỒ */}
        <div className="white-box">
          <div className="chart-header">
            <h2 className="chart-title"><TrendingUp size={18} style={{marginRight:8}}/>BIỂU ĐỒ DOANH THU THUẦN</h2>
            <select className="pos-input" style={{padding:'4px'}}><option>7 ngày qua</option></select>
          </div>
          <div className="chart-placeholder">
            <svg viewBox="0 0 1000 250" className="mock-area-chart" preserveAspectRatio="none">
              <path d="M0,200 L200,180 L400,120 L600,150 L800,70 L1000,90 L1000,250 L0,250 Z" fill="#bae6fd" opacity="0.4" />
              <polyline points="0,200 200,180 400,120 600,150 800,70 1000,90" fill="none" stroke="#0284c7" strokeWidth="3" />
            </svg>
            <div className="chart-x-axis">
              <span>Thứ 2</span><span>Thứ 3</span><span>Thứ 4</span><span>Thứ 5</span><span>Thứ 6</span><span>Thứ 7</span><span>CN</span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: HOẠT ĐỘNG GẦN ĐÂY (PHẢI CÓ THẺ NÀY MỚI HIỆN CỘT 2) */}
        <div className="white-box">
          <div className="chart-header">
            <h2 className="chart-title">HOẠT ĐỘNG GẦN ĐÂY</h2>
            <button className="refresh-btn">REFRESH</button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="act-details">
                <p>Đơn hàng mới DH007</p>
                <span style={{fontSize:12, color:'#6b7280'}}>Khách Lê Minh C đặt hàng trị giá 57.800.000đ</span>
              </div>
              <span className="act-time">30 phút trước</span>
            </div>
            {/* Thêm vài mục nữa cho đẹp */}
            <div className="activity-item">
              <div className="act-details">
                <p>Đơn hàng mới DH006</p>
                <span style={{fontSize:12, color:'#6b7280'}}>Nguyễn Văn A mua iPhone 15 Pro</span>
              </div>
              <span className="act-time">1 giờ trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;