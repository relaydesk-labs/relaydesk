import { FormEvent, useEffect, useState } from "react";
import { askRelayDesk, getTickets } from "./lib/api";
import type { AskResponse, Ticket } from "./types/api";

const prompts = [
  "협력사 등록 어디서 해?",
  "이 업무 담당자 누구야?",
  "ERP 전표 저장이 안돼요.",
  "지난달 신규회원 수 보여줘."
];

export function App() {
  const [message, setMessage] = useState("ERP 전표 저장이 안돼요.");
  const [answer, setAnswer] = useState<AskResponse | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void refreshTickets();
  }, []);

  async function refreshTickets() {
    try {
      setTickets(await getTickets());
    } catch {
      setTickets([]);
    }
  }

  async function submit(nextMessage = message) {
    setLoading(true);
    setMessage(nextMessage);
    try {
      const result = await askRelayDesk(nextMessage);
      setAnswer(result);
      await refreshTickets();
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submit();
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand" aria-label="RelayDesk">
          <RelayDeskMark />
          <span>RelayDesk</span>
        </div>
        <nav>
          <a className="active" href="#home">Home</a>
          <a href="#requests">My Requests</a>
          <a href="#inbox">Owner Inbox</a>
          <a href="#services">Services</a>
          <a href="#data">Data</a>
          <a href="#dashboard">Insights</a>
          <a href="#admin">Admin</a>
        </nav>
        <div className="tenant">Demo Company</div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <h1>AI-first Internal Service Hub</h1>
            <p>시스템명, 조직명, 담당자명을 몰라도 업무 요청의 다음 단계를 찾습니다.</p>
          </div>
          <div className="profile">Demo User</div>
        </header>

        <section id="home" className="section">
          <div className="hero-card">
            <span className="eyebrow">Ask · Guide · Self-Service · Request</span>
            <h2>무엇을 하려고 하시나요?</h2>
            <p>업무를 평소 말하듯 입력하면 RelayDesk가 안내, 셀프서비스, 티켓 중 적절한 흐름으로 연결합니다.</p>

            <form className="search-row" onSubmit={onSubmit}>
              <input value={message} onChange={(event) => setMessage(event.target.value)} />
              <button className="primary" disabled={loading}>{loading ? "분석 중" : "찾아보기"}</button>
            </form>

            <div className="quick-prompts">
              {prompts.map((prompt) => (
                <button key={prompt} onClick={() => void submit(prompt)}>{prompt}</button>
              ))}
            </div>
          </div>

          <div className="journey">
            <div><b>1. Ask</b><span>자연어로 업무 입력</span></div>
            <div><b>2. Guide</b><span>시스템·절차 안내</span></div>
            <div><b>3. Self-Service</b><span>데이터/가이드로 해결</span></div>
            <div><b>4. Request</b><span>필요한 경우에만 Ticket</span></div>
          </div>

          {answer && <ResultPanel answer={answer} />}
        </section>

        <section id="inbox" className="section">
          <div className="section-title">
            <h2>Owner Inbox</h2>
            <span className="badge">Human Owner + Agent-ready Context</span>
          </div>
          <div className="ticket-layout">
            <div className="panel">
              <h3>최근 Ticket</h3>
              {tickets.length === 0 && <div className="empty">아직 담당자 처리가 필요한 요청이 없습니다.</div>}
              {tickets.map((ticket) => (
                <article className="ticket-row" key={ticket.id}>
                  <div>
                    <span className="badge">{ticket.id}</span>
                    <h3>{ticket.title}</h3>
                    <p>{ticket.description}</p>
                  </div>
                  <span className="status processing">{ticket.status}</span>
                </article>
              ))}
            </div>
            <aside className="panel context">
              <h3>Work Item Context</h3>
              <ul className="link-list">
                <li>Observed / Expected 구조 준비</li>
                <li>Related Knowledge 연결 예정</li>
                <li>Repository / Deployment context는 Future</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="dashboard" className="section">
          <div className="section-title">
            <h2>Service Insights</h2>
            <span className="badge">Reduce repetitive work</span>
          </div>
          <div className="grid four">
            <div className="stat-card"><span>Guide Resolution Rate</span><strong>31%</strong></div>
            <div className="stat-card success"><span>Self-Service Resolution</span><strong>42</strong></div>
            <div className="stat-card"><span>Ticket Deflection</span><strong>38%</strong></div>
            <div className="stat-card warning"><span>Repeated Requests</span><strong>55</strong></div>
          </div>
          <div className="grid two">
            <div className="panel">
              <h3>반복 업무 개선 후보</h3>
              <div className="insight-row"><b>회원 통계 조회</b><span>23건</span><em>Data Self-Service 후보</em></div>
              <div className="insight-row"><b>ERP 권한 문의</b><span>18건</span><em>Guide / FAQ 후보</em></div>
              <div className="insight-row"><b>반복 재처리 요청</b><span>14건</span><em>Application 개선 후보</em></div>
            </div>
            <div className="panel">
              <h3>처리 방식</h3>
              <div className="bar-row"><span>Guide</span><i style={{ width: "42%" }} /><b>25</b></div>
              <div className="bar-row"><span>Self-Service</span><i style={{ width: "70%" }} /><b>42</b></div>
              <div className="bar-row"><span>Ticket</span><i style={{ width: "100%" }} /><b>61</b></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function RelayDeskMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" role="img" aria-label="RelayDesk logo">
      <rect width="64" height="64" rx="14" />
      <path d="M18 17H35C42.18 17 47 21.29 47 27.55C47 31.95 44.49 35.35 40.55 36.9L48 47H38.33L31.98 38.05H27.05V47H18V17ZM27.05 24.35V31.15H34.48C36.7 31.15 38.03 29.83 38.03 27.75C38.03 25.7 36.7 24.35 34.48 24.35H27.05Z" />
      <path className="brand-mark-line" d="M16 51H48" />
    </svg>
  );
}

function ResultPanel({ answer }: { answer: AskResponse }) {
  return (
    <div className="panel result-panel">
      <div className="section-title">
        <div>
          <span className="badge">{answer.mode}</span>
          <h2>{answer.title}</h2>
          <p>{answer.summary}</p>
        </div>
        <span className="confidence">{Math.round(answer.classification.confidence * 100)}%</span>
      </div>

      {answer.guide && (
        <div className="split">
          <div>
            <h3>Guide</h3>
            <dl className="kv-list">
              <div><dt>업무</dt><dd>{answer.guide.businessService}</dd></div>
              <div><dt>Application</dt><dd>{answer.guide.application}</dd></div>
              <div><dt>Module</dt><dd>{answer.guide.module}</dd></div>
              <div><dt>담당 조직</dt><dd>{answer.guide.ownerOrganization}</dd></div>
            </dl>
          </div>
          <div>
            <h3>절차</h3>
            <ol className="steps">
              {answer.guide.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
        </div>
      )}

      {answer.data && (
        <div>
          <h3>{answer.data.title}</h3>
          <table className="data-table">
            <thead>
              <tr>{answer.data.columns.map((column) => <th key={column}>{column}</th>)}</tr>
            </thead>
            <tbody>
              {answer.data.rows.map((row, index) => (
                <tr key={index}>
                  {answer.data!.columns.map((column) => <td key={column}>{row[column]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {answer.ticket && (
        <div className="ticket-layout">
          <div>
            <h3>{answer.ticket.title}</h3>
            <p>{answer.ticket.description}</p>
            <div className="timeline">
              {answer.ticket.history.map((event) => (
                <div className="timeline-item" key={event.id}>
                  <span className="dot" />
                  <div><b>{event.eventType}</b><p>{event.message}</p></div>
                </div>
              ))}
            </div>
          </div>
          <aside className="context">
            <dl className="kv-list compact">
              <div><dt>상태</dt><dd><span className="status processing">{answer.ticket.status}</span></dd></div>
              <div><dt>유형</dt><dd>{answer.ticket.requestType}</dd></div>
              <div><dt>Routing</dt><dd>{answer.routing?.fallbackLevel}</dd></div>
              <div><dt>담당</dt><dd>{answer.ticket.ownerOrganizationId}</dd></div>
            </dl>
          </aside>
        </div>
      )}
    </div>
  );
}
