import React, { useState } from 'react';
import { 
  AlertTriangle, TrendingDown, Ban, LineChart, Download, Upload, 
  ClipboardCheck, Diamond, CheckCircle2, X, Eye, FileDown, Zap, Lightbulb, Pencil, Bell
} from 'lucide-react';

const Inventory = () => {
  // --- QUẢN LÝ STATE ---
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDataView, setShowDataView] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dữ liệu sản phẩm mẫu
  const stockData = [
    { id: 'SP001', name: 'iPhone 15 Pro', cat: 'Điện thoại', price: '28.900.000', cost: '25.000.000', stock: 5, min: 10, supplier: 'Công ty TNHH ABC', value: '144.500.000', totalCost: '125.000.000', profit: '3.900.000' },
    { id: 'SP002', name: 'Samsung Galaxy S24', cat: 'Điện thoại', price: '24.900.000', cost: '21.000.000', stock: 100, min: 15, supplier: 'Công ty TNHH ABC', value: '2.490.000.000', totalCost: '2.100.000.000', profit: '3.900.000' },
    { id: 'SP003', name: 'MacBook Air M2', cat: 'Laptop', price: '28.900.000', cost: '26.000.000', stock: 15, min: 5, supplier: 'NCC001', value: '433.500.000', totalCost: '390.000.000', profit: '2.900.000' },
    { id: 'SP004', name: 'iPad Pro 11 inch', cat: 'Tablet', price: '19.900.000', cost: '17.500.000', stock: 8, min: 12, supplier: 'NCC001', value: '159.200.000', totalCost: '140.000.000', profit: '2.400.000' },
    { id: 'SP005', name: 'AirPods Pro', cat: 'Phụ kiện', price: '6.490.000', cost: '5.500.000', stock: 25, min: 20, supplier: 'NCC001', value: '162.250.000', totalCost: '137.500.000', profit: '990.000' },
    { id: 'SP006', name: 'Quả bóng đá FIFA', cat: 'Sản phẩm > Bóng đá', price: '500.000', cost: '350.000', stock: 50, min: 30, supplier: 'NCC002', value: '25.000.000', totalCost: '17.500.000', profit: '150.000' },
    { id: 'SP007', name: 'Vợt Pickle Ball Pro', cat: 'Sản phẩm > Pickle Ball', price: '800.000', cost: '600.000', stock: 30, min: 10, supplier: 'NCC002', value: '24.000.000', totalCost: '18.000.000', profit: '200.000' },
  ];

  // Hàm mở chi tiết sản phẩm
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // Hàm chuyển từ Chi tiết sang Chỉnh sửa (Đóng chi tiết, mở chỉnh sửa)
  const handleOpenEdit = () => {
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  return (
    <div className="page-container" style={{ background: '#f4f7f9', height: '100vh', overflowY: 'auto', padding: '25px' }}>
      
      <div className="chart-header" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1a3353' }}>Quản lý Kho hàng</h2>
      </div>

      {/* THỐNG KÊ NHANH */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <StatCard title="TỔNG GIÁ TRỊ" value="3.033.500.000 VNĐ" icon={<Diamond size={18} color="#3b82f6"/>} border="#3b82f6" sub="7 sản phẩm" />
        <StatCard title="HÀNG SẮP HẾT" value="2" icon={<TrendingDown size={18} color="#f59e0b"/>} border="#f59e0b" sub="Cần nhập ngay" />
        <StatCard title="HẾT HÀNG" value="0" icon={<Ban size={18} color="#ef4444"/>} border="#ef4444" sub="Không có" />
        <StatCard title="DƯ THỪA" value="1" icon={<LineChart size={18} color="#6366f1"/>} border="#6366f1" sub="Cân nhắc giảm giá" />
      </div>

      {/* KHỐI TRẮNG CHUNG */}
      <div className="white-box" style={{ padding: '30px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#1a3353' }}>Quản lý Tồn kho</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
          <InventoryAction label="Nhập kho" icon={<Download color="#ef4444" />} bg="#fff1f2" onClick={() => setShowImportModal(true)} />
          <InventoryAction label="Xuất kho" icon={<Upload color="#3b82f6" />} bg="#eff6ff" onClick={() => setShowExportModal(true)} />
          <InventoryAction label="Kiểm kê" icon={<ClipboardCheck color="#f59e0b" />} bg="#fffbeb" onClick={() => setShowReportModal(true)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a3353' }}>Danh sách sản phẩm trong kho</h3>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Legend color="#ef4444" label="Sắp hết" /><Legend color="#f59e0b" label="Ít hàng" /><Legend color="#10b981" label="Đủ hàng" />
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th>Sản phẩm</th><th>Giá bán</th><th style={{ textAlign: 'center' }}>Tồn kho</th><th style={{ textAlign: 'center' }}>Tối thiểu</th><th style={{ textAlign: 'center' }}>Trạng thái</th><th style={{ textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((item) => (
              <tr key={item.id}>
                <td>
                  <p style={{ fontWeight: '700', fontSize: '14px', margin: 0 }}>{item.name}</p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>{item.id} • {item.cat}</p>
                </td>
                <td style={{ fontWeight: '600' }}>{item.price} VNĐ</td>
                <td style={{ textAlign: 'center', fontWeight: '800', color: item.stock < item.min ? '#ef4444' : '#10b981' }}>{item.stock}</td>
                <td style={{ textAlign: 'center', color: '#9ca3af' }}>{item.min}</td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '15px', fontSize: '11px', fontWeight: '700', background: item.stock < item.min ? '#fff1f2' : '#f0fdf4', color: item.stock < item.min ? '#ef4444' : '#10b981' }}>
                    {item.stock < item.min ? '⚠️ Sắp hết' : '✅ Đủ hàng'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => handleViewDetail(item)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHI TIẾT SẢN PHẨM (Ảnh 1) --- */}
      {showDetailModal && selectedProduct && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '850px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '800', marginBottom: '25px' }}>Chi tiết sản phẩm</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ color: '#2563eb', fontSize: '15px', fontWeight: '700', marginBottom: '15px' }}>Thông tin cơ bản</h4>
                <div style={detailRowStyle}><span style={detailLabel}>Mã SP:</span> <span>{selectedProduct.id}</span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Tên:</span> <span>{selectedProduct.name}</span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Danh mục:</span> <span>{selectedProduct.cat}</span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Nhà cung cấp:</span> <span>{selectedProduct.supplier}</span></div>
              </div>
              <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ color: '#2563eb', fontSize: '15px', fontWeight: '700', marginBottom: '15px' }}>Tồn kho & Giá</h4>
                <div style={detailRowStyle}><span style={detailLabel}>Số lượng tồn:</span> <span style={{color:'#ef4444', fontWeight:'800'}}>{selectedProduct.stock} ⚠️</span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Tối thiểu:</span> <span>{selectedProduct.min} <small style={{color:'#ef4444'}}>(Dưới ngưỡng!)</small></span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Giá nhập:</span> <span>{selectedProduct.cost} VNĐ</span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Giá bán:</span> <span>{selectedProduct.price} VNĐ</span></div>
                <div style={detailRowStyle}><span style={detailLabel}>Lợi nhuận/SP:</span> <span style={{color:'#10b981', fontWeight:'700'}}>{selectedProduct.profit} VNĐ</span></div>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '25px', borderRadius: '12px', color: 'white', marginBottom: '25px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '15px', opacity: 0.9 }}>Phân tích tài chính</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '13px', margin: '0 0 5px 0', opacity: 0.8 }}>Tổng giá trị tồn kho</p>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>{selectedProduct.value} VNĐ</h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '13px', margin: '0 0 5px 0', opacity: 0.8 }}>Tổng giá vốn</p>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>{selectedProduct.totalCost} VNĐ</h2>
                  </div>
                </div>
                <p style={{ marginTop: '15px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lightbulb size={18} /> Lợi nhuận tiềm năng: <strong>{selectedProduct.profit} VNĐ</strong>
                </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={() => setShowDetailModal(false)} style={btnHuyStyle}>Đóng</button>
              <button onClick={handleOpenEdit} style={{ ...btnBlueStyle, padding: '10px 40px' }}>Chỉnh sửa</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: CHỈNH SỬA SẢN PHẨM (Chuẩn Ảnh 2) --- */}
      {showEditModal && selectedProduct && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '550px', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Pencil size={20} color="#ef4444" /> Chỉnh sửa sản phẩm
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div><label style={labelStyle}>Tên sản phẩm:</label><input type="text" className="pos-input" style={{ width: '100%' }} defaultValue={selectedProduct.name} /></div>
              <div><label style={labelStyle}>Danh mục:</label><select className="pos-input" style={{ width: '100%' }} defaultValue={selectedProduct.cat}><option>Điện thoại</option><option>Laptop</option></select></div>
              <div><label style={labelStyle}>Giá nhập:</label><input type="text" className="pos-input" style={{ width: '100%' }} defaultValue={selectedProduct.cost.replace(/\./g, '')} /></div>
              <div><label style={labelStyle}>Giá bán:</label><input type="text" className="pos-input" style={{ width: '100%' }} defaultValue={selectedProduct.price.replace(/\./g, '')} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div><label style={labelStyle}>Số lượng tồn kho:</label><input type="number" className="pos-input" style={{ width: '100%' }} defaultValue={selectedProduct.stock} /></div>
                <div><label style={labelStyle}><Bell size={14} color="#f59e0b" style={{display:'inline', marginRight:'4px'}}/> Tồn kho tối thiểu:</label>
                  <input type="number" className="pos-input" style={{ width: '100%', border: '2px solid #f59e0b' }} defaultValue={selectedProduct.min} />
                </div>
              </div>
              <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '15px', borderRadius: '10px', display: 'flex', gap: '10px' }}>
                <Lightbulb size={24} color="#f59e0b" /><p style={{ fontSize: '12px', color: '#92400e', margin: 0 }}><strong>Mẹo:</strong> Hệ thống sẽ cảnh báo khi tồn kho thấp hơn hoặc bằng ngưỡng tối thiểu.</p>
              </div>
              <div><label style={labelStyle}>Nhà cung cấp:</label><select className="pos-input" style={{ width: '100%' }} defaultValue={selectedProduct.supplier}><option>Công ty TNHH ABC</option></select></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' }}>
              <button onClick={() => setShowEditModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={btnBlueStyle}>Cập nhật</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KIỂM KÊ (BÁO CÁO) */}
      {showReportModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '500px', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '30px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '25px' }}>Xuất báo cáo tồn kho</h3>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '25px' }}>
                <label style={labelStyle}>Lọc theo tình trạng:</label>
                <select className="pos-input" style={{ width: '100%', marginBottom: '15px' }}><option>Tất cả sản phẩm</option></select>
                <label style={labelStyle}>Lọc theo danh mục:</label>
                <select className="pos-input" style={{ width: '100%' }}><option>Tất cả danh mục</option></select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <button onClick={() => {setShowReportModal(false); setShowDataView(true)}} style={btnBlueStyle}>Xem dữ liệu</button>
                <button style={btnGreenStyle}>Tải về Excel</button>
              </div>
              <button onClick={() => setShowReportModal(false)} style={{ marginTop: '20px', border: 'none', background: 'none', color: '#6b7280', cursor: 'pointer', fontWeight: '600' }}>Đóng</button>
            </div>
            <div style={{ height: '20px', background: '#64748b', opacity: '0.8', margin: '0 20px 15px 20px', borderRadius: '10px' }}></div>
          </div>
        </div>
      )}

      {/* BÁO CÁO TỒN KHO - CHI TIẾT */}
      {showDataView && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1150px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Báo cáo tồn kho - Tất cả</h3>
              <X onClick={() => setShowDataView(false)} style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              <table className="data-table" style={{ margin: 0 }}>
                <thead style={{ background: '#2563eb' }}>
                  <tr style={{color: 'white'}}>
                    <th style={{color: 'white'}}>Mã SP</th><th style={{color: 'white'}}>Tên sản phẩm</th><th style={{color: 'white'}}>Danh mục</th><th style={{color: 'white'}}>Giá bán (VNĐ)</th><th style={{color: 'white'}}>Tồn kho</th><th style={{color: 'white'}}>Giá trị (VNĐ)</th><th style={{color: 'white'}}>Nhà cung cấp</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td><td>{item.name}</td><td>{item.cat}</td><td>{item.price}</td><td style={{textAlign: 'center'}}>{item.stock}</td><td>{item.value}</td><td>{item.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ background: '#f9fafb', padding: '15px 20px', fontSize: '13px', color: '#4b5563', borderTop: '1px solid #e5e7eb' }}>Tổng số bản ghi: {stockData.length}</div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}><button onClick={() => setShowDataView(false)} style={btnBlueStyle}>Đóng</button></div>
          </div>
        </div>
      )}

      {/* Nhập/Xuất Modal giữ nguyên logic cũ */}
      {showImportModal && <ModalLayout title="Nhập kho" onClose={() => setShowImportModal(false)} btnText="Nhập kho" />}
      {showExportModal && <ModalLayout title="Xuất kho" onClose={() => setShowExportModal(false)} btnText="Xuất kho" isExport />}
    </div>
  );
};

// --- HELPERS ---
const ModalLayout = ({ title, onClose, btnText, isExport }) => (
  <div style={modalOverlayStyle}>
    <div style={modalContentStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>{title}</h3>
      <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Sản phẩm:</label><select className="pos-input" style={{ width: '100%' }}><option>Chọn sản phẩm</option></select></div>
      {isExport && <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Lý do xuất:</label><select className="pos-input" style={{ width: '100%' }}><option>Chọn lý do</option></select></div>}
      <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Số lượng:</label><input type="number" className="pos-input" style={{ width: '100%' }} placeholder="0" /></div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}><button onClick={onClose} style={btnHuyStyle}>Hủy</button><button style={btnBlueStyle}>{btnText}</button></div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon, border, sub }) => (
  <div style={{ flex: 1, background: 'white', padding: '20px', borderRadius: '14px', borderTop: `4px solid ${border}`, boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}><span style={{ fontSize: '11px', fontWeight: '800', color: '#9ca3af' }}>{title}</span>{icon}</div>
    <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#1a3353', margin: '0 0 5px 0' }}>{value}</h2>
    <p style={{ fontSize: '12px', color: border, fontWeight: '700' }}>{sub}</p>
  </div>
);

const InventoryAction = ({ label, icon, bg, onClick }) => (
  <div onClick={onClick} style={{ flex: 1, background: '#f8fafc', padding: '25px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.background = '#f8fafc'}>
    <div style={{ background: 'white', padding: '12px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{icon}</div>
    <span style={{ fontWeight: '700', fontSize: '14px', color: '#4b5563' }}>{label}</span>
  </div>
);

const Legend = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#6b7280' }}>
    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }}></div> {label}
  </div>
);

const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '13px', marginBottom: '8px', color: '#374151' };
const detailRowStyle = { display: 'flex', marginBottom: '10px', fontSize: '14px', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' };
const detailLabel = { fontWeight: '700', width: '140px', color: '#4b5563' };
const btnHuyStyle = { padding: '10px 30px', borderRadius: '10px', border: '1px solid #d1d5db', background: 'white', fontWeight: '600', cursor: 'pointer' };
const btnBlueStyle = { padding: '10px 25px', borderRadius: '10px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer' };
const btnGreenStyle = { padding: '10px 25px', borderRadius: '10px', border: 'none', background: '#059669', color: 'white', fontWeight: '600', cursor: 'pointer' };

export default Inventory;