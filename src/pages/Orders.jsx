import React from "react";
import { useEffect, useState } from "react";
import api from "../api";

export default function Orders() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // {productId, name, price, qty}
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const [p, o] = await Promise.all([api.get("/products"), api.get("/orders")]);
    // Kiểm tra dữ liệu trả về từ API
    // console.log("Orders từ API:", o.data); 
    setProducts(p.data);
    setOrders(o.data);
  };
  useEffect(()=>{ load(); },[]);

  // const add = (p) => {
  //   console.log("Product được thêm vào giỏ hàng:", p);
  //   const i = cart.findIndex(x=>x.productId===p._id);
  //   if (i>=0) {
  //     const copy = [...cart]; copy[i].qty += 1; setCart(copy);
  //   } else {
  //     setCart([...cart, { productId: p._id, 
  //       name: p.name, 
  //       price: p.price, 
  //       qty: 1 }]);
  //   }
  // };
//   const add = (p) => {
//   // const pid = p._id || p.id;  // check cả 2 trường hợp của _id và id
//   const pid = p.id?.$oid || p._id;
//   console.log("Product được thêm vào giỏ hàng:", p);
//   console.log("Product ID:", p.id);
//   const i = cart.findIndex(x => x.productId === pid);
//   if (i >= 0) {
//     const copy = [...cart]; 
//     copy[i].qty += 1; 
//     setCart(copy);
//   } else {
//     setCart([...cart, { productId: pid, name: p.name, price: p.price, qty: 1 }]);
//   }
// };

const add = (p) => {
  const i = cart.findIndex(x => x.productId === p.id);
  if (i >= 0) {
    const copy = [...cart];
    copy[i].qty += 1;
    setCart(copy);
  } else {
    setCart([...cart, { productId: p.id, name: p.name, price: p.price, qty: 1 }]);
  }
  console.log("Thêm sản phẩm:", p); 
  console.log("ID của sản phẩm:", p.id);
};
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);

  //Hàm tạo Đơn hàng
  //Gửi danh sách sản phẩm trong giỏ hàng đến API để tạo đơn hàng
  const createOrder = async () => {
  if (!cart.length) return;
  const payload = { items: cart.map(i => ({ 
    productId: i.productId, 
    quantity: i.qty })) };
  console.log("Payload gửi:", payload);
  try {
    const res = await api.post("/orders", payload);
    console.log("Order success:", res.data);
    setCart([]);
    await load();
    alert("Created!");
  } catch (e) {
    console.error("Order error:", e.response?.data || e.message);
    alert(e.response?.data?.message || "Error");
  }
};

  const setStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    await load();
  }

  return (
    <div>
      <h2>Create Order</h2>
      <div style={{ display:"flex", gap:24 }}>
        <div style={{ flex:1 }}>
          <h3>Products</h3>
          {/* <ul>
            {products.map(p=>(
              <li key={p._id} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                <span style={{ flex:1 }}>{p.name} (${p.price}) — stock {p.stock}</span>
                <button onClick={()=>add(p)} disabled={p.stock<=0}>Add</button>
              </li>
            ))}
          </ul> */}
          <ul>
          {/* {products.map(p => (
            <li key={p._id} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
              <span style={{ flex:1 }}>{p.name} (${p.price}) — stock {p.stock}</span>
              <button onClick={()=>add(p)} disabled={p.stock<=0}>Add</button>
            </li>
          ))} */}
          {/* {products.map((p, idx) => {
              console.log("Product:", p); //kiểm tra dữ liệu trả về
              return (
                <li key={`${p._id}-${idx}`} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                  <span style={{ flex:1 }}>{p.name} (${p.price}) — stock {p.stock}</span>
                  <button onClick={()=>add(p)} disabled={p.stock<=0}>Add</button>
                </li>
              )
            })} */}
            {products.map((p, idx) => (
              <li key={`${p.id || p._id}-${idx}`} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                <span style={{ flex:1 }}>{p.name} (${p.price}) — stock {p.stock}</span>
                <button onClick={()=>add(p)} disabled={p.stock<=0}>Add</button>
              </li>
            ))}
        </ul>
        </div>
        <div style={{ width:360 }}>
          <h3>Cart</h3>
          {!cart.length && <div>Empty</div>}
          {/* {cart.map((i,idx)=>(
            <div key={idx} style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ flex:1 }}>{i.name}</span>
              <input type="number" min="1" value={i.qty} onChange={e=>{
                const copy=[...cart]; copy[idx].qty=+e.target.value; setCart(copy);
              }} />
              <span>${(i.price*i.qty).toFixed(2)}</span>
            </div>
          ))} */}
          {/* {cart.map((i,idx)=>(
            <div key={i.productId} style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ flex:1 }}>{i.name}</span>
              <input type="number" min="1" value={i.qty} onChange={e=>{
                const copy=[...cart]; copy[idx].qty=+e.target.value; setCart(copy);
              }} />
              <span>${(i.price*i.qty).toFixed(2)}</span>
            </div>
          ))} */}
          {cart.map((i, idx) => (
            <div key={`${i.productId}-${idx}`}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ flex:1 }}>{i.name}</span>
                <input type="number" min="1" value={i.qty} onChange={e => {
                  const copy = [...cart]; copy[idx].qty = +e.target.value; setCart(copy);
                }} />
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}

          <hr />
          <b>Total: ${total.toFixed(2)}</b>
          <div><button onClick={createOrder} disabled={!cart.length}>Create Order</button></div>
        </div>
      </div>

      <hr />
      <h2>Orders</h2>
      <ul>
        {orders.map(o=>(
          // <li key={o._id} style={{ marginBottom:10 }}>
          //Check cả 2 trường hợp của _id và id
          <li key={o.id || o._id} style={{ marginBottom:10 }}>
            <div>
              {/* <b>{o._id}</b> — {o.status} — ${o.total} */}
              <b>{o.id || o._id}</b> — {o.status} — ${o.total}
              <div style={{ display:"inline-flex", gap:6, marginLeft:10 }}>
                <button onClick={()=>setStatus(o.id, "pending")}>pending</button>
                <button onClick={()=>setStatus(o.id, "completed")}>completed</button>
                <button onClick={()=>setStatus(o.id, "cancelled")}>cancelled</button>
              </div>
            </div>
            <ul>
              {console.log("Order items:", o.items)}
              {/* {o.items.map((it, i)=>(
                <li key={i}>{it.name} x {it.quantity} — ${it.price}</li>
              ))} */}
              {/* { o.items.map((it, i) => (
                <li key={it.productId}>{it.name} x {it.quantity} — ${it.price}</li>
              )) } */}
              {/* { o.items.map((it, i) => (
                <li key={`${it.productId}-${i}`}>{it.name} x {it.quantity} — ${it.price}</li>
              )) } */}
              {/* {o.items.map((it, i)=>(
                <li key={it.productId || i}>
                  {it.name} x {it.quantity} — ${it.price}
                </li>
              ))} */}
              {/* {o.items.map(it => (
                <li key={it.productId}>
                  {it.name} x {it.quantity} — ${it.price}
                </li>
              ))} */}
              {/* {o.items.map((it, idx) => (
                <li key={`${it.productId}-${idx}`}>
                  {it.name} x {it.quantity} — ${it.price}
                </li>
              ))} */}
              <div style={{marginTop:6}}>
                <ul>
                  {o.items.map((it, idx)=>(
                    <li key={`${it.productId}-${idx}`}>
                      {it.name} x {it.quantity} — ${it.price}
                    </li>
                  ))}
                </ul>
              </div>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
