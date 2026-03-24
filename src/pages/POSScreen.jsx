import React, { useState } from 'react';
import { 
  Search, Home, ShoppingCart, Trash2, 
  Plus, Minus, CreditCard, User, X,
  UserPlus, Save, QrCode, Banknote
} from 'lucide-react';

const POS = () => {
  // --- DỮ LIỆU MẪU ---
  const [products] = useState([
    { id: 'SP01', name: 'Coca Cola', price: 10000, category: 'Đồ uống', image: '🥤' },
    { id: 'SP02', name: 'Snack Oshi', price: 5000, category: 'Đồ ăn vặt', image: '🥔' },
    { id: 'SP03', name: 'Mì ly Omachi', price: 12000, category: 'Đồ ăn vặt', image: '🍜' },
    { id: 'SP04', name: 'Nước suối Aquafina', price: 5000, category: 'Đồ uống', image: '💧' },
    { id: 'SP05', name: 'Kẹo cao su Coolmint', price: 3000, category: 'Đồ ăn vặt', image: '🍬' },
    { id: 'SP06', name: 'Bánh mì sandwich', price: 15000, category: 'Đồ ăn nhanh', image: '🥪' },
    { id: 'SP07', name: 'Cà phê lon Birdy', price: 12000, category: 'Đồ uống', image: '☕' },
    { id: 'SP08', name: 'Bia Heineken', price: 18000, category: 'Đồ uống', image: '🍺' },
    { id: 'SP09', name: 'Xúc xích Ponnie', price: 10000, category: 'Đồ ăn nhanh', image: '🌭' },
    { id: 'SP10', name: 'Sữa tươi TH', price: 8000, category: 'Đồ uống', image: '🥛' },
  ]);

  const categories = ['Tất cả', 'Đồ uống', 'Đồ ăn vặt', 'Đồ ăn nhanh'];
  const mockCustomers = ['Khách lẻ', 'Nguyễn Văn A', 'Trần Thị B', 'Lê Minh C'];

  // --- QUẢN LÝ TAB ĐƠN HÀNG ---
  const [orders, setOrders] = useState([{ id: 1, name: 'Đơn 1', cart: [], customer: 'Khách lẻ' }]);
  const [activeOrderId, setActiveOrderId] = useState(1);
  const [orderCounter, setOrderCounter] = useState(2);

  // --- BỘ LỌC ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  // --- STATE THANH TOÁN ---
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' hoặc 'qr'
  const [customerCash, setCustomerCash] = useState('');

  // --- HÀM XỬ LÝ LỌC & FORMAT ---
  const formatMoney = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  const parseMoney = (str) => parseInt(str.replace(/\D/g, '')) || 0;

  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === 'Tất cả' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // --- XỬ LÝ GIỎ HÀNG ---
  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0];
  const totalAmount = activeOrder.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const updateActiveOrder = (updatedOrder) => {
    setOrders(prev => prev.map(o => o.id === activeOrderId ? updatedOrder : o));
  };

  const addToCart = (product) => {
    const existing = activeOrder.cart.find(item => item.id === product.id);
    let newCart = existing 
      ? activeOrder.cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      : [...activeOrder.cart, { ...product, qty: 1 }];
    updateActiveOrder({ ...activeOrder, cart: newCart });
  };

  const updateQty = (id, delta) => {
    const newCart = activeOrder.cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    });
    updateActiveOrder({ ...activeOrder, cart: newCart });
  };

  const removeFormCart = (id) => {
    updateActiveOrder({ ...activeOrder, cart: activeOrder.cart.filter(item => item.id !== id) });
  };

  const handleCustomerChange = (e) => updateActiveOrder({ ...activeOrder, customer: e.target.value });

  // --- QUẢN LÝ TAB ---
  const handleAddTab = () => {
    const newId = Date.now();
    setOrders([...orders, { id: newId, name: `Đơn ${orderCounter}`, cart: [], customer: 'Khách lẻ' }]);
    setActiveOrderId(newId);
    setOrderCounter(orderCounter + 1);
  };

  const handleRemoveTab = (e, id) => {
    e.stopPropagation();
    if (orders.length === 1) {
      setOrders([{ id: Date.now(), name: `Đơn ${orderCounter}`, cart: [], customer: 'Khách lẻ' }]);
      setOrderCounter(orderCounter + 1);
      return;
    }
    const newOrders = orders.filter(o => o.id !== id);
    setOrders(newOrders);
    if (activeOrderId === id) setActiveOrderId(newOrders[newOrders.length - 1].id);
  };

  // --- QUY TRÌNH THANH TOÁN ---
  const handleOpenPayment = () => {
    if (activeOrder.cart.length === 0) return alert('Đơn hàng đang trống!');
    setCustomerCash(totalAmount.toString()); // Mặc định khách đưa đủ
    setPaymentMethod('cash');
    setShowPaymentModal(true);
  };

  const handleCompletePayment = () => {
    const cashGiven = parseMoney(customerCash.toString());
    
    if (paymentMethod === 'cash' && cashGiven < totalAmount) {
      return alert('Số tiền khách đưa chưa đủ để thanh toán!');
    }

    // Đóng Modal
    setShowPaymentModal(false);

    // Mô phỏng thông báo lưu thành công
    setTimeout(() => {
      alert(`✅ GIAO DỊCH THÀNH CÔNG!\n\nKhách hàng: ${activeOrder.customer}\nTổng tiền: ${formatMoney(totalAmount)}\nPhương thức: ${paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản (Mã QR)'}\n\nĐã lưu hóa đơn vào hệ thống.`);
      
      // Clear tab sau khi thanh toán
      if (orders.length === 1) {
        setOrders([{ id: Date.now(), name: `Đơn ${orderCounter}`, cart: [], customer: 'Khách lẻ' }]);
        setOrderCounter(orderCounter + 1);
      } else {
        const newOrders = orders.filter(o => o.id !== activeOrderId);
        setOrders(newOrders);
        setActiveOrderId(newOrders[newOrders.length - 1].id);
      }
    }, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ height: '60px', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 10 }}>
        <h1 style={{ fontSize: '20px', margin: 0, fontWeight: '800' }}>MÀN HÌNH THU NGÂN</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
            <User size={16} /> Thu ngân: Admin
          </div>
          <button style={{ background: 'white', color: '#059669', border: 'none', padding: '8px 15px', borderRadius: '8px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => window.history.back()}>
            <Home size={16} /> Về Quản lý
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* CỘT TRÁI: GIỎ HÀNG */}
        <div style={{ width: '420px', background: 'white', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb', zIndex: 5, boxShadow: '2px 0 5px rgba(0,0,0,0.02)' }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', background: '#f8fafc', padding: '10px 10px 0 10px', overflowX: 'auto', borderBottom: '1px solid #e5e7eb' }}>
            {orders.map(order => (
              <div 
                key={order.id} onClick={() => setActiveOrderId(order.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', cursor: 'pointer',
                  background: activeOrderId === order.id ? 'white' : 'transparent',
                  color: activeOrderId === order.id ? '#059669' : '#6b7280',
                  borderTopLeftRadius: '8px', borderTopRightRadius: '8px',
                  borderTop: activeOrderId === order.id ? '3px solid #059669' : '3px solid transparent',
                  fontWeight: '700', fontSize: '14px', minWidth: '90px'
                }}
              >
                {order.name}
                <button onClick={(e) => handleRemoveTab(e, order.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 0, display: 'flex' }}><X size={14} /></button>
              </div>
            ))}
            <button onClick={handleAddTab} style={{ background: 'transparent', border: 'none', color: '#059669', cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center', fontWeight: '800' }}><Plus size={20} /></button>
          </div>

          {/* Chọn khách */}
          <div style={{ padding: '15px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} color="#6b7280" />
            <select value={activeOrder.customer} onChange={handleCustomerChange} style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', fontWeight: '600' }}>
              {mockCustomers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}><UserPlus size={18} /></button>
          </div>

          {/* Giỏ hàng */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
            {activeOrder.cart.length === 0 ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                <ShoppingCart size={50} style={{ opacity: 0.3, marginBottom: '15px' }} />
                <p style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Đơn hàng chưa có sản phẩm</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeOrder.cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#1a3353', fontWeight: '700' }}>{item.name}</h4>
                      <div style={{ color: '#059669', fontWeight: '700', fontSize: '14px' }}>{formatMoney(item.price)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ ...qtyBtnStyle, borderRight: '1px solid #d1d5db' }}><Minus size={14}/></button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '14px', fontWeight: '700' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ ...qtyBtnStyle, borderLeft: '1px solid #d1d5db' }}><Plus size={14}/></button>
                      </div>
                      <button onClick={() => removeFormCart(item.id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Thanh toán */}
          <div style={{ padding: '20px', borderTop: '2px solid #f1f5f9', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#6b7280' }}>
              <span>Tổng tiền hàng ({activeOrder.cart.reduce((sum, item) => sum + item.qty, 0)} SP):</span>
              <span style={{ fontWeight: '600', color: '#1a3353' }}>{formatMoney(totalAmount)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: '800', color: '#1a3353' }}>
              <span>KHÁCH CẦN TRẢ:</span>
              <span style={{ color: '#ef4444', fontSize: '24px' }}>{formatMoney(totalAmount)}</span>
            </div>
            <button onClick={handleOpenPayment} style={{ width: '100%', background: '#059669', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 6px rgba(5, 150, 105, 0.2)' }}>
              <CreditCard size={20} /> THANH TOÁN (F9)
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: SẢN PHẨM */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <div style={{ background: 'white', padding: '15px 20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} color="#9ca3af" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px' }} />
              <input 
                type="text" placeholder="Tìm kiếm sản phẩm hoặc quét mã vạch..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '14px 15px 14px 45px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', background: '#f8fafc' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', border: 'none', background: activeCategory === cat ? '#059669' : '#f1f5f9', color: activeCategory === cat ? 'white' : '#4b5563' }}>{cat}</button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px', paddingRight: '5px' }}>
              {filteredProducts.map(product => (
                <div key={product.id} onClick={() => addToCart(product)} style={{ background: 'white', borderRadius: '16px', padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', transition: '0.2s' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#10b981' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#f1f5f9' }}>
                  <div style={{ fontSize: '40px', marginBottom: '15px', background: '#f8fafc', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product.image}</div>
                  <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#1a3353', fontWeight: '700', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>{product.name}</h3>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#059669' }}>{formatMoney(product.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          MODAL THANH TOÁN (TIỀN MẶT & CHUYỂN KHOẢN QR)
      ============================================================== */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', width: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}>
            
            {/* Header Modal */}
            <div style={{ background: '#f8fafc', padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#1a3353' }}>Thanh toán hóa đơn</h2>
              <button onClick={() => setShowPaymentModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={24}/></button>
            </div>

            <div style={{ padding: '30px' }}>
              {/* Tổng tiền */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontWeight: '600' }}>Khách cần trả</p>
                <h1 style={{ margin: 0, fontSize: '36px', color: '#ef4444', fontWeight: '900' }}>{formatMoney(totalAmount)}</h1>
              </div>

              {/* Lựa chọn phương thức */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <button 
                  onClick={() => setPaymentMethod('cash')}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `2px solid ${paymentMethod === 'cash' ? '#059669' : '#e5e7eb'}`, background: paymentMethod === 'cash' ? '#ecfdf5' : 'white', color: paymentMethod === 'cash' ? '#059669' : '#4b5563', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <Banknote size={20} /> Tiền mặt
                </button>
                <button 
                  onClick={() => setPaymentMethod('qr')}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `2px solid ${paymentMethod === 'qr' ? '#2563eb' : '#e5e7eb'}`, background: paymentMethod === 'qr' ? '#eff6ff' : 'white', color: paymentMethod === 'qr' ? '#2563eb' : '#4b5563', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <QrCode size={20} /> Chuyển khoản QR
                </button>
              </div>

              {/* KHU VỰC TIỀN MẶT */}
              {paymentMethod === 'cash' && (
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Khách đưa:</label>
                    <input 
                      type="text" 
                      value={customerCash} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setCustomerCash(val ? parseInt(val).toLocaleString('vi-VN') : '');
                      }}
                      style={{ width: '100%', padding: '12px', fontSize: '18px', fontWeight: '700', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', textAlign: 'right' }}
                      placeholder="0"
                    />
                  </div>
                  
                  {/* Nút gợi ý tiền */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button onClick={() => setCustomerCash(totalAmount.toString())} style={{ flex: 1, padding: '8px', fontSize: '13px', border: '1px solid #d1d5db', background: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Vừa đủ</button>
                    <button onClick={() => setCustomerCash('500000')} style={{ flex: 1, padding: '8px', fontSize: '13px', border: '1px solid #d1d5db', background: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>500,000</button>
                    <button onClick={() => setCustomerCash('200000')} style={{ flex: 1, padding: '8px', fontSize: '13px', border: '1px solid #d1d5db', background: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>200,000</button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
                    <span style={{ fontWeight: '600', color: '#4b5563' }}>Tiền thừa trả khách:</span>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: (parseMoney(customerCash) - totalAmount) >= 0 ? '#10b981' : '#ef4444' }}>
                      {formatMoney(Math.max(0, parseMoney(customerCash) - totalAmount))}
                    </span>
                  </div>
                </div>
              )}

              {/* KHU VỰC CHUYỂN KHOẢN QR */}
              {paymentMethod === 'qr' && (
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '200px', height: '200px', background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                    {/* Giả lập hình ảnh mã QR */}
                    <QrCode size={160} color="#1e293b" />
                  </div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '800', color: '#1e40af' }}>NGAN HANG ABC - CHI NHANH HN</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: '700', color: '#1a3353' }}>1900 8888 9999</p>
                  <p style={{ margin: '0', fontSize: '14px', color: '#6b7280' }}>Chủ TK: CONG TY TNHH KTT85</p>
                  <div style={{ marginTop: '15px', background: '#e0e7ff', color: '#1d4ed8', padding: '8px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                    Yêu cầu khách hàng quét mã để thanh toán
                  </div>
                </div>
              )}

            </div>

            {/* Footer Modal */}
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '15px', background: '#f8fafc', borderTop: '1px solid #e5e7eb' }}>
              <button onClick={() => setShowPaymentModal(false)} style={{ padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', fontWeight: '700', fontSize: '15px', color: '#4b5563', cursor: 'pointer' }}>
                Hủy bỏ
              </button>
              <button onClick={handleCompletePayment} style={{ padding: '14px', borderRadius: '8px', border: 'none', background: '#059669', color: 'white', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(5,150,105,0.2)' }}>
                <Save size={18} /> Hoàn tất & Lưu HĐ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- STYLES PHỤ ---
const qtyBtnStyle = { background: 'transparent', border: 'none', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' };

export default POS;