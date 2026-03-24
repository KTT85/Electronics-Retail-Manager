import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, FolderOpen, Filter, RefreshCcw, 
  TrendingUp, Diamond, BarChart3, CircleDollarSign, 
  Package, FileText, Users, Eye, Download, X
} from 'lucide-react';

const Reports = () => {
  // ==========================================
  // 1. DỮ LIỆU MẪU (MOCK DATA)
  // ==========================================
  const mockRevenueData = [
    { id: 'DH007', customer: 'Lê Minh C', date: '2026-03-15', items: 1, total: 57800000, payment: 'Công nợ', status: 'Mới', profit: 15000000 },
    { id: 'DH006', customer: 'N/A', date: '2026-03-15', items: 1, total: 28900000, payment: 'Công nợ', status: 'Mới', profit: 3900000 },
    { id: 'DH002', customer: 'Trần Thị B', date: '2026-03-15', items: 1, total: 24900000, payment: 'Công nợ', status: 'Đang xử lý', profit: 3900000 },
    { id: 'DH001', customer: 'N/A', date: '2026-03-15', items: 2, total: 35390000, payment: 'Đã thanh toán', status: 'Hoàn thành', profit: 5000000 },
    { id: 'DH003', customer: 'Lê Minh C', date: '2026-03-14', items: 2, total: 48800000, payment: 'Đã thanh toán', status: 'Hoàn thành', profit: 8000000 },
    { id: 'DH004', customer: 'Phạm Thu D', date: '2026-03-13', items: 1, total: 1000000, payment: 'Công nợ', status: 'Đã giao', profit: 200000 },
    { id: 'DH005', customer: 'Hoàng Văn E', date: '2026-03-12', items: 2, total: 13780000, payment: 'Công nợ', status: 'Hủy', profit: 0 },
  ];

  const mockTopProductsData = [
    { rank: 1, id: 'SP003', name: 'MacBook Air M2', sold: 3, stock: 15, revenue: 86700000 },
    { rank: 2, id: 'SP005', name: 'AirPods Pro', sold: 3, stock: 25, revenue: 19470000 },
    { rank: 3, id: 'SP001', name: 'iPhone 15 Pro', sold: 2, stock: 5, revenue: 57800000 },
    { rank: 4, id: 'SP006', name: 'Quả bóng đá FIFA', sold: 2, stock: 50, revenue: 1000000 },
    { rank: 5, id: 'SP002', name: 'Samsung Galaxy S24', sold: 1, stock: 100, revenue: 24900000 },
  ];

  const mockInventoryData = [
    { id: 'SP001', name: 'iPhone 15 Pro', cat: 'Điện thoại', price: '28.900.000', stock: 5, value: '144.500.000', supplier: 'NCC001' },
    { id: 'SP002', name: 'Samsung Galaxy S24', cat: 'Điện thoại', price: '24.900.000', stock: 100, value: '2.490.000.000', supplier: 'NCC001' },
    { id: 'SP003', name: 'MacBook Air M2', cat: 'Laptop', price: '28.900.000', stock: 15, value: '433.500.000', supplier: 'NCC001' },
    { id: 'SP004', name: 'iPad Pro 11 inch', cat: 'Tablet', price: '19.900.000', stock: 8, value: '159.200.000', supplier: 'NCC001' },
    { id: 'SP005', name: 'AirPods Pro', cat: 'Phụ kiện', price: '6.490.000', stock: 25, value: '162.250.000', supplier: 'NCC001' },
    { id: 'SP006', name: 'Quả bóng đá FIFA', cat: 'Sản phẩm > Bóng đá', price: '500.000', stock: 50, value: '25.000.000', supplier: 'NCC002' },
    { id: 'SP007', name: 'Vợt Pickle Ball Pro', cat: 'Sản phẩm > Pickle Ball', price: '800.000', stock: 30, value: '24.000.000', supplier: 'NCC002' },
  ];

  const mockFinancialData = [
    { isHeader: true, title: 'BÁO CÁO TÀI CHÍNH TỔNG QUAN' },
    { title: 'Khoảng thời gian', value: '28/2/2026 - 23/3/2026' },
    { title: 'Ngày báo cáo', value: '23/3/2026' },
    { isHeader: true, title: 'DOANH THU VÀ BÁN HÀNG' },
    { title: 'Tổng doanh thu', value: '84.190.000 VNĐ' },
    { title: 'Số đơn hàng', value: '7' },
    { title: 'Đơn hoàn thành', value: '2' },
    { title: 'Đơn đã thanh toán', value: '2' },
    { isHeader: true, title: 'KHÁCH HÀNG VÀ CÔNG NỢ' },
    { title: 'Tổng khách hàng', value: '4' },
    { title: 'Khách hàng có nợ', value: '2' },
    { title: 'Tổng công nợ', value: '25.200.000 VNĐ' },
    { isHeader: true, title: 'TÀI SẢN VÀ HÀNG TỒN KHO' },
    { title: 'Số mặt hàng', value: '7' },
    { title: 'Giá trị tồn kho', value: '3.438.450.000 VNĐ' },
    { title: 'Hàng sắp hết', value: '2' },
    { isHeader: true, title: 'NHÀ CUNG CẤP' },
    { title: 'Tổng nhà cung cấp', value: '3' },
  ];

  // ==========================================
  // 2. QUẢN LÝ STATE
  // ==========================================
  const [inputFromDate, setInputFromDate] = useState('2026-02-28');
  const [inputToDate, setInputToDate] = useState('2026-03-23');
  const [appliedFromDate, setAppliedFromDate] = useState('2026-02-28');
  const [appliedToDate, setAppliedToDate] = useState('2026-03-23');

  const [dashboardRevenue, setDashboardRevenue] = useState(0);
  const [dashboardProfit, setDashboardProfit] = useState(0);

  // State các Modal
  const [showRevConfigModal, setShowRevConfigModal] = useState(false);
  const [showRevDataModal, setShowRevDataModal] = useState(false);
  
  const [showSalesConfigModal, setShowSalesConfigModal] = useState(false);
  const [showSalesDataModal, setShowSalesDataModal] = useState(false);

  const [showInvConfigModal, setShowInvConfigModal] = useState(false);
  const [showInvDataModal, setShowInvDataModal] = useState(false);

  const [showFinConfigModal, setShowFinConfigModal] = useState(false);
  const [showFinDataModal, setShowFinDataModal] = useState(false);

  const [showTrendModal, setShowTrendModal] = useState(false); // State cho Báo cáo phân tích xu hướng mới

  // ==========================================
  // 3. HÀM FORMAT & XỬ LÝ
  // ==========================================
  const formatMoney = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  const formatNumber = (amount) => new Intl.NumberFormat('vi-VN').format(amount); 
  const formatDateVN = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return `${parseInt(d)}/${parseInt(m)}/${y}`;
  };

  const handleApplyFilter = () => {
    setAppliedFromDate(inputFromDate);
    setAppliedToDate(inputToDate);
    const totalRev = mockRevenueData.reduce((sum, item) => sum + item.total, 0);
    const totalProf = mockRevenueData.reduce((sum, item) => sum + item.profit, 0);
    setDashboardRevenue(totalRev);
    setDashboardProfit(totalProf);
  };

  const handleResetFilter = () => {
    setInputFromDate('');
    setInputToDate('');
  };

  useEffect(() => { handleApplyFilter(); }, []);

  // ==========================================
  // 4. GIAO DIỆN CHÍNH
  // ==========================================
  return (
    <div className="page-container" style={{ background: '#f4f7f9', height: '100vh', overflowY: 'auto', padding: '25px' }}>
      
      {/* HEADER */}
      <div className="chart-header" style={{ marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Báo cáo Tổng hợp</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Báo cáo doanh thu và hoạt động kinh doanh</p>
        </div>
      </div>

      {/* BỘ LỌC THỜI GIAN MÀN HÌNH CHÍNH */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1a3353', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <CalendarDays size={20} color="#6366f1" /> Bộ lọc thời gian
          </h3>
          <button style={btnWhiteStyle}><FolderOpen size={14} color="#f59e0b" /> Thu gọn</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div><label style={labelStyle}>Từ ngày:</label><input type="date" style={inputStyle} value={inputFromDate} onChange={(e) => setInputFromDate(e.target.value)} /></div>
          <div><label style={labelStyle}>Đến ngày:</label><input type="date" style={inputStyle} value={inputToDate} onChange={(e) => setInputToDate(e.target.value)} /></div>
          <div>
            <label style={labelStyle}>Lựa chọn nhanh:</label>
            <select style={inputStyle}><option>Tùy chỉnh</option><option>Hôm nay</option><option>Tuần này</option><option>Tháng này</option></select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={handleApplyFilter} style={{ ...btnBlueStyle, display: 'flex', alignItems: 'center', gap: '6px' }}><Filter size={16} /> Áp dụng bộ lọc</button>
          <button onClick={handleResetFilter} style={{ ...btnWhiteStyle, display: 'flex', alignItems: 'center', gap: '6px' }}><RefreshCcw size={16} color="#6b7280" /> Đặt lại</button>
          <span style={{ fontSize: '13px', color: '#6b7280', marginLeft: '10px' }}>
            Hiển thị dữ liệu từ <strong>{formatDateVN(appliedFromDate)}</strong> đến <strong>{formatDateVN(appliedToDate)}</strong>
          </span>
        </div>
      </div>

      {/* THỐNG KÊ DOANH THU & LỢI NHUẬN */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <StatCard title="DOANH THU" value={formatMoney(dashboardRevenue)} icon={<TrendingUp size={20} color="#a78bfa" />} sub="Đã cập nhật theo bộ lọc" subColor="#10b981" />
        <StatCard title="LỢI NHUẬN" value={formatMoney(dashboardProfit)} icon={<Diamond size={20} color="#60a5fa" />} sub={`Biên LN: ${dashboardRevenue > 0 ? ((dashboardProfit/dashboardRevenue)*100).toFixed(1) : 0}%`} subColor="#10b981" />
      </div>

      {/* DANH MỤC BÁO CÁO */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a3353', marginBottom: '25px' }}>Báo cáo và Thống kê</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '40px' }}>
          <ReportCategory onClick={() => setShowRevConfigModal(true)} icon={<BarChart3 size={32} color="#ec4899" />} title="Báo cáo doanh thu" sub="Theo ngày, tuần, tháng" />
          <ReportCategory onClick={() => setShowSalesConfigModal(true)} icon={<CircleDollarSign size={32} color="#f59e0b" />} title="Báo cáo bán hàng" sub="Top sản phẩm bán chạy" />
          <ReportCategory onClick={() => setShowInvConfigModal(true)} icon={<Package size={32} color="#8b5cf6" />} title="Báo cáo tồn kho" sub="Giá trị và số lượng" />
          <ReportCategory onClick={() => setShowFinConfigModal(true)} icon={<FileText size={32} color="#f97316" />} title="Báo cáo tài chính" sub="Theo chuẩn Việt Nam" />
          <ReportCategory onClick={() => setShowTrendModal(true)} icon={<TrendingUp size={32} color="#6366f1" />} title="Phân tích xu hướng" sub="Dự báo và kế hoạch" />
        </div>

        {/* TÓM TẮT HOẠT ĐỘNG KINH DOANH */}
        <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1a3353', marginBottom: '20px' }}>Tóm tắt hoạt động kinh doanh:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ActivityItem icon={<TrendingUp size={20} color="#10b981" />} bg="#d1fae5" title="Tăng trưởng doanh thu" desc={`Doanh thu: ${formatMoney(dashboardRevenue)} - Lợi nhuận: ${formatMoney(dashboardProfit)}`} />
            <ActivityItem icon={<Users size={20} color="#6366f1" />} bg="#e0e7ff" title="Khách hàng mới" desc="Tháng này có 4 khách hàng, tăng 5.1% so với tuần trước" />
            <ActivityItem icon={<Package size={20} color="#f59e0b" />} bg="#fef3c7" title="Quản lý hàng tồn kho" desc="Có 2 sản phẩm sắp hết hàng cần nhập thêm" />
          </div>
        </div>
      </div>

      {/* ==============================================================
          CÁC MODAL CẤU HÌNH VÀ BẢNG DỮ LIỆU (Doanh thu, Bán hàng, Tồn kho, Tài chính)
      ============================================================== */}
      
      {/* 1. BÁO CÁO DOANH THU */}
      {showRevConfigModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '550px', padding: '40px', textAlign: 'center' }}>
            <h3 style={modalTitleStyle}>Xuất báo cáo doanh thu</h3><p style={modalSubStyle}>Bạn muốn xem dữ liệu hay tải về file?</p>
            <div style={configBoxStyle}>
              <h4 style={configBoxHeaderStyle}><CalendarDays size={18} color="#6366f1" /> Chọn khoảng thời gian:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                <div><label style={labelStyle}>Từ ngày:</label><input type="date" style={inputStyle} defaultValue={appliedFromDate} /></div>
                <div><label style={labelStyle}>Đến ngày:</label><input type="date" style={inputStyle} defaultValue={appliedToDate} /></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button onClick={() => { setShowRevConfigModal(false); setShowRevDataModal(true); }} style={btnConfigBlueStyle}><Eye size={20} /> Xem dữ liệu</button>
              <button onClick={() => alert("Đang tải file Excel...")} style={btnConfigGreenStyle}><Download size={20} /> Tải về</button>
            </div>
            <button onClick={() => setShowRevConfigModal(false)} style={closeBtnStyle}><X size={24} /></button>
          </div>
        </div>
      )}

      {showRevDataModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1150px', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Báo cáo doanh thu ({formatDateVN(appliedFromDate)} - {formatDateVN(appliedToDate)})</h3>
              <X onClick={() => setShowRevDataModal(false)} style={{ cursor: 'pointer', color: '#6b7280' }} size={24} />
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr><th style={thBlueStyle}>Mã đơn</th><th style={thBlueStyle}>Khách hàng</th><th style={thBlueStyle}>Ngày</th><th style={thBlueStyle}>Số sản phẩm</th><th style={thBlueStyle}>Tổng tiền (VNĐ)</th><th style={thBlueStyle}>Thanh toán</th><th style={thBlueStyle}>Trạng thái</th></tr></thead>
                <tbody>{mockRevenueData.map((item, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}><td style={tdTableStyle}>{item.id}</td><td style={tdTableStyle}>{item.customer}</td><td style={tdTableStyle}>{item.date}</td><td style={tdTableStyle}>{item.items}</td><td style={tdTableStyle}>{formatNumber(item.total)}</td><td style={tdTableStyle}>{item.payment}</td><td style={tdTableStyle}>{item.status}</td></tr>))}</tbody>
              </table>
              <div style={{ background: '#f8fafc', padding: '15px 20px', fontSize: '14px', color: '#4b5563', fontWeight: '600' }}>Tổng số bản ghi: {mockRevenueData.length}</div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}><button onClick={() => setShowRevDataModal(false)} style={btnBlueStyle}>Đóng</button></div>
          </div>
        </div>
      )}

      {/* 2. BÁO CÁO BÁN HÀNG */}
      {showSalesConfigModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '550px', padding: '40px', textAlign: 'center' }}>
            <h3 style={modalTitleStyle}>Xuất báo cáo bán hàng</h3><p style={modalSubStyle}>Thống kê top sản phẩm bán chạy.</p>
            <div style={configBoxStyle}>
              <h4 style={configBoxHeaderStyle}><CalendarDays size={18} color="#6366f1" /> Chọn khoảng thời gian:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                <div><label style={labelStyle}>Từ ngày:</label><input type="date" style={inputStyle} defaultValue={appliedFromDate} /></div>
                <div><label style={labelStyle}>Đến ngày:</label><input type="date" style={inputStyle} defaultValue={appliedToDate} /></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button onClick={() => { setShowSalesConfigModal(false); setShowSalesDataModal(true); }} style={btnConfigBlueStyle}><Eye size={20} /> Xem dữ liệu</button>
              <button onClick={() => alert("Đang tải file Excel...")} style={btnConfigGreenStyle}><Download size={20} /> Tải về</button>
            </div>
            <button onClick={() => setShowSalesConfigModal(false)} style={closeBtnStyle}><X size={24} /></button>
          </div>
        </div>
      )}

      {showSalesDataModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1150px', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Top sản phẩm bán chạy ({formatDateVN(appliedFromDate)} - {formatDateVN(appliedToDate)})</h3>
              <X onClick={() => setShowSalesDataModal(false)} style={{ cursor: 'pointer', color: '#6b7280' }} size={24} />
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr><th style={thBlueStyle}>Xếp hạng</th><th style={thBlueStyle}>Mã SP</th><th style={thBlueStyle}>Tên sản phẩm</th><th style={thBlueStyle}>Đã bán</th><th style={thBlueStyle}>Tồn kho</th><th style={thBlueStyle}>Doanh thu (VNĐ)</th></tr></thead>
                <tbody>{mockTopProductsData.map((item, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}><td style={tdTableStyle}>{item.rank}</td><td style={tdTableStyle}>{item.id}</td><td style={tdTableStyle}>{item.name}</td><td style={tdTableStyle}>{item.sold}</td><td style={tdTableStyle}>{item.stock}</td><td style={tdTableStyle}>{formatNumber(item.revenue)}</td></tr>))}</tbody>
              </table>
              <div style={{ background: '#f8fafc', padding: '15px 20px', fontSize: '14px', color: '#4b5563', fontWeight: '600' }}>Tổng số bản ghi: {mockTopProductsData.length}</div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}><button onClick={() => setShowSalesDataModal(false)} style={btnBlueStyle}>Đóng</button></div>
          </div>
        </div>
      )}

      {/* 3. BÁO CÁO TỒN KHO */}
      {showInvConfigModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '550px', padding: '40px', textAlign: 'center' }}>
            <h3 style={modalTitleStyle}>Xuất báo cáo tồn kho</h3><p style={modalSubStyle}>Bạn muốn xem dữ liệu hay tải về file?</p>
            <div style={configBoxStyle}>
              <h4 style={configBoxHeaderStyle}><Package size={18} color="#b45309" /> Tùy chọn lọc:</h4>
              <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Lọc theo tình trạng:</label><select style={inputStyle}><option>Tất cả sản phẩm</option></select></div>
              <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Lọc theo danh mục:</label><select style={inputStyle}><option>Tất cả danh mục</option></select></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button onClick={() => { setShowInvConfigModal(false); setShowInvDataModal(true); }} style={btnConfigBlueStyle}><Eye size={20} /> Xem dữ liệu</button>
              <button onClick={() => alert("Đang tải file Excel...")} style={btnConfigGreenStyle}><Download size={20} /> Tải về</button>
            </div>
            <button onClick={() => setShowInvConfigModal(false)} style={closeBtnStyle}><X size={24} /></button>
          </div>
        </div>
      )}

      {showInvDataModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1150px', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Báo cáo tồn kho - Tất cả</h3>
              <X onClick={() => setShowInvDataModal(false)} style={{ cursor: 'pointer', color: '#6b7280' }} size={24} />
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr><th style={thBlueStyle}>Mã SP</th><th style={thBlueStyle}>Tên sản phẩm</th><th style={thBlueStyle}>Danh mục</th><th style={thBlueStyle}>Giá bán (VNĐ)</th><th style={thBlueStyle}>Tồn kho</th><th style={thBlueStyle}>Giá trị (VNĐ)</th><th style={thBlueStyle}>Nhà cung cấp</th></tr></thead>
                <tbody>{mockInventoryData.map((item, idx) => (<tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}><td style={tdTableStyle}>{item.id}</td><td style={tdTableStyle}>{item.name}</td><td style={tdTableStyle}>{item.cat}</td><td style={tdTableStyle}>{item.price}</td><td style={tdTableStyle}>{item.stock}</td><td style={tdTableStyle}>{item.value}</td><td style={tdTableStyle}>{item.supplier}</td></tr>))}</tbody>
              </table>
              <div style={{ background: '#f8fafc', padding: '15px 20px', fontSize: '14px', color: '#4b5563', fontWeight: '600' }}>Tổng số bản ghi: {mockInventoryData.length}</div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}><button onClick={() => setShowInvDataModal(false)} style={btnBlueStyle}>Đóng</button></div>
          </div>
        </div>
      )}

      {/* 4. BÁO CÁO TÀI CHÍNH */}
      {showFinConfigModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '550px', padding: '40px', textAlign: 'center' }}>
            <h3 style={modalTitleStyle}>Xuất báo cáo tài chính</h3><p style={modalSubStyle}>Bạn muốn xem dữ liệu hay tải về file?</p>
            <div style={configBoxStyle}>
              <h4 style={configBoxHeaderStyle}><CalendarDays size={18} color="#6366f1" /> Chọn khoảng thời gian:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                <div><label style={labelStyle}>Từ ngày:</label><input type="date" style={inputStyle} defaultValue={appliedFromDate} /></div>
                <div><label style={labelStyle}>Đến ngày:</label><input type="date" style={inputStyle} defaultValue={appliedToDate} /></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button onClick={() => { setShowFinConfigModal(false); setShowFinDataModal(true); }} style={btnConfigBlueStyle}><Eye size={20} /> Xem dữ liệu</button>
              <button onClick={() => alert("Đang tải file Excel...")} style={btnConfigGreenStyle}><Download size={20} /> Tải về</button>
            </div>
            <button onClick={() => setShowFinConfigModal(false)} style={closeBtnStyle}><X size={24} /></button>
          </div>
        </div>
      )}

      {showFinDataModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1150px', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Báo cáo tài chính ({formatDateVN(appliedFromDate)} - {formatDateVN(appliedToDate)})</h3>
              <X onClick={() => setShowFinDataModal(false)} style={{ cursor: 'pointer', color: '#6b7280' }} size={24} />
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr><th style={{ ...thBlueStyle, width: '60%' }}>Danh mục</th><th style={thBlueStyle}>Giá trị</th></tr></thead>
                <tbody>
                  {mockFinancialData.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      {item.isHeader ? (
                        <td colSpan="2" style={{ padding: '15px', fontSize: '14px', fontWeight: '800', color: '#4b5563', textTransform: 'uppercase', background: '#f8fafc' }}>{item.title}</td>
                      ) : (
                        <><td style={tdTableStyle}>{item.title}</td><td style={tdTableStyle}>{item.value}</td></>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ background: '#f8fafc', padding: '15px 20px', fontSize: '14px', color: '#4b5563', fontWeight: '600' }}>Tổng số bản ghi: {mockFinancialData.length}</div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}><button onClick={() => setShowFinDataModal(false)} style={btnBlueStyle}>Đóng</button></div>
          </div>
        </div>
      )}

      {/* ==============================================================
          MODAL ĐẶC BIỆT: BÁO CÁO PHÂN TÍCH XU HƯỚNG (ẢNH MỚI: 3e193e & 3e1c27)
      ============================================================== */}
      {showTrendModal && (
        <div style={{ ...modalOverlayStyle, zIndex: 1050 }}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1200px', maxHeight: '95vh', overflowY: 'auto', padding: '40px', background: '#f8fafc' }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '35px', position: 'relative' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1a3353', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                📊 Báo cáo Phân tích Xu hướng Kinh doanh
              </h2>
              <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>Tổng quan hiệu suất và dự báo phát triển</p>
              <X onClick={() => setShowTrendModal(false)} style={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer', color: '#9ca3af' }} size={32} />
            </div>

            {/* 4 Thẻ chỉ số tổng quan */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
              <TrendCard bg="#10b981" value="210.570.000" label="Tổng Doanh Thu (VNĐ)" />
              <TrendCard bg="#3b82f6" value="30.081.428,571" label="Giá trị ĐH TB (VNĐ)" />
              <TrendCard bg="#f59e0b" value="7" label="Tổng Đơn Hàng" />
              <TrendCard bg="#8b5cf6" value="4" label="Khách Hàng" />
            </div>

            {/* Hàng biểu đồ 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {/* Biểu đồ Doanh thu (Mô phỏng bằng CSS) */}
              <div style={trendBoxStyle}>
                <h4 style={trendBoxTitleStyle}>📈 Xu hướng Doanh thu 6 tháng</h4>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px', marginTop: '30px' }}>
                  <BarMock value="75M" label="T6/2025" height="35%" />
                  <BarMock value="89M" label="T7/2025" height="45%" />
                  <BarMock value="125M" label="T8/2025" height="60%" />
                  <BarMock value="98M" label="T9/2025" height="50%" />
                  <BarMock value="115M" label="T10/2025" height="55%" />
                  <BarMock value="211M" label="T11/2025" height="90%" color="#10b981" />
                </div>
              </div>
              
              {/* Biểu đồ Thanh toán (Mô phỏng Donut CSS) */}
              <div style={trendBoxStyle}>
                <h4 style={trendBoxTitleStyle}>💳 Trạng thái Thanh toán</h4>
                <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(#10b981 0% 28%, #f59e0b 28% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px auto 20px auto' }}>
                  <div style={{ width: '120px', height: '120px', background: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '28px', color: '#1a3353' }}>7</h3>
                    <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '600' }}>Đơn hàng</span>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '8px', fontWeight: '600' }}><span style={{ color: '#10b981', fontSize: '18px' }}>●</span> Đã TT: 2</div>
                  <div style={{ fontSize: '14px', color: '#4b5563', fontWeight: '600' }}><span style={{ color: '#f59e0b', fontSize: '18px' }}>●</span> Công nợ: 5</div>
                </div>
              </div>
            </div>

            {/* Hàng biểu đồ 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
              {/* Top 5 Sản phẩm */}
              <div style={trendBoxStyle}>
                <h4 style={trendBoxTitleStyle}>🏆 Top 5 Sản phẩm bán chạy</h4>
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <ProgressMock label="MacBook Air M2" value="3" color="#10b981" percent="100%" />
                  <ProgressMock label="AirPods Pro" value="3" color="#3b82f6" percent="100%" />
                  <ProgressMock label="iPhone 15 Pro" value="2" color="#f59e0b" percent="66%" />
                  <ProgressMock label="Quả bóng đá FIFA" value="2" color="#8b5cf6" percent="66%" />
                  <ProgressMock label="Samsung Galaxy S24" value="1" color="#ef4444" percent="33%" />
                </div>
              </div>
              
              {/* Phân tích Tồn kho (Mô phỏng Donut CSS) */}
              <div style={trendBoxStyle}>
                <h4 style={trendBoxTitleStyle}>📦 Phân tích Tồn kho</h4>
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'conic-gradient(#ef4444 0% 28%, #f59e0b 28% 70%, #10b981 70% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px auto 20px auto' }}>
                  <div style={{ width: '90px', height: '90px', background: 'white', borderRadius: '50%' }}></div>
                </div>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: '600' }}><span style={{ color: '#ef4444', fontSize: '18px' }}>●</span> Sắp hết: 2</div>
                  <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: '600' }}><span style={{ color: '#f59e0b', fontSize: '18px' }}>●</span> Bình thường: 3</div>
                  <div style={{ fontSize: '13px', color: '#4b5563', fontWeight: '600' }}><span style={{ color: '#10b981', fontSize: '18px' }}>●</span> Dồi dào: 2</div>
                </div>
              </div>
            </div>

            {/* 3 Khối Insight (Điểm mạnh, Cần cải thiện, Khuyến nghị) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
              <InsightBox title="Điểm mạnh" bg="#ecfdf5" color="#065f46" icon="✅" 
                items={['4 khách hàng ổn định', 'Đơn hàng TB: 30.081.428,571 VNĐ', '7 sản phẩm đa dạng', 'Tỷ lệ hoàn thành: 28.6%']} 
              />
              <InsightBox title="Cần cải thiện" bg="#fef2f2" color="#991b1b" icon="⚠️" 
                items={['2 SP sắp hết hàng', 'Công nợ: 25.200.000 VNĐ', '5 đơn chưa thanh toán', 'Cần thu hồi công nợ']} 
              />
              <InsightBox title="Khuyến nghị" bg="#eff6ff" color="#1e40af" icon="🎯" 
                items={['Nhập thêm hàng bán chạy', 'Khuyến mãi sản phẩm ế', 'Tăng giá trị đơn hàng', 'Marketing khách hàng mới']} 
              />
            </div>

            {/* Nút đóng */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button onClick={() => setShowTrendModal(false)} style={{ background: '#2563eb', color: 'white', padding: '12px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)' }}>
                Đóng báo cáo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- COMPONENTS PHỤ ---
const StatCard = ({ title, value, icon, sub, subColor }) => (
  <div style={{ flex: 1, background: 'white', padding: '25px', borderRadius: '12px', borderTop: '4px solid #10b981', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}><span style={{ fontSize: '13px', fontWeight: '800', color: '#6b7280' }}>{title}</span>{icon}</div>
    <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1a3353', margin: '0 0 10px 0' }}>{value}</h2>
    <p style={{ fontSize: '13px', color: subColor, margin: 0, fontWeight: '700' }}>{sub}</p>
  </div>
);

const ReportCategory = ({ icon, title, sub, onClick }) => (
  <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', padding: '10px', transition: '0.2s' }}>
    <div style={{ marginBottom: '15px' }}>{icon}</div>
    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1a3353', margin: '0 0 6px 0' }}>{title}</h4>
    <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: '1.4' }}>{sub}</p>
  </div>
);

const ActivityItem = ({ icon, bg, title, desc }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
    <div><h5 style={{ fontSize: '14px', fontWeight: '800', color: '#1a3353', margin: '0 0 4px 0' }}>{title}</h5><p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{desc}</p></div>
  </div>
);

// CSS Components cho Modal Xu hướng
const TrendCard = ({ bg, value, label }) => (
  <div style={{ background: bg, borderRadius: '12px', padding: '25px', textAlign: 'center', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
    <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>{value}</h2>
    <p style={{ fontSize: '14px', fontWeight: '600', margin: 0, opacity: 0.9 }}>{label}</p>
  </div>
);

const BarMock = ({ value, label, height, color = "#64748b" }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: '45px' }}>
    <span style={{ fontSize: '12px', fontWeight: '700', color: '#4b5563', marginBottom: '8px' }}>{value}</span>
    <div style={{ width: '100%', height: height, background: color, borderRadius: '4px 4px 0 0' }}></div>
    <span style={{ fontSize: '11px', color: '#6b7280', marginTop: '10px', fontWeight: '600' }}>{label}</span>
  </div>
);

const ProgressMock = ({ label, value, percent, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', fontWeight: '700', color: '#374151' }}>
      <span>{label}</span><span>{value}</span>
    </div>
    <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '10px' }}>
      <div style={{ width: percent, height: '100%', background: color, borderRadius: '10px' }}></div>
    </div>
  </div>
);

const InsightBox = ({ bg, color, title, icon, items }) => (
  <div style={{ background: bg, borderRadius: '12px', padding: '25px', border: `1px solid ${color}30` }}>
    <h4 style={{ fontSize: '16px', fontWeight: '800', color: color, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon} {title}
    </h4>
    <ul style={{ margin: 0, paddingLeft: '20px', color: color, fontSize: '13px', lineHeight: '2', fontWeight: '600' }}>
      {items.map((item, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>)}
    </ul>
  </div>
);

// --- STYLES CƠ BẢN ---
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '16px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)', position: 'relative' };
const labelStyle = { display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '8px', color: '#4b5563' };
const inputStyle = { width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' };
const btnBlueStyle = { padding: '10px 25px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };
const btnWhiteStyle = { padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: 'pointer', fontSize: '13px' };

const modalTitleStyle = { fontSize: '24px', fontWeight: '800', color: '#1a3353', margin: '0 0 10px 0' };
const modalSubStyle = { color: '#6b7280', fontSize: '16px', marginBottom: '30px' };
const configBoxStyle = { background: '#f8fafc', borderRadius: '12px', padding: '25px', textAlign: 'left', marginBottom: '30px' };
const configBoxHeaderStyle = { fontSize: '15px', fontWeight: '800', color: '#1a3353', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' };
const btnConfigBlueStyle = { background: '#3b82f6', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const btnConfigGreenStyle = { background: '#10b981', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' };
const closeBtnStyle = { position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' };

const thBlueStyle = { background: '#2563eb', color: 'white', padding: '15px', fontWeight: '600', fontSize: '14px' };
const tdTableStyle = { padding: '15px', fontSize: '14px', color: '#374151' };

const trendBoxStyle = { background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' };
const trendBoxTitleStyle = { margin: '0', fontSize: '16px', fontWeight: '800', color: '#1a3353', textAlign: 'center' };

export default Reports;