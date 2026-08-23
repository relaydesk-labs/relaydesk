const html = String.raw`<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RelayDesk</title>
  <style>
    *{box-sizing:border-box}:root{--bg:#f5f7fb;--panel:#fff;--text:#1f2937;--muted:#6b7280;--line:#e5e7eb;--primary:#2563eb;--primary-soft:#eff6ff;--success:#16a34a;--success-soft:#ecfdf3;--warning:#d97706;--warning-soft:#fffbeb;--radius:14px;--shadow:0 8px 30px rgba(15,23,42,.06)}
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:var(--bg);color:var(--text)}
    button,input{font:inherit}.app-shell{display:grid;grid-template-columns:220px 1fr;min-height:100vh}.sidebar{background:#fff;border-right:1px solid var(--line);padding:24px 16px;position:sticky;top:0;height:100vh}.brand{font-size:22px;font-weight:800;color:var(--primary);margin:4px 8px 28px}.sidebar nav{display:grid;gap:6px}.sidebar a{padding:11px 12px;border-radius:10px;color:#475569;text-decoration:none;font-weight:600}.sidebar a.active,.sidebar a:hover{background:var(--primary-soft);color:var(--primary)}.tenant{position:absolute;left:24px;bottom:24px;font-size:12px;color:var(--muted)}.content{padding:28px 32px 72px}.topbar{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}.topbar h1{margin:0 0 4px;font-size:26px}.topbar p{margin:0;color:var(--muted)}.profile{font-size:14px;color:var(--muted)}.section{margin-bottom:34px}.section-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:14px}.section-title h2{margin:5px 0 0}.section-title p{margin:4px 0 0;color:var(--muted)}.hero-card,.panel,.stat-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}.hero-card{padding:34px;margin-bottom:18px}.hero-card h2{font-size:30px;margin:8px 0}.hero-card p{color:var(--muted)}.eyebrow,.badge{display:inline-flex;background:var(--primary-soft);color:var(--primary);border-radius:999px;padding:5px 9px;font-size:12px;font-weight:700;white-space:nowrap}.search-row{display:flex;gap:10px;margin:22px 0 14px}.search-row input{flex:1}input{width:100%;border:1px solid var(--line);border-radius:10px;padding:12px 13px;background:#fff;outline:none}button{border:1px solid var(--line);background:#fff;border-radius:10px;padding:10px 13px;cursor:pointer}button.primary{background:var(--primary);border-color:var(--primary);color:white;font-weight:700}.quick-prompts{display:flex;gap:8px;flex-wrap:wrap}.quick-prompts button{background:#f8fafc}.journey{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}.journey>div{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px}.journey b,.journey span{display:block}.journey span{font-size:12px;color:var(--muted);margin-top:3px}.grid{display:grid;gap:14px;margin-bottom:16px}.grid.four{grid-template-columns:repeat(4,minmax(0,1fr))}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.stat-card{padding:18px}.stat-card span{display:block;color:var(--muted);font-size:13px}.stat-card strong{display:block;font-size:28px;margin-top:6px}.stat-card.warning{background:var(--warning-soft)}.stat-card.success{background:var(--success-soft)}.split{display:grid;grid-template-columns:1fr 1fr;gap:16px}.panel{padding:20px}.panel h3{margin-top:0}.result-panel{margin-top:16px}.kv-list{margin:0}.kv-list>div{display:grid;grid-template-columns:130px 1fr;padding:10px 0;border-bottom:1px solid #f1f5f9}.kv-list dt{color:var(--muted)}.kv-list dd{margin:0;font-weight:600}.confidence{font-size:22px;font-weight:900;color:var(--primary)}.status{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:12px;font-weight:800}.status.processing{background:#eef2ff;color:#4f46e5}.ticket-layout{display:grid;grid-template-columns:1fr 300px;gap:16px}.timeline-item{display:grid;grid-template-columns:18px 1fr;gap:10px;position:relative;padding:6px 0 18px}.timeline-item:after{content:"";position:absolute;left:6px;top:18px;bottom:-4px;width:2px;background:#e2e8f0}.timeline-item:last-of-type:after{display:none}.dot{width:14px;height:14px;border-radius:50%;background:var(--primary);margin-top:3px;z-index:1}.timeline-item p{margin:4px 0;color:var(--muted)}.context{background:#f8fafc;border-radius:12px;padding:14px}.link-list{padding-left:18px;color:#475569}.link-list li{margin:8px 0}.empty{padding:26px;border:1px dashed var(--line);border-radius:12px;color:var(--muted);background:#f8fafc}.ticket-row{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:16px 0;border-bottom:1px solid #f1f5f9}.ticket-row h3{margin:8px 0 4px}.ticket-row p{margin:0;color:var(--muted)}.insight-row{display:grid;grid-template-columns:1fr auto;gap:5px 14px;padding:14px 0;border-bottom:1px solid #f1f5f9}.insight-row em{grid-column:1/3;color:var(--primary);font-style:normal;font-size:13px}.bar-row{display:grid;grid-template-columns:120px 1fr 36px;align-items:center;gap:10px;margin:18px 0}.bar-row i{display:block;height:10px;background:#dbeafe;border-radius:999px}.bar-row b{text-align:right}.steps{margin:0;padding-left:20px}.steps li{margin:10px 0;color:#475569}.data-table{width:100%;border-collapse:collapse}.data-table th,.data-table td{text-align:left;padding:12px;border-bottom:1px solid #f1f5f9}.data-table th{color:var(--muted);font-size:13px}@media(max-width:1000px){.app-shell{grid-template-columns:1fr}.sidebar{display:none}.content{padding:20px}.grid.four,.journey{grid-template-columns:repeat(2,1fr)}.split,.ticket-layout,.grid.two{grid-template-columns:1fr}.search-row{flex-direction:column}}
  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar"><div class="brand">RelayDesk</div><nav><a class="active">Home</a><a>My Requests</a><a>Owner Inbox</a><a>Services</a><a>Data</a><a>Insights</a><a>Admin</a></nav><div class="tenant">Demo Company</div></aside>
    <main class="content">
      <header class="topbar"><div><h1>AI-first Internal Service Hub</h1><p>시스템명, 조직명, 담당자명을 몰라도 업무 요청의 다음 단계를 찾습니다.</p></div><div class="profile">Demo User</div></header>
      <section class="section">
        <div class="hero-card"><span class="eyebrow">Ask · Guide · Self-Service · Request</span><h2>무엇을 하려고 하시나요?</h2><p>업무를 평소 말하듯 입력하면 RelayDesk가 안내, 셀프서비스, 티켓 중 적절한 흐름으로 연결합니다.</p><div class="search-row"><input id="askInput" value="ERP 전표 저장이 안돼요." /><button class="primary" id="askButton">찾아보기</button></div><div class="quick-prompts"><button>협력사 등록 어디서 해?</button><button>이 업무 담당자 누구야?</button><button>ERP 전표 저장이 안돼요.</button><button>지난달 신규회원 수 보여줘.</button></div></div>
        <div class="journey"><div><b>1. Ask</b><span>자연어로 업무 입력</span></div><div><b>2. Guide</b><span>시스템·절차 안내</span></div><div><b>3. Self-Service</b><span>데이터/가이드로 해결</span></div><div><b>4. Request</b><span>필요한 경우에만 Ticket</span></div></div>
        <div id="result"></div>
      </section>
      <section class="section"><div class="section-title"><h2>Owner Inbox</h2><span class="badge">Human Owner + Agent-ready Context</span></div><div class="ticket-layout"><div class="panel"><h3>최근 Ticket</h3><div id="tickets" class="empty">아직 담당자 처리가 필요한 요청이 없습니다.</div></div><aside class="panel context"><h3>Work Item Context</h3><ul class="link-list"><li>Observed / Expected 구조 준비</li><li>Related Knowledge 연결 예정</li><li>Repository / Deployment context는 Future</li></ul></aside></div></section>
      <section class="section"><div class="section-title"><h2>Service Insights</h2><span class="badge">Reduce repetitive work</span></div><div class="grid four"><div class="stat-card"><span>Guide Resolution Rate</span><strong>31%</strong></div><div class="stat-card success"><span>Self-Service Resolution</span><strong>42</strong></div><div class="stat-card"><span>Ticket Deflection</span><strong>38%</strong></div><div class="stat-card warning"><span>Repeated Requests</span><strong>55</strong></div></div><div class="grid two"><div class="panel"><h3>반복 업무 개선 후보</h3><div class="insight-row"><b>회원 통계 조회</b><span>23건</span><em>Data Self-Service 후보</em></div><div class="insight-row"><b>ERP 권한 문의</b><span>18건</span><em>Guide / FAQ 후보</em></div><div class="insight-row"><b>반복 재처리 요청</b><span>14건</span><em>Application 개선 후보</em></div></div><div class="panel"><h3>처리 방식</h3><div class="bar-row"><span>Guide</span><i style="width:42%"></i><b>25</b></div><div class="bar-row"><span>Self-Service</span><i style="width:70%"></i><b>42</b></div><div class="bar-row"><span>Ticket</span><i style="width:100%"></i><b>61</b></div></div></div></section>
    </main>
  </div>
  <script>
    const tickets = [];
    const result = document.querySelector("#result");
    const ticketBox = document.querySelector("#tickets");
    function ask(message) {
      const normalized = message.toLowerCase();
      if (normalized.includes("지난달") || normalized.includes("통계") || normalized.includes("신규회원")) {
        result.innerHTML = '<div class="panel result-panel"><div class="section-title"><div><span class="badge">SELF_SERVICE</span><h2>Data Self-Service로 해결할 수 있습니다.</h2><p>허용된 Data Product 기준으로 데모 데이터를 조회했습니다.</p></div><span class="confidence">86%</span></div><h3>지난달 신규회원 수</h3><table class="data-table"><thead><tr><th>month</th><th>newMembers</th><th>channel</th></tr></thead><tbody><tr><td>2026-07</td><td>1240</td><td>Web</td></tr><tr><td>2026-07</td><td>430</td><td>Mobile</td></tr><tr><td>2026-07</td><td>95</td><td>Partner</td></tr></tbody></table></div>';
        return;
      }
      if (normalized.includes("협력사") || normalized.includes("거래처") || normalized.includes("업체")) {
        result.innerHTML = '<div class="panel result-panel"><div class="section-title"><div><span class="badge">GUIDE</span><h2>Ticket 없이 안내로 해결할 수 있습니다.</h2><p>시스템, 모듈, 처리 절차를 안내합니다.</p></div><span class="confidence">91%</span></div><div class="split"><div><h3>Guide</h3><dl class="kv-list"><div><dt>업무</dt><dd>업체등록</dd></div><div><dt>Application</dt><dd>ERP</dd></div><div><dt>Module</dt><dd>MM</dd></div><div><dt>담당 조직</dt><dd>ERP Operations</dd></div></dl></div><div><h3>절차</h3><ol class="steps"><li>Internal Portal에서 ERP 업무 메뉴를 엽니다.</li><li>ERP &gt; MM &gt; 업체등록 메뉴로 이동합니다.</li><li>신규 업체 기본정보와 필요 첨부파일을 확인합니다.</li><li>권한 또는 예외 상황은 공식 담당 조직으로 문의합니다.</li></ol></div></div></div>';
        return;
      }
      const id = "INC-" + Date.now();
      tickets.unshift({ id, title: message || "ERP 전표 저장 오류" });
      result.innerHTML = '<div class="panel result-panel"><div class="section-title"><div><span class="badge">TICKET</span><h2>담당자 처리가 필요한 요청입니다.</h2><p>Routing Rule에 따라 담당 조직과 담당자를 배정하고 Ticket을 생성했습니다.</p></div><span class="confidence">88%</span></div><div class="ticket-layout"><div><h3>' + (message || "ERP 전표 저장 오류") + '</h3><p>' + (message || "ERP 전표 저장이 안돼요.") + '</p><div class="timeline"><div class="timeline-item"><span class="dot"></span><div><b>REQUEST_RECEIVED</b><p>요청이 접수되었습니다.</p></div></div><div class="timeline-item"><span class="dot"></span><div><b>REQUEST_CLASSIFIED</b><p>ERP/FI 전표 처리 Incident로 분류되었습니다.</p></div></div><div class="timeline-item"><span class="dot"></span><div><b>ROUTED</b><p>Routing matched: Service + Module + RequestType</p></div></div></div></div><aside class="context"><dl class="kv-list"><div><dt>상태</dt><dd><span class="status processing">ASSIGNED</span></dd></div><div><dt>유형</dt><dd>INCIDENT</dd></div><div><dt>Routing</dt><dd>Service + Module + RequestType</dd></div><div><dt>담당</dt><dd>org-erp-ops</dd></div></dl></aside></div></div>';
      renderTickets();
    }
    function renderTickets() {
      ticketBox.className = "";
      ticketBox.innerHTML = tickets.map(ticket => '<article class="ticket-row"><div><span class="badge">' + ticket.id + '</span><h3>' + ticket.title + '</h3><p>' + ticket.title + '</p></div><span class="status processing">ASSIGNED</span></article>').join("");
    }
    document.querySelector("#askButton").addEventListener("click", () => ask(document.querySelector("#askInput").value));
    document.querySelectorAll(".quick-prompts button").forEach(button => button.addEventListener("click", () => { document.querySelector("#askInput").value = button.textContent; ask(button.textContent); }));
  </script>
</body>
</html>`;

export default {
  async fetch() {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=60"
      }
    });
  }
};
