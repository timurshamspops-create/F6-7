// ============================================================================
//  ДАННЫЕ ЛИГИ F6-7 — редактируйте прямо этот файл.
//
//  Как опубликовать изменения:
//    1. Сохраните файл
//    2. В терминале в папке проекта:
//         git add .
//         git commit -m "обновление данных"
//         git push
//    3. GitHub Actions сам пересоберёт и обновит сайт за 1-2 минуты
//
//  Никакого пароля/входа на сайте нет — редактирование только через этот файл.
// ============================================================================

export const SETTINGS = {
  leagueName: "F6-7",
  season: "Сезон 2026",
  tagline: "Симрейсинг-лига для тех, кто выжимает десятые на пределе сцепления\n(site by tg: @oneofthebestmemolog)",
  // Ссылка на лого на главной странице. "/logo.png" — файл в client/public/logo.png.
  // Можно оставить пустой строкой "" — тогда покажется текст "F6•7".
  heroLogoUrl: "/logo.png",
};

// ---------------------------------------------------------------------------
// КОМАНДЫ
// color — любой HEX-цвет ливреи команды, используется как акцент на карточках.
// ---------------------------------------------------------------------------
export const TEAMS = [
  { id: "t1", name: "Maximum Racing", color: "#983dff", logoUrl: "https://sun9-67.userapi.com/s/v1/ig2/5I0oU0X-oJqzQe6iOYiLBLW0KK4P6Go_flyvU4E07HHuWFRWdwbbaSXdGJwJnreR54ycYWMoFuPK3g6tw08SyS7d.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x161,240x241,360x361,480x482,540x542,640x642,720x722,1080x1084,1280x1284,1440x1445,2047x2054&from=bu&u=idXv2NAXlpmWiTnD4HJCOhDpuaYJfSPVSRUf3swJBBs&cs=640x0", description: "" },
  { id: "t2", name: "Traktoristo Garage", color: "#ffffff", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaGx4EswTUthUR5XSJdm9MxNDKkZEtVMoGaYQB4D94teMDaEwjPVWdJtg&s=10", description: "Черно-белый танкоград" },
  { id: "t3", name: "Rostic's F6-7 team", color: "#FF4D5E", logoUrl: "https://sun9-55.userapi.com/s/v1/ig2/BK61qCXLfL-j5n-QCTBved-MzFk1PItnxYbk6CjTC6nkx1Oug-2aR9zWeCyPe7WDFAc5deLBb6dp8LZMmE06I4hu.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,900x900&from=bu&u=XJKPymuHFVRBormbkCEt4AqKejoXx_FpSzcyltH77Xs&cs=900x0", description: "" },
  { id: "t4", name: "VK racing", color: "#3d81ff", logoUrl: "https://sun9-25.userapi.com/s/v1/ig2/jjjV3oMPVaGzOeasFQ9BgItNWIKOlRnlBiuEJUnazyoM8NWX2JFZRL_Xo2lQCNsfOwFRc_V15DgNlIRy4enEieGT.jpg?quality=95&as=32x33,48x49,72x73,108x110,160x163,240x244,360x366,480x488,540x549,640x650,720x732,1080x1097,1280x1301,1440x1463,2046x2079&from=bu&u=n8xDRe7X7z1_MN0GssY-eB4Na-OKtPTis7IgNy_wNSg&cs=1280x0", description: "" },
  { id: "t5", name: "Ozon Racing", color: "#2600ff", logoUrl: "https://sun9-74.userapi.com/s/v1/ig2/1bR81xiExxiyersuP1g1fMSvueUr_HQcMxzp9mM03Phm3eXK5kxbNDqMbZfzS5wzHsWmffhls1ruT7hFY0og2ipp.jpg?quality=95&as=32x31,48x47,72x70,108x105,160x156,240x234,360x351,480x469,540x527,640x625,720x703,1080x1054,1280x1249,1440x1406,2047x1998&from=bu&u=t_4VCYUMwZTbDEzlE6oJbi2PFKCpiSJ089Fz_tpDWfM&cs=640x0", description: "" },
  { id: "t6", name: "Goshan F67 team", color: "#FFC53D", logoUrl: "https://sun9-18.userapi.com/s/v1/ig2/KjQqnK_KAU86Peip9cswnJhVumFj9yb-Y_DDC8sXkuFykXIa9_XmWpjwujZ5FPHNbjX6haUBoVZAXljdLfj2lxx_.jpg?quality=95&as=32x28,48x41,72x62,108x93,160x138,240x207,360x310,480x413,540x465,640x551,720x620,810x697&from=bu&u=vN_xJct5euadg0nKTpOhqAxf2nD_UwX3iZlORPsxUF0&cs=810x0", description: "" },
  { id: "t7", name: "Viperrr 67 racing", color: "#fffb00", logoUrl: "https://sun9-49.userapi.com/s/v1/ig2/ofqqU_a66DnRaPs4YXzqJI0JmiGZHRY9ELKRnZ4bPiTzTCVegtPpA-XZ8sTj_YTFwMIHlBIRlFcslGPi3lz_Q4da.jpg?quality=95&as=32x30,48x44,72x67,108x100,160x148,240x222,360x333,480x444,540x500,640x592,720x666,830x768&from=bu&u=YjXRo2H_xGmycnUppzjgdd02oKnY76ZrJl-H271SskY&cs=830x0", description: "" },
  { id: "t8", name: "Jagermeister", color: "#0e4700", logoUrl: "https://sun9-44.userapi.com/s/v1/ig2/1gC0zgICPv-Hv10rZlM1wOnC78s7uqt3qzZOA8ndTw3mEiAvoYzsyYdondXsw56fzozaNFq1HDiVF4iwWErpDt24.jpg?quality=95&as=32x33,48x50,72x75,108x113,160x167,240x251,360x376,480x501,540x564,640x668,720x752,1080x1127,1280x1336,1440x1503,2047x2137&from=bu&u=jubYHVlhsA9Tw-xZDCQvbOziG0entzuHxwcdq6xrsIE&cs=1280x0", description: "" },
];

// ---------------------------------------------------------------------------
// ГОНЩИКИ
// teamId должен совпадать с id одной из команд выше.
// photoUrl можно оставить пустым — тогда будет плейсхолдер с инициалами.
// Место в чемпионате и очки считаются автоматически из RACES ниже —
// вручную их указывать не нужно.
// ---------------------------------------------------------------------------
export const DRIVERS = [
  { id: "d1", name: "Иван Глухов", teamId: "t1", number: 33, photoUrl: "https://sun9-37.userapi.com/s/v1/ig2/APwJ3T0VxVoFaRHHbqxwIbhe1XHo4Y7E_j7rJIOl4MFVkCYCiNd8H3m2nVUoHt5AMX0gUB_YLP649_3MmrghqUCc.jpg?quality=95&as=32x26,48x38,72x57,108x86,160x128,240x191,360x287,480x383,540x431,640x510,720x574,1080x861,1253x999&from=bu&u=L5udW1dFWDY-QE2SEGPWHx-DZl29PcZUrhw4Sf-am30&cs=640x0" },
  { id: "d2", name: "Тимур Шамсутдинов", teamId: "t2", number: 74, photoUrl: "https://sun9-87.userapi.com/s/v1/ig2/2-KxZkRv0UO_FsQnzNA3byGXEyHc_47RbfNuOhNObVFfuMZugLNCdsWscl-W4XjhSnFBlRjwRp1EzwMuL7YLXCuK.jpg?quality=95&as=32x24,48x36,72x55,108x82,160x121,240x182,360x273,480x364,540x409,640x485,720x545,1080x818,1237x937&from=bu&u=ZSxFeymhfhMCJEe3wMd4EieY_U1QR5Nkd2B59PtKoSA&cs=640x0" },
  { id: "d3", name: "Тимур Муханов", teamId: "t3", number: 42, photoUrl: "https://sun9-66.userapi.com/s/v1/ig2/3S2DcZtG5lMB6RY942R9zpJwDmLidM0t2ThARcrBPuc_4A7Zxd3qT1zOdGNKP8ztkLIrjsxMjUYFGh2YR2wOqHDt.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,1448x1086&from=bu&u=syy9iiW0JFcavzu9LagCfUlmZ11eyqES8Z8-fo5dhaY&cs=640x0" },
  { id: "d4", name: "Влад Кузнецов", teamId: "t4", number: 67, photoUrl: "https://sun9-55.userapi.com/s/v1/ig2/-tXiu0iXCr1OiFYO16DAwdjGkI9nL7eUW494OKBx_eXNQpB7T1hVbX6oC3xINz8RXZFi7Tc-wIil7VFgwnDavNsN.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,1448x1086&from=bu&u=RmyW89p10mF1Rg9HZrm3UH_FCOq_YMbN2OFuW5HtGEQ&cs=640x0" },
  { id: "d5", name: "Михаил Сарапулов", teamId: "t5", number: 17, photoUrl: "https://sun9-28.userapi.com/s/v1/ig2/24ATKND_HJQ1QXUAQRaBlAGggw2d0fJ_WcJZFDwQUk0PtFGTan3BcWW6TvwQJKgzDMzKQOOKYRH4zd8VuztW0gTs.jpg?quality=95&as=32x23,48x35,72x53,108x79,160x117,240x175,360x263,480x351,540x395,640x468,720x526,1080x789,1280x935,1367x999&from=bu&u=6dRki-DRIfik_8F5im9gX4Ot_-eWCl29F-czvEdMi-k&cs=640x0" },
  { id: "d6", name: "Гошан Зарубин", teamId: "t6", number: 34, photoUrl: "https://sun9-38.userapi.com/s/v1/ig2/zAMrotOO8csYjmmre0rqIdahFxnWeg5ZD2GJPya2_vOAJ-kUbLrI-FzPKRfONWr43lXItJxFuDLqdM2auV3c3klx.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x181,360x271,480x361,540x407,640x482,720x542,1080x813,1280x964,1380x1039&from=bu&u=IvMJ1Oj0_65Kcrg8DaVaksa3Q6KmKsWsyv6TPrKVZ6Q&cs=640x0" },
  { id: "d7", name: "Егор Харченко", teamId: "t7", number: 55, photoUrl: "https://sun9-17.userapi.com/s/v1/ig2/XfD9aJZE5IDPs-XqUXQ6_MaXvFj_QvPylEJTVdOfzgXQaM3PX464-IIwCHzCSuKeb_4Wh-Y97K3qwJuK0fWNXSGt.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960&from=bu&u=5OQ4q7f4KPZHCaGCrXo6PRYtTUE3JcIFQ2N02ZKnTdE&cs=640x0" },
  { id: "d8", name: "Арсений Федотов", teamId: "t8", number: 71, photoUrl: "https://sun9-50.userapi.com/s/v1/ig2/HcYNI_N8AX_I120bUVXs4L850EtzFBij9zosEe2pxwhh11BuAleCnPX0uA5wGlmc1nmnCxeVeO286eKwGu5lUR_Q.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,1448x1086&from=bu&u=nu9FonXEA870IaRZpx1oaTVoHKRQuPD8XlzER3-GzK0&cs=640x0" },
];

// ---------------------------------------------------------------------------
// ГОНКИ
// Чтобы добавить новую гонку — скопируйте один блок { id: ..., ... } целиком,
// вставьте в конец массива (перед закрывающей `];`) и поменяйте:
//   - id на уникальный, например "r7"
//   - name, track, date
//   - results — место (position) и очки (points) каждого участвовавшего гонщика
// ---------------------------------------------------------------------------
export const RACES = [
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
      { driverId: "d8", position: 7, points: 0 },
      { driverId: "d7", position: 8, points: 0 },
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
      { driverId: "d6", position: 7, points: 2 },
      { driverId: "d7", position: 8, points: 1 },
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
      { driverId: "d5", position: 7, points: 0 },
      { driverId: "d8", position: 8, points: 0 },
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
      { driverId: "d8", position: 7, points: 2 },
      { driverId: "d3", position: 8, points: 0 },
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
      { driverId: "d8", position: 7, points: 0 },
      { driverId: "d3", position: 8, points: 0 },
    ],
  },
  {
    id: "r6",
    name: "Раунд 4 — Гран-При Лас Вегаса",
    track: "Las Vegas Strip Circuit",
    date: "2026-05-24",
    results: [
      { driverId: "d1", position: 1, points: 28 },
      { driverId: "d3", position: 2, points: 18 },
      { driverId: "d8", position: 3, points: 19 },
      { driverId: "d7", position: 4, points: 13 },
      { driverId: "d5", position: 5, points: 2 },
      { driverId: "d4", position: 6, points: 0 },
      { driverId: "d2", position: 7, points: 0 },
      { driverId: "d6", position: 8, points: 2 },
    ],
  },
];

// ---------------------------------------------------------------------------
// ССЫЛКИ НА РЕСУРСЫ
// category — просто текст, ссылки с одинаковой категорией группируются вместе.
// ---------------------------------------------------------------------------
export const RESOURCES = [
  { id: "res1", title: "Discord сообщества", url: "https://discord.com", category: "Сообщество", icon: "💬" },
  { id: "res2", title: "Регламент чемпионата", url: "https://drive.google.com/file/d/1IuDlo4kWTbx8YQ1-r4kx6oeDyteNKUZX/view?usp=drive_link", category: "Документы", icon: "📋" },
  { id: "res3", title: "Трансляции гонок", url: "https://twitch.tv/bestmemolog", category: "Трансляции", icon: "📺" },
  { id: "res4", title: "Telegram-канал лиги", url: "https://t.me/Formula67news", category: "Сообщество", icon: "📢" },
  { id: "res5", title: "Tik tok лиги", url: "https://www.tiktok.com/@champignonat_f67?lang=ru-RU", category: "Сообщество", icon: "📱" },
];
