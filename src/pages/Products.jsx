import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import { uploadImage } from "../cloudinary";

export default function Products() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:"", description:"", price:0, stock:0, imageUrl:"" });

  const load = async () => {
    const { data } = await api.get("/products");
    setItems(data);
  };
  useEffect(()=>{ load(); },[]);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await uploadImage(f);
    setForm({ ...form, imageUrl: url });
  };

  const submit = async (e) => {
    e.preventDefault();
    const body = { ...form, price: +form.price, stock: +form.stock };
    if (editing) await api.put(`/products/${editing}`, body);
    else await api.post("/products", body);
    setForm({ name:"", description:"", price:0, stock:0, imageUrl:"" });
    setEditing(null);
    await load();
  };

  const edit = (p) => {
    setEditing(p.id || p._id);
    setForm({ name:p.name, description:p.description||"", price:p.price, stock:p.stock, imageUrl:p.imageUrl||"" });
  };

  const del = async (id) => {
    if (!confirm("Xoá sản phẩm?")) return;
    await api.delete(`/products/${id}`);
    await load();
  };

  return (
    <div>
      <h2>Sản phẩm</h2>

      <form onSubmit={submit} style={{ display:"grid", gap:8, maxWidth: 560 }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} required />
        <input type="file" accept="image/*" onChange={onFile} />
        {form.imageUrl && <img src={form.imageUrl} alt="" style={{ width:120 }} />}
        <button type="submit">{editing ? "Update" : "Create"}</button>
        {editing && <button type="button" onClick={()=>{setEditing(null); setForm({ name:"", description:"", price:0, stock:0, imageUrl:"" });}}>Hủy</button>}
      </form>

      <hr />
      <ul>
        {items.map(p=>(
          <li key={p._id} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0" }}>
            {p.imageUrl && <img src={p.imageUrl} width={60} />}
            <div style={{ flex:1 }}>
              <b>{p.name}</b> — ${p.price} — stock: {p.stock}
            </div>
            <button onClick={()=>edit(p)}>Chỉnh sửa</button>
            <button onClick={()=>del(p._id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
