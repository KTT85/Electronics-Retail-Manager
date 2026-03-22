import React, { useState } from 'react';
import { Search, Download, Eye, Calendar, Filter, ChevronDown } from 'lucide-react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Hôm nay');

  const orders = [
    { id: 'HD000123', time: '14:30', customer: 'Nguyễn Văn A', total: '1,250,000', status: 'paid' },
    { id: 'HD000124', time: '15:10', customer: 'Khách lẻ', total: '85,000', status: 'unpaid' },
    { id: 'HD000125', time: '16:05', customer: 'Lê Minh C', total: '2,450,000', status: 'paid' },
  ];

  return (
    <div className="page-container" style={{ background: '#f4f6f8', minHeight: '100%' }}>
      
      {/* HEADER: Nút Xuất báo cáo (Giống Ảnh 4) */}
      <div className="chart-header" style={{ marginBottom: '15px' }}>
        <h2 className="chart-title" style={{ fontSize: '22px', color: '#1a3353' }}>Quản lý Đơn hàng</h2>
        <button className="refresh-btn" style={{ background: '#0284c7', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
          <Download size={18} /> XUẤT BÁO CÁO ĐƠN HÀNG
        </button>
      </div>

      {/* THANH LỌC TRẠNG THÁI (Giống Ảnh 2) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {['Đơn hàng mới', 'Hôm nay', 'Tuần này', 'Tháng này'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              background: activeTab === tab ? '#0e9f6e' : 'white',
              color: activeTab === tab ? 'white' : '#4b5563',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BỘ LỌC CHI TIẾT & TÌM KIẾM (Giống Ảnh 3) */}
      <div className="white-box" style={{ padding: '15px', marginBottom: '15px', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Tìm theo mã hóa đơn, tên khách hàng..." 
            className="pos-input" 
            style={{ width: '100%', paddingLeft: '40px', height: '42px', border: '1px solid #e5e7eb' }} 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Calendar size={16} style={{ position: 'absolute', left: '10px', color: '#6b7280' }} />
            <select className="pos-input" style={{ paddingLeft: '35px', width: '180px', height: '42px', appearance: 'none' }}>
              <option>Thời gian: {activeTab}</option>
              <option>Tùy chọn ngày</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', color: '#6b7280' }} />
          </div>

          <button style={{ height: '42px', padding: '0 15px', background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', fontWeight: '600', cursor: 'pointer' }}>
            <Filter size={16} /> Bộ lọc khác
          </button>
        </div>
      </div>

      {/* BẢNG DANH SÁCH (Giống Ảnh 1) */}
      <div className="white-box" style={{ flex: 1, padding: '0' }}>
        <table className="data-table">
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ width: '150px' }}>MÃ HÓA ĐƠN</th>
              <th>THỜI GIAN</th>
              <th>KHÁCH HÀNG</th>
              <th style={{ textAlign: 'right' }}>TỔNG TIỀN</th>
              <th style={{ textAlign: 'center' }}>TRẠNG THÁI</th>
              <th style={{ textAlign: 'right' }}>HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ transition: '0.2s' }}>
                <td style={{ color: '#0284c7', fontWeight: '700' }}>{order.id}</td>
                <td style={{ color: '#6b7280' }}>22/03/2026 {order.time}</td>
                <td style={{ fontWeight: '500' }}>{order.customer}</td>
                <td style={{ textAlign: 'right', fontWeight: '800', color: '#111827' }}>{order.total} ₫</td>
                <td style={{ textAlign: 'center' }}>
                  {order.status === 'paid' ? (
                    <span style={{ 
                      background: '#def7ec', color: '#03543f', 
                      padding: '5px 12px', borderRadius: '20px', 
                      fontSize: '11px', fontWeight: '700', border: '1px solid #84e1bc'
                    }}>
                      ĐÃ THANH TOÁN
                    </span>
                  ) : (
                    <span style={{ 
                      background: '#fde8e8', color: '#9b1c1c', 
                      padding: '5px 12px', borderRadius: '20px', 
                      fontSize: '11px', fontWeight: '700', border: '1px solid #f8b4b4'
                    }}>
                      CHƯA THANH TOÁN
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '5px' }}>
                    <Eye size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PHÂN TRANG (Phần thừa dưới cùng được lấp đầy) */}
        <div style={{ padding: '15px 20px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Hiển thị 1 - 3 của 120 đơn hàng</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button className="refresh-btn" style={{ padding: '5px 12px', background: 'white', border: '1px solid #d1d5db', color: '#374151' }}>Trước</button>
            <button className="refresh-btn" style={{ padding: '5px 12px' }}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;