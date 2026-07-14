import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Trophy, Flag, Users, Link2, Lock, LogOut, Plus, Pencil, Trash2, X,
  ChevronDown, ChevronRight, Check, Loader2, ArrowUp, ArrowDown, Minus,
  Calendar, MapPin, ExternalLink, Car, Hash,
} from "lucide-react";

/* ============================== TOKENS ============================== */

const C = {
  bg: "#0A0C0F",
  bgGrad: "linear-gradient(180deg,#0A0C0F 0%,#0D1015 100%)",
  panel: "#12161C",
  panel2: "#171C23",
  border: "#232A33",
  borderSoft: "#1B212A",
  amber: "#FFC53D",
  amberSoft: "rgba(255,197,61,0.12)",
  teal: "#3FE0C5",
  tealSoft: "rgba(63,224,197,0.12)",
  red: "#FF4D5E",
  redSoft: "rgba(255,77,94,0.12)",
  text: "#EDEFF3",
  textMuted: "#8B94A3",
  textFaint: "#565F6C",
};

const POINTS_TABLE = { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1 };
const defaultPoints = (pos) => POINTS_TABLE[pos] || 0;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "?")}&background=171C23&color=FFC53D&bold=true&size=256&font-size=0.38`;

/* ============================== SEED DATA ============================== */

const SEED_SETTINGS = {
  leagueName: "F6-7",
  season: "Сезон 2026",
  tagline: "Симрейсинг-лига для тех, кто выжимает десятые на пределе сцепления",
};

const SEED_TEAMS = [
  { id: "t1", name: "Maximum Racing", color: "#983dff", logoUrl: "", description: "Плевать на очки, главное, чтоб свое целое было" },
  { id: "t2", name: "300 Traktoristo Garage", color: "#000000", logoUrl: "", description: "Черно-белый танкоград" },
  { id: "t3", name: "Rostic's F6-7 team", color: "#FF4D5E", logoUrl: "", description: "Если бы у моего отца была вульва, он был бы моей мамой" },
  { id: "t4", name: "VK racing", color: "#3d81ff", logoUrl: "", description: "а че там делать то" },
  { id: "t5", name: "Ozon Racing", color: "#2600ff", logoUrl: "", description: "Х#й - не нос, назад не шмыгнешь" },
  { id: "t6", name: "Goshan F67 team", color: "#FFC53D", logoUrl: "", description: "Тяжело найти работу мечты, когда твоя мечта не работать" },
  { id: "t7", name: "Viperrr 67 racing", color: "#ffffff", logoUrl: "", description: "нет пузыриков. свинья легла на дно бокала мертвым грузом. жалкое зрелище." },
  { id: "t8", name: "Jagermeister", color: "#0e4700", logoUrl: "", description: "бульк бульк бульк" },
];

const SEED_DRIVERS = [
  { id: "d1", name: "Иван Глухов", teamId: "t1", number: 33, photoUrl: "" },
  { id: "d2", name: "Тимур Шамсутдинов", teamId: "t2", number: 74, photoUrl: "" },
  { id: "d3", name: "Тимур Муханов", teamId: "t3", number: 42, photoUrl: "" },
  { id: "d4", name: "Влад Кузнецов", teamId: "t4", number: 67, photoUrl: "" },
  { id: "d5", name: "Михаил Сарапулов", teamId: "t5", number: 17, photoUrl: "" },
  { id: "d6", name: "Гошан Зарубин", teamId: "t6", number: 34, photoUrl: "" },
  { id: "d7", name: "Егор Харченко", teamId: "t7", number: 55, photoUrl: "" },
  { id: "d8", name: "Арсений Федотов", teamId: "t8", number: 71, photoUrl: "" },
];

const SEED_RACES = [
  {
    id: "r1",
    name: "Раунд 1 — Гран-при Сингапура",
    track: "Marina-Bay",
    date: "2026-05-12",
    results: [
      { driverId: "d3", position: 1, points: 25 },
      { driverId: "d2", position: 2, points: 18 },
      { driverId: "d6", position: 3, points: 15 },
      { driverId: "d4", position: 4, points: 12 },
      { driverId: "d1", position: 5, points: 11 },
      { driverId: "d5", position: 6, points: 8 },
      { driverId: "d8", position: 1, points: 0 },
      { driverId: "d7", position: 1, points: 0 },
    ],
  },
    {
    id: "r2",
    name: "Раунд 2 — Спринт Саудовской Аравии",
    track: "Jeddah Corniche Circuit",
    date: "2026-05-14",
    results: [
      { driverId: "d5", position: 1, points: 8 },
      { driverId: "d2", position: 2, points: 7 },
      { driverId: "d4", position: 3, points: 6 },
      { driverId: "d1", position: 4, points: 5 },
      { driverId: "d3", position: 5, points: 4 },
      { driverId: "d8", position: 6, points: 3 },
      { driverId: "d6", position: 1, points: 2 },
      { driverId: "d7", position: 1, points: 1 },
    ],
  },
      {
    id: "r3",
    name: "Раунд 2 — Гран При Саудовской Аравии",
    track: "Jeddah Corniche Circuit",
    date: "2026-05-15",
    results: [
      { driverId: "d2", position: 1, points: 25 },
      { driverId: "d4", position: 2, points: 18 },
      { driverId: "d1", position: 3, points: 15 },
      { driverId: "d3", position: 4, points: 12 },
      { driverId: "d7", position: 5, points: 10 },
      { driverId: "d6", position: 6, points: 8 },
      { driverId: "d5", position: 1, points: 0 },
      { driverId: "d8", position: 1, points: 0 },
    ],
  },
      {
    id: "r4",
    name: "Раунд 3 — Спринт Имолы",
    track: "Autodromo Enzo e Dino Ferrari",
    date: "2026-05-21",
    results: [
      { driverId: "d5", position: 1, points: 8 },
      { driverId: "d1", position: 2, points: 7 },
      { driverId: "d2", position: 3, points: 6 },
      { driverId: "d4", position: 4, points: 5 },
      { driverId: "d6", position: 5, points: 4 },
      { driverId: "d7", position: 6, points: 3 },
      { driverId: "d8", position: 1, points: 2 },
      { driverId: "d3", position: 1, points: 0 },
    ],
  },
        {
    id: "r5",
    name: "Раунд 3 — Гран-При Имолы",
    track: "Autodromo Enzo e Dino Ferrari",
    date: "2026-05-22",
    results: [
      { driverId: "d1", position: 1, points: 25 },
      { driverId: "d2", position: 2, points: 18 },
      { driverId: "d4", position: 3, points: 15 },
      { driverId: "d7", position: 4, points: 12 },
      { driverId: "d5", position: 5, points: 10 },
      { driverId: "d6", position: 6, points: 8 },
      { driverId: "d8", position: 1, points: 0 },
      { driverId: "d3", position: 1, points: 0 },
    ],
  },
          {
    id: "r6",
    name: "Раунд 4 — Гран-При Лас Вегаса",
    track: "Las Vegas Strip Circuit",
    date: "2026-05-22",
    results: [
      { driverId: "d1", position: 1, points: 25 },
      { driverId: "d3", position: 2, points: 18 },
      { driverId: "d8", position: 3, points: 15 },
      { driverId: "d7", position: 4, points: 12 },
      { driverId: "d5", position: 5, points: 0 },
      { driverId: "d4", position: 6, points: 0 },
      { driverId: "d2", position: 1, points: 0 },
      { driverId: "d6", position: 1, points: 0 },
    ],
  },
];

const SEED_RESOURCES = [
  { id: "res1", title: "Discord сообщества", url: "https://discord.com", category: "Сообщество", icon: "💬" },
  { id: "res2", title: "Регламент чемпионата", url: "#", category: "Документы", icon: "📋" },
  { id: "res3", title: "Трансляции гонок", url: "https://twitch.tv", category: "Трансляции", icon: "📺" },
  { id: "res4", title: "Telegram-канал лиги", url: "https://t.me", category: "Сообщество", icon: "📢" },
];

/* ============================== HELPERS ============================== */

function computeDriverStandings(driverList, raceList) {
  const sortedRaces = [...raceList].sort((a, b) => new Date(a.date) - new Date(b.date));
  const totalsAfter = {}, wins = {}, podiums = {};
  driverList.forEach((d) => { totalsAfter[d.id] = 0; wins[d.id] = 0; podiums[d.id] = 0; });
  sortedRaces.forEach((race) => {
    race.results.forEach((r) => {
      totalsAfter[r.driverId] = (totalsAfter[r.driverId] || 0) + (Number(r.points) || 0);
      if (r.position === 1) wins[r.driverId] = (wins[r.driverId] || 0) + 1;
      if (r.position <= 3) podiums[r.driverId] = (podiums[r.driverId] || 0) + 1;
    });
  });
  const beforeLast = { ...totalsAfter };
  if (sortedRaces.length > 0) {
    const last = sortedRaces[sortedRaces.length - 1];
    last.results.forEach((r) => {
      beforeLast[r.driverId] = (beforeLast[r.driverId] || 0) - (Number(r.points) || 0);
    });
  }
  const rankOf = (totals) => {
    const sorted = [...driverList].sort((a, b) => (totals[b.id] || 0) - (totals[a.id] || 0));
    const rank = {};
    sorted.forEach((d, i) => (rank[d.id] = i + 1));
    return rank;
  };
  const rankAfter = rankOf(totalsAfter);
  const rankBefore = rankOf(beforeLast);
  return driverList
    .map((d) => ({
      ...d,
      points: totalsAfter[d.id] || 0,
      wins: wins[d.id] || 0,
      podiums: podiums[d.id] || 0,
      position: rankAfter[d.id],
      delta: sortedRaces.length > 0 ? rankBefore[d.id] - rankAfter[d.id] : 0,
    }))
    .sort((a, b) => a.position - b.position);
}

function computeTeamStandings(teamList, driversWithPoints) {
  return teamList
    .map((t) => {
      const roster = driversWithPoints.filter((d) => d.teamId === t.id);
      const points = roster.reduce((s, d) => s + d.points, 0);
      return { ...t, points, roster };
    })
    .sort((a, b) => b.points - a.points)
    .map((t, i) => ({ ...t, position: i + 1 }));
}

async function apiLoadAll() {
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error("bad response");
    return await res.json();
  } catch (e) {
    console.error("failed to load data from server", e);
    return null;
  }
}

async function apiSave(key, value, token) {
  try {
    const res = await fetch(`/api/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Token": token || "" },
      body: JSON.stringify(value),
    });
    if (!res.ok) throw new Error("save rejected (" + res.status + ")");
  } catch (e) {
    console.error("storage set failed", key, e);
  }
}

async function apiLogin(password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.token;
}

/* ============================== SMALL UI PARTS ============================== */

function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function GlobalStyle() {
  return (
    <style>{`
      .f67-root, .f67-root * { box-sizing: border-box; }
      .f67-root { font-family: 'Inter', sans-serif; background: ${C.bgGrad}; color: ${C.text}; min-height: 100vh; }
      .f67-display { font-family: 'Rajdhani', sans-serif; letter-spacing: 0.01em; }
      .f67-mono { font-family: 'JetBrains Mono', monospace; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      @keyframes f67fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .f67-anim { animation: f67fade 0.5s ease both; }
      .f67-card { transition: border-color 0.2s ease, transform 0.2s ease; }
      .f67-card:hover { border-color: ${C.amber}55; transform: translateY(-2px); }
      .f67-btn { transition: opacity 0.15s ease, transform 0.1s ease; }
      .f67-btn:active { transform: scale(0.97); }
      input, select, textarea { font-family: inherit; }
      @media (prefers-reduced-motion: reduce) {
        .f67-anim, .f67-card { animation: none !important; transition: none !important; }
      }
    `}</style>
  );
}

function Tag({ children, color }) {
  return (
    <span
      className="f67-mono"
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 12, padding: "3px 9px", borderRadius: 999,
        border: `1px solid ${color}55`, color: color, background: `${color}14`,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {children}
    </span>
  );
}

function DeltaBadge({ delta }) {
  if (!delta) return <Minus size={14} color={C.textFaint} />;
  if (delta > 0)
    return (
      <span className="f67-mono" style={{ color: C.teal, display: "flex", alignItems: "center", fontSize: 12 }}>
        <ArrowUp size={13} />{delta}
      </span>
    );
  return (
    <span className="f67-mono" style={{ color: C.red, display: "flex", alignItems: "center", fontSize: 12 }}>
      <ArrowDown size={13} />{Math.abs(delta)}
    </span>
  );
}

function AdminBar({ children }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      {children}
    </div>
  );
}

function IconBtn({ icon: Icon, onClick, color = C.textMuted, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="f67-btn"
      style={{
        width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`,
        background: C.panel2, color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      }}
    >
      <Icon size={15} />
    </button>
  );
}

function PrimaryButton({ children, onClick, icon: Icon, type = "button", style }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="f67-btn f67-display"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
        background: C.amber, color: "#1A1400", border: "none", borderRadius: 10,
        padding: "10px 18px", fontWeight: 700, fontSize: 15, ...style,
      }}
    >
      {Icon && <Icon size={16} />} {children}
    </button>
  );
}

function GhostButton({ children, onClick, icon: Icon, style }) {
  return (
    <button
      onClick={onClick}
      className="f67-btn f67-display"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
        background: "transparent", color: C.text, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "10px 16px", fontWeight: 600, fontSize: 15, ...style,
      }}
    >
      {Icon && <Icon size={16} />} {children}
    </button>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
      <div>
        {eyebrow && (
          <div className="f67-mono" style={{ color: C.amber, fontSize: 12, letterSpacing: "0.15em", marginBottom: 6 }}>
            {eyebrow}
          </div>
        )}
        <h2 className="f67-display" style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function EmptyState({ text, sub }) {
  return (
    <div style={{ border: `1px dashed ${C.border}`, borderRadius: 14, padding: "40px 20px", textAlign: "center", color: C.textMuted }}>
      <p className="f67-display" style={{ fontSize: 18, fontWeight: 600, color: C.text, margin: 0 }}>{text}</p>
      {sub && <p style={{ fontSize: 14, marginTop: 6 }}>{sub}</p>}
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(5,6,8,0.72)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="f67-anim"
        style={{
          background: C.panel, border: `1px solid ${C.border}`, borderRadius: 16,
          width: "100%", maxWidth: wide ? 640 : 460, maxHeight: "88vh", overflowY: "auto",
          padding: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 className="f67-display" style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="f67-mono" style={{ display: "block", fontSize: 12, color: C.textMuted, marginBottom: 6, letterSpacing: "0.04em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: C.panel2, border: `1px solid ${C.border}`, borderRadius: 8,
  padding: "10px 12px", color: C.text, fontSize: 14, outline: "none",
};

function ConfirmDialog({ text, onConfirm, onCancel }) {
  return (
    <Modal title="Подтвердите действие" onClose={onCancel}>
      <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 20 }}>{text}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <GhostButton onClick={onCancel}>Отмена</GhostButton>
        <PrimaryButton onClick={onConfirm} style={{ background: C.red, color: "#fff" }}>Удалить</PrimaryButton>
      </div>
    </Modal>
  );
}

/* ============================== FORMS ============================== */

function DriverForm({ initial, teams, onSave, onClose }) {
  const [name, setName] = useState(initial?.name || "");
  const [teamId, setTeamId] = useState(initial?.teamId || teams[0]?.id || "");
  const [number, setNumber] = useState(initial?.number ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photoUrl || "");
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; onSave({ id: initial?.id || uid(), name: name.trim(), teamId, number: number === "" ? null : Number(number), photoUrl: photoUrl.trim() }); }}>
      <Field label="Имя гонщика"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Иван Петров" required /></Field>
      <Field label="Команда">
        <select style={inputStyle} value={teamId} onChange={(e) => setTeamId(e.target.value)}>
          {teams.length === 0 && <option value="">Сначала добавьте команду</option>}
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </Field>
      <Field label="Номер машины"><input type="number" style={inputStyle} value={number} onChange={(e) => setNumber(e.target.value)} placeholder="42" /></Field>
      <Field label="Ссылка на фото (необязательно)"><input style={inputStyle} value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." /></Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
        <GhostButton onClick={onClose}>Отмена</GhostButton>
        <PrimaryButton type="submit" icon={Check}>Сохранить</PrimaryButton>
      </div>
    </form>
  );
}

function TeamForm({ initial, onSave, onClose }) {
  const [name, setName] = useState(initial?.name || "");
  const [color, setColor] = useState(initial?.color || "#FFC53D");
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl || "");
  const [description, setDescription] = useState(initial?.description || "");
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; onSave({ id: initial?.id || uid(), name: name.trim(), color, logoUrl: logoUrl.trim(), description: description.trim() }); }}>
      <Field label="Название команды"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Apex Motorsport" required /></Field>
      <Field label="Цвет ливреи">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 46, height: 38, background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: 2 }} />
          <input style={inputStyle} value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </Field>
      <Field label="Ссылка на логотип (необязательно)"><input style={inputStyle} value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." /></Field>
      <Field label="Описание"><textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
        <GhostButton onClick={onClose}>Отмена</GhostButton>
        <PrimaryButton type="submit" icon={Check}>Сохранить</PrimaryButton>
      </div>
    </form>
  );
}

function ResourceForm({ initial, categories, onSave, onClose }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [url, setUrl] = useState(initial?.url || "");
  const [category, setCategory] = useState(initial?.category || categories[0] || "Сообщество");
  const [icon, setIcon] = useState(initial?.icon || "🔗");
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!title.trim() || !url.trim()) return; onSave({ id: initial?.id || uid(), title: title.trim(), url: url.trim(), category: category.trim() || "Разное", icon: icon.trim() || "🔗" }); }}>
      <Field label="Название"><input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Discord сообщества" required /></Field>
      <Field label="Ссылка"><input style={inputStyle} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." required /></Field>
      <Field label="Категория">
        <input style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)} list="f67-categories" />
        <datalist id="f67-categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
      </Field>
      <Field label="Иконка (эмодзи)"><input style={inputStyle} value={icon} onChange={(e) => setIcon(e.target.value)} maxLength={4} /></Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
        <GhostButton onClick={onClose}>Отмена</GhostButton>
        <PrimaryButton type="submit" icon={Check}>Сохранить</PrimaryButton>
      </div>
    </form>
  );
}

function SettingsForm({ initial, onSave, onClose }) {
  const [leagueName, setLeagueName] = useState(initial.leagueName);
  const [season, setSeason] = useState(initial.season);
  const [tagline, setTagline] = useState(initial.tagline);
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ leagueName: leagueName.trim(), season: season.trim(), tagline: tagline.trim() }); }}>
      <Field label="Название лиги"><input style={inputStyle} value={leagueName} onChange={(e) => setLeagueName(e.target.value)} required /></Field>
      <Field label="Сезон"><input style={inputStyle} value={season} onChange={(e) => setSeason(e.target.value)} /></Field>
      <Field label="Слоган"><textarea style={{ ...inputStyle, minHeight: 70 }} value={tagline} onChange={(e) => setTagline(e.target.value)} /></Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
        <GhostButton onClick={onClose}>Отмена</GhostButton>
        <PrimaryButton type="submit" icon={Check}>Сохранить</PrimaryButton>
      </div>
    </form>
  );
}

function RaceForm({ initial, drivers, onSave, onClose }) {
  const [name, setName] = useState(initial?.name || "");
  const [track, setTrack] = useState(initial?.track || "");
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [rows, setRows] = useState(initial?.results?.length ? initial.results : [{ driverId: "", position: 1, points: defaultPoints(1) }]);

  const updateRow = (i, patch) => setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const addRow = () => setRows((rs) => [...rs, { driverId: "", position: rs.length + 1, points: defaultPoints(rs.length + 1) }]);
  const removeRow = (i) => setRows((rs) => rs.filter((_, idx) => idx !== i));

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !track.trim()) return;
    const seen = new Set();
    const results = rows
      .filter((r) => r.driverId && !seen.has(r.driverId) && seen.add(r.driverId))
      .map((r) => ({ driverId: r.driverId, position: Number(r.position) || 0, points: Number(r.points) || 0 }))
      .sort((a, b) => a.position - b.position);
    if (results.length === 0) return;
    onSave({ id: initial?.id || uid(), name: name.trim(), track: track.trim(), date, results });
  };

  return (
    <form onSubmit={submit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Название гонки"><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Раунд 2 — Дождевая лотерея" required /></Field>
        <Field label="Трасса"><input style={inputStyle} value={track} onChange={(e) => setTrack(e.target.value)} placeholder="Нюрбургринг" required /></Field>
      </div>
      <Field label="Дата"><input type="date" style={{ ...inputStyle, maxWidth: 200 }} value={date} onChange={(e) => setDate(e.target.value)} /></Field>

      <div className="f67-mono" style={{ fontSize: 12, color: C.textMuted, margin: "16px 0 8px", letterSpacing: "0.04em" }}>
        КЛАССИФИКАЦИЯ ГОНКИ
      </div>
      {drivers.length === 0 ? (
        <EmptyState text="Нет гонщиков" sub="Сначала добавьте гонщиков во вкладке «Гонщики»." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 1fr 90px 32px", gap: 8, alignItems: "center" }}>
              <input
                type="number" min={1} style={inputStyle} value={row.position}
                onChange={(e) => { const pos = Number(e.target.value); updateRow(i, { position: pos, points: defaultPoints(pos) }); }}
              />
              <select style={inputStyle} value={row.driverId} onChange={(e) => updateRow(i, { driverId: e.target.value })}>
                <option value="">Выберите гонщика</option>
                {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <input type="number" style={inputStyle} value={row.points} onChange={(e) => updateRow(i, { points: e.target.value })} />
              <button type="button" onClick={() => removeRow(i)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer" }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <GhostButton onClick={addRow} icon={Plus} style={{ alignSelf: "flex-start", padding: "8px 14px", fontSize: 13 }}>Добавить строку</GhostButton>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
        <GhostButton onClick={onClose}>Отмена</GhostButton>
        <PrimaryButton type="submit" icon={Check}>Опубликовать</PrimaryButton>
      </div>
    </form>
  );
}

function LoginModal({ onClose, onSuccess }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const token = await apiLogin(pwd);
    setBusy(false);
    if (token) onSuccess(token);
    else setError(true);
  };
  return (
    <Modal title="Вход администратора" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Пароль">
          <input type="password" autoFocus style={inputStyle} value={pwd} onChange={(e) => { setPwd(e.target.value); setError(false); }} />
        </Field>
        {error && <p style={{ color: C.red, fontSize: 13, marginTop: -8, marginBottom: 12 }}>Неверный пароль</p>}
        <p style={{ color: C.textFaint, fontSize: 12, lineHeight: 1.5, marginBottom: 16 }}>
          Пароль проверяется на сервере. Задать или сменить его можно в файле <code>server/config.json</code>.
        </p>
        <PrimaryButton type="submit" icon={Lock} style={{ width: "100%", justifyContent: "center" }}>
          {busy ? "Проверка..." : "Войти"}
        </PrimaryButton>
      </form>
    </Modal>
  );
}

/* ============================== TABS ============================== */

function TimingRow({ d, rank }) {
  const team = d._team;
  return (
    <div
      className="f67-card"
      style={{
        display: "grid", gridTemplateColumns: "40px 44px 1fr auto auto", gap: 12, alignItems: "center",
        background: C.panel2, border: `1px solid ${C.borderSoft}`, borderLeft: `3px solid ${team?.color || C.border}`,
        borderRadius: 10, padding: "10px 14px",
      }}
    >
      <span className="f67-mono" style={{ fontSize: 18, fontWeight: 700, color: rank <= 3 ? C.amber : C.textMuted }}>
        {String(d.position).padStart(2, "0")}
      </span>
      <img src={d.photoUrl || avatarUrl(d.name)} alt={d.name} style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", border: `1px solid ${C.border}` }} />
      <div>
        <div className="f67-display" style={{ fontWeight: 600, fontSize: 15 }}>{d.name}</div>
        <div style={{ fontSize: 12, color: C.textMuted }}>{team?.name || "Без команды"}</div>
      </div>
      <DeltaBadge delta={d.delta} />
      <span className="f67-mono" style={{ fontWeight: 700, fontSize: 16, color: C.text, minWidth: 44, textAlign: "right" }}>{d.points}</span>
    </div>
  );
}

function HomeTab({ standings, teams, races, resources, go, settings }) {
  const top5 = standings.slice(0, 5);
  const lastRace = [...races].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const lastRaceTop3 = lastRace
    ? lastRace.results.slice().sort((a, b) => a.position - b.position).slice(0, 3).map((r) => ({ ...r, driver: standings.find((d) => d.id === r.driverId) }))
    : [];
  return (
    <div className="f67-anim" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
      <div style={{ paddingTop: 12 }}>
        <div className="f67-mono" style={{ color: C.amber, fontSize: 13, letterSpacing: "0.2em", marginBottom: 10 }}>СИМРЕЙСИНГ · ЛИГА</div>
        <h1 className="f67-display" style={{ fontSize: "clamp(38px,7vw,68px)", fontWeight: 700, lineHeight: 1.02, margin: 0 }}>
          F6<span style={{ color: C.amber }}>•</span>7
        </h1>
        <p style={{ maxWidth: 520, color: C.textMuted, fontSize: 16, marginTop: 14, lineHeight: 1.6 }}>
          {settings.tagline}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          <PrimaryButton icon={Trophy} onClick={() => go("standings")}>Таблица лидеров</PrimaryButton>
          <GhostButton icon={Flag} onClick={() => go("results")}>Результаты гонок</GhostButton>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: 20 }} className="f67-grid-2">
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span className="f67-mono" style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.1em" }}>ЛИДЕРЫ ЧЕМПИОНАТА</span>
            <button onClick={() => go("standings")} className="f67-mono" style={{ background: "none", border: "none", color: C.amber, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              Полная таблица <ChevronRight size={14} />
            </button>
          </div>
          {top5.length === 0 ? <EmptyState text="Пока нет данных" sub="Опубликуйте первую гонку." /> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {top5.map((d) => <TimingRow key={d.id} d={d} rank={d.position} />)}
            </div>
          )}
        </div>

        <div>
          <span className="f67-mono" style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.1em" }}>ПОСЛЕДНЯЯ ГОНКА</span>
          {!lastRace ? (
            <div style={{ marginTop: 12 }}><EmptyState text="Гонок ещё не было" /></div>
          ) : (
            <div style={{ marginTop: 12, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18 }}>
              <div className="f67-display" style={{ fontWeight: 700, fontSize: 18 }}>{lastRace.name}</div>
              <div style={{ display: "flex", gap: 14, color: C.textMuted, fontSize: 13, marginTop: 4, marginBottom: 14 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} />{lastRace.track}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={13} />{lastRace.date}</span>
              </div>
              {lastRaceTop3.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.borderSoft}` : "none" }}>
                  <span style={{ fontSize: 14 }}><span className="f67-mono" style={{ color: C.amber, marginRight: 8 }}>P{r.position}</span>{r.driver?.name || "—"}</span>
                  <span className="f67-mono" style={{ fontSize: 13, color: C.textMuted }}>+{r.points}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <span className="f67-mono" style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.1em" }}>БЫСТРЫЕ ССЫЛКИ</span>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
          {resources.slice(0, 4).map((r) => (
            <a key={r.id} href={r.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: C.text, display: "flex", alignItems: "center", gap: 8, background: C.panel2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "9px 14px", fontSize: 14 }}>
              <span>{r.icon}</span>{r.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function StandingsTab({ standings, isAdmin }) {
  return (
    <div className="f67-anim">
      <SectionHeading eyebrow="ЧЕМПИОНАТ · ГОНЩИКИ" title="Таблица лидеров" />
      {standings.length === 0 ? <EmptyState text="Пока нет очков" sub="Опубликуйте результаты гонки, чтобы увидеть таблицу." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {standings.map((d) => <TimingRow key={d.id} d={d} rank={d.position} />)}
        </div>
      )}
    </div>
  );
}

function DriversTab({ standings, teams, isAdmin, onAdd, onEdit, onDelete }) {
  return (
    <div className="f67-anim">
      <SectionHeading
        eyebrow="БАЗА ГОНЩИКОВ" title="Гонщики"
        action={isAdmin && <PrimaryButton icon={Plus} onClick={onAdd}>Добавить гонщика</PrimaryButton>}
      />
      {standings.length === 0 ? <EmptyState text="Гонщиков пока нет" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
          {standings.map((d) => {
            const team = teams.find((t) => t.id === d.teamId);
            return (
              <div key={d.id} className="f67-card" style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ position: "relative" }}>
                  <img src={d.photoUrl || avatarUrl(d.name)} alt={d.name} style={{ width: "100%", height: 160, objectFit: "cover", display: "block", borderBottom: `2px solid ${team?.color || C.border}` }} />
                  <span className="f67-mono" style={{ position: "absolute", top: 10, left: 10, background: "rgba(10,12,15,0.85)", color: C.amber, fontWeight: 700, fontSize: 13, padding: "3px 9px", borderRadius: 999 }}>
                    P{d.position}
                  </span>
                  {d.number != null && (
                    <span className="f67-mono" style={{ position: "absolute", top: 10, right: 10, background: "rgba(10,12,15,0.85)", color: C.text, fontWeight: 700, fontSize: 13, padding: "3px 9px", borderRadius: 999 }}>
                      #{d.number}
                    </span>
                  )}
                  {isAdmin && (
                    <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 6 }}>
                      <IconBtn icon={Pencil} onClick={() => onEdit(d)} title="Изменить" />
                      <IconBtn icon={Trash2} color={C.red} onClick={() => onDelete(d)} title="Удалить" />
                    </div>
                  )}
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div className="f67-display" style={{ fontWeight: 700, fontSize: 17 }}>{d.name}</div>
                  {team && <div style={{ marginTop: 6 }}><Tag color={team.color}>{team.name}</Tag></div>}
                  <div className="f67-mono" style={{ marginTop: 10, fontSize: 13, color: C.textMuted, display: "flex", justifyContent: "space-between" }}>
                    <span>{d.points} очк.</span><span>{d.wins} побед</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TeamsTab({ teamStandings, isAdmin, onAdd, onEdit, onDelete }) {
  return (
    <div className="f67-anim">
      <SectionHeading
        eyebrow="КОМАНДЫ" title="Команды"
        action={isAdmin && <PrimaryButton icon={Plus} onClick={onAdd}>Добавить команду</PrimaryButton>}
      />
      {teamStandings.length === 0 ? <EmptyState text="Команд пока нет" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {teamStandings.map((t) => (
            <div key={t.id} className="f67-card" style={{ background: C.panel, border: `1px solid ${C.border}`, borderTop: `3px solid ${t.color}`, borderRadius: 14, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {t.logoUrl ? (
                    <img src={t.logoUrl} alt={t.name} style={{ width: 42, height: 42, borderRadius: 10, objectFit: "cover" }} />
                  ) : (
                    <div className="f67-display" style={{ width: 42, height: 42, borderRadius: 10, background: `${t.color}22`, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                      {t.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="f67-display" style={{ fontWeight: 700, fontSize: 17 }}>{t.name}</div>
                    <div className="f67-mono" style={{ fontSize: 12, color: C.textMuted }}>Место {t.position} · {t.points} очк.</div>
                  </div>
                </div>
                {isAdmin && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <IconBtn icon={Pencil} onClick={() => onEdit(t)} title="Изменить" />
                    <IconBtn icon={Trash2} color={C.red} onClick={() => onDelete(t)} title="Удалить" />
                  </div>
                )}
              </div>
              {t.description && <p style={{ fontSize: 13, color: C.textMuted, marginTop: 12, lineHeight: 1.5 }}>{t.description}</p>}
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                {t.roster.length === 0 ? (
                  <span style={{ fontSize: 13, color: C.textFaint }}>Нет гонщиков в составе</span>
                ) : t.roster.map((d) => (
                  <div key={d.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderTop: `1px solid ${C.borderSoft}`, paddingTop: 6 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {d.number != null && <span className="f67-mono" style={{ color: t.color }}>#{d.number}</span>}{d.name}
                    </span>
                    <span className="f67-mono" style={{ color: C.textMuted }}>{d.points} очк.</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultsTab({ races, standings, isAdmin, onAdd, onEdit, onDelete }) {
  const [openId, setOpenId] = useState(null);
  const sorted = [...races].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="f67-anim">
      <SectionHeading
        eyebrow="СЕЗОН" title="Результаты гонок"
        action={isAdmin && <PrimaryButton icon={Plus} onClick={onAdd}>Добавить гонку</PrimaryButton>}
      />
      {sorted.length === 0 ? <EmptyState text="Результатов пока нет" sub="Опубликуйте результаты первой гонки." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map((race) => {
            const results = [...race.results].sort((a, b) => a.position - b.position);
            const winner = standings.find((d) => d.id === results[0]?.driverId);
            const open = openId === race.id;
            return (
              <div key={race.id} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div
                  onClick={() => setOpenId(open ? null : race.id)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", cursor: "pointer", gap: 12, flexWrap: "wrap" }}
                >
                  <div>
                    <div className="f67-display" style={{ fontWeight: 700, fontSize: 17 }}>{race.name}</div>
                    <div style={{ display: "flex", gap: 14, color: C.textMuted, fontSize: 13, marginTop: 4 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} />{race.track}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={13} />{race.date}</span>
                      {winner && <span style={{ display: "flex", alignItems: "center", gap: 4, color: C.amber }}><Trophy size={13} />{winner.name}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {isAdmin && (
                      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
                        <IconBtn icon={Pencil} onClick={() => onEdit(race)} title="Изменить" />
                        <IconBtn icon={Trash2} color={C.red} onClick={() => onDelete(race)} title="Удалить" />
                      </div>
                    )}
                    {open ? <ChevronDown size={18} color={C.textMuted} /> : <ChevronRight size={18} color={C.textMuted} />}
                  </div>
                </div>
                {open && (
                  <div style={{ borderTop: `1px solid ${C.borderSoft}`, padding: "6px 18px 16px" }}>
                    {results.map((r) => {
                      const driver = standings.find((d) => d.id === r.driverId);
                      return (
                        <div key={r.driverId} style={{ display: "grid", gridTemplateColumns: "34px 1fr auto", gap: 10, alignItems: "center", padding: "8px 0", borderTop: `1px solid ${C.borderSoft}` }}>
                          <span className="f67-mono" style={{ color: r.position <= 3 ? C.amber : C.textMuted, fontWeight: 700 }}>P{r.position}</span>
                          <span style={{ fontSize: 14 }}>{driver?.name || "Гонщик удалён"}</span>
                          <span className="f67-mono" style={{ color: C.textMuted, fontSize: 13 }}>+{r.points} очк.</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ResourcesTab({ resources, isAdmin, onAdd, onEdit, onDelete }) {
  const categories = [...new Set(resources.map((r) => r.category))];
  return (
    <div className="f67-anim">
      <SectionHeading
        eyebrow="ССЫЛКИ" title="Ресурсы"
        action={isAdmin && <PrimaryButton icon={Plus} onClick={onAdd}>Добавить ссылку</PrimaryButton>}
      />
      {resources.length === 0 ? <EmptyState text="Ссылок пока нет" /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {categories.map((cat) => (
            <div key={cat}>
              <div className="f67-mono" style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.1em", marginBottom: 10 }}>{cat.toUpperCase()}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12 }}>
                {resources.filter((r) => r.category === cat).map((r) => (
                  <div key={r.id} className="f67-card" style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <a href={r.url} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none", color: C.text, flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 20 }}>{r.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</span>
                      <ExternalLink size={13} color={C.textFaint} style={{ flexShrink: 0 }} />
                    </a>
                    {isAdmin && (
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <IconBtn icon={Pencil} onClick={() => onEdit(r)} title="Изменить" />
                        <IconBtn icon={Trash2} color={C.red} onClick={() => onDelete(r)} title="Удалить" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================== APP ============================== */

const TABS = [
  { id: "home", label: "Главная", icon: Hash },
  { id: "results", label: "Результаты", icon: Flag },
  { id: "standings", label: "Таблица лидеров", icon: Trophy },
  { id: "drivers", label: "Гонщики", icon: Users },
  { id: "teams", label: "Команды", icon: Car },
  { id: "resources", label: "Ресурсы", icon: Link2 },
];

export default function App() {
  useFonts();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("home");

  const [settings, setSettings] = useState(SEED_SETTINGS);
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [races, setRaces] = useState([]);
  const [resources, setResources] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [modal, setModal] = useState(null); // { type, data }
  const [confirmTarget, setConfirmTarget] = useState(null); // { kind, item }
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await apiLoadAll();
      if (!data) { setServerError(true); setLoading(false); return; }
      setSettings(data.settings || SEED_SETTINGS);
      setTeams(data.teams || []);
      setDrivers(data.drivers || []);
      setRaces(data.races || []);
      setResources(data.resources || []);
      setLoading(false);
    })();
  }, []);

  const standings = useMemo(() => {
    const base = computeDriverStandings(drivers, races);
    return base.map((d) => ({ ...d, _team: teams.find((t) => t.id === d.teamId) }));
  }, [drivers, races, teams]);

  const teamStandings = useMemo(() => computeTeamStandings(teams, standings), [teams, standings]);

  const persist = {
    teams: (v) => { setTeams(v); apiSave("teams", v, adminToken); },
    drivers: (v) => { setDrivers(v); apiSave("drivers", v, adminToken); },
    races: (v) => { setRaces(v); apiSave("races", v, adminToken); },
    resources: (v) => { setResources(v); apiSave("resources", v, adminToken); },
    settings: (v) => { setSettings(v); apiSave("settings", v, adminToken); },
  };

  const upsert = (list, item) => {
    const exists = list.some((x) => x.id === item.id);
    return exists ? list.map((x) => (x.id === item.id ? item : x)) : [...list, item];
  };

  const closeModal = () => setModal(null);

  const handleDelete = () => {
    const { kind, item } = confirmTarget;
    if (kind === "driver") persist.drivers(drivers.filter((d) => d.id !== item.id));
    if (kind === "team") persist.teams(teams.filter((t) => t.id !== item.id));
    if (kind === "race") persist.races(races.filter((r) => r.id !== item.id));
    if (kind === "resource") persist.resources(resources.filter((r) => r.id !== item.id));
    setConfirmTarget(null);
  };

  if (loading) {
    return (
      <div className="f67-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <GlobalStyle />
        <Loader2 className="f67-anim" size={28} color={C.amber} style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (serverError) {
    return (
      <div className="f67-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 20 }}>
        <GlobalStyle />
        <div style={{ textAlign: "center", maxWidth: 380 }}>
          <p className="f67-display" style={{ fontSize: 20, fontWeight: 700 }}>Не удалось связаться с сервером</p>
          <p style={{ color: C.textMuted, fontSize: 14, marginTop: 8 }}>Проверьте, что server-процесс запущен (npm start в папке server), и обновите страницу.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="f67-root">
      <GlobalStyle />

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(10,12,15,0.9)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.borderSoft}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="f67-display" style={{ fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setTab("home")}>
              {settings.leagueName.replace("-", "•")} <span className="f67-mono" style={{ fontSize: 11, color: C.textMuted, fontWeight: 400 }}>{settings.season}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isAdmin ? (
                <AdminBar>
                  <Tag color={C.teal}>Админ</Tag>
                  <IconBtn icon={Pencil} onClick={() => setModal({ type: "settings" })} title="Настройки лиги" />
                  <IconBtn icon={LogOut} onClick={() => { fetch("/api/logout", { method: "POST", headers: { "X-Admin-Token": adminToken || "" } }); setIsAdmin(false); setAdminToken(null); }} title="Выйти" />
                </AdminBar>
              ) : (
                <GhostButton icon={Lock} onClick={() => setShowLogin(true)} style={{ padding: "8px 14px", fontSize: 13 }}>Вход</GhostButton>
              )}
            </div>
          </div>
          <div className="no-scrollbar" style={{ display: "flex", gap: 6, marginTop: 14, overflowX: "auto" }}>
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="f67-display f67-btn"
                  style={{
                    display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap", cursor: "pointer",
                    background: active ? C.amberSoft : "transparent", color: active ? C.amber : C.textMuted,
                    border: `1px solid ${active ? C.amber + "55" : "transparent"}`, borderRadius: 8, padding: "7px 13px", fontSize: 14, fontWeight: 600,
                  }}
                >
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px 80px" }}>
        {tab === "home" && <HomeTab standings={standings} teams={teams} races={races} resources={resources} go={setTab} settings={settings} />}
        {tab === "standings" && <StandingsTab standings={standings} isAdmin={isAdmin} />}
        {tab === "drivers" && (
          <DriversTab
            standings={standings} teams={teams} isAdmin={isAdmin}
            onAdd={() => setModal({ type: "driver" })}
            onEdit={(d) => setModal({ type: "driver", data: d })}
            onDelete={(d) => setConfirmTarget({ kind: "driver", item: d })}
          />
        )}
        {tab === "teams" && (
          <TeamsTab
            teamStandings={teamStandings} isAdmin={isAdmin}
            onAdd={() => setModal({ type: "team" })}
            onEdit={(t) => setModal({ type: "team", data: t })}
            onDelete={(t) => setConfirmTarget({ kind: "team", item: t })}
          />
        )}
        {tab === "results" && (
          <ResultsTab
            races={races} standings={standings} isAdmin={isAdmin}
            onAdd={() => setModal({ type: "race" })}
            onEdit={(r) => setModal({ type: "race", data: r })}
            onDelete={(r) => setConfirmTarget({ kind: "race", item: r })}
          />
        )}
        {tab === "resources" && (
          <ResourcesTab
            resources={resources} isAdmin={isAdmin}
            onAdd={() => setModal({ type: "resource" })}
            onEdit={(r) => setModal({ type: "resource", data: r })}
            onDelete={(r) => setConfirmTarget({ kind: "resource", item: r })}
          />
        )}
      </div>

      <div style={{ borderTop: `1px solid ${C.borderSoft}`, padding: "24px 20px", textAlign: "center", color: C.textFaint, fontSize: 13 }}>
        {settings.leagueName} · {settings.season}
      </div>

      {/* MODALS */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={(token) => { setAdminToken(token); setIsAdmin(true); setShowLogin(false); }} />}

      {modal?.type === "driver" && (
        <Modal title={modal.data ? "Изменить гонщика" : "Добавить гонщика"} onClose={closeModal}>
          <DriverForm initial={modal.data} teams={teams} onClose={closeModal} onSave={(item) => { persist.drivers(upsert(drivers, item)); closeModal(); }} />
        </Modal>
      )}
      {modal?.type === "team" && (
        <Modal title={modal.data ? "Изменить команду" : "Добавить команду"} onClose={closeModal}>
          <TeamForm initial={modal.data} onClose={closeModal} onSave={(item) => { persist.teams(upsert(teams, item)); closeModal(); }} />
        </Modal>
      )}
      {modal?.type === "race" && (
        <Modal title={modal.data ? "Изменить гонку" : "Добавить гонку"} onClose={closeModal} wide>
          <RaceForm initial={modal.data} drivers={drivers} onClose={closeModal} onSave={(item) => { persist.races(upsert(races, item)); closeModal(); }} />
        </Modal>
      )}
      {modal?.type === "resource" && (
        <Modal title={modal.data ? "Изменить ссылку" : "Добавить ссылку"} onClose={closeModal}>
          <ResourceForm initial={modal.data} categories={[...new Set(resources.map((r) => r.category))]} onClose={closeModal} onSave={(item) => { persist.resources(upsert(resources, item)); closeModal(); }} />
        </Modal>
      )}
      {modal?.type === "settings" && (
        <Modal title="Настройки лиги" onClose={closeModal}>
          <SettingsForm initial={settings} onClose={closeModal} onSave={(v) => { persist.settings(v); closeModal(); }} />
        </Modal>
      )}

      {confirmTarget && (
        <ConfirmDialog
          text={`Удалить «${confirmTarget.item.name || confirmTarget.item.title}»? Это действие нельзя отменить.`}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 700px) { .f67-grid-2 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
