const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DATA_FILE = path.join(__dirname, "data.json");
const CONFIG_FILE = path.join(__dirname, "config.json");
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");

/* ---------- default season data (used only the very first time) ---------- */

const SEED = {
  settings: {
    leagueName: "F6-7",
    season: "Сезон 2026",
    tagline: "Симрейсинг-лига для тех, кто выжимает десятые на пределе сцепления",
  },
  teams: [
    { id: "t1", name: "Maximum Racing", color: "#983dff", logoUrl: "", description: "Плевать на очки, главное, чтоб свое целое было" },
    { id: "t2", name: "300 Traktoristo Garage", color: "#000000", logoUrl: "", description: "Черно-белый танкоград" },
    { id: "t3", name: "Rostic's F6-7 team", color: "#FF4D5E", logoUrl: "", description: "Если бы у моего отца была вульва, он был бы моей мамой" },
    { id: "t4", name: "VK racing", color: "#3d81ff", logoUrl: "", description: "а че там делать то" },
    { id: "t5", name: "Ozon Racing", color: "#2600ff", logoUrl: "", description: "Х#й - не нос, назад не шмыгнешь" },
    { id: "t6", name: "Goshan F67 team", color: "#FFC53D", logoUrl: "", description: "Тяжело найти работу мечты, когда твоя мечта не работать" },
    { id: "t7", name: "Viperrr 67 racing", color: "#ffffff", logoUrl: "", description: "нет пузыриков. свинья легла на дно бокала мертвым грузом. жалкое зрелище." },
    { id: "t8", name: "Jagermeister", color: "#0e4700", logoUrl: "", description: "бульк бульк бульк" },
  ],
  drivers: [
    { id: "d1", name: "Иван Глухов", teamId: "t1", number: 33, photoUrl: "" },
    { id: "d2", name: "Тимур Шамсутдинов", teamId: "t2", number: 74, photoUrl: "" },
    { id: "d3", name: "Тимур Муханов", teamId: "t3", number: 42, photoUrl: "" },
    { id: "d4", name: "Влад Кузнецов", teamId: "t4", number: 67, photoUrl: "" },
    { id: "d5", name: "Михаил Сарапулов", teamId: "t5", number: 17, photoUrl: "" },
    { id: "d6", name: "Гошан Зарубин", teamId: "t6", number: 34, photoUrl: "" },
    { id: "d7", name: "Егор Харченко", teamId: "t7", number: 55, photoUrl: "" },
    { id: "d8", name: "Арсений Федотов", teamId: "t8", number: 71, photoUrl: "" },
  ],
  races: [
    {
      id: "r1",
      name: "Раунд 1 — Ночной спринт",
      track: "Сузука",
      date: "2026-03-15",
      results: [
        { driverId: "d1", position: 1, points: 25 },
        { driverId: "d3", position: 2, points: 18 },
        { driverId: "d5", position: 3, points: 15 },
        { driverId: "d2", position: 4, points: 12 },
        { driverId: "d4", position: 5, points: 10 },
        { driverId: "d6", position: 6, points: 8 },
      ],
    },
  ],
  resources: [
    { id: "res1", title: "Discord сообщества", url: "https://discord.com", category: "Сообщество", icon: "💬" },
    { id: "res2", title: "Регламент чемпионата", url: "#", category: "Документы", icon: "📋" },
    { id: "res3", title: "Трансляции гонок", url: "https://twitch.tv", category: "Трансляции", icon: "📺" },
    { id: "res4", title: "Telegram-канал лиги", url: "https://t.me", category: "Сообщество", icon: "📢" },
  ],
};

/* ---------- config (admin password) ---------- */

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    const def = { adminPassword: "F67-2026" };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(def, null, 2));
    console.log("Создан server/config.json с паролем по умолчанию: F67-2026");
    console.log("Смените его, отредактировав этот файл, и перезапустите сервер.");
    return def;
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
}

/* ---------- data storage (plain JSON file) ---------- */

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(SEED, null, 2));
    return structuredClone(SEED);
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    console.error("data.json повреждён, использую данные по умолчанию", e);
    return structuredClone(SEED);
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* ---------- app ---------- */

const app = express();
app.use(express.json({ limit: "5mb" }));

const config = loadConfig();
const sessions = new Set();

function requireAuth(req, res, next) {
  const token = req.headers["x-admin-token"];
  if (token && sessions.has(token)) return next();
  return res.status(401).json({ error: "unauthorized" });
}

app.get("/api/data", (req, res) => {
  res.json(loadData());
});

app.post("/api/login", (req, res) => {
  const { password } = req.body || {};
  if (password && password === config.adminPassword) {
    const token = crypto.randomBytes(24).toString("hex");
    sessions.add(token);
    return res.json({ token });
  }
  res.status(401).json({ error: "invalid password" });
});

app.post("/api/logout", requireAuth, (req, res) => {
  sessions.delete(req.headers["x-admin-token"]);
  res.json({ ok: true });
});

["settings", "teams", "drivers", "races", "resources"].forEach((key) => {
  app.put(`/api/${key}`, requireAuth, (req, res) => {
    const data = loadData();
    data[key] = req.body;
    saveData(data);
    res.json({ ok: true });
  });
});

// serve the built React app
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Клиент ещё не собран. Выполните install.bat, затем start.bat.");
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`F6-7 league сервер запущен: http://localhost:${PORT}`);
});
