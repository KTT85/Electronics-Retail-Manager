import React from 'react';
import { BarChart3 } from 'lucide-react';

const Reports = () => {
  return (
    <div className="page-container">
      <div className="chart-header">
        <h2 className="chart-title" style={{fontSize: '24px'}}>Báo cáo Doanh thu</h2>
      </div>
      <div className="white-box" style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', border: '2px dashed #e5e7eb'}}>
        <div style={{textAlign: 'center'}}><BarChart3 size={40} /><p>Khu vực hiển thị biểu đồ</p></div>
      </div>
    </div>
  );
};
export default Reports;