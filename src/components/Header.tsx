import React from 'react'

export default function Header() {
  return (
    <div className="app-header">
      <div className="logo">
        <div style={{width:40,height:40,background:'#ffedd5',borderRadius:999,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <span style={{color:'#ff6933',fontSize:20}}>🍽️</span>
        </div>
        <div>
          <div style={{fontSize:18}}>Hôm Nay Ăn Gì?</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>Spin the wheel — để quyết định bữa trưa</div>
        </div>
      </div>
      <div className="actions">
        <nav style={{display:'flex',gap:12,alignItems:'center'}}>
          <a href="#" style={{color:'#444',textDecoration:'none'}}>Trang chủ</a>
          <a href="#" style={{color:'#444',textDecoration:'none'}}>Lịch sử</a>
          <a href="#" style={{color:'#444',textDecoration:'none'}}>Gợi ý</a>
        </nav>
        <button style={{background:'#ff6933',color:'#fff',border:'none',padding:'8px 14px',borderRadius:999,fontWeight:700}}>Đăng nhập</button>
      </div>
    </div>
  )
}
