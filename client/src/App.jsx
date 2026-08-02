import React, { useState, useEffect, useMemo } from "react";
import {
  Trophy, Flag, Users, Link2, ChevronDown, ChevronRight, ArrowUp, ArrowDown,
  Minus, Calendar, MapPin, ExternalLink, Car, Hash,
} from "lucide-react";
import { SETTINGS, TEAMS, DRIVERS, RACES, RESOURCES } from "./data.js";

/* ============================== TOKENS ============================== */

const C = {
  bg: "#070707",
  bgGrad: "linear-gradient(180deg,#070707 0%,#0B0B0B 100%)",
  panel: "#131313",
  panel2: "#181818",
  border: "#272727",
  borderSoft: "#1C1C1C",
  amber: "#E10600",
  amberSoft: "rgba(225,6,0,0.14)",
  teal: "#FFFFFF",
  tealSoft: "rgba(255,255,255,0.10)",
  red: "#FF3B3B",
  redSoft: "rgba(255,59,59,0.12)",
  text: "#F5F5F5",
  textMuted: "#9C9C9C",
  textFaint: "#5C5C5C",
};

const avatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "?")}&background=181818&color=E10600&bold=true&size=256&font-size=0.38`;

/* ============================== STANDINGS MATH ============================== */

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
      @media (prefers-reduced-motion: reduce) {
        .f67-anim, .f67-card { animation: none !important; transition: none !important; }
      }
      @media (max-width: 700px) { .f67-grid-2 { grid-template-columns: 1fr !important; } }
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

function PrimaryButton({ children, onClick, icon: Icon, style }) {
  return (
    <button
      onClick={onClick}
      className="f67-btn f67-display"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
        background: C.amber, color: "#FFFFFF", border: "none", borderRadius: 10,
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

function SectionHeading({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {eyebrow && (
        <div className="f67-mono" style={{ color: C.amber, fontSize: 12, letterSpacing: "0.15em", marginBottom: 6 }}>
          {eyebrow}
        </div>
      )}
      <h2 className="f67-display" style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>{title}</h2>
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

/* ============================== TABS ============================== */

function TimingRow({ d }) {
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
      <span className="f67-mono" style={{ fontSize: 18, fontWeight: 700, color: d.position <= 3 ? C.amber : C.textMuted }}>
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

function HomeTab({ standings, races, resources, go, settings }) {
  const top5 = standings.slice(0, 5);
  const lastRace = [...races].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const lastRaceTop3 = lastRace
    ? lastRace.results.slice().sort((a, b) => a.position - b.position).slice(0, 3).map((r) => ({ ...r, driver: standings.find((d) => d.id === r.driverId) }))
    : [];
  return (
    <div className="f67-anim" style={{ display: "flex", flexDirection: "column", gap: 44 }}>
      <div style={{ paddingTop: 12 }}>
        <div className="f67-mono" style={{ color: C.amber, fontSize: 13, letterSpacing: "0.2em", marginBottom: 10 }}>СИМРЕЙСИНГ · ЛИГА</div>
        {settings.heroLogoUrl ? (
          <img
            src={settings.heroLogoUrl}
            alt={settings.leagueName}
            style={{ width: "min(100%, 420px)", height: "auto", display: "block" }}
          />
        ) : (
          <h1 className="f67-display" style={{ fontSize: "clamp(38px,7vw,68px)", fontWeight: 700, lineHeight: 1.02, margin: 0 }}>
            F6<span style={{ color: C.amber }}>•</span>7
          </h1>
        )}
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
          {top5.length === 0 ? <EmptyState text="Пока нет данных" sub="Добавьте гонку в data.js." /> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {top5.map((d) => <TimingRow key={d.id} d={d} />)}
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

function StandingsTab({ standings }) {
  return (
    <div className="f67-anim">
      <SectionHeading eyebrow="ЧЕМПИОНАТ · ГОНЩИКИ" title="Таблица лидеров" />
      {standings.length === 0 ? <EmptyState text="Пока нет очков" sub="Добавьте гонку в data.js." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {standings.map((d) => <TimingRow key={d.id} d={d} />)}
        </div>
      )}
    </div>
  );
}

function DriversTab({ standings, teams }) {
  return (
    <div className="f67-anim">
      <SectionHeading eyebrow="БАЗА ГОНЩИКОВ" title="Гонщики" />
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

function TeamsTab({ teamStandings }) {
  return (
    <div className="f67-anim">
      <SectionHeading eyebrow="КОМАНДЫ" title="Команды" />
      {teamStandings.length === 0 ? <EmptyState text="Команд пока нет" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {teamStandings.map((t) => (
            <div key={t.id} className="f67-card" style={{ background: C.panel, border: `1px solid ${C.border}`, borderTop: `3px solid ${t.color}`, borderRadius: 14, padding: 18 }}>
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

function ResultsTab({ races, standings }) {
  const [openId, setOpenId] = useState(null);
  const sorted = [...races].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="f67-anim">
      <SectionHeading eyebrow="СЕЗОН" title="Результаты гонок" />
      {sorted.length === 0 ? <EmptyState text="Результатов пока нет" sub="Добавьте гонку в data.js." /> : (
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
                  {open ? <ChevronDown size={18} color={C.textMuted} /> : <ChevronRight size={18} color={C.textMuted} />}
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

function ResourcesTab({ resources }) {
  const categories = [...new Set(resources.map((r) => r.category))];
  return (
    <div className="f67-anim">
      <SectionHeading eyebrow="ССЫЛКИ" title="Ресурсы" />
      {resources.length === 0 ? <EmptyState text="Ссылок пока нет" /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {categories.map((cat) => (
            <div key={cat}>
              <div className="f67-mono" style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.1em", marginBottom: 10 }}>{cat.toUpperCase()}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12 }}>
                {resources.filter((r) => r.category === cat).map((r) => (
                  <div key={r.id} className="f67-card" style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                    <a href={r.url} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none", color: C.text }}>
                      <span style={{ fontSize: 20 }}>{r.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</span>
                      <ExternalLink size={13} color={C.textFaint} style={{ flexShrink: 0 }} />
                    </a>
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
  const [tab, setTab] = useState("home");

  const standings = useMemo(() => {
    const base = computeDriverStandings(DRIVERS, RACES);
    return base.map((d) => ({ ...d, _team: TEAMS.find((t) => t.id === d.teamId) }));
  }, []);

  const teamStandings = useMemo(() => computeTeamStandings(TEAMS, standings), [standings]);

  return (
    <div className="f67-root">
      <GlobalStyle />

      {/* NAV */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(10,12,15,0.9)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.borderSoft}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "14px 20px" }}>
          <div className="f67-display" style={{ fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setTab("home")}>
            {SETTINGS.leagueName.replace("-", "•")} <span className="f67-mono" style={{ fontSize: 11, color: C.textMuted, fontWeight: 400 }}>{SETTINGS.season}</span>
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
        {tab === "home" && <HomeTab standings={standings} races={RACES} resources={RESOURCES} go={setTab} settings={SETTINGS} />}
        {tab === "standings" && <StandingsTab standings={standings} />}
        {tab === "drivers" && <DriversTab standings={standings} teams={TEAMS} />}
        {tab === "teams" && <TeamsTab teamStandings={teamStandings} />}
        {tab === "results" && <ResultsTab races={RACES} standings={standings} />}
        {tab === "resources" && <ResourcesTab resources={RESOURCES} />}
      </div>

      <div style={{ borderTop: `1px solid ${C.borderSoft}`, padding: "24px 20px", textAlign: "center", color: C.textFaint, fontSize: 13 }}>
        {SETTINGS.leagueName} · {SETTINGS.season}
      </div>
    </div>
  );
}
