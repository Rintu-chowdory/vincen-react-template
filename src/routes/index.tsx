import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Check, ChevronRight, Clock3, FileCheck2,
  FileText, HelpCircle, LayoutDashboard, MessageSquareText, PenLine,
  Settings, ShieldCheck, Sparkles, Upload, UserRound,
} from "lucide-react";
import { site } from "@/content/site";
import { DashboardScene } from "@/components/3d/dashboard-scene";

export const Route = createFileRoute("/")({ component: CivicDashboard });

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analyse", label: "Brief analysieren", icon: FileText },
  { id: "coach", label: "Rechte-Coach", icon: HelpCircle },
  { id: "antwort", label: "Antwort erstellen", icon: PenLine },
  { id: "vorgaenge", label: "Meine Vorgänge", icon: Clock3 },
  { id: "einstellungen", label: "Einstellungen", icon: Settings },
];

function CivicDashboard() {
  const [active, setActive] = useState("dashboard");
  const [fileName, setFileName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [responseType, setResponseType] = useState("Widerspruch");
  const [authority, setAuthority] = useState("Jobcenter Musterstadt");
  const [deadline, setDeadline] = useState("30.04.2025");
  const [desired, setDesired] = useState("Ich möchte der Entscheidung widersprechen und um eine erneute Prüfung bitten.");
  const [generated, setGenerated] = useState("");

  const goTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const openAnalysis = () => goTo("analyse");
  const askQuestion = (value = question) => {
    const prompt = value.trim() || "Meine Frage";
    setQuestion(prompt);
    setAnswer(`Demo-Antwort zu „${prompt}“: Das hängt vom Inhalt Ihres Schreibens und Ihrer persönlichen Situation ab. Prüfen Sie zunächst, welche Unterlagen konkret verlangt werden und bis wann Sie reagieren sollen. Bei Unsicherheit kann eine unabhängige Beratungsstelle den Einzelfall mit Ihnen prüfen.`);
  };
  const generateResponse = () => setGenerated(`Betreff: ${responseType} zu Ihrem Schreiben\n\nSehr geehrte Damen und Herren,\n\nbezugnehmend auf Ihr Schreiben bitte ich um Berücksichtigung folgender Erklärung:\n\n${desired}\n\nBitte bestätigen Sie mir den Eingang dieser Nachricht. Die gesetzte Frist bis zum ${deadline} habe ich notiert.\n\nMit freundlichen Grüßen\n[Vor- und Nachname]`);

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Hauptnavigation">
        <div className="brand"><span className="brand-mark"><ShieldCheck size={18} /></span>{site.name}</div>
        <div className="nav-label">Arbeitsbereich</div>
        <nav className="nav-list">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button type="button" key={id} className={`nav-link ${active === id ? "active" : ""}`} onClick={() => goTo(id)}>
              <Icon size={17} strokeWidth={1.8} /> <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note"><strong>Demo-Modus</strong>Beispieldaten werden nur in diesem Browser verarbeitet. Es werden keine echten Dokumente gespeichert.</div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div><div className="eyebrow">Dienstag, 18. März 2025</div><p className="section-intro">Ihr persönlicher Überblick</p></div><div className="user-chip"><span>Willkommen, Demo-Nutzer</span><span className="avatar"><UserRound size={15} /></span></div></header>
        <div className="content">
          <section id="dashboard" className="hero">
            <div><div className="eyebrow">CivicAI · Klarheit im Alltag</div><h1>Behörden verstehen. Rechte kennen. Sicher handeln.</h1><p className="hero-copy">CivicAI hilft Ihnen, offizielle Schreiben verständlich einzuordnen und die nächsten Schritte vorzubereiten. Ruhig, transparent und in klarer Sprache.</p><div className="hero-actions"><button type="button" className="primary-btn" onClick={openAnalysis}>Brief analysieren <ArrowRight size={16} /></button><button type="button" className="secondary-btn" onClick={() => goTo("coach")}>Frage stellen</button></div></div>
            <div className="hero-panel">
              <div className="panel-top"><div><div className="eyebrow">Ihr nächster Schritt</div><h3 style={{ marginTop: 6 }}>Ein Schreiben einordnen</h3></div><span className="panel-tag">Sicher & klar</span></div>
              <div className="hero-panel-grid">
                <div className="scan-paper"><span className="scan-icon"><FileText size={20} /></span><strong>Brief hier ablegen</strong><p>PDF, DOCX oder Bild auswählen. Die Demo zeigt anschließend eine Beispielanalyse.</p><button type="button" className="file-button" onClick={openAnalysis}>Demo-Analyse öffnen</button></div>
                <DashboardScene />
              </div>
            </div>
          </section>

          <section className="stats" aria-label="Zusammenfassung"><div className="stat-card"><div className="stat-value">3</div><div className="stat-label">offene Fristen</div></div><div className="stat-card"><div className="stat-value">2</div><div className="stat-label">analysierte Schreiben</div></div><div className="stat-card"><div className="stat-value">1</div><div className="stat-label">Antwortentwurf</div></div></section>

          <section id="analyse" className="section"><div className="section-header"><div><div className="eyebrow">01 · Brief analysieren</div><h2>Was steht in Ihrem Schreiben?</h2><p className="section-intro">Laden Sie ein Dokument hoch oder öffnen Sie die transparente Beispielanalyse.</p></div><button type="button" className="secondary-btn" onClick={openAnalysis}>Demo-Analyse öffnen <ChevronRight size={15} /></button></div><div className="two-col"><label className="card upload-card"><input type="file" accept=".pdf,.docx,image/*" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} /><span className="scan-icon"><Upload size={20} /></span><strong style={{ marginTop: 12 }}>{fileName || "Dokument auswählen"}</strong><p>{fileName ? "Datei ausgewählt. In der Vollversion würde die Analyse hier starten." : "PDF, DOCX oder Bild hier ablegen oder per Klick auswählen."}</p><span className="file-button">Datei auswählen</span></label><div className="card"><div className="detail-label">Demo-Eingang</div><h3 style={{ marginTop: 7 }}>Jobcenter Musterstadt</h3><p className="section-intro">Bescheid zur Prüfung der Mitwirkung · Beispiel vom 16.04.2025</p><div className="notice" style={{ marginTop: 19 }}><strong>Demo-Analyse</strong><br />Diese Inhalte sind beispielhaft und ersetzen keine Prüfung Ihres konkreten Falls.</div></div></div></section>

          <section id="analyse-ergebnis" className="section"><div className="section-header"><div><div className="eyebrow">Demo-Auswertung</div><h2>Ein Schreiben, verständlich erklärt</h2></div><span className="confidence"><span className="dot" />Mittlere Sicherheit</span></div><div className="analysis-card card"><div className="analysis-header"><div><div className="detail-label">Behörde</div><h3 style={{ marginTop: 5 }}>Jobcenter Musterstadt</h3></div><FileCheck2 size={25} color="#1769d2" /></div><div className="analysis-body"><div className="detail-grid"><div><div className="detail-label">Betreff</div><div className="detail-value">Aufforderung zur Mitwirkung</div></div><div><div className="detail-label">Frist</div><div className="detail-value" style={{ color: "var(--yellow)" }}>30.04.2025</div></div><div><div className="detail-label">Benötigte Unterlagen</div><div className="detail-value">Kontoauszüge, Mietnachweis</div></div><div><div className="detail-label">Mögliche Rechtsgrundlage</div><div className="detail-value">Wird in der nächsten Version verknüpft</div></div></div><div className="summary"><strong>Zusammenfassung in einfacher Sprache</strong><br />Die Behörde bittet Sie, bestimmte Unterlagen nachzureichen. Sie sollten innerhalb der genannten Frist reagieren oder frühzeitig erklären, warum Sie mehr Zeit benötigen. Bewahren Sie eine Kopie Ihrer Antwort auf.</div><div className="summary"><strong>Wenn Sie nicht reagieren</strong><br />Es kann sein, dass die Behörde die Entscheidung auf Grundlage der vorhandenen Informationen trifft. Welche Folgen das in Ihrem Fall hat, kann nur eine Einzelfallprüfung klären.</div><div style={{ marginTop: 18 }}><div className="detail-label">Offizielle Quellen</div><p className="section-intro">Offizielle Quelle wird in der nächsten Version verknüpft. Bitte prüfen Sie das Originalschreiben und die dort genannten Kontaktwege.</p></div><div className="notice" style={{ marginTop: 18 }}><strong>Hinweis zur Sicherheit</strong><br />Die Demo erkennt Muster, prüft aber nicht Ihren Einzelfall. Für dringende oder komplexe Fragen wenden Sie sich an eine qualifizierte Beratungsstelle oder eine Anwältin bzw. einen Anwalt.</div></div></div><div className="card" style={{ marginTop: 14 }}><h3>Nächste Schritte</h3><div className="checklist"><div className="check-item"><Check size={16} />Frist im Kalender notieren und Originalschreiben aufbewahren.</div><div className="check-item"><Check size={16} />Verlangte Unterlagen und mögliche Lücken zusammentragen.</div><div className="check-item"><Check size={16} />Bei Bedarf eine Fristverlängerung schriftlich anfragen.</div></div></div></section>

          <section id="coach" className="section"><div className="section-header"><div><div className="eyebrow">02 · Rechte-Coach</div><h2>Eine Frage. Ein klarer nächster Schritt.</h2><p className="section-intro">Stellen Sie eine allgemeine Frage. Die Demo-Antwort bleibt bewusst vorsichtig.</p></div></div><div className="two-col"><div className="card"><div className="question-row"><input className="text-input" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && askQuestion()} placeholder="Worum geht es in Ihrem Schreiben?" aria-label="Frage an den Rechte-Coach" /><button type="button" className="primary-btn" onClick={() => askQuestion()}>Fragen</button></div><div className="suggestions"><button type="button" className="suggestion" onClick={() => askQuestion("Muss ich Kontoauszüge einreichen?")}>Muss ich Kontoauszüge einreichen?</button><button type="button" className="suggestion" onClick={() => askQuestion("Kann ich eine Fristverlängerung beantragen?")}>Kann ich eine Fristverlängerung beantragen?</button></div>{answer && <div className="answer-box" style={{ marginTop: 18 }}><strong>Demo-Antwort</strong><br />{answer}<p style={{ marginBottom: 0, fontSize: 12, color: "var(--muted-foreground)" }}>Quelle: Offizielle Quelle wird in der nächsten Version verknüpft.</p></div>}</div><div className="card"><div className="detail-label">Wofür der Coach da ist</div><div className="checklist"><div className="check-item"><Sparkles size={16} color="var(--blue)" />Begriffe und Abläufe in Alltagssprache erklären.</div><div className="check-item"><ShieldCheck size={16} color="var(--blue)" />Unsicherheit sichtbar machen, statt Sicherheit zu versprechen.</div><div className="check-item"><MessageSquareText size={16} color="var(--blue)" />Auf eine passende Beratungsstelle vorbereiten.</div></div></div></div></section>

          <section id="antwort" className="section"><div className="section-header"><div><div className="eyebrow">03 · Antwort erstellen</div><h2>Eine Antwort, die zu Ihrem Fall passt</h2><p className="section-intro">Erstellen Sie einen bearbeitbaren Entwurf. Keine Rechtsberatung.</p></div></div><div className="card"><div className="form-grid"><div className="field"><label htmlFor="type">Art der Antwort</label><select id="type" className="select-input" value={responseType} onChange={(e) => setResponseType(e.target.value)}><option>Widerspruch</option><option>Fristverlängerung</option><option>Nachreichung von Unterlagen</option><option>Allgemeine Nachfrage</option></select></div><div className="field"><label htmlFor="authority">Behörde</label><input id="authority" className="text-input" value={authority} onChange={(e) => setAuthority(e.target.value)} /></div><div className="field"><label htmlFor="deadline">Genannte Frist</label><input id="deadline" className="text-input" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></div><div className="field full"><label htmlFor="desired">Was möchten Sie mitteilen?</label><textarea id="desired" className="text-area" value={desired} onChange={(e) => setDesired(e.target.value)} /></div></div><button type="button" className="primary-btn" style={{ marginTop: 17 }} onClick={generateResponse}>Entwurf erstellen <PenLine size={15} /></button>{generated && <div className="generated" aria-live="polite"><div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 800, color: "var(--blue)", marginBottom: 9 }}>{authority} · Demo-Entwurf</div>{generated}</div>}</div></section>

          <section id="vorgaenge" className="section"><div className="section-header"><div><div className="eyebrow">Meine Vorgänge · Demo</div><h2>Der Überblick auf einen Blick</h2></div></div><div className="card"><div className="timeline"><div className="timeline-item"><div className="timeline-date">12.03.2025</div><h3>Antrag auf Bürgergeld</h3><p>Antrag eingereicht · Unterlagen vollständig</p></div><div className="timeline-item"><div className="timeline-date">16.04.2025</div><h3>Schreiben vom Jobcenter</h3><p>Aufforderung zur Mitwirkung · Prüfung läuft</p></div><div className="timeline-item"><div className="timeline-date">Heute</div><h3>Antwort vorbereiten</h3><p>Frist: 30.04.2025 · Entwurf noch nicht versendet</p></div><div className="timeline-item"><div className="timeline-date">Geplant</div><h3>Bescheid</h3><p>Wird nach Prüfung durch die Behörde erwartet</p></div><div className="timeline-item"><div className="timeline-date">Optional</div><h3>Widerspruch</h3><p>Nur wenn der Bescheid Anlass dazu gibt</p></div></div></div></section>

          <section id="einstellungen" className="section"><div className="card"><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><Settings size={20} color="var(--blue)" /><div><h3>Einstellungen und Datenschutz</h3><p className="section-intro">Im kostenlosen MVP werden Beispieldaten nur im aktuellen Browser genutzt. Es gibt keine Anmeldung und keine automatische Weitergabe Ihrer Dokumente.</p></div></div></div></section>

          <footer className="footer-note"><strong>Über CivicAI</strong><span>CivicAI ist ein Portfolio-Prototyp für faire, verständliche und transparente Behördenkommunikation. Allgemeine Information und Formulierungshilfe, keine Rechtsvertretung.</span></footer>
        </div>
      </main>
    </div>
  );
}
