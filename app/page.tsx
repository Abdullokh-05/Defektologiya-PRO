import Image from "next/image";
import heroBg from "@/public/images/hero-bg.webp";
import heroCutout from "@/public/images/hero-cutout.webp";
import aboutPhoto from "@/public/images/nilufar-about.jpg";
import {
  audience,
  bio,
  certificates,
  contacts,
  facts,
  faq,
  formats,
  glossary,
  introModule,
  modules,
  why,
} from "./data";
import CourseForm, { StartNote } from "./components/CourseForm";
import Faq from "./components/Faq";
import Graduates from "./components/Graduates";
import { Countdown, Tiers } from "./components/Prices";
import VideoButton from "./components/VideoButton";

// Presentation video: YouTube embed URL or .mp4. The play button is hidden while empty.
const VIDEO_URL = "";

export default function Page() {
  // Render time for the sale/enrolment countdowns; the browser takes over after hydration.
  const serverNow = Date.now();

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero">
          <p className="hero-kicker">
            Mutaxassislar va onalar uchun
            <br />8 haftalik amaliy dastur
          </p>
          <h1 className="hero-word">
            DEFEKTOLOGIYA<span className="sr-only"> PRO</span>
          </h1>
          <div className="hero-stage">
            {/* Depth: arch photo behind the letters, matching cut-out in front of them */}
            <div className="hero-arch">
              <Image src={heroBg} alt="" className="hero-layer" priority sizes="400px" />
            </div>
            <span className="hero-pro" aria-hidden="true">
              PRO
            </span>
            <Image src={heroCutout} alt="Nilufar Abdumajitovna" className="hero-layer hero-cutout" priority sizes="400px" />
            {VIDEO_URL && <VideoButton videoUrl={VIDEO_URL} />}
          </div>
          <p className="hero-lead">
            Qanday qilib 8 haftada bolani toʻgʻri tashxislash va natijali korreksion ish olib borishni oʻrganish mumkin
          </p>
          <a href="#narx" className="btn btn-gold">
            Kursga qoʻshilish
          </a>
        </section>

        {/* FACTS */}
        <section className="facts" aria-label="Kurs haqida qisqacha">
          <dl className="facts-grid wrap-wide">
            {facts.map((f) => (
              <div className="fact" key={f.value}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* LETTER */}
        <section className="letter" aria-label="Dastur maqsadi">
          <div className="letter-card">
            <div className="stamp">
              <p>Har bir bola rivojlanishi mumkin — unga faqat toʻgʻri yoʻlni koʻrsatadigan mutaxassis kerak…</p>
              <p>Defektologiya PRO — sizni ana shunday mutaxassisga aylantiruvchi dastur</p>
            </div>
          </div>
          <div className="letter-tag" aria-hidden="true">
            <div className="letter-band" />
            <div className="seal" />
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="audience">
          <div className="wrap-wide">
            <h2 className="display">KURS KIMLAR UCHUN?</h2>
            <div className="card-grid">
              {audience.map((a, i) => (
                <article className="num-card" key={a.title}>
                  <span className="num-card-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="num-card-title">{a.title}</h3>
                  <p className="num-card-text">{a.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about">
          <div className="about-grid wrap-wide">
            <div className="about-photo">
              <Image src={aboutPhoto} alt="Israilova Nilufar Abdumajitovna" placeholder="blur" sizes="(min-width: 760px) 400px, 300px" />
            </div>
            <div className="about-body">
              <span className="kicker">USTOZ</span>
              <h2 className="about-name">Israilova Nilufar Abdumajitovna</h2>
              <p className="about-titles">Defektolog · Logoped · Neyropsixolog</p>
              <ul className="about-list">
                {bio.map((b) => (
                  <li key={b}>
                    {/* single span so the text wraps under the link, not beside it */}
                    <span>
                      {b.startsWith("«Rivoj»") ? (
                        <>
                          <a href={contacts.rivojInstagram} target="_blank" rel="noopener noreferrer">
                            «Rivoj»
                          </a>
                          {b.slice("«Rivoj»".length)}
                        </>
                      ) : (
                        b
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="why">
          <div className="wrap-wide">
            <h2 className="display">
              NEGA AYNAN <span className="gold">SHU KURS?</span>
            </h2>
            <div className="card-grid">
              {why.map((w, i) => (
                <article className="num-card" key={w.title}>
                  <span className="num-card-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="num-card-title">{w.title}</h3>
                  <p className="num-card-text">{w.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INNER VOICE — leather band */}
        <section className="voice">
          <p className="script inner-voice">
            Ichingizdagi ovoz: <span className="gold">«Men har bir bolaga yordam bera olaman»</span> — deyapti
          </p>
        </section>

        {/* MODULES */}
        <section className="modules">
          <h2 className="display">
            <span className="gold">«PRO»</span> DASTURIDA <span className="gold">8 MODUL</span> BOR:
          </h2>
          <div className="intro-module wrap-wide">
            <span className="intro-module-n">00</span>
            <div>
              <span className="intro-module-title">KIRISH</span>
              <p>{introModule.join(" · ")}</p>
            </div>
          </div>
          <div className="module-list wrap-wide">
            {modules.map((m, i) => (
              <article className="module" key={m.title}>
                <div className="medal" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="module-title">
                  <span className="sr-only">{i + 1}-modul: </span>
                  {m.title}
                </h3>
                <p className="module-outcome">{m.outcome}</p>
                <details>
                  <summary>{m.lessons.length} dars + amaliy videolar</summary>
                  <ol>
                    {m.lessons.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ol>
                </details>
              </article>
            ))}
          </div>
          <p className="script modules-close">
            Bu kurs sehrli tayoqcha emas. <span className="gold">2 oy davomida kuniga 1 soat</span> oʻz ustingizda
            ishlaysiz — yoʻlni biz koʻrsatamiz
          </p>
          <a href="#narx" className="btn btn-gold">
            Kursga qoʻshilish
          </a>
          <div className="ornament" aria-hidden="true">
            <span />
            <svg className="ornament-mark" viewBox="0 0 64 20" width="64" height="20">
              <path d="M2 10q3-4 6 0t6 0M50 10q3-4 6 0t6 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M32 1.5q1.2 7.3 8.5 8.5-7.3 1.2-8.5 8.5-1.2-7.3-8.5-8.5 7.3-1.2 8.5-8.5z" fill="currentColor" />
            </svg>
            <span />
          </div>
        </section>

        {/* FORMATS + CERTIFICATES */}
        <section className="included">
          <h2 className="display">DEFEKTOLOGIYA PRO</h2>
          <span className="kicker">BU SHUNCHAKI DARSLAR EMAS!</span>
          <p className="included-lead">Oʻquv jarayoni qanday oʻtadi?</p>
          <div className="formats wrap-wide">
            {formats.map((f) => (
              <article className="format" key={f.name}>
                <div className="format-head">
                  <span className="format-badge">{f.badge}</span>
                  <h3 className="format-name">{f.name}</h3>
                </div>
                <ol className="format-steps">
                  {f.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                  {f.highlight && <li className="format-highlight">{f.highlight}</li>}
                </ol>
              </article>
            ))}
          </div>

          <div className="certs wrap-wide">
            <h3 className="certs-title">SERTIFIKATLAR</h3>
            <p className="certs-lead">
              Kurs yakunida Nilufar Abdumajitovna tomonidan 05.12 sanasidagi tantanali marosimda topshiriladi.
            </p>
            <div className="certs-row">
              {certificates.map((c) => (
                <div className="cert" key={c.name} style={{ "--c": c.color } as React.CSSProperties}>
                  <span className="cert-medal" style={{ background: c.color }} aria-hidden="true">
                    ✦
                  </span>
                  <span className="cert-name" style={{ color: c.color }}>
                    {c.name}
                  </span>
                  <span className="cert-text">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A → B + PRICING */}
        <section className="pricing" id="narx">
          <div className="pricing-inner wrap-wide">
            <div className="path">
              <div className="path-rail" aria-hidden="true">
                <div className="path-dot a">A</div>
                <div className="path-line" />
                <div className="path-dot b">B</div>
              </div>
              <div className="path-steps">
                <div className="path-step">
                  <span className="path-label" style={{ color: "var(--red-soft)" }}>
                    HOZIR
                  </span>
                  <p style={{ color: "var(--muted)" }}>
                    Tashxis qoʻyishda ikkilanasiz, qayerdan boshlashni bilmaysiz, daromad kam
                  </p>
                </div>
                <div className="path-mid">2 oy · kuniga 1 soat</div>
                <div className="path-step">
                  <span className="path-label gold">8 HAFTADAN KEYIN</span>
                  <p>
                    Toʻgʻri diagnostika, muammoni aniqlash, natijaga yoʻnaltirilgan korreksion ish — yuqori daromad va
                    sizni tavsiya qilishadi
                  </p>
                  <p className="path-alt">
                    Ona boʻlsangiz — farzandingiz rivojlanishini tushunasiz va uyda u bilan toʻgʻri shugʻullanasiz
                  </p>
                </div>
              </div>
            </div>

            <h2 className="display">QATNASHISH BAHOSI</h2>
            <Tiers serverNow={serverNow} />
            <Countdown serverNow={serverNow} />
          </div>
        </section>

        {/* GRADUATES */}
        <section className="grads">
          <h2 className="display">BITIRUVCHILARIMIZ</h2>
          <p className="grads-q">Qaror qilishga ikkilanyapsizmi?</p>
          <p className="grads-claim">700+ mutaxassis allaqachon Nilufar Abdumajitovnadan taʼlim olgan</p>
          <Graduates />
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="wrap">
            <h2 className="display">SAVOLLAR</h2>
            <Faq
              items={[
                ...faq.slice(0, 4),
                [
                  "Kursda uchraydigan qisqartmalar (ZPR, RAS, SDVG…) nimani anglatadi?",
                  <dl className="glossary" key="glossary">
                    {glossary.map(([term, meaning]) => (
                      <div key={term}>
                        <dt>{term}</dt>
                        <dd>{meaning}</dd>
                      </div>
                    ))}
                  </dl>,
                ],
                ...faq.slice(4),
              ]}
            />
          </div>
        </section>

        {/* FORM */}
        <section className="apply" id="ariza">
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 className="display">JOYINGIZNI BAND QILING</h2>
            <p className="apply-lead">
              Ismingiz va raqamingizni qoldiring — administrator siz bilan bogʻlanadi. <StartNote serverNow={serverNow} />
            </p>
            <CourseForm telegramUrl={contacts.manager} serverNow={serverNow} />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid wrap-wide">
          <div className="footer-brand">
            <span className="footer-name">Nilufar Abdumajitovna</span>
            <span className="footer-sub">Defektolog · Logoped · Neyropsixolog</span>
            <a className="footer-phone" href={`tel:${contacts.phone}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {contacts.phoneDisplay}
            </a>
          </div>
          <div className="footer-links">
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">
              <span className="footer-label">Telegram</span>
              <span className="footer-handle">{contacts.telegramHandle}</span>
            </a>
            <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
              <span className="footer-label">Instagram</span>
              <span className="footer-handle">{contacts.instagramHandle}</span>
            </a>
            <a href={contacts.youtube} target="_blank" rel="noopener noreferrer">
              <span className="footer-label">YouTube</span>
              <span className="footer-handle">{contacts.youtubeHandle}</span>
            </a>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Nilufar Abdumajitovna</p>
      </footer>
    </>
  );
}
