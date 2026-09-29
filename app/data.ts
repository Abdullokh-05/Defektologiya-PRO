export const contacts = {
  telegram: "https://t.me/Nilufar_Abdumajitovna1", // footer: Nilufar's own Telegram
  manager: "https://t.me/rivoj_admin", // "Menejerga Telegramda yozish" buttons
  telegramHandle: "@Nilufar_Abdumajitovna1",
  instagram: "https://instagram.com/nilufar_abdumajitovna",
  instagramHandle: "@nilufar_abdumajitovna",
  youtube: "https://www.youtube.com/@nilufar_abdumajitovnaa",
  youtubeHandle: "@nilufar_abdumajitovnaa",
  rivojInstagram: "https://www.instagram.com/rivoj_incenter/",
  phone: "+998974604442",
  phoneDisplay: "+998 97 460 44 42",
};

// Tashkent time (UTC+5). Sale prices apply until SALE_END; enrolment closes at ENROL_END.
export const SALE_END = new Date("2026-10-01T00:00:00+05:00").getTime();
export const ENROL_END = new Date("2026-10-05T00:00:00+05:00").getTime();

// Start-date sentence for the form; enrolment closes the moment the course starts.
export const startNote = (now: number) =>
  now < ENROL_END
    ? "Kurs 05.10 da boshlanadi."
    : "Kurs 05.10 da boshlandi — administrator qatnashish imkoniyati haqida maʼlumot beradi.";

export type Format = "onlayn" | "oflayn" | "individual";

export const tiers: {
  id: Format;
  label: string;
  price: string;
  fullPrice: string;
  note: string;
  cta: string;
  featured?: boolean;
}[] = [
  {
    id: "onlayn",
    label: "Onlayn",
    price: "2 200 000",
    fullPrice: "2 600 000",
    note: "Menta platformasi · haftalik kurator · shanba Zoom · Telegram guruh · sertifikat",
    cta: "Onlayn qatnashish",
  },
  {
    id: "oflayn",
    label: "Oflayn · 20 kishilik guruh",
    price: "6 000 000",
    fullPrice: "6 600 000",
    note: "Haftasiga 2 kun: nazariya + amaliyot, jonli ishlash. Imtihondan oʻtganlar «Rivoj» markazida ishga qabul qilinadi",
    cta: "Oflayn guruhga yozilish",
    featured: true,
  },
  {
    id: "individual",
    label: "Individual mentorlik 1:1",
    price: "12 000 000",
    fullPrice: "14 400 000",
    note: "Nilufar Abdumajitovna bilan shaxsan",
    cta: "Mentorlikka yozilish",
  },
];

export const facts = [
  { value: "8 modul", label: "toʻliq taʼlim dasturi" },
  { value: "05.10–30.11", label: "8 hafta davomiyligi" },
  { value: "05.12", label: "sertifikat topshirish" },
  { value: "700+", label: "tayyorlangan mutaxassis" },
];

export const audience = [
  {
    title: "Defektolog, logoped",
    text: "Amaliyotda yangi va samarali metodikalarni qoʻllash, murakkab holatlarda aniq diagnostika qilish va nutq chiqarish koʻnikmalarini oshirish uchun.",
  },
  {
    title: "Maxsus pedagog, inklyuziv taʼlim mutaxassislari va talabalar",
    text: "Maxsus ehtiyojli bolalar bilan ishlashning zamonaviy ilmiy-amaliy asoslarini chuqur oʻrganish va professional tajribani shakllantirish uchun.",
  },
  {
    title: "Psixolog",
    text: "Bolalar rivojlanishidagi buzilishlar, neyropsixologik yondashuv va kognitiv sohani korreksiya qilish boʻyicha integrativ bilimlarni egallash uchun.",
  },
  {
    title: "Farzandi bilan mustaqil ishlamoqchi boʻlgan onalar",
    text: "Oʻz farzandining rivojlanish darajasini toʻgʻri tushunish, uy sharoitida tizimli va ilmiy asoslangan mashgʻulotlarni toʻgʻri tashkil etish uchun.",
  },
];

export const bio = [
  "16 yillik amaliyotchi defektolog-logoped",
  "«Rivoj» integrativ rivojlanish markazi asoschisi va rahbari",
  "700 dan ortiq mutaxassisni tayyorlagan, 1000 dan ortiq bolaga amaliy yordam bergan",
  "«Diagnostika», «Nutq chiqarish», «Dispraksiya», «Defektologiya», «Dislaliya» kurslari muallifi",
];

export const why = [
  {
    title: "Keng qamrovli yondashuv",
    text: "Kursdan soʻng bolaning kognitiv sohasidan tortib nutqi va sensor integratsiyasigacha boʻlgan korreksion ishlarni oʻzingiz mustaqil olib bora olasiz.",
  },
  {
    title: "Tashxislarni chuqur tushunish",
    text: "Autizm, ZPRR, ZRR, ZPMR, F-tashxislar, Daun sindromi, dizartriya, alaliya kabi holatlarda bolaning muammosini tushunib, qadam-baqadam toʻgʻri korreksion ishni olib bora olasiz.",
  },
  {
    title: "Tizimli diagnostika koʻnikmasi",
    text: "Maxsus probalar asosida bolani diagnostika qilishni tizimli oʻrganasiz — defektologik, neyropsixologik, sensor va logopedik diagnostika oʻtkaza olasiz.",
  },
  {
    title: "Klinik chuqurlik va amaliy usullar",
    text: "Psixiatr darslari orqali tashxisli bolalarning klinik holatlarini oʻrganasiz; ABA yondashuvda hamkorlik oʻrnatish, PECS kartochkalarini qoʻllash, kommunikatsiya va taqlidni rivojlantirish usullarini egallaysiz.",
  },
];

// Plain-language meaning of the clinical abbreviations used on the page (wording to be confirmed by the client).
export const glossary: [string, string][] = [
  ["ZPR", "ruhiy rivojlanishning kechikishi"],
  ["ZPRR", "ruhiy-nutqiy rivojlanishning kechikishi"],
  ["ZRR", "nutq rivojlanishining kechikishi"],
  ["ZPMR", "psixomotor rivojlanishning kechikishi"],
  ["RAS", "autizm spektri buzilishi"],
  ["SDVG", "diqqat yetishmasligi va giperaktivlik sindromi"],
  ["F-tashxislar", "MKB-10 dagi F boʻlimi — ruhiy va xulq-atvor buzilishlari"],
];

export const introModule =["Ustoz haqida", "Kursdan foyda olish uchun nimalarga amal qilish kerak", "Kurs modullari haqida"];

export const formats = [
  {
    name: "Onlayn",
    badge: "Masofaviy",
    steps: [
      "Darslar «Menta» platformasida joylashadi",
      "Har shanba yangi modul ochiladi",
      "Hafta davomida kurator nazorati",
      "Shanba kuni Zoom orqali jonli efir",
      "Savollar Telegram orqali beriladi",
      "Joriy modul topshirigʻini bajarish keyingi modulni ochadi",
    ],
  },
  {
    name: "Oflayn",
    badge: "Jonli amaliyot",
    steps: [
      "Haftada 2 kun nazariy dars",
      "Haftada 2 kun amaliy dars",
      "Onlayn platformaga kirish huquqi",
      "Diagnostikalarda ishtirok etish",
      "Amaliyotni oʻz qoʻlingiz bilan bajarish imkoniyati",
      "Darslik qoʻllanmalari",
      "Kursdan keyin qoʻllab-quvvatlash",
    ],
    highlight: "Yaxshi oʻqib, imtihondan oʻtganlar «Rivoj» markazida ishga qabul qilinadi",
  },
];

export const certificates = [
  { name: "Oltin", text: "aʼlo darajada tugatganlarga", color: "#D9B45A" },
  { name: "Kumush", text: "oʻrta darajada tugatganlarga", color: "#C4C8CC" },
  { name: "Bronza", text: "qoniqarli darajada tugatganlarga", color: "#B87A4B" },
];

// Graduate reviews, transliterated to Latin script from Telegram messages.
//   text — the short excerpt shown on the card (sentences taken from the review itself)
//   full — the whole review, kept for later use (e.g. a reviews page)
//   name — reviews without a name are kept here but NOT shown until a name is added
//   role — saved but not shown yet; switch it on in Graduates.tsx once every review has one
export const graduates: { name?: string; role?: string; text: string; full: string }[] = [
  {
    name: "Kasimova Siyosatxon",
    role: "Andijon",
    text: "Bu kurs men uchun judayam manfaatli va yangi bilimlarga boy boʻldi. Hamma mavzularni oʻzingiz hijjalab, erinmasdan, jonli tarzda tushuntirib berdingiz, bizga ham koʻp-koʻp savol-javob qilib, izlanishga undadingiz.",
    full: "Bu kurs men uchun judayam manfaatli va yangi bilimlarga boy boʻldi. Izlanuvchanligingiz va bilimlaringizni qizgʻanmasdan, hammasini soatlab berganingiz uchun sizga cheksiz hurmatdaman. Menga eng muhimi shu boʻldiki, hamma mavzularni oʻzingiz hijjalab, erinmasdan, jonli tarzda tushuntirib berdingiz, bizga ham koʻp-koʻp savol-javob qilib, izlanishga undadingiz — mavzularni zoʻr oʻzlashtirishimizga shu sabab boʻldi deb oʻylayman. Ustoz, ilmu ziyo tarqatishdan hech ham charchamang. Hamisha biz shogirdlaringiz baxtiga sogʻ-omon boʻling.",
  },
  {
    name: "Nurmuhammedova Gulchehra",
    role: "«Defektologik diagnostika» kursi",
    text: "Bu 4 kun davomida bir narsani yanada chuqur his qildim: ustozimiz Nilufar Abdumajitovnaning har bir darsi ortida koʻp yillik izlanish, tinimsiz mehnat va 16 yillik boy tajriba mujassam ekan.",
    full: "Iyul oyida «Rivoj» defektologlar akademiyasining 4 kunlik oflayn «Defektologik diagnostika» intensiv kursida qatnashdim. Bu 4 kun davomida bir narsani yanada chuqur his qildim: ustozimiz Nilufar Abdumajitovnaning har bir darsi ortida koʻp yillik izlanish, tinimsiz mehnat, oʻz ustida ishlash, yangilikka intilish va 16 yillik boy tajriba mujassam ekan. Dars davomida koʻrgan har bir slayd, har bir metodika, har bir maʼlumot ortida katta mehnat, yuzlab kitoblar, tarjimalar, ulkan sarmoya, uyqusiz tunlar va ilmga boʻlgan cheksiz muhabbat yotganini his qildim.",
  },
  {
    name: "Begoyim Botirjonova",
    text: "Sizga shogird boʻlib hech qachon adashmaganman — har doim qoʻllab-quvvatlab, toʻgʻri yoʻl koʻrsatib kelayotganingiz uchun Alloh sizdan rozi boʻlsin! Siz nafaqat bilim, ham motivatsiya, ham ruhiy kuch-madad beruvchi haqiqiy Motivatorimizsiz.",
    full: "Ustoz, bergan bebaho bilimingiz, sabringiz va qalbingizning bir parchasini bagʻishlaganingiz uchun tashakkur. Sizga shogird boʻlib hech qachon adashmaganman — har doim qoʻllab-quvvatlab, toʻgʻri yoʻl koʻrsatib kelayotganingiz uchun Alloh sizdan rozi boʻlsin! Bugungi seminar juda yuqori saviyada oʻtdi. Taklifingiz va bildirgan ishonchingiz bugungi mehmoningiz sifatida qatnashish menga nafaqat cheksiz quvonch, balki zimmamda qanchalik katta masʼuliyat borligini ham yanada teranroq his qildirdi. Siz nafaqat bilim, ham motivatsiya, ham ruhiy kuch-madad beruvchi haqiqiy Motivatorimizsiz. Imkonsizday tuyulgan marralarga ishonch bagʻishlagan Yoʻlboshchimizsiz! Bergan bebaho saboqlaringiz va cheksiz energiyangiz uchun tashakkur! Borligingizga shukur, ustozim!",
  },
  {
    name: "Abduraimova Marguba",
    role: "Shogirdlik kursi",
    text: "Bergan maʼlumot va yangi bilimlaringiz judayam tushunarli, aniq va toʻliq boʻldi. Bu sohadan xabari yoʻq, sohadan uzoq boʻlganlar ham bemalol tushunib, oʻrganadigan qilib yetkazib berdingiz.",
    full: "Assalomu alaykum, Nilufar opajon. Alhamdulillah, Shogirdlik kursimizni chiroyli boshlab, chiroyli yakunladik. Bu kurs shu guruhdagi barchaga juda manfaatli va foydali boʻldi deb oʻylayman. Bergan maʼlumot va yangi bilimlaringiz judayam tushunarli, aniq va toʻliq boʻldi. Har bir maʼlumot oʻz oʻrnida, ketma-ket va keng yoritilgan. Bu sohadan xabari yoʻq, sohadan uzoq boʻlganlar ham bemalol tushunib, oʻrganadigan qilib yetkazib berdingiz. Bu kursni qayta-qayta oʻqishni, siz bilan koʻrishib bilim olishni xohlardim. 2 kunlik oflayn darslarimiz judayam zoʻr boʻldi. Erinmasdan, vaqt ajratib farzandlarimizni ham oʻzingiz tekshirib berganingiz uchun kattadan katta tashakkur. Ustoz, bergan bilimlaringizga rozi boʻling va bizni oʻzingizdan ham oʻtadigan shogird boʻlishimiz uchun duo qiling. Sizni Alloh uchun yaxshi koʻraman — ham ustoz, ham opa, ham doʻst, yaqin inson sifatida koʻnglimda qoldingiz. Alloh ilmingizni ziyoda qilsin.",
  },
  {
    role: "«Diagnostika» va «Nutq chiqarish» kurslari",
    text: "«Diagnostika» va «Nutq chiqarish» kurslaringizda oʻqib, judayam koʻp yangiliklar, yangi maʼlumotlarga ega boʻldim. Bu kursni hammaga oʻqishni tavsiya etaman — afsuslanmaysiz.",
    full: "Assalomu alaykum, Nilufar. Sizga kattakon rahmat aytmoqchi edim, bergan bilimlaringizga rozi boʻling. Judayam biz uchun yangi maʼlumotlar berdingiz. «Diagnostika» va «Nutq chiqarish» kurslaringizda oʻqib, judayam koʻp yangiliklar, yangi maʼlumotlarga ega boʻldim. Siz berayotgan bu maʼlumotlar bizning kasbimizda muhim ahamiyatga ega. Bu kursni hammaga oʻqishni tavsiya etaman. Afsuslanmaysiz va ishlaringizni yanada mustahkamlash uchun zamin yaratgan boʻlasiz. Nilufar, sizga kattakon rahmat, ilm ulashishdan charchamang, hamma oʻylagan niyatlaringizga yeting. Yana koʻp-koʻp kurslaringizda oʻqish nasib qilsin. Alloh rozi boʻlsin. Sogʻ-salomat boʻling, bolajonlarga shifo ulashishdan charchamang.",
  },
  {
    role: "Shogirdlik kursi",
    text: "Nilufarxon, sizga kattakon rahmat, ancha maʼlumotlar oldik. Juda chiroyli kutib oldingiz, zoʻr tashkillashtiribsiz — hech qayerda bunaqa ehtiromni koʻrmaganman.",
    full: "Nilufarxon, sizga kattakon rahmat, ancha maʼlumotlar oldik. Juda chiroyli kutib oldingiz, zoʻr tashkillashtiribsiz, mehmon qildingiz — hech qayerda bunaqa ehtiromni koʻrmaganman. Sherik qizlaringizga ham rahmat, ayam ham rosa duo qildi yana. «Judayam samimiy qiz ekan», dedi. Bergan bilimlaringizdan rozi boʻling.",
  },
  {
    text: "Sizdan olgan har bir bilimim kasbiy faoliyatimda yanada yuksalishimga xizmat qiladi. Sizning mehnatsevarligingiz, samimiyligingiz va oʻz kasbingizga boʻlgan mehringiz biz, shogirdlar uchun haqiqiy namunadir.",
    full: "Aziz ustozim Nilufar Abdumajitovna! Sizga qalbimning eng samimiy minnatdorchiligini bildiraman. Meni qoʻllab-quvvatlab, oʻz bilim va tajribangiz bilan boʻlishganingiz uchun cheksiz rahmat. Sizdan olgan har bir bilimim kasbiy faoliyatimda yanada yuksalishimga xizmat qiladi. Sizning mehnatsevarligingiz, samimiyligingiz va oʻz kasbingizga boʻlgan mehringiz biz, shogirdlar uchun haqiqiy namunadir. Alloh taolo ilmingizni yanada ziyoda qilsin, mehnatingizga baraka ato etsin, umringizni uzun va mazmunli qilsin. Doimo sogʻ-salomat boʻlib, yana koʻplab shogirdlarga ilm ulashish nasib etsin. Barcha mehnatlaringiz uchun katta rahmat, aziz ustozim! Alloh sizdan rozi boʻlsin.",
  },
  {
    text: "Shogirdlaringiz soni yanada koʻpaysin va ular orqali minglab bolalarga manfaat yetsin. «Rivoj» defektologlar akademiyasi darslarida yana va yana qatnashish bizga nasib etsin.",
    full: "Alloh taolo ilmingizni yanada ziyoda qilsin, martabangizni baland etsin, mehnatingizni barakali qilsin. Shogirdlaringiz soni yanada koʻpaysin va ular orqali minglab bolalarga manfaat yetsin. «Rivoj» defektologlar akademiyasi darslarida yana va yana qatnashish bizga nasib etsin. Shuningdek, «Rivoj» integrativ markazining filiallari yurtimizning barcha viloyatlarida ochilib, yanada koʻplab oilalar va mutaxassislarga manfaat keltirishini tilayman. Katta rahmat, aziz ustozimiz! Alloh sizdan rozi boʻlsin!",
  },
];

// Titles and lessons from the current course programme; outcomes to be confirmed by the client.
export const modules = [
  {
    title: "Rivojlanish normasi",
    outcome: "Xotira, diqqat, idrok va tafakkurni bosqichma-bosqich rivojlantirishni oʻrganasiz",
    lessons: [
      "Bola qaysi sohalarda rivojlanadi?",
      "Intellekt nima? Intellektni rivojlanish konsepsiyasi",
      "Kognitiv soha komponentlari: xotira, diqqat, idrok va ularni rivojlantirish usullari",
      "Tafakkur turlari. Aqliy operatsiyalarni rivojlantirish ketma-ketligi",
      "Amaliyot — mashgʻulotlar razborlari",
    ],
  },
  {
    title: "Muhim koʻnikmalar",
    outcome: "Taqlid, oʻyin va motivatsiyani ABA yondashuvi bilan shakllantirasiz",
    lessons: [
      "Taqlid faoliyati",
      "Oʻyin faoliyati — turlari; bola nega oʻynamaydi va uni qanday oʻrgatish mumkin",
      "Motivatsiya turlari va bolada motivatsiyani aniqlash",
      "Amaliyot — bolada taqlidni rivojlantirish usullari (ABA yondashuv)",
      "Amaliyot — motivatsiyani aniqlash va u orqali taʼsir oʻtkazish (ABA yondashuv)",
    ],
  },
  {
    title: "Nutq sohasi — logopediya",
    outcome: "Impressiv va ekspressiv nutq hamda kommunikatsiya qanday rivojlanishini tushunasiz",
    lessons: [
      "Nutq komponentlari. Impressiv nutqning rivojlanishi va darajalari",
      "Ekspressiv nutqning rivojlanish ontogenezi",
      "Kommunikatsiyaning rivojlanish ontogenezi",
      "Leksik material tanlashda nimalarga eʼtibor berish kerak — YRZ va ARZ",
      "Tekis-yassi tasvirni idrok qilishga oʻrgatish usullari",
    ],
  },
  {
    title: "Diagnostika",
    outcome: "Kognitiv, nutq, hissiy va motor sohalarni mustaqil diagnostika qilasiz",
    lessons: [
      "Kognitiv sohani diagnostika qilish — amaliyot",
      "Impressiv va ekspressiv nutqni diagnostika qilish (2 dars)",
      "Hissiy-emotsional sohani tekshirish — amaliy keys",
      "Motor sohani diagnostika qilish",
      "Real diagnostika amaliyoti — oʻquvchilar muammoni mustaqil aniqlaydi",
    ],
  },
  {
    title: "Klinik asoslar",
    outcome: "Psixiatr darslari orqali ZPR, RAS va SDVG farqini koʻrib, differensial diagnostika qilasiz",
    lessons: [
      "ZPR tashxis turlari, MKB, DSM-5. Bolaning klinik portreti — psixiatr nimani koʻradi",
      "Autizm, RAS va spektr buzilishi haqida, bu bolalarning klinik portreti",
      "ZPR – RAS – SDVG: farq va oʻxshashliklar",
      "Differensial diagnostika. Zamonaviy skrining testlar",
      "Amaliyot — keys razbor, differensial diagnostika",
    ],
  },
  {
    title: "Nutqni rivojlantirish",
    outcome: "Alaliya, dizartriya va boshqa holatlarda nutq chiqarish ketma-ketligini egallaysiz",
    lessons: [
      "Nolinchi darajadan nominativ darajagacha — amaliyot",
      "Nominativ daraja — artikulyatsion dispraksiya metodikalari asosida",
      "Intellektida muammosi boʻlgan bolalarda nutq chiqarish ketma-ketligi",
      "Alaliya bilan ishlash ketma-ketligi",
      "Nutqiy-eshituv agneziyasida ishlash ketma-ketligi",
      "Dizartriyada ish ketma-ketligi — logopedik massaj",
    ],
  },
  {
    title: "RAS bolalar bilan ishlash",
    outcome: "Hamkor diqqat, kommunikatsiya va PECS bilan tizimli ishlaysiz",
    lessons: [
      "Hamkor diqqatni rivojlantirish",
      "Kommunikatsiyani rivojlantirish",
      "ADK — PECS oʻrgatish ketma-ketligi",
      "RAS bolalarga kompleks yondashuv",
      "ABA yondashuv haqida",
    ],
  },
  {
    title: "Sensor integratsiya",
    outcome: "Sensor profil tuzib, ota-onalarga uy uchun mashqlar dasturini berasiz",
    lessons: [
      "Sensor integratsiya nima?",
      "Sensor diyeta va sensor profil",
      "Gipersezuvchan bolalar bilan ishlashda nimalarga eʼtibor berish kerak",
      "Giposezuvchan bolalar bilan ishlashda nimalarga eʼtibor berish kerak",
      "Amaliy keyslar — ota-onalarga uy sharoitida beriladigan mashqlar",
    ],
  },
];

export const faq: [string, string][] = [
  ["Darslar qaysi platformada oʻtiladi?", "Menta platformasida. Har shanba yangi modul ochiladi, darslarni hafta davomida istalgan vaqtda koʻrishingiz mumkin."],
  ["Jonli darslar bormi?", "Ha — har shanba Zoom orqali jonli efir boʻladi. Efir yozib olinadi, ulana olmasangiz keyin koʻrasiz."],
  ["Modulni oʻz vaqtida tugatolmasam-chi?", "Keyingi modul oldingi modul topshirigʻi bajarilgach ochiladi. Kurator hafta davomida yordam beradi."],
  ["Talaba yoki ona sifatida qatnasha olamanmi?", "Ha. Kurs defektolog, logoped, maxsus pedagog, psixolog, talabalar va farzandi bilan oʻzi shugʻullanmoqchi boʻlgan onalar uchun."],
  ["Internet boʻlmasa yoki darsga ulana olmasam nima boʻladi?", "Barcha darslar platformada yozib qolinadi, shuning uchun qulay vaqtingizda koʻrishingiz mumkin. Shanba kungi Zoom efiri ham yozib olinadi."],
  ["Oflayn guruhda necha kishi boʻladi?", "Oflayn guruh 20 oʻquvchidan iborat. Oʻrinlar cheklangan."],
  ["Kurs tugagach materiallar qoladimi?", "Ha, kurs yakunida ham platformadagi materiallarga kirish imkoniyati saqlanib qoladi."],
  ["Sertifikat qanday beriladi?", "Natijaga qarab Oltin, Kumush yoki Bronza sertifikat. Tantanali marosim — 05.12, sertifikatni Nilufar Abdumajitovna shaxsan topshiradi."],
  ["Toʻlov qanday amalga oshiriladi?", "Ariza qoldirasiz, administrator siz bilan bogʻlanib, toʻlov tafsilotlarini yuboradi."],
];
