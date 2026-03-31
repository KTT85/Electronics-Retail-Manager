import React, { useState, useEffect } from 'react';
import { 
  Search, Home, ShoppingCart, Trash2, Plus, Minus, CreditCard, 
  User, X, UserPlus, Save, QrCode, Banknote, Printer, CheckCircle, RefreshCw
} from 'lucide-react';

const POSScreen = () => {
  // --- 1. DỮ LIỆU SẢN PHẨM (MOCK API) ---
  const [products] = useState([
    { productId: 1, categoryId: 1, productName: 'Coca Cola', productImageUrl: '🥤', variants: [{ variantId: 101, SKU: 'COCA', sellPrice: 10000 }] },
    { productId: 2, categoryId: 2, productName: 'Snack Oshi', productImageUrl: '🥔', variants: [{ variantId: 102, SKU: 'OSHI', sellPrice: 5000 }] },
    { productId: 3, categoryId: 2, productName: 'Mì ly Omachi', productImageUrl: '🍜', variants: [{ variantId: 103, SKU: 'OMA', sellPrice: 12000 }] },
    { productId: 4, categoryId: 1, productName: 'Nước suối Aquafina', productImageUrl: '💧', variants: [{ variantId: 104, SKU: 'AQUA', sellPrice: 5000 }] },
    { productId: 5, categoryId: 3, productName: 'Bánh mì sandwich', productImageUrl: '🥪', variants: [{ variantId: 105, SKU: 'SAND', sellPrice: 15000 }] },
    { productId: 6, categoryId: 1, productName: 'Cà phê Birdy', productImageUrl: '☕', variants: [{ variantId: 106, SKU: 'BIRDY', sellPrice: 12000 }] },
    { productId: 7, categoryId: 1, productName: 'Bia Heineken', productImageUrl: '🍺', variants: [{ variantId: 107, SKU: 'KEN', sellPrice: 18000 }] },
  ]);

  const categories = [
    { categoryId: 0, categoryName: 'Tất cả' },
    { categoryId: 1, categoryName: 'Đồ uống' },
    { categoryId: 2, categoryName: 'Đồ ăn vặt' },
    { categoryId: 3, categoryName: 'Đồ ăn nhanh' },
  ];

  // --- 2. QUẢN LÝ TAB ĐƠN HÀNG (MULTI-TABS) ---
  const [orders, setOrders] = useState([{ id: Date.now(), name: 'Đơn 1', cart: [], customerId: null, customerName: 'Khách lẻ', receiptId: null }]);
  const [activeOrderId, setActiveOrderId] = useState(orders[0].id);
  const [orderCounter, setOrderCounter] = useState(2);

  // --- 3. BỘ LỌC & TÌM KIẾM ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  // --- 4. TÌM KIẾM KHÁCH HÀNG ---
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerResults, setCustomerResults] = useState([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  // --- 5. MODALS & THANH TOÁN ---
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
  const [amountReceived, setAmountReceived] = useState(''); // Lưu dạng string để format
  const [lastOrder, setLastOrder] = useState(null);

  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0];
  const totalAmount = activeOrder.cart.reduce((sum, i) => sum + (i.unitPrice * i.quantity), 0);

  // --- HÀM HỖ TRỢ ---
  const formatMoney = (val) => new Intl.NumberFormat('vi-VN').format(val) + ' ₫';
  const parseMoney = (str) => parseInt(str.replace(/\D/g, '')) || 0;

  const updateActiveOrder = (updated) => {
    setOrders(orders.map(o => o.id === activeOrderId ? updated : o));
  };

  // --- XỬ LÝ SẢN PHẨM ---
  const filteredProducts = products.filter(p => {
    const matchCat = activeCategoryId === 0 || p.categoryId === activeCategoryId;
    const matchSearch = p.productName.toLowerCase().includes(searchQuery.toLowerCase()) || p.variants[0].SKU.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    const variant = product.variants[0];
    const currentOrder = { ...activeOrder };
    if (!currentOrder.receiptId) currentOrder.receiptId = "HD" + Math.floor(1000 + Math.random() * 9000);

    const existing = currentOrder.cart.find(item => item.variantId === variant.variantId);
    if (existing) {
      currentOrder.cart = currentOrder.cart.map(item => item.variantId === variant.variantId ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      currentOrder.cart.push({ variantId: variant.variantId, productName: product.productName, quantity: 1, unitPrice: variant.sellPrice });
    }
    updateActiveOrder(currentOrder);
  };

  const updateQty = (vId, delta) => {
    const newCart = activeOrder.cart.map(i => i.variantId === vId ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i);
    updateActiveOrder({ ...activeOrder, cart: newCart });
  };

  // --- XỬ LÝ KHÁCH HÀNG ---
  const handleSearchCustomer = (query) => {
    setCustomerSearch(query);
    if (query.length < 1) { setCustomerResults([]); setShowCustomerDropdown(false); return; }
    const mock = [
      { customerId: 15, fullName: 'Nguyễn Văn A', phoneNumber: '0987654321', rewardPoints: 150 },
      { customerId: 22, fullName: 'Trần Thị B', phoneNumber: '0123456789', rewardPoints: 50 },
    ].filter(c => c.fullName.toLowerCase().includes(query.toLowerCase()) || c.phoneNumber.includes(query));
    setCustomerResults(mock); setShowCustomerDropdown(true);
  };

  // --- XỬ LÝ TAB ---
  const handleAddTab = () => {
    const newId = Date.now();
    setOrders([...orders, { id: newId, name: `Đơn ${orderCounter}`, cart: [], customerId: null, customerName: 'Khách lẻ', receiptId: null }]);
    setActiveOrderId(newId);
    setOrderCounter(orderCounter + 1);
  };

  const handleRemoveTab = (e, id) => {
    if (e) e.stopPropagation();
    if (orders.length === 1) {
       const resetId = Date.now();
       setOrders([{ id: resetId, name: 'Đơn 1', cart: [], customerId: null, customerName: 'Khách lẻ', receiptId: null }]);
       setActiveOrderId(resetId);
       return;
    }
    const newOrders = orders.filter(o => o.id !== id);
    setOrders(newOrders);
    if (activeOrderId === id) setActiveOrderId(newOrders[0].id);
  };

  // --- THANH TOÁN ---
  const handleCompletePayment = () => {
    const received = parseMoney(amountReceived);
    if (paymentMethod === 'Tiền mặt' && received < totalAmount) return alert("Tiền khách đưa chưa đủ!");
    
    setLastOrder({ 
      ...activeOrder, 
      totalAmount, 
      paymentMethod, 
      amountReceived: received, 
      staffName: "Kiên (Admin)", 
      orderAt: new Date().toLocaleString('vi-VN') 
    });
    setShowPaymentModal(false);
    setShowReceiptModal(true);
  };

  const finishAll = () => {
    setShowReceiptModal(false);
    handleRemoveTab(null, activeOrderId);
    setAmountReceived('');
    setCustomerSearch('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f1f5f9', fontFamily: 'system-ui' }}>
      
      {/* HEADER */}
      <header style={{ height: '60px', background: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}><ShoppingCart size={22}/> <h1 style={{fontSize:'18px', fontWeight:'800', margin:0}}>MÀN HÌNH THU NGÂN</h1></div>
        <div style={{display:'flex', gap:'15px'}}>
          <div style={{background:'rgba(255,255,255,0.2)', padding:'6px 15px', borderRadius:'20px', fontSize:'13px', fontWeight:'600'}}><User size={14} style={{marginRight:'5px'}}/> NV: Kiên Admin</div>
          <button style={{background:'white', color:'#059669', border:'none', padding:'6px 12px', borderRadius:'6px', fontWeight:'700', cursor:'pointer'}} onClick={() => window.history.back()}><Home size={14}/> Thoát</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* CỘT TRÁI: CART & CUSTOMER */}
        <div style={{ width: '420px', background: 'white', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e2e8f0' }}>
          
          {/* TAB ĐƠN HÀNG */}
          <div style={{ display: 'flex', background: '#f8fafc', padding: '10px 10px 0', borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
            {orders.map(o => (
              <div 
                key={o.id} onClick={() => setActiveOrderId(o.id)}
                style={{ 
                  padding: '10px 15px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', borderRadius: '8px 8px 0 0', marginRight:'5px',
                  background: activeOrderId === o.id ? 'white' : 'transparent',
                  color: activeOrderId === o.id ? '#059669' : '#64748b',
                  borderTop: activeOrderId === o.id ? '3px solid #059669' : '3px solid transparent',
                  boxShadow: activeOrderId === o.id ? '0 -2px 5px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                {o.name} <X size={12} onClick={(e) => handleRemoveTab(e, o.id)} style={{ marginLeft: '5px', opacity: 0.5 }} />
              </div>
            ))}
            <button onClick={handleAddTab} style={{ border: 'none', background: 'none', color: '#059669', cursor: 'pointer', padding:'10px' }}><Plus size={20}/></button>
          </div>

          {/* CHỌN KHÁCH HÀNG */}
          <div style={{ padding: '15px', borderBottom: '1px solid #f1f5f9', position: 'relative' }}>
             <div style={{display:'flex', gap:'8px'}}>
                <div style={{position:'relative', flex:1}}>
                  <Search size={16} style={{position:'absolute', left:'10px', top:'10px', color:'#94a3b8'}}/>
                  <input 
                    type="text" placeholder="Tìm tên/SĐT khách hàng..." value={customerSearch}
                    onChange={(e) => handleSearchCustomer(e.target.value)}
                    style={{width:'100%', padding:'8px 10px 8px 32px', borderRadius:'6px', border:'1px solid #cbd5e1', outline:'none', fontSize:'13px', boxSizing:'border-box'}}
                  />
                  {showCustomerDropdown && customerResults.length > 0 && (
                    <div style={{position:'absolute', top:'40px', left:0, right:0, background:'white', border:'1px solid #ddd', borderRadius:'8px', zIndex:100, boxShadow:'0 10px 15px rgba(0,0,0,0.1)'}}>
                      {customerResults.map(c => (
                        <div key={c.customerId} onClick={() => { updateActiveOrder({...activeOrder, customerId: c.customerId, customerName: c.fullName}); setCustomerSearch(c.fullName); setShowCustomerDropdown(false); }} style={{padding:'10px', borderBottom:'1px solid #eee', cursor:'pointer'}} onMouseOver={e=>e.currentTarget.style.background='#f0fdf4'} onMouseOut={e=>e.currentTarget.style.background='white'}>
                          <div style={{fontWeight:'700', fontSize:'13px'}}>{c.fullName}</div>
                          <div style={{fontSize:'11px', color:'#64748b'}}>{c.phoneNumber} - {c.rewardPoints} điểm</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setShowAddCustomerModal(true)} style={{ padding: '8px', borderRadius: '6px', border: 'none', background: '#ecfdf5', color: '#059669', cursor: 'pointer' }}><UserPlus size={18}/></button>
             </div>
             {activeOrder.customerId && (
               <div style={{marginTop:'8px', fontSize:'12px', color:'#059669', display:'flex', alignItems:'center', gap:'5px', fontWeight:'600'}}>
                 <CheckCircle size={12}/> Đang chọn: {activeOrder.customerName}
                 <X size={12} cursor="pointer" onClick={()=> {updateActiveOrder({...activeOrder, customerId:null, customerName:'Khách lẻ'}); setCustomerSearch('')}}/>
               </div>
             )}
          </div>

          {/* DANH SÁCH GIỎ HÀNG */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
            {activeOrder.cart.length === 0 ? (
               <div style={{textAlign:'center', marginTop:'80px', color:'#94a3b8'}}>
                  <ShoppingCart size={50} style={{opacity:0.2, marginBottom:'10px'}}/>
                  <p style={{fontWeight:'600'}}>Đơn hàng trống</p>
               </div>
            ) : (
              activeOrder.cart.map(item => (
                <div key={item.variantId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <div style={{flex:1}}>
                      <div style={{ fontWeight: '700', fontSize: '14px', color:'#1e293b' }}>{item.productName}</div>
                      <div style={{ color: '#059669', fontSize: '13px', fontWeight:'700' }}>{formatMoney(item.unitPrice)}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{display:'flex', alignItems:'center', background:'#fff', border:'1px solid #cbd5e1', borderRadius:'6px'}}>
                          <button onClick={() => updateQty(item.variantId, -1)} style={qtyBtnStyle}><Minus size={12}/></button>
                          <span style={{ width:'30px', textAlign:'center', fontWeight:'800', fontSize:'14px' }}>{item.quantity}</span>
                          <button onClick={() => updateQty(item.variantId, 1)} style={qtyBtnStyle}><Plus size={12}/></button>
                        </div>
                        <Trash2 size={18} color="#ef4444" cursor="pointer" onClick={() => updateActiveOrder({...activeOrder, cart: activeOrder.cart.filter(i => i.variantId !== item.variantId)})} />
                    </div>
                </div>
              ))
            )}
          </div>

          {/* THANH TOÁN FOOTER */}
          <div style={{ padding: '20px', borderTop: '2px solid #f1f5f9', background:'#fff' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{fontWeight:'700', color:'#64748b'}}>TỔNG TIỀN ({activeOrder.cart.reduce((sum, i) => sum + i.quantity, 0)} SP):</span>
                <span style={{ color: '#ef4444', fontSize: '24px', fontWeight: '900' }}>{formatMoney(totalAmount)}</span>
             </div>
             <button onClick={() => totalAmount > 0 && setShowPaymentModal(true)} style={{ width: '100%', background: '#059669', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '800', fontSize:'16px', cursor: 'pointer', display:'flex', justifyContent:'center', alignItems:'center', gap:'10px' }}>
                <CreditCard size={20}/> THANH TOÁN (F9)
             </button>
          </div>
        </div>

        {/* CỘT PHẢI: PRODUCT GRID */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                <Search size={20} style={{ position: 'absolute', left: '15px', top: '13px', color: '#94a3b8' }} />
                <input 
                  type="text" placeholder="Tìm tên sản phẩm hoặc quét mã SKU..." value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  style={{ width: '100%', padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize:'15px', outline:'none', boxSizing:'border-box' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX:'auto', paddingBottom:'5px' }}>
                {categories.map(c => (
                    <button 
                      key={c.categoryId} onClick={() => setActiveCategoryId(c.categoryId)} 
                      style={{ 
                        padding: '10px 20px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize:'13px', whiteSpace:'nowrap',
                        background: activeCategoryId === c.categoryId ? '#059669' : '#fff', 
                        color: activeCategoryId === c.categoryId ? 'white' : '#64748b', 
                        boxShadow:'0 2px 4px rgba(0,0,0,0.05)' 
                      }}
                    >
                      {c.categoryName}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
                {filteredProducts.map(p => (
                    <div 
                      key={p.productId} onClick={() => addToCart(p)} 
                      style={{ background: 'white', padding: '20px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', border: '1px solid #f1f5f9', transition:'0.2s' }} 
                      onMouseOver={e=>e.currentTarget.style.transform='translateY(-4px)'} 
                      onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}
                    >
                        <div style={{ fontSize: '50px', marginBottom: '10px', background:'#f8fafc', height:'80px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>{p.productImageUrl}</div>
                        <div style={{ fontWeight: '700', fontSize: '15px', height:'40px', overflow:'hidden', color:'#1e293b' }}>{p.productName}</div>
                        <div style={{ color: '#059669', fontWeight: '800', marginTop:'10px', fontSize:'16px' }}>{formatMoney(p.variants[0].sellPrice)}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* --- MODAL THANH TOÁN (FULL LOGIC) --- */}
      {showPaymentModal && (
        <div style={modalOverlayStyle}>
            <div style={{ background: 'white', width: '480px', borderRadius: '20px', padding: '30px', boxShadow:'0 20px 25px rgba(0,0,0,0.2)' }}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'25px'}}>
                  <h2 style={{margin:0, fontSize:'22px', fontWeight:'800'}}>Thanh toán hóa đơn</h2>
                  <X cursor="pointer" onClick={()=>setShowPaymentModal(false)} color="#64748b"/>
                </div>
                
                <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '15px', textAlign: 'center', marginBottom: '25px', border:'1px solid #fee2e2' }}>
                    <div style={{ fontSize: '14px', color: '#ef4444', fontWeight:'700' }}>TỔNG TIỀN CẦN TRẢ</div>
                    <div style={{ fontSize: '36px', fontWeight: '900', color: '#ef4444' }}>{formatMoney(totalAmount)}</div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
                    <button onClick={() => setPaymentMethod('Tiền mặt')} style={{...btnMethodStyle, borderColor: paymentMethod === 'Tiền mặt' ? '#059669' : '#e2e8f0', background: paymentMethod === 'Tiền mặt' ? '#f0fdf4' : '#fff'}}><Banknote size={20}/> Tiền mặt</button>
                    <button onClick={() => setPaymentMethod('Chuyển khoản')} style={{...btnMethodStyle, borderColor: paymentMethod === 'Chuyển khoản' ? '#059669' : '#e2e8f0', background: paymentMethod === 'Chuyển khoản' ? '#f0fdf4' : '#fff'}}><QrCode size={20}/> Chuyển khoản</button>
                </div>

                {paymentMethod === 'Tiền mặt' ? (
                    <div style={{background:'#f8fafc', padding:'20px', borderRadius:'12px'}}>
                        <label style={{ fontSize: '14px', fontWeight: '700', color:'#4b5563', display:'block', marginBottom:'8px' }}>Khách đưa tiền:</label>
                        <input 
                          type="text" value={amountReceived} 
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setAmountReceived(val ? parseInt(val).toLocaleString('vi-VN') : '');
                          }} 
                          style={{ width: '100%', padding: '15px', fontSize: '24px', fontWeight: '900', textAlign: 'right', borderRadius: '10px', border: '2px solid #cbd5e1', outline:'none', boxSizing:'border-box' }} 
                        />
                        <div style={{marginTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          <span style={{fontWeight:'700', color:'#64748b'}}>TIỀN THỪA:</span>
                          <span style={{fontSize:'22px', fontWeight:'900', color:'#059669'}}>{formatMoney(Math.max(0, parseMoney(amountReceived) - totalAmount))}</span>
                        </div>
                    </div>
                ) : (
                    <div style={{textAlign:'center', padding:'20px', background:'#f8fafc', borderRadius:'15px', border:'1px dashed #cbd5e1'}}>
                        <QrCode size={180} style={{margin:'0 auto 15px'}} color="#1e293b"/>
                        <div style={{fontWeight:'800', fontSize:'16px', color:'#1e40af'}}>NGÂN HÀNG MB BANK</div>
                        <div style={{fontSize:'14px', fontWeight:'700', marginTop:'5px'}}>STK: 0912345678 - CTK: KIEN POS</div>
                    </div>
                )}
                <button onClick={handleCompletePayment} style={{ width: '100%', marginTop: '30px', padding: '18px', borderRadius: '12px', border: 'none', background: '#059669', color: 'white', fontWeight: '800', fontSize:'18px', cursor: 'pointer' }}>HOÀN TẤT & LƯU HÓA ĐƠN</button>
            </div>
        </div>
      )}

{/* --- MODAL HÓA ĐƠN (RECEIPT PREVIEW) - CẬP NHẬT MỚI --- */}
{showReceiptModal && (
  <div style={modalOverlayStyle}>
    <div style={{ background: 'white', width: '420px', borderRadius: '20px', padding: '30px', textAlign:'center', boxShadow:'0 10px 25px rgba(0,0,0,0.2)' }}>
      <div style={{background:'#f0fdf4', width:'60px', height:'60px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 15px'}}>
         <CheckCircle size={35} color="#059669"/>
      </div>
      <h2 style={{margin:0, fontSize:'20px', fontWeight:'800'}}>Thanh toán thành công!</h2>
      
      <div id="receipt-content" style={{textAlign:'left', background:'#f8fafc', padding:'25px', borderRadius:'12px', marginTop:'25px', border:'1px dashed #cbd5e1', color:'#1e293b', fontSize:'13px'}}>
          <div style={{textAlign:'center', fontWeight:'900', fontSize:'16px', marginBottom:'5px'}}>HÓA ĐƠN BÁN LẺ</div>
          <div style={{textAlign:'center', fontSize:'11px', color:'#64748b', marginBottom:'20px'}}>Cửa hàng Tiện lợi PTIT Store</div>
          
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
            <span>Mã HĐ: <strong>{lastOrder?.receiptId}</strong></span>
            <span>NV: <strong>{lastOrder?.staffName}</strong></span>
          </div>
          <div style={{marginBottom:'5px'}}>Ngày: {lastOrder?.orderAt}</div>
          <div style={{marginBottom:'15px'}}>Khách hàng: <strong>{lastOrder?.customerName}</strong></div>
          
          <div style={{borderTop:'1px solid #cbd5e1', borderBottom:'1px solid #cbd5e1', padding:'10px 0', margin:'15px 0'}}>
              {lastOrder?.cart.map((i, idx) => (
                <div key={idx} style={{display:'flex', justifyContent:'space-between', marginBottom:'6px'}}>
                  <span style={{flex:1}}>{i.productName} x{i.quantity}</span>
                  <span style={{fontWeight:'700'}}>{formatMoney(i.unitPrice * i.quantity)}</span>
                </div>
              ))}
          </div>

          <div style={{display:'flex', justifyContent:'space-between', fontSize:'16px', fontWeight:'900', marginBottom:'15px'}}>
            <span>TỔNG TIỀN:</span>
            <span>{formatMoney(lastOrder?.totalAmount)}</span>
          </div>

          <div style={{padding:'12px', background:'#fff', borderRadius:'8px', border:'1px solid #e2e8f0'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                <span>PT Thanh toán:</span>
                <span style={{fontWeight:'700'}}>{lastOrder?.paymentMethod}</span>
              </div>
              
              {lastOrder?.paymentMethod === 'Tiền mặt' ? (
                <>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px'}}>
                    <span>Tiền khách đưa:</span>
                    <span style={{fontWeight:'700'}}>{formatMoney(lastOrder?.amountReceived)}</span>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', color:'#059669', fontWeight:'800', fontSize:'14px', borderTop:'1px solid #eee', paddingTop:'5px', marginTop:'5px'}}>
                    <span>Tiền trả lại:</span>
                    <span>{formatMoney(lastOrder?.amountReceived - lastOrder?.totalAmount)}</span>
                  </div>
                </>
              ) : (
                <div style={{display:'flex', justifyContent:'space-between', color:'#1e40af', fontWeight:'800', fontSize:'14px', borderTop:'1px solid #eee', paddingTop:'5px', marginTop:'5px'}}>
                  <span>Đã chuyển khoản:</span>
                  <span>{formatMoney(lastOrder?.totalAmount)}</span>
                </div>
              )}
          </div>
          <div style={{textAlign:'center', marginTop:'20px', fontStyle:'italic', color:'#64748b'}}>Cảm ơn và hẹn gặp lại Quý khách!</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'25px'}}>
        <button onClick={finishAll} style={{padding:'14px', borderRadius:'10px', border:'1px solid #cbd5e1', background:'#fff', fontWeight:'700', cursor:'pointer'}}>
           Đóng
        </button>
        <button onClick={() => {window.print(); finishAll();}} style={{padding:'14px', borderRadius:'10px', border:'none', background:'#059669', color:'#fff', fontWeight:'700', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'}}>
           <Printer size={18}/> In hóa đơn
        </button>
      </div>
    </div>
  </div>
)}

      {/* --- MODAL THÊM KHÁCH MỚI --- */}
      {showAddCustomerModal && (
        <div style={modalOverlayStyle}>
          <div style={{ background: 'white', width: '380px', borderRadius: '20px', padding: '25px' }}>
            <h3 style={{margin:'0 0 20px 0', fontWeight:'800'}}>Thêm khách hàng thân thiết</h3>
            <input type="text" placeholder="Họ và tên *" id="nc_name" style={modalInputStyle}/>
            <input type="text" placeholder="Số điện thoại *" id="nc_phone" style={modalInputStyle}/>
            <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
              <button onClick={()=>setShowAddCustomerModal(false)} style={{flex:1, padding:'12px', borderRadius:'10px', border:'1px solid #ddd', fontWeight:'700'}}>Hủy</button>
              <button onClick={()=>{
                const n = document.getElementById('nc_name').value;
                if(!n) return alert("Vui lòng nhập tên");
                updateActiveOrder({...activeOrder, customerId: Date.now(), customerName: n});
                setShowAddCustomerModal(false);
              }} style={{flex:1, padding:'12px', borderRadius:'10px', background:'#059669', color:'white', border:'none', fontWeight:'700'}}>Lưu & Áp dụng</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- STYLES TỐI ƯU ---
const modalOverlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' };
const qtyBtnStyle = { width: '28px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#4b5563' };
const btnMethodStyle = { flex: 1, padding: '15px', borderRadius: '12px', border: '2px solid', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '800' };
const modalInputStyle = { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '15px', boxSizing:'border-box', outline:'none' };

export default POSScreen;