import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="page-container">
      <div className="chart-header">
        <h2 className="chart-title" style={{fontSize: '24px'}}>Cài đặt hệ thống</h2>
      </div>
      <div className="white-box">
        <p style={{color: '#6b7280'}}>Cấu hình thông tin cửa hàng và tham số hệ thống tại đây.</p>
        <hr style={{margin: '20px 0', border: '0', borderTop: '1px solid #eee'}} />
        <button className="refresh-btn">Lưu cấu hình</button>
      </div>
    </div>
  );
};
export default Settings;