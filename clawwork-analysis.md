# ClawWork - AI Coworker Economic Benchmark

**Repo:** https://github.com/HKUDS/ClawWork  
**Org:** HKUDS (Data Intelligence Lab @ HKU)  
**Lansert:** 2026-02-16  
**Headline:** 💰 $10K earned in 7 Hours

---

## 🎯 Konsept: Fra AI Assistant → AI Coworker

**Hovedidé:** Transformere AI-assistenter til ekte "AI-kollegaer" som må bevise sin verdi gjennom **økonomisk overlevelse**.

### Nøkkelprinsipp:
- **Kostnader:** Agenter betaler for hver token de bruker
- **Inntekt:** Agenter tjener penger ved å fullføre profesjonelle oppgaver
- **Overlevelse:** Agenter må tjene mer enn de bruker for å overleve

> "Not just technical benchmarks — what truly matters in production: work quality, cost efficiency, and long-term survival."

---

## 💰 Økonomisk System

### Startbetingelser
- **Initial balance:** $10 (tight by design)
- **Token costs:** $2.50 per 1M input tokens, $10 per 1M output tokens
- **API costs:** Web search ~$0.0008/call (Tavily)

### Inntektssystem
Basert på **real economic value**, ikke flat cap:

```
Payment = quality_score × (estimated_hours × BLS_hourly_wage)
```

**Task range:** $82.78 - $5,004.00  
**Average task:** $259.45  
**Quality score:** 0.0 - 1.0

### Topp-ytelse
🏆 **Beste agenter:** $1,500+/time — overgår typisk human white-collar produktivitet

---

## 📊 GDPVal Benchmark Dataset

**220 profesjonelle oppgaver** fordelt på **44 yrker** i **4 sektorer:**

### 1. Technology & Engineering
- Computer & Information Systems Managers
- Production Supervisors

### 2. Business & Finance
- Financial Analysts
- Compliance Officers
- Auditors

### 3. Healthcare & Social Services
- Social Workers
- Health Administrators

### 4. Legal Operations
- Buyers & Purchasing Agents
- Property Managers

### Oppgavetyper
Real deliverables:
- Word documents
- Excel spreadsheets
- PDFs
- Data analysis
- Project plans
- Technical specs
- Research reports
- Process designs

---

## 🛠️ Agent Tools (8 verktøy)

| Tool | Beskrivelse |
|------|-------------|
| `decide_activity(activity, reasoning)` | Velg: "work" eller "learn" |
| `submit_work(work_output, artifact_file_paths)` | Send inn arbeid for evaluering + betaling |
| `learn(topic, knowledge)` | Lagre kunnskap til persistent minne (min 200 chars) |
| `get_status()` | Sjekk balance, costs, survival tier |
| `search_web(query, max_results)` | Web search via Tavily/Jina AI |
| `create_file(filename, content, file_type)` | Lag .txt, .xlsx, .docx, .pdf |
| `execute_code(code, language)` | Kjør Python i isolert E2B sandbox |
| `create_video(slides_json, output_filename)` | Generer MP4 fra slides |

---

## 🏗️ Arkitektur

### Mode 1: Standalone Simulation
```bash
# Terminal 1 — Dashboard (backend API + React frontend)
./start_dashboard.sh

# Terminal 2 — Agent
./run_test_agent.sh

# Browser → http://localhost:3000
```

**Eksempel output:**
```
============================================================
📅 ClawWork Daily Session: 2025-01-20
============================================================

📋 Task: Buyers and Purchasing Agents — Manufacturing
Task ID: 1b1ade2d-f9f6-4a04-baa5-aa15012b53be
Max payment: $247.30

🔄 Iteration 1/15
📞 decide_activity → work
📞 submit_work → Earned: $198.44

============================================================
📊 Daily Summary - 2025-01-20
Balance: $11.98 | Income: $198.44 | Cost: $0.03
Status: 🟢 thriving
============================================================
```

### Mode 2: Nanobot/OpenClaw Integration (ClawMode)
Gjør din live Nanobot instance økonomisk bevisst:
- Hver samtale koster tokens
- Nanobot må tjene penger ved å fullføre oppgaver
- Cost footer i hver respons: `Cost: $0.0075 | Balance: $999.99 | Status: thriving`

**Fordeler:**
- Alle 9 Nanobot-kanaler (Telegram, Discord, Slack, WhatsApp, Email, etc.)
- Alle Nanobot-tools (read_file, write_file, exec, etc.)
- Plus 4 økonomiske tools (decide_activity, submit_work, learn, get_status)

---

## 📊 Live Dashboard (React)

Real-time metrics via WebSocket:

### Main Tab
- Balance chart (real-time line graph)
- Activity distribution (work vs learn)
- Economic metrics: income, costs, net worth, survival status

### Work Tasks Tab
- Assigned GDPVal tasks (sector & occupation)
- Payment amounts + quality scores
- Full task prompts + submitted artifacts

### Learning Tab
- Knowledge entries organized by topic
- Learning timeline
- Searchable knowledge base

---

## 📈 Benchmark Metrics

| Metric | Beskrivelse |
|--------|-------------|
| **Survival days** | Hvor lenge agent holder seg solvent |
| **Final balance** | Netto økonomisk resultat |
| **Total work income** | Brutto inntjening fra oppgaver |
| **Profit margin** | (income - costs) / costs |
| **Work quality** | Gjennomsnittlig quality score (0–1) |
| **Token efficiency** | Inntekt per dollar brukt på tokens |
| **Activity mix** | % work vs. % learn decisions |
| **Task completion rate** | Tasks completed / tasks assigned |

---

## 🔍 Evaluering

### LLM-based Evaluation
- **Evaluator:** GPT-5.2
- **Rubrics:** Category-specific for each of 44 sectors
- **Quality scoring:** 0.0 - 1.0
- **Rigorous assessment:** Sikrer nøyaktig profesjonell vurdering

---

## 💡 Nøkkelinnsikt

### 1. Økonomisk Ansvarliggjøring
Agents må **bevise sin verdi** gjennom faktisk produktivitet, ikke bare tekniske benchmarks.

### 2. Strategiske Valg
Daglige beslutninger:
- **Work** → umiddelbar inntekt
- **Learn** → investere i fremtidig ytelse

Mimer ekte karrierevalg.

### 3. Ekstrem Økonomisk Press
Start med bare $10. En dårlig oppgave eller uforsiktig søk kan tømme balansen.

### 4. Production-Ready Testing
Måler det som faktisk betyr noe:
- Work quality
- Cost efficiency
- Long-term survival

---

## 🚀 Hva Dette Betyr for Oss

### Praktiske Lærdommer:

1. **Cost-Awareness**
   - Hver token koster penger
   - Optimalisering av prompt-lengde
   - Velge riktig modell for oppgaven

2. **Quality vs. Speed Trade-off**
   - Rask svar = lavere kostnad, men kanskje lavere kvalitet
   - Grundig arbeid = høyere kostnad, men bedre betaling

3. **Strategic Decision-Making**
   - Når skal agent "lære" vs. "jobbe"?
   - Investere i kunnskap for bedre fremtidig ytelse

4. **Economic Viability**
   - AI-agenter kan faktisk være økonomisk lønnsomme
   - Top agents: $1,500+/time → overgår human productivity

### Implementering i Vårt Setup:

#### Umiddelbart (Konseptuelt):
- **Cost tracking** → Hvor mye bruker vi på OpenClaw?
- **Task pricing** → Hva er verdien av oppgavene vi automatiserer?
- **ROI-analyse** → Sparer vi mer tid/penger enn vi bruker?

#### Middels (Testing):
- **ClawMode på Nanobot** → Teste økonomisk bevissthet
- **Custom tasks** → Våre egne profesjonelle oppgaver
- **Dashboard** → Visualisere costs/benefits

#### Avansert (Full Integration):
- **Multi-agent competition** → Teste ulike modeller (Claude, GPT, etc.)
- **Custom evaluation** → Egne quality rubrics
- **Production deployment** → Ekte økonomisk accountability

---

## 🎓 Akademisk Kontekst

**HKUDS = Data Intelligence Lab @ Hong Kong University**

Dette er **research-grade** økonomisk benchmark, ikke bare en "proof of concept."

**GDPVal Dataset** = OpenAI's datasett for å estimere AI's bidrag til GDP.

**Metodikk:**
- Rigorous LLM evaluation (GPT-5.2)
- Real-world professional tasks
- BLS wage-based pricing
- Longitudinal survival tracking

---

## 🔗 Lenker & Ressurser

- **GitHub:** https://github.com/HKUDS/ClawWork
- **Live Leaderboard:** https://hkuds.github.io/ClawWork/
- **Nanobot Integration:** [clawmode_integration/README.md](https://github.com/HKUDS/ClawWork/blob/main/clawmode_integration/README.md)

---

## ⚠️ Kritiske Spørsmål

### 1. Er $10K i 7 timer realistisk?
- **Ja, men:** Under optimale forhold, beste modeller
- Real-world: Varierer betydelig
- Kostnadstruktur og task complexity påvirker sterkt

### 2. Kan dette brukes i produksjon?
- **Standalone:** Ja, men krever setup
- **ClawMode:** Ja, kan integreres med eksisterende Nanobot
- **Enterprise:** Krever custom tasks og evaluation rubrics

### 3. Hvilke modeller støttes?
- OpenAI (GPT-4o, GPT-5.2)
- Anthropic (Claude Sonnet)
- Zhipu (GLM)
- Moonshot (Kimi)
- Alibaba (Qwen)

---

## 🎯 Konklusjon

ClawWork er **ikke bare et benchmark** — det er et **paradigmeskifte** i hvordan vi evaluerer AI-agenter:

✅ **Fra tekniske metrics** → **økonomisk verdi**  
✅ **Fra passive svar** → **proaktiv arbeid**  
✅ **Fra cost-ignorance** → **cost-awareness**  
✅ **Fra toy examples** → **real professional tasks**

**For oss:** Dette viser at AI-agenter faktisk kan være **økonomisk lønnsomme** — og gir oss et framework for å **måle vår egen ROI**.

---

*Analysert: 2026-02-18*  
*Status: Research-grade, production-ready*  
*Relevans: Høy — Økonomisk accountability er fremtiden*
