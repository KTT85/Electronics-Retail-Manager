import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Barcode } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const mockProducts = [
  { id: 1, name: 'Coca Cola', price: 10000, img: '🥤' },
  { id: 2, name: 'Snack Oshi', price: 5000, img: '🥔' },
  { id: 3, name: 'Mì ly Omachi', price: 12000, img: '🍜' },
  { id: 4, name: 'Nước suối Aquafina', price: 5000, img: '💧' },
];

const POSScreen = () => {
  const { cart, addToCart, clearCart } = useCartStore();
  const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);

  return (
    <div className="pos-container">
      <header className="pos-header">
        <div style={{display:'flex', alignItems:'center', gap:15}}>
          <h2>Màn hình Thu Ngân</h2>
          <div style={{background:'white', borderRadius:20, padding:'4px 15px', display:'flex', alignItems:'center', gap:8}}>
            <Search size={14} color="#666"/><input type="text" placeholder="Tìm (F3)..." style={{border:'none', outline:'none', fontSize:13}}/>
          </div>
        </div>
        <Link to="/" style={{color:'white', textDecoration:'none', display:'flex', alignItems:'center', gap:5}}><Home size={18}/> Về Quản lý</Link>
      </header>

      <div className="pos-split-screen">
        <div className="cart-section">
          <h3>GIỎ HÀNG</h3>
          <div className="activity-list">
            {cart.map(item => (
              <div key={item.id} className="activity-item">
                <p>{item.name} x {item.quantity}</p>
                <span className="act-time">{(item.price * item.quantity).toLocaleString()} ₫</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:'auto', paddingTop:15, borderTop:'2px solid #0e9f6e'}}>
            <h2 style={{marginBottom:10}}>Tổng: {total.toLocaleString()} ₫</h2>
            <button className="refresh-btn" style={{width:'100%', padding:15, fontSize:16}} onClick={() => {alert('Xong!'); clearCart();}}>THANH TOÁN (F9)</button>
          </div>
        </div>

        <div className="products-section">
          <input type="text" placeholder="Quét mã vạch..." className="pos-input" style={{width:'100%', borderRadius:25, padding:12, marginBottom:15, border:'none'}}/>
          <div className="products-grid">
            {mockProducts.map(p => (
              <div key={p.id} className="product-card" onClick={() => addToCart(p)}>
                <span style={{fontSize:40}}>{p.img}</span>
                <p style={{fontWeight:600, fontSize:13, margin:'5px 0'}}>{p.name}</p>
                <p style={{color:'#0e9f6e', fontWeight:800}}>{p.price.toLocaleString()} ₫</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default POSScreen;