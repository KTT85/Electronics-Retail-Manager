import React, { useState } from 'react';
import { 
  ClipboardList, Calendar, CalendarDays, BarChart3, 
  PlusCircle, Clock, CalendarRange, FileText, Search, 
  Trash2, Plus, X, Pencil
} from 'lucide-react';

const Orders = () => {
  // --- QUẢN LÝ STATE MODAL ---
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [listModalTitle, setListModalTitle] = useState('');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orderItems, setOrderItems] = useState([{ id: 1 }]);
  const [editOrderItems, setEditOrderItems] = useState([{ id: 1 }]); // Dùng cho modal sửa

  // --- DỮ LIỆU MẪU ---
  const [orders, setOrders] = useState([
    { id: 'DH007', customer: 'Lê Minh C', time: '2026-03-15 17:30', total: '57.800.000 VNĐ', payment: 'Chuyển khoản', status: 'Công nợ' },
    { id: 'DH006', customer: 'Nguyễn Văn A', time: '2026-03-15 16:45', total: '28.900.000 VNĐ', payment: 'Chuyển khoản', status: 'Công nợ' },
    { id: 'DH002', customer: 'Trần Thị B', time: '2026-03-15 14:15', total: '24.900.000 VNĐ', payment: 'Tiền mặt', status: 'Công nợ' },
    { id: 'DH001', customer: 'Nguyễn Văn A', time: '2026-03-15 10:30', total: '35.390.000 VNĐ', payment: 'Chuyển khoản', status: 'Đã TT' },
    { id: 'DH003', customer: 'Lê Minh C', time: '2026-03-14 16:45', total: '48.800.000 VNĐ', payment: 'Chuyển khoản', status: 'Đã TT' },
    { id: 'DH004', customer: 'Phạm Thu D', time: '2026-03-13 09:20', total: '1.000.000 VNĐ', payment: 'Tiền mặt', status: 'Công nợ' },
    { id: 'DH005', customer: 'Hoàng Văn E', time: '2026-03-12 11:30', total: '13.780.000 VNĐ', payment: 'Chuyển khoản', status: 'Công nợ' },
  ]);

  // --- CÁC HÀM XỬ LÝ LỌC & TÌM KIẾM ---
  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredModalOrders = orders.filter(o => 
    o.id.toLowerCase().includes(modalSearchTerm.toLowerCase()) || 
    o.customer.toLowerCase().includes(modalSearchTerm.toLowerCase())
  );

  // --- CÁC HÀM ĐIỀU KHIỂN MODAL ---
  const handleOpenListModal = (title) => {
    setListModalTitle(title);
    setModalSearchTerm(''); 
    setShowListModal(true);
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleOpenEdit = () => {
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  const handleDeleteOrder = (id) => {
    if(window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${id} không?`)) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="page-container" style={{ background: '#f4f7f9', height: '100vh', overflowY: 'auto', padding: '25px' }}>
      
      {/* HEADER & THỐNG KÊ */}
      <div className="chart-header" style={{ marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Hệ thống Quản lý</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>Quản lý bán hàng doanh nghiệp Việt Nam</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <StatCard title="ĐƠN HÀNG HÔM NAY" value="3" icon={<ClipboardList size={18} color="#f87171"/>} sub="Tổng: 111.600.000 VNĐ" />
        <StatCard title="ĐƠN HÀNG TUẦN NÀY" value="7" icon={<Calendar size={18} color="#60a5fa"/>} sub="Tổng: 210.570.000 VNĐ" />
        <StatCard title="ĐƠN HÀNG THÁNG NÀY" value="7" icon={<CalendarDays size={18} color="#f59e0b"/>} sub="Tổng: 210.570.000 VNĐ" />
        <StatCard title="TỔNG ĐƠN HÀNG" value={orders.length} icon={<BarChart3 size={18} color="#a78bfa"/>} sub="Tất cả thời gian" />
      </div>

      {/* KHỐI NỘI DUNG CHÍNH */}
      <div className="white-box" style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', color: '#1a3353' }}>Quản lý đơn hàng</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
          <ActionCard label="Tạo đơn hàng mới" icon={<PlusCircle color="#ef4444" size={28} />} bg="#fff1f2" onClick={() => setShowCreateModal(true)} />
          <ActionCard label="Đơn hàng hôm nay" icon={<Clock color="#3b82f6" size={28} />} bg="#eff6ff" onClick={() => handleOpenListModal('Đơn hàng hôm nay')} />
          <ActionCard label="Đơn hàng tuần" icon={<CalendarRange color="#10b981" size={28} />} bg="#ecfdf5" onClick={() => handleOpenListModal('Đơn hàng tuần')} />
          <ActionCard label="Xuất báo cáo" icon={<FileText color="#f59e0b" size={28} />} bg="#fffbeb" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <ClipboardList size={20} color="#f59e0b" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1a3353', margin: 0 }}>Danh sách đơn hàng ({filteredOrders.length})</h3>
        </div>

        {/* THANH TÌM KIẾM CHÍNH */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={18} color="#9ca3af" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
          <input 
            type="text" placeholder="Tìm kiếm theo mã đơn, khách hàng..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={thStyle}>Mã đơn</th><th style={thStyle}>Khách hàng</th><th style={thStyle}>Thời gian</th><th style={thStyle}>Tổng tiền</th><th style={thStyle}>Thanh toán</th><th style={{ ...thStyle, textAlign: 'center' }}>TT Nhanh</th><th style={{ ...thStyle, textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}><strong>{order.id}</strong></td>
                  <td style={tdStyle}>{order.customer}</td>
                  <td style={{ ...tdStyle, color: '#6b7280' }}>{order.time}</td>
                  <td style={tdStyle}><strong>{order.total}</strong></td>
                  <td style={tdStyle}>{order.payment}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', background: order.status === 'Công nợ' ? '#f59e0b' : '#10b981', color: 'white', display: 'inline-block', minWidth: '80px' }}>
                      {order.status === 'Công nợ' ? 'Công nợ' : '✓ Đã TT'}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button style={{ ...actionBtnStyle, background: '#10b981' }}>IN</button>
                      <button onClick={() => handleViewDetail(order)} style={{ ...actionBtnStyle, background: '#3b82f6' }}>Chi tiết</button>
                      <button onClick={() => handleDeleteOrder(order.id)} style={{ ...actionBtnStyle, background: '#ef4444' }}>Xóa</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>Không tìm thấy đơn hàng nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================
          MODAL: TẠO ĐƠN HÀNG MỚI 
      ============================================= */}
      {showCreateModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '900px', maxHeight: '95vh', overflowY: 'auto', padding: '30px' }}>
            
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
              <div style={{background: '#60a5fa', color: 'white', fontSize: '10px', padding: '3px 6px', borderRadius: '4px'}}>NEW</div>
              Tạo đơn hàng mới
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Khách hàng:</label>
              <div style={{ display: 'flex', gap: '15px' }}>
                <select style={{ ...inputStyle, flex: 1 }}><option>Chọn khách hàng</option></select>
                <button onClick={() => setShowAddCustomerModal(true)} style={{ ...btnGreenStyle, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Plus size={18} /> Thêm KH mới
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Sản phẩm:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 1fr 1.5fr 0.5fr', gap: '10px', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#4b5563' }}>
                <div>Tên sản phẩm</div><div style={{textAlign:'center'}}>Số lượng</div><div>Đơn giá</div><div style={{textAlign:'center'}}>Giảm giá (%)</div><div>Thành tiền</div><div style={{textAlign:'center'}}>Thao tác</div>
              </div>
              {orderItems.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 1fr 1.5fr 0.5fr', gap: '10px', marginBottom: '10px' }}>
                  <select style={inputStyle}><option>Chọn sản phẩm</option></select>
                  <input type="number" style={{ ...inputStyle, textAlign: 'center' }} defaultValue="1" />
                  <input type="text" style={{ ...inputStyle, background: '#fef9c3', border: '1px solid #fde047' }} placeholder="Đơn giá" />
                  <input type="number" style={{ ...inputStyle, textAlign: 'center' }} defaultValue="0" />
                  <input type="text" style={{ ...inputStyle, background: '#f8fafc', color: '#9ca3af' }} placeholder="Thành tiền" readOnly />
                  <button style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Xóa</button>
                </div>
              ))}
              <button onClick={() => setOrderItems([...orderItems, {id: Date.now()}])} style={{ ...btnGreenStyle, marginTop: '10px', padding: '8px 15px', fontSize: '13px' }}>
                + Thêm sản phẩm
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Phương thức thanh toán:</label>
              <select style={inputStyle}><option>Tiền mặt</option><option>Chuyển khoản</option></select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Trạng thái thanh toán:</label>
              <select style={inputStyle}><option>Công nợ</option><option>Đã thanh toán</option></select>
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>Ghi chú:</label>
              <textarea style={{ ...inputStyle, height: '80px', resize: 'none' }} placeholder="Nhập ghi chú cho đơn hàng (không bắt buộc)"></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#374151' }}>Tổng tiền:</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb' }}>0 VNĐ</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button onClick={() => setShowCreateModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={{ ...btnBlueStyle, padding: '12px 30px' }}>Tạo đơn hàng</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL: THÊM KHÁCH HÀNG (Z-index cao để đè lên modal tạo đơn)
      ============================================= */}
      {showAddCustomerModal && (
        <div style={{ ...modalOverlayStyle, zIndex: 1050 }}>
          <div style={{ ...modalContentStyle, width: '600px', padding: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
              <Plus size={24} color="#8b5cf6" /> Thêm khách hàng mới
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div><label style={labelStyle}>Tên khách hàng: *</label><input type="text" style={inputStyle} /></div>
              <div><label style={labelStyle}>Loại khách hàng: *</label><select style={inputStyle}><option>Chọn loại</option><option>Cá nhân</option><option>Doanh nghiệp</option></select></div>
            </div>
            <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Số điện thoại: *</label><input type="text" style={inputStyle} /></div>
            <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Email:</label><input type="email" style={inputStyle} /></div>
            <div style={{ marginBottom: '15px' }}><label style={labelStyle}>Địa chỉ:</label><textarea style={{ ...inputStyle, height: '60px', resize: 'none' }}></textarea></div>
            <div style={{ marginBottom: '30px' }}><label style={labelStyle}>Ghi chú khách hàng:</label><textarea style={{ ...inputStyle, height: '80px', resize: 'none' }} placeholder="Nhập ghi chú (không bắt buộc)"></textarea></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button onClick={() => setShowAddCustomerModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={btnGreenStyle}>Thêm khách hàng</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL: DANH SÁCH ĐƠN HÀNG HÔM NAY / TUẦN NÀY
      ============================================= */}
      {showListModal && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '95%', maxWidth: '1100px', maxHeight: '90vh', overflowY: 'auto', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1a3353', margin: 0 }}>{listModalTitle}</h3>
              <X onClick={() => setShowListModal(false)} style={{ cursor: 'pointer', color: '#6b7280' }} size={24} />
            </div>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <Search size={18} color="#9ca3af" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
              <input 
                type="text" placeholder="Tìm kiếm theo mã đơn, khách hàng..." value={modalSearchTerm} onChange={(e) => setModalSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', margin: 0 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={thStyle}>Mã đơn</th><th style={thStyle}>Khách hàng</th><th style={thStyle}>Thời gian</th><th style={thStyle}>Tổng tiền</th><th style={thStyle}>Thanh toán</th><th style={{ ...thStyle, textAlign: 'center' }}>TT Nhanh</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModalOrders.length > 0 ? filteredModalOrders.map((order, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={tdStyle}><strong>{order.id}</strong></td>
                      <td style={tdStyle}>{order.customer}</td>
                      <td style={{ ...tdStyle, color: '#6b7280' }}>{order.time}</td>
                      <td style={tdStyle}><strong>{order.total}</strong></td>
                      <td style={tdStyle}>{order.payment}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', background: order.status === 'Công nợ' ? '#f59e0b' : '#10b981', color: 'white', display: 'inline-block', minWidth: '80px' }}>
                          {order.status === 'Công nợ' ? 'Công nợ' : '✓ Đã TT'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>Không tìm thấy đơn hàng nào phù hợp</td></tr>
                  )}
                </tbody>
              </table>
              <div style={{ background: '#f9fafb', padding: '12px 20px', fontSize: '13px', color: '#4b5563' }}>
                Tổng số bản ghi: {filteredModalOrders.length}
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowListModal(false)} style={{ ...btnBlueStyle, padding: '10px 30px' }}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL: CHI TIẾT ĐƠN HÀNG (Mẫu 3cca6f)
      ============================================= */}
      {showDetailModal && selectedOrder && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '500px', padding: '30px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '25px', color: '#1a3353' }}>Chi tiết đơn hàng {selectedOrder.id}</h3>
            
            <div style={{ marginBottom: '25px', fontSize: '15px', color: '#374151', lineHeight: '1.8' }}>
              <p style={{ margin: 0 }}><strong>Khách hàng:</strong> <span style={{ color: '#2563eb' }}>{selectedOrder.customer}</span></p>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                <strong>Công ty:</strong> Công ty TNHH Minh Châu • <strong>Phòng ban:</strong> Phòng mua hàng • <strong>MST:</strong> 0123456789
              </p>
              <div style={{ height: '15px' }}></div>
              <p style={{ margin: 0 }}><strong>Thời gian:</strong> {selectedOrder.time}</p>
              {/* Đã loại bỏ trạng thái theo yêu cầu */}
              <p style={{ margin: 0 }}><strong>Thanh toán:</strong> {selectedOrder.payment}</p>
            </div>

            <div style={{ marginBottom: '10px', fontWeight: '700', fontSize: '15px' }}>Sản phẩm:</div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#4b5563' }}>
                <span>MacBook Air M2 x 2</span>
                <span>{selectedOrder.total}</span>
              </div>
              <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '16px', color: '#1a3353' }}>
                <span>Tổng cộng:</span>
                <span>{selectedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <button onClick={handleOpenEdit} style={{ ...btnBlueStyle, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 30px' }}>
                <Pencil size={16} /> Sửa
              </button>
              <button onClick={() => setShowDetailModal(false)} style={btnHuyStyle}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL: SỬA ĐƠN HÀNG (Mẫu 3ccac4)
      ============================================= */}
      {showEditModal && selectedOrder && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '900px', maxHeight: '95vh', overflowY: 'auto', padding: '30px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '25px', color: '#1a3353' }}>Sửa đơn hàng {selectedOrder.id}</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Khách hàng:</label>
              <select style={inputStyle} defaultValue={selectedOrder.customer}>
                <option>{selectedOrder.customer}</option>
                <option>Khách hàng khác...</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Sản phẩm:</label>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.5fr 1fr 1fr 0.5fr', gap: '15px', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#6b7280' }}>
                <div>Tên sản phẩm</div><div>Giá bán</div><div>Số lượng</div><div>Chiết khấu (%)</div><div style={{textAlign:'center'}}>Xóa</div>
              </div>
              {editOrderItems.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '3fr 1.5fr 1fr 1fr 0.5fr', gap: '15px', marginBottom: '15px' }}>
                  <select style={inputStyle}><option>MacBook Air M2</option></select>
                  <input type="text" style={inputStyle} defaultValue="28900000" />
                  <input type="number" style={inputStyle} defaultValue="2" />
                  <input type="number" style={inputStyle} defaultValue="0" />
                  <button style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button onClick={() => setEditOrderItems([...editOrderItems, {id: Date.now()}])} style={{ ...btnGreenStyle, marginTop: '5px' }}>+ Thêm sản phẩm</button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Trạng thái thanh toán:</label>
              <select style={inputStyle} defaultValue={selectedOrder.status}><option>Công nợ</option><option>Đã thanh toán</option></select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Trạng thái đơn hàng:</label>
              <select style={inputStyle}><option>Đang xử lý</option><option>Hoàn thành</option><option>Đã Hủy</option></select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Phương thức thanh toán:</label>
              <select style={inputStyle} defaultValue={selectedOrder.payment}><option>Chuyển khoản</option><option>Tiền mặt</option></select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>Ghi chú:</label>
              <textarea style={{ ...inputStyle, height: '80px', resize: 'none' }} placeholder="Nhập ghi chú cho đơn hàng..."></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
              <button onClick={() => setShowEditModal(false)} style={btnHuyStyle}>Hủy</button>
              <button style={btnBlueStyle}>Cập nhật đơn hàng</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- COMPONENTS PHỤ & CSS INLINE ---

const StatCard = ({ title, value, icon, sub }) => (
  <div style={{ flex: 1, background: 'white', padding: '20px', borderRadius: '12px', borderTop: '4px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}><span style={{ fontSize: '12px', fontWeight: '800', color: '#6b7280' }}>{title}</span>{icon}</div>
    <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#1a3353', margin: '0 0 10px 0' }}>{value}</h2>
    <p style={{ fontSize: '13px', color: '#4b5563', margin: 0, fontWeight: '500' }}>{sub}</p>
  </div>
);

const ActionCard = ({ label, icon, onClick }) => (
  <div onClick={onClick} style={{ flex: 1, background: '#f8fafc', border: '1px solid #f1f5f9', padding: '25px 15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: '0.2s' }}>
    {icon}
    <span style={{ fontWeight: '700', fontSize: '14px', color: '#374151', textAlign: 'center' }}>{label}</span>
  </div>
);

const thStyle = { padding: '15px', textAlign: 'left', fontWeight: '800', color: '#4b5563', fontSize: '14px', background: '#f8fafc' };
const tdStyle = { padding: '15px', fontSize: '14px', color: '#374151' };
const actionBtnStyle = { border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContentStyle = { background: 'white', borderRadius: '16px', boxShadow: '0 20px 25px rgba(0,0,0,0.1)' };
const labelStyle = { display: 'block', fontWeight: '700', fontSize: '14px', marginBottom: '8px', color: '#374151' };
const inputStyle = { width: '100%', padding: '10px 15px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' };
const btnHuyStyle = { padding: '10px 30px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };
const btnBlueStyle = { padding: '10px 25px', borderRadius: '8px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };
const btnGreenStyle = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#059669', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' };

export default Orders;