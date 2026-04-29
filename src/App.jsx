import { useState, useEffect, useCallback } from "react"

// ─── RESPONSIVE HOOK ─────────────────────────────────────────────────────────
function useWidth() {
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener("resize", h)
    return () => window.removeEventListener("resize", h)
  }, [])
  return w
}

// ─── BRAND ───────────────────────────────────────────────────────────────────
const C = {
  bg:"#070e1b", surface:"#0a1628", card:"#0d1d35", cardHv:"#112240",
  border:"#172a45", borderLt:"#1e3a5f",
  blue:"#3b82f6", blueDk:"#1d4ed8", blueBg:"#0d1e38", blueBd:"#1e3860",
  white:"#e2e8f0", white2:"#94a3b8", muted:"#475569",
  green:"#10b981", red:"#ef4444", amber:"#f59e0b", cyan:"#06b6d4",
  purple:"#8b5cf6",
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const DEALS = [
  { id:1, type:"Gas Station", icon:"⛽", name:"Shell Station & C-Store", city:"Atlanta", state:"GA", askingPrice:1850000, monthlyRevenue:280000, brand:"Shell", pumps:"8 fueling positions", sqft:2400, hasCstore:true, ownership:"Own land & building", enviro:"No known issues", reason:"Retiring", daysListed:12, featured:true, desc:"High-volume Shell on a signalized corner with full c-store and car wash. Real estate included. Strong in-place cash flow with upside from operational improvements." },
  { id:2, type:"Convenience Store", icon:"🏪", name:"Quick Mart — Corner Location", city:"Charlotte", state:"NC", askingPrice:420000, monthlyRevenue:85000, sqft:1800, hasFuel:false, coolerDoors:"16 doors", lottery:"Yes", beerWine:"Beer & wine", ownership:"Lease — strip mall", leaseRemaining:"3–5 years", reason:"Relocating", daysListed:8, desc:"Stabilized c-store with diversified revenue: lottery, beer/wine, ATM. Favorable lease terms with 3–5 years remaining and renewal options." },
  { id:3, type:"Smoke Shop", icon:"💨", name:"Cloud Nine Vape & Tobacco", city:"Dallas", state:"TX", askingPrice:185000, monthlyRevenue:42000, shopType:"Vape / E-cigarettes", sqft:800, inventoryValue:"$25k–$75k", ownership:"Lease — strip mall", leaseRemaining:"1–3 years", monthlyRent:"$2,500/mo", reason:"Increased competition", daysListed:22, desc:"High-margin vape and tobacco operation near major university. Repeat customer base, strong inventory turns. Platform acquisition opportunity." },
  { id:4, type:"Liquor Store", icon:"🍷", name:"Spirits & Wine Palace", city:"Miami", state:"FL", askingPrice:680000, monthlyRevenue:145000, licenseType:"Full spirits (off-premise)", sqft:3200, inventoryValue:"$150k–$200k", ownership:"Lease — standalone", leaseRemaining:"3–5 years", monthlyRent:"$5,500/mo", reason:"Retiring", daysListed:5, featured:true, desc:"Premium off-premise retailer with 20+ year operating history. High-margin wine and spirits mix, delivery account base, and tourism-driven demand in Miami corridor." },
  { id:5, type:"Gas Station", icon:"⛽", name:"BP Station — High Volume", city:"Houston", state:"TX", askingPrice:2400000, monthlyRevenue:420000, brand:"BP", pumps:"12 fueling positions", sqft:3600, hasCstore:true, ownership:"Own land & building", enviro:"Phase I complete — clean", reason:"Partnership dispute", daysListed:18, desc:"One of Houston's top-volume BP stations. Fee-simple real estate on major arterial. Car wash, full c-store, diesel revenue. Motivated seller — partnership dissolution." },
  { id:6, type:"Convenience Store", icon:"🏪", name:"Family Mart — Airport Corridor", city:"Phoenix", state:"AZ", askingPrice:980000, monthlyRevenue:210000, sqft:3400, hasFuel:false, coolerDoors:"32 doors", lottery:"Yes", beerWine:"Beer & wine", ownership:"Lease — strip mall", leaseRemaining:"5+ years", reason:"Financial hardship", daysListed:3, featured:true, desc:"High-throughput c-store on Phoenix airport access road. 5+ year secured lease, large format, lottery license, strong beer/wine margin. Distressed seller — motivated." },
  { id:7, type:"Liquor Store", icon:"🍷", name:"Fine Spirits Warehouse", city:"Atlanta", state:"GA", askingPrice:1100000, monthlyRevenue:235000, licenseType:"Full spirits (off-premise)", sqft:5200, inventoryValue:"$300k+", ownership:"Own land & building", reason:"Retiring", daysListed:7, desc:"Large-format destination retailer owning the building outright. 4,000+ SKUs, rare whiskey program, high-net-worth clientele. Real estate + business bundle." },
  { id:8, type:"Smoke Shop", icon:"💨", name:"Tobacco World — Strip Mall", city:"Las Vegas", state:"NV", askingPrice:310000, monthlyRevenue:68000, shopType:"Tobacco / Cigarettes", sqft:1200, inventoryValue:"$50k–$100k", ownership:"Lease — inline retail", leaseRemaining:"3+ years", monthlyRent:"$3,800/mo", reason:"Relocating", daysListed:15, desc:"High-traffic tobacco shop in densely populated Las Vegas residential corridor. Strong cigarette and premium cigar volume. Add-on/roll-up target." },
  { id:9, type:"Gas Station", icon:"⛽", name:"ExxonMobil Corner Station", city:"Nashville", state:"TN", askingPrice:1250000, monthlyRevenue:195000, brand:"ExxonMobil", pumps:"6 fueling positions", sqft:1800, hasCstore:true, ownership:"Lease — oil company", enviro:"No known issues", reason:"Too many headaches", daysListed:45, desc:"ExxonMobil branded station in fast-growing Nashville suburb. C-store with lottery and fresh food. Oil company lease structure. Extended days on market — pricing opportunity." },
  { id:10, type:"Liquor Store", icon:"🍷", name:"Corner Liquor & Deli", city:"Brooklyn", state:"NY", askingPrice:495000, monthlyRevenue:110000, licenseType:"Beer & wine only", sqft:1400, inventoryValue:"$75k–$100k", ownership:"Lease — inline", leaseRemaining:"1–3 years", monthlyRent:"$6,200/mo", reason:"Lease ending", daysListed:19, desc:"15-year operating history in high-density Brooklyn location. Beer/wine license with deli component. Short lease creates pricing leverage — upgrade to full spirits post-acquisition." },
  { id:11, type:"Convenience Store", icon:"🏪", name:"Express Stop — Gas & Go", city:"Chicago", state:"IL", askingPrice:750000, monthlyRevenue:160000, sqft:2800, hasFuel:true, coolerDoors:"24 doors", lottery:"Yes", beerWine:"Beer & wine", ownership:"Own land & building", reason:"Estate / Inherited", daysListed:31, desc:"Fee-simple c-store and fuel in stable Chicago neighborhood. Multiple income streams: fuel margin, lottery, ATM, beer/wine. Estate sale — clean title, motivated heirs." },
  { id:12, type:"Smoke Shop", icon:"💨", name:"The Hookah Lounge & Shop", city:"Los Angeles", state:"CA", askingPrice:240000, monthlyRevenue:55000, shopType:"Hookah Lounge", sqft:1600, inventoryValue:"$25k–$75k", ownership:"Lease — standalone", leaseRemaining:"3–5 years", monthlyRent:"$4,200/mo", reason:"Just exploring options", daysListed:10, desc:"Profitable hookah lounge and retail concept in LA's South Bay. Strong evening/weekend revenue, existing lounge infrastructure. Concept roll-up or operator play." },
]

const LENDERS = [
  { name:"Live Oak Bank", icon:"🏦", tier:"SBA Specialist", url:"https://www.liveoak.bank", programs:["SBA 7(a)","SBA 504"], down:"10–15%", rate:"8.25–9.5%", max:"$5M+", ltv:"85–90%", note:"#1 SBA lender for fuel and convenience retail. Fastest closing timelines in the market." },
  { name:"Newtek Business Finance", icon:"🏛️", tier:"Licensed Retail", url:"https://www.newtekone.com", programs:["SBA 7(a)","Express"], down:"10–20%", rate:"8.5–10%", max:"$5M", ltv:"80–90%", note:"Specialized underwriting for alcohol and tobacco licensed businesses. Strong state board relationships." },
  { name:"Fountainhead SBF", icon:"💼", tier:"Real Estate + Business", url:"https://www.fountainheadcc.com", programs:["SBA 504","SBA 7(a)"], down:"10–15%", rate:"7.5–9%", max:"$10M+", ltv:"85–90%", note:"Ideal for fee-simple acquisitions. SBA 504 maximizes leverage on owner-occupied real estate." },
  { name:"Celtic Bank", icon:"🏢", tier:"Lease-Based Assets", url:"https://www.celticbank.com", programs:["SBA 7(a)"], down:"10–30%", rate:"8.75–10.5%", max:"$2M", ltv:"70–90%", note:"Flexible credit box for lease-based businesses. Evaluates cash flow, not just collateral." },
  { name:"Byline Bank", icon:"🏦", tier:"Community / Conventional", url:"https://www.bylinebank.com", programs:["SBA 7(a)","Conventional"], down:"15–25%", rate:"8–9.5%", max:"$3M", ltv:"75–85%", note:"Community bank with deep track record on main street acquisitions. Conventional options for experienced operators." },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt   = n => "$" + Math.round(n).toLocaleString()
const fmtK  = n => n >= 1e6 ? "$" + (n/1e6).toFixed(2)+"M" : "$" + Math.round(n/1000)+"k"
const fmtPct= n => n.toFixed(1) + "%"

function pmt(P, apr, yrs) {
  const r = apr/12, n = yrs*12
  return P * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1)
}

function getMetrics(d) {
  const annRev = d.monthlyRevenue * 12
  const margins = {"Gas Station":0.11,"Convenience Store":0.16,"Smoke Shop":0.24,"Liquor Store":0.19}
  const mults   = {"Gas Station":[2.5,4.0],"Convenience Store":[2.0,3.5],"Smoke Shop":[1.5,3.0],"Liquor Store":[2.0,3.5]}
  const margin  = margins[d.type] || 0.15
  const [lo,hi] = mults[d.type] || [2,3]
  const ebitda  = annRev * margin
  const evLow   = Math.round(ebitda * lo / 5000) * 5000
  const evMid   = Math.round(ebitda * ((lo+hi)/2) / 5000) * 5000
  const evHigh  = Math.round(ebitda * hi / 5000) * 5000
  const capRate = fmtPct((ebitda / d.askingPrice) * 100)
  const revMult = (d.askingPrice / annRev).toFixed(2) + "x"
  const ebitdaMult = (d.askingPrice / ebitda).toFixed(2) + "x"
  const r = d.askingPrice / evMid
  const verdict = r < 0.85 ? {t:"Below Market",e:"▼",c:C.green}
    : r > 1.15 ? {t:"Above Market",e:"▲",c:C.red}
    : {t:"At Market",e:"◆",c:C.amber}
  // Deal score (0-100)
  let score = 50
  if (r < 0.85) score += 18
  else if (r < 0.95) score += 10
  else if (r > 1.2) score -= 12
  if (d.ownership?.includes("Own")) score += 14
  if (d.featured) score += 6
  if (d.daysListed <= 7) score += 8
  else if (d.daysListed > 30) score -= 6
  if (!d.enviro || d.enviro.includes("No known")) score += 4
  score = Math.max(10, Math.min(99, Math.round(score)))
  const scoreColor = score >= 75 ? C.green : score >= 55 ? C.amber : C.red
  // CoC return estimate (annual SDE / equity down)
  const downAmt = d.askingPrice * 0.15
  const loanAmt = d.askingPrice * 0.85
  const annDebtSvc = pmt(loanAmt, 0.0875, 10) * 12
  const cocReturn = fmtPct(((ebitda - annDebtSvc) / downAmt) * 100)
  return { annRev, ebitda, evLow, evMid, evHigh, margin, lo, hi, capRate, revMult, ebitdaMult, verdict, score, scoreColor, cocReturn, annDebtSvc }
}

// ─── TYPE TAG ─────────────────────────────────────────────────────────────────
function TypeTag({type, small}) {
  const map = {"Gas Station":[C.amber,"rgba(245,158,11,0.12)"],"Convenience Store":[C.green,"rgba(16,185,129,0.12)"],"Smoke Shop":[C.purple,"rgba(139,92,246,0.12)"],"Liquor Store":[C.red,"rgba(239,68,68,0.12)"]}
  const [col, bg] = map[type] || [C.blue, C.blueBg]
  const sz = small ? 9 : 10
  return <span style={{background:bg,color:col,border:`1px solid ${col}25`,borderRadius:3,fontSize:sz,fontWeight:700,letterSpacing:"0.08em",padding:"2px 7px",textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"'Outfit',sans-serif"}}>{type}</span>
}

// ─── DEAL SCORE BADGE ─────────────────────────────────────────────────────────
function ScoreBadge({score, color, size=32}) {
  const r = (size/2) - 3
  const circ = 2 * Math.PI * r
  const dash = (score/100) * circ
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={3}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:size<36?9:11,fontWeight:700,color}}>{score}</div>
    </div>
  )
}

// ─── DEAL CARD ────────────────────────────────────────────────────────────────
function DealCard({d, onSelect}) {
  const m = getMetrics(d)
  const [hov, setHov] = useState(false)
  return (
    <div onClick={()=>onSelect(d)}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?C.cardHv:C.card,border:`1px solid ${hov?C.borderLt:C.border}`,borderRadius:10,overflow:"hidden",cursor:"pointer",transition:"all 0.18s",boxShadow:hov?"0 8px 32px rgba(59,130,246,0.08)":"none"}}>
      {/* Header strip */}
      <div style={{background:C.surface,padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:10,minWidth:0}}>
          <span style={{fontSize:24,flexShrink:0}}>{d.icon}</span>
          <div style={{minWidth:0}}>
            <TypeTag type={d.type}/>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:C.white2,marginTop:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.city}, {d.state}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          {d.featured && <span style={{background:"rgba(245,158,11,0.1)",color:C.amber,border:`1px solid rgba(245,158,11,0.2)`,borderRadius:3,fontSize:9,fontWeight:700,padding:"2px 6px",letterSpacing:"0.08em"}}>FEATURED</span>}
          <ScoreBadge score={m.score} color={m.scoreColor} size={34}/>
        </div>
      </div>
      {/* Body */}
      <div style={{padding:"14px 16px"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:C.white,marginBottom:12,lineHeight:1.3}}>{d.name}</div>
        {/* Key metrics grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 0",marginBottom:12}}>
          {[
            ["ASKING PRICE", fmtK(d.askingPrice), C.white],
            ["GROSS REVENUE", fmtK(d.monthlyRevenue*12)+"/yr", C.white2],
            ["EST. EBITDA", fmtK(m.ebitda)+"/yr", C.green],
            ["CAP RATE", m.capRate, m.verdict.c],
            ["EV RANGE", `${fmtK(m.evLow)}–${fmtK(m.evHigh)}`, C.cyan],
            ["EBITDA MULT", m.ebitdaMult, m.verdict.c],
          ].map(([k,v,col])=>(
            <div key={k}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:C.muted,marginBottom:2}}>{k}</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:col}}>{v}</div>
            </div>
          ))}
        </div>
        {/* Verdict + CoC */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 10px"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:C.muted,marginBottom:3}}>VALUATION</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:m.verdict.c}}>{m.verdict.e} {m.verdict.t}</div>
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 10px"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.1em",color:C.muted,marginBottom:3}}>EST. COC RETURN</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:C.green}}>{m.cocReturn}</div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{padding:"8px 16px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.muted}}>{d.daysListed}d on market</span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.blue,fontWeight:600}}>{d.ownership?.includes("Own")?"Fee Simple":"Leasehold"}</span>
      </div>
    </div>
  )
}

// ─── DEAL ROW (table) ─────────────────────────────────────────────────────────
function DealRow({d, onSelect, isMobile}) {
  const m = getMetrics(d)
  if (isMobile) return (
    <div onClick={()=>onSelect(d)} style={{padding:"13px 14px",borderBottom:`1px solid ${C.border}`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"background 0.15s"}}
      onTouchStart={e=>e.currentTarget.style.background=C.cardHv}
      onTouchEnd={e=>e.currentTarget.style.background="transparent"}>
      <span style={{fontSize:24,flexShrink:0}}>{d.icon}</span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:C.white,marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.white2}}>{d.city}, {d.state}</span>
          <TypeTag type={d.type} small/>
        </div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:C.white}}>{fmtK(d.askingPrice)}</div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:600,color:m.verdict.c}}>{m.verdict.e} {m.capRate} cap</div>
      </div>
    </div>
  )
  return (
    <tr onClick={()=>onSelect(d)} style={{cursor:"pointer",borderBottom:`1px solid ${C.border}`,transition:"background 0.15s"}}
      onMouseEnter={e=>e.currentTarget.style.background=C.cardHv}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
      <td style={{padding:"12px 16px",width:32}}>
        <ScoreBadge score={m.score} color={m.scoreColor} size={30}/>
      </td>
      <td style={{padding:"12px 8px"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:C.white,marginBottom:2}}>{d.name}</div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.white2}}>{d.city}, {d.state}</div>
      </td>
      <td style={{padding:"12px 8px"}}><TypeTag type={d.type} small/></td>
      <td style={{padding:"12px 8px",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.white,fontSize:13}}>{fmtK(d.askingPrice)}</td>
      <td style={{padding:"12px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.white2}}>{fmtK(d.monthlyRevenue)}/mo</td>
      <td style={{padding:"12px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.green,fontWeight:600}}>{fmtK(m.ebitda)}/yr</td>
      <td style={{padding:"12px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:m.verdict.c,fontWeight:600}}>{m.capRate}</td>
      <td style={{padding:"12px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:m.verdict.c}}>{m.ebitdaMult}</td>
      <td style={{padding:"12px 8px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.cyan}}>{fmtK(m.evLow)}–{fmtK(m.evHigh)}</td>
      <td style={{padding:"12px 16px"}}>
        <button style={{background:C.blue,color:"#fff",border:"none",borderRadius:4,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Outfit',sans-serif",letterSpacing:"0.04em"}}>VIEW</button>
      </td>
    </tr>
  )
}

// ─── VALUATION PANEL ─────────────────────────────────────────────────────────
function ValuationPanel({d}) {
  const m = getMetrics(d)
  const [ai, setAi] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadAI = useCallback(async () => {
    setLoading(true)
    const prompt = [
      "You are a private equity analyst specializing in main street retail acquisitions: gas stations, convenience stores, smoke shops, and liquor stores.",
      "",
      "Deal: " + d.type + " - " + d.name,
      "Location: " + d.city + ", " + d.state,
      "Asking Price: " + fmt(d.askingPrice) + " | EBITDA Multiple: " + m.ebitdaMult + " | Cap Rate: " + m.capRate,
      "Annual Revenue: " + fmt(m.annRev) + " | Est. EBITDA: " + fmt(m.ebitda),
      "EV Range: " + fmt(m.evLow) + " to " + fmt(m.evHigh) + " | Valuation: " + m.verdict.t,
      "Ownership: " + (d.ownership || "N/A") + " | Deal Score: " + m.score + "/100",
      d.enviro ? "Environmental: " + d.enviro : "",
      "",
      "Respond in PE/institutional language. Return ONLY valid JSON (no markdown, no backticks):",
      '{"thesis":"2-sentence acquisition thesis","valueCreation":["lever1","lever2"],"risks":["risk1","risk2"],"exitStrategy":"1-sentence exit thought","comparables":"brief comp context"}'
    ].join("\n")
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 700, messages: [{ role: "user", content: prompt }] })
      })
      const data = await res.json()
      const txt = data.content?.[0]?.text || "{}"
      setAi(JSON.parse(txt.replace(/```json|```/g, "").trim()))
    } catch(e) {
      setAi({ thesis: "Unable to load analysis. Please retry.", valueCreation: [], risks: [], exitStrategy: "", comparables: "" })
    }
    setLoading(false)
  }, [d.id])

  useEffect(() => { loadAI() }, [loadAI])

  // DCF simple 5-yr
  const yr1FCF = m.ebitda - m.annDebtSvc
  const termVal = m.ebitda * 3.0
  const dcfEst  = yr1FCF * 3.5 + termVal * 0.62 // rough PV at 10% discount

  const barPct = (v, lo, hi) => Math.max(2, Math.min(96, ((v-lo)/(hi-lo))*100))
  const bLo = d.askingPrice * 0.5, bHi = d.askingPrice * 1.7

  return (
    <div>
      {/* EV Range visualizer */}
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:18,marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.white2}}>Enterprise Value Range</span>
          <span style={{background:`${m.verdict.c}18`,color:m.verdict.c,border:`1px solid ${m.verdict.c}30`,borderRadius:3,fontSize:11,fontWeight:700,padding:"3px 10px",fontFamily:"'JetBrains Mono',monospace"}}>{m.verdict.e} {m.verdict.t}</span>
        </div>
        <div style={{position:"relative",height:8,background:C.border,borderRadius:4,marginBottom:16}}>
          <div style={{position:"absolute",left:`${barPct(m.evLow,bLo,bHi)}%`,width:`${barPct(m.evHigh,bLo,bHi)-barPct(m.evLow,bLo,bHi)}%`,height:"100%",background:`linear-gradient(90deg,${C.green}80,${C.green})`,borderRadius:4}}/>
          <div style={{position:"absolute",left:`${barPct(d.askingPrice,bLo,bHi)}%`,transform:"translateX(-50%)",top:-5,width:18,height:18,background:C.blue,borderRadius:"50%",border:"2px solid "+C.bg,boxShadow:"0 0 8px "+C.blue}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
          {[["EV LOW",fmt(m.evLow),C.white2],["EV MID",fmt(m.evMid||m.evLow),C.green],["EV HIGH",fmt(m.evHigh),C.white2],["ASKING",fmt(d.askingPrice),C.blue]].map(([k,v,col])=>(
            <div key={k} style={{textAlign:"center",background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 4px"}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.08em",marginBottom:3}}>{k}</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:col}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Metrics grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
        {[["Annual Revenue",fmt(m.annRev),C.white],["Est. EBITDA",fmt(m.ebitda),C.green],["EBITDA Margin",fmtPct(m.margin*100),C.white2],["Cap Rate",m.capRate,m.verdict.c],["Rev Multiple",m.revMult,C.white2],["EBITDA Multiple",m.ebitdaMult,m.verdict.c]].map(([k,v,col])=>(
          <div key={k} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>{k}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:col}}>{v}</div>
          </div>
        ))}
      </div>
      {/* Simple DCF callout */}
      <div style={{background:C.card,border:`1px solid ${C.borderLt}`,borderRadius:8,padding:"12px 14px",marginBottom:14}}>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.cyan,marginBottom:8}}>Simplified 5-Yr DCF Estimate</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["Yr 1 FCF (levered)",fmt(Math.max(0,yr1FCF))],["Terminal Value (3x)",fmt(termVal)],["DCF Est.",fmt(Math.max(0,dcfEst))]].map(([k,v])=>(
            <div key={k}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,marginBottom:2}}>{k}</div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,fontWeight:700,color:C.white}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      {/* AI Thesis Panel */}
      <div style={{background:"linear-gradient(135deg,#0a1628,#0d1e38)",border:`1px solid ${C.borderLt}`,borderRadius:10,padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <span style={{fontSize:16}}>🤖</span>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.blue}}>AI Acquisition Analysis</span>
          {loading && <span style={{fontSize:11,color:C.muted,marginLeft:"auto",fontFamily:"'Outfit',sans-serif"}}>Analyzing deal…</span>}
        </div>
        {loading ? (
          <div style={{display:"flex",gap:5}}>
            {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:C.blue,animation:`blink ${0.7+i*0.2}s ease infinite alternate`}}/>)}
          </div>
        ) : ai ? (
          <div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,lineHeight:1.75,color:C.white2,marginBottom:16,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>{ai.thesis}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
              {[["Value Creation Levers",ai.valueCreation,C.green],["Risk Factors",ai.risks,C.red]].map(([title,items,col])=>(
                <div key={title}>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,color:col,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>{title}</div>
                  {items?.map((s,i)=><div key={i} style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2,marginBottom:5,display:"flex",gap:6}}><span style={{color:col,flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>→</span>{s}</div>)}
                </div>
              ))}
            </div>
            {ai.exitStrategy && (
              <div style={{padding:"10px 12px",background:C.surface,borderRadius:6,borderLeft:`3px solid ${C.cyan}`,marginBottom:10}}>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,color:C.cyan,textTransform:"uppercase",letterSpacing:"0.08em"}}>Exit Strategy — </span>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2}}>{ai.exitStrategy}</span>
              </div>
            )}
            {ai.comparables && (
              <div style={{padding:"10px 12px",background:C.surface,borderRadius:6,borderLeft:`3px solid ${C.purple}`}}>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,color:C.purple,textTransform:"uppercase",letterSpacing:"0.08em"}}>Comp Context — </span>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2}}>{ai.comparables}</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <style>{`@keyframes blink{from{opacity:.2}to{opacity:1}}`}</style>
    </div>
  )
}

// ─── FINANCING PANEL ─────────────────────────────────────────────────────────
function FinancingPanel({d}) {
  const [down, setDown] = useState(15)
  const [rate, setRate] = useState(8.75)
  const [term, setTerm] = useState(10)
  const loanAmt   = d.askingPrice * (1-down/100)
  const moPmt     = pmt(loanAmt, rate/100, term)
  const annDebtSvc= moPmt * 12
  const m         = getMetrics(d)
  const dscr      = m.ebitda / annDebtSvc
  const cocReturn = ((m.ebitda - annDebtSvc) / (d.askingPrice*(down/100))) * 100

  const sliderStyle = {width:"100%", accentColor:C.blue}
  const metBox = (k,v,col) => (
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>{k}</div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,fontWeight:700,color:col}}>{v}</div>
    </div>
  )

  return (
    <div>
      {/* Calculator */}
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:18,marginBottom:14}}>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.blue,marginBottom:16}}>Debt Structure Calculator</div>
        {[{label:"Equity / Down",val:down,set:setDown,min:10,max:40,step:5,unit:"%"},
          {label:"Interest Rate",val:rate,set:setRate,min:5.5,max:14,step:0.25,unit:"%"},
          {label:"Amortization",val:term,set:setTerm,min:5,max:25,step:5,unit:"yrs"}
        ].map(({label,val,set,min,max,step,unit})=>(
          <div key={label} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2}}>{label}</span>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,color:C.blue}}>{val}{unit}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={val} onChange={e=>set(Number(e.target.value))} style={sliderStyle}/>
          </div>
        ))}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:4,marginBottom:10}}>
          {metBox("Equity",fmt(d.askingPrice*(down/100)),C.amber)}
          {metBox("Senior Debt",fmt(loanAmt),C.blue)}
          {metBox("Mo. Debt Svc",fmt(moPmt),C.white)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{background:dscr>=1.25?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${dscr>=1.25?C.green:C.red}30`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>DSCR</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:15,fontWeight:700,color:dscr>=1.25?C.green:C.red}}>{dscr.toFixed(2)}x</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:C.muted,marginTop:2}}>{dscr>=1.25?"✓ Bankable":"⚠ Below 1.25x"}</div>
          </div>
          <div style={{background:cocReturn>0?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)",border:`1px solid ${cocReturn>0?C.green:C.red}30`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Cash-on-Cash</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:15,fontWeight:700,color:cocReturn>0?C.green:C.red}}>{fmtPct(cocReturn)}</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:C.muted,marginTop:2}}>Est. Yr 1 levered</div>
          </div>
        </div>
      </div>
      {/* SBA programs */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {[["SBA 7(a)","Business acquisition","10% min equity","$5M max"],["SBA 504","Owner-occ. real estate","10% min equity","$20M max"]].map(([name,desc,eq,max])=>(
          <div key={name} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:C.white,marginBottom:3}}>{name}</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.white2,marginBottom:8}}>{desc}</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.blue}}>{eq} · Max {max}</div>
          </div>
        ))}
      </div>
      {/* Lenders */}
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:10}}>Approved Lender Network</div>
      {LENDERS.map(ln=>(
        <a key={ln.name} href={ln.url} target="_blank" rel="noreferrer"
          style={{display:"block",background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",textDecoration:"none",marginBottom:8,transition:"border-color 0.15s"}}
          onMouseEnter={e=>e.currentTarget.style.borderColor=C.blue}
          onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6,flexWrap:"wrap",gap:6}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18}}>{ln.icon}</span>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:C.white}}>{ln.name}</span>
              <span style={{background:`${C.blue}18`,color:C.blue,border:`1px solid ${C.blue}25`,borderRadius:3,fontSize:9,fontWeight:700,padding:"2px 6px",letterSpacing:"0.06em"}}>{ln.tier}</span>
            </div>
            <div style={{display:"flex",gap:4}}>{ln.programs.map(p=><span key={p} style={{background:`${C.cyan}15`,color:C.cyan,border:`1px solid ${C.cyan}25`,borderRadius:3,fontSize:9,fontWeight:700,padding:"2px 6px"}}>{p}</span>)}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:6}}>
            {[["Equity",ln.down],[`Rate`,ln.rate],["Max",ln.max]].map(([k,v])=>(
              <div key={k}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,marginBottom:1}}>{k}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:600,color:C.white2}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.muted,fontStyle:"italic"}}>{ln.note}</div>
        </a>
      ))}
    </div>
  )
}

// ─── LOI FORM ────────────────────────────────────────────────────────────────
function LOIForm({d, user, onSubmit, existingLOI}) {
  const [form, setForm] = useState({entity:"",offerPrice:"",structure:"Asset Purchase",equity:"",financing:"SBA 7(a)",ddPeriod:"45 days",earnout:"None",conditions:"",thesis:""})
  const [done, setDone] = useState(!!existingLOI)
  const upd = (k,v) => setForm(p=>({...p,[k]:v}))
  const inp = {width:"100%",fontFamily:"'Outfit',sans-serif",fontSize:13,color:C.white,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px",outline:"none",boxSizing:"border-box"}

  if (done || existingLOI) return (
    <div style={{textAlign:"center",padding:"48px 16px"}}>
      <div style={{fontSize:48,marginBottom:16}}>📋</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:8}}>LOI Submitted</div>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,color:C.white2,lineHeight:1.7}}>Your Letter of Intent for <strong style={{color:C.white}}>{d.name}</strong> has been transmitted to the deal team. Expect a response within 24–48 hours.</div>
    </div>
  )
  if (!user) return (
    <div style={{textAlign:"center",padding:"48px 16px"}}>
      <div style={{fontSize:40,marginBottom:16}}>🔐</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:C.white,marginBottom:8}}>Verified Buyer Account Required</div>
      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:C.white2}}>Create a TillStreet buyer account to submit LOIs and access full deal documentation.</div>
    </div>
  )

  const fld = (label, key, ph, type="text") => (
    <div style={{marginBottom:11}}>
      <label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>{label}</label>
      <input type={type} placeholder={ph} value={form[key]} onChange={e=>upd(key,e.target.value)} style={inp}
        onFocus={e=>{e.target.style.borderColor=C.blue;e.target.style.background=C.blueBg}}
        onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.surface}}/>
    </div>
  )
  const sel = (label, key, opts) => (
    <div style={{marginBottom:11}}>
      <label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>{label}</label>
      <select value={form[key]} onChange={e=>upd(key,e.target.value)} style={{...inp,cursor:"pointer"}}>
        {opts.map(o=><option key={o} style={{background:C.surface}}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <div>
      <div style={{background:`${C.blue}12`,border:`1px solid ${C.blue}30`,borderRadius:8,padding:"10px 14px",marginBottom:16,fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.blue}}>
        📋 This LOI is non-binding and subject to due diligence. All terms are indicative and for discussion purposes only.
      </div>
      {fld("Buyer Entity / Fund Name","entity","Patel Capital Partners LLC")}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {fld("Proposed Purchase Price ($)","offerPrice","e.g. 1,700,000")}
        {fld("Equity Contribution ($)","equity","e.g. 300,000")}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {sel("Deal Structure","structure",["Asset Purchase","Stock Purchase","Hybrid / TBD"])}
        {sel("Financing","financing",["SBA 7(a)","SBA 504","Conventional","All Equity","Seller Financing","TBD"])}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {sel("Due Diligence Period","ddPeriod",["30 days","45 days","60 days","90 days"])}
        {sel("Earnout / Holdback","earnout",["None","5% holdback 12mo","10% earnout","Custom — see notes"])}
      </div>
      {sel("Closing Conditions","conditions",["Standard reps & warranties","Financing contingency","License transfer contingency","Environmental contingency","All of the above"])}
      <div style={{marginBottom:14}}>
        <label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>Acquisition Thesis / Buyer Background</label>
        <textarea placeholder="Brief statement of your acquisition strategy, operating experience, and value creation plan…" value={form.thesis} onChange={e=>upd("thesis",e.target.value)}
          style={{...inp,resize:"none",height:88}}
          onFocus={e=>{e.target.style.borderColor=C.blue;e.target.style.background=C.blueBg}}
          onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.surface}}/>
      </div>
      <button onClick={()=>{onSubmit({...form,dealId:d.id,dealName:d.name,ts:new Date().toISOString()});setDone(true)}}
        style={{width:"100%",background:C.blue,color:"#fff",border:"none",borderRadius:8,padding:"14px",fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:"0.04em",transition:"background 0.15s"}}
        onMouseEnter={e=>e.target.style.background=C.blueDk}
        onMouseLeave={e=>e.target.style.background=C.blue}>
        Submit Letter of Intent →
      </button>
    </div>
  )
}

// ─── DEAL MODAL ───────────────────────────────────────────────────────────────
function DealModal({d, onClose, user, lois, onLOI}) {
  const [tab, setTab] = useState("overview")
  const isMobile = useWidth() < 640
  const m = getMetrics(d)
  const existing = lois.find(l=>l.dealId===d.id)

  useEffect(() => { document.body.style.overflow="hidden"; return()=>{ document.body.style.overflow="" }}, [])

  const tabs = [["overview","📋","Overview"],["valuation","📊","Valuation"],["financing","💰","Financing"],["loi","📝","LOI"]]

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:1000,display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",padding:isMobile?"0":"20px"}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:C.card,border:`1px solid ${C.borderLt}`,borderRadius:isMobile?"16px 16px 0 0":"14px",width:"100%",maxWidth:isMobile?"100%":"700px",maxHeight:isMobile?"92vh":"90vh",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 40px 120px rgba(0,0,0,0.6)"}}>
        {/* Modal header */}
        <div style={{background:C.surface,padding:"18px 20px 0",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
            <span style={{fontSize:30,flexShrink:0}}>{d.icon}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:isMobile?17:20,fontWeight:700,color:C.white,lineHeight:1.2,marginBottom:4}}>{d.name}</div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2}}>{d.city}, {d.state}</span>
                <TypeTag type={d.type} small/>
                {existing && <span style={{background:`${C.green}15`,color:C.green,border:`1px solid ${C.green}25`,borderRadius:3,fontSize:9,fontWeight:700,padding:"2px 6px"}}>✓ LOI SUBMITTED</span>}
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <ScoreBadge score={m.score} color={m.scoreColor} size={38}/>
              <button onClick={onClose} style={{background:`${C.white}10`,border:"none",color:C.white2,borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
          </div>
          {/* Quick KPIs */}
          <div style={{display:"grid",gridTemplateColumns:`repeat(${isMobile?3:5},1fr)`,background:C.card,borderRadius:"8px 8px 0 0",overflow:"hidden",margin:"0 -20px",borderTop:`1px solid ${C.border}`}}>
            {[["ASKING",fmtK(d.askingPrice)],["EBITDA",fmtK(m.ebitda)+"/yr"],["CAP RATE",m.capRate],!isMobile&&["EV RANGE",fmtK(m.evLow)+"–"+fmtK(m.evHigh)],!isMobile&&["COC",m.cocReturn]].filter(Boolean).map(([k,v])=>(
              <div key={k} style={{padding:"10px 6px",textAlign:"center",borderRight:`1px solid ${C.border}`}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.08em",marginBottom:3}}>{k}</div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:isMobile?12:13,fontWeight:700,color:C.white}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",background:C.surface,borderBottom:`1px solid ${C.border}`,flexShrink:0,overflowX:"auto"}}>
          {tabs.map(([key,icon,label])=>(
            <button key={key} onClick={()=>setTab(key)}
              style={{flex:1,padding:"11px 6px",border:"none",background:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:isMobile?11:12,fontWeight:tab===key?700:400,color:tab===key?C.blue:C.muted,borderBottom:tab===key?`2px solid ${C.blue}`:"2px solid transparent",whiteSpace:"nowrap",minWidth:60,transition:"all 0.15s"}}>
              {isMobile?icon:`${icon} ${label}`}
            </button>
          ))}
        </div>
        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"20px 20px 28px"}}>
          {tab==="overview" && (
            <div>
              <p style={{fontFamily:"'Outfit',sans-serif",fontSize:14,lineHeight:1.75,color:C.white2,marginBottom:16}}>{d.desc}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[["Business Type",d.type],d.brand&&["Brand",d.brand],d.pumps&&["Fuel Positions",d.pumps],d.sqft&&["Floor Area",d.sqft.toLocaleString()+" sq ft"],d.hasCstore&&["C-Store","Attached"],d.hasFuel&&["Fuel","On-site pumps"],d.coolerDoors&&["Cooler Doors",d.coolerDoors],d.lottery&&["Lottery",d.lottery],d.beerWine&&["Beer/Wine",d.beerWine],d.licenseType&&["License",d.licenseType],d.shopType&&["Format",d.shopType],d.inventoryValue&&["Inventory",d.inventoryValue],["Ownership",d.ownership],d.leaseRemaining&&["Lease Remaining",d.leaseRemaining],d.monthlyRent&&["Monthly Rent",d.monthlyRent],d.enviro&&["Environmental",d.enviro],["Reason for Sale",d.reason],["Days on Market",d.daysListed+" days"]].filter(Boolean).map(([k,v])=>(
                  <div key={k} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 12px"}}>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>{k}</div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,color:C.white}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="valuation"  && <ValuationPanel d={d}/>}
          {tab==="financing"  && <FinancingPanel d={d}/>}
          {tab==="loi"        && <LOIForm d={d} user={user} onSubmit={onLOI} existingLOI={existing}/>}
        </div>
      </div>
    </div>
  )
}

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({mode:init, onClose, onAuth}) {
  const [mode, setMode] = useState(init)
  const [form, setForm] = useState({name:"",email:"",firm:"",aum:"",phone:"",password:""})
  const upd = (k,v) => setForm(p=>({...p,[k]:v}))
  const inp = {width:"100%",fontFamily:"'Outfit',sans-serif",fontSize:13,color:C.white,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px",outline:"none",boxSizing:"border-box"}
  const fld=(label,key,ph,type="text")=>(
    <div style={{marginBottom:10}}>
      <label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>{label}</label>
      <input type={type} placeholder={ph} value={form[key]} onChange={e=>upd(key,e.target.value)} style={inp}
        onFocus={e=>{e.target.style.borderColor=C.blue;e.target.style.background=C.blueBg}}
        onBlur={e=>{e.target.style.borderColor=C.border;e.target.style.background=C.surface}}/>
    </div>
  )
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:C.card,border:`1px solid ${C.borderLt}`,borderRadius:12,width:"100%",maxWidth:420,overflow:"hidden",boxShadow:"0 40px 100px rgba(0,0,0,0.6)"}}>
        <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"28px 28px 24px",textAlign:"center"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.blue,marginBottom:8}}>TILL STREET</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:700,color:C.white,marginBottom:4}}>{mode==="login"?"Sign In":"Create Buyer Account"}</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.muted}}>{mode==="login"?"Access your deal pipeline":"Institutional & individual buyers welcome"}</div>
        </div>
        <div style={{padding:"22px 28px 28px"}}>
          {mode==="register" && fld("Full Name","name","Alex Morgan")}
          {fld("Email","email","alex@fundname.com","email")}
          {mode==="register" && <>
            {fld("Firm / Fund Name","firm","Morgan Capital Partners LLC")}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {fld("AUM / Deal Size Target","aum","e.g. $1M–$5M per deal")}
              {fld("Phone","phone","(555) 000-0000")}
            </div>
          </>}
          {fld("Password","password","••••••••","password")}
          <button onClick={()=>onAuth({name:form.name||form.email.split("@")[0],email:form.email,firm:form.firm,aum:form.aum,phone:form.phone})}
            style={{width:"100%",background:C.blue,color:"#fff",border:"none",borderRadius:8,padding:"13px",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"0.04em",marginTop:6,marginBottom:14,transition:"background 0.15s"}}
            onMouseEnter={e=>e.target.style.background=C.blueDk}
            onMouseLeave={e=>e.target.style.background=C.blue}>
            {mode==="login"?"Sign In →":"Access Deal Flow →"}
          </button>
          <div style={{textAlign:"center",fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.muted}}>
            {mode==="login"?<>No account? <span onClick={()=>setMode("register")} style={{color:C.blue,cursor:"pointer",fontWeight:600}}>Register</span></>:<>Already registered? <span onClick={()=>setMode("login")} style={{color:C.blue,cursor:"pointer",fontWeight:600}}>Sign in</span></>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({user, lois}) {
  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 16px 80px"}}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"24px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{width:56,height:56,borderRadius:8,background:C.blueBg,border:`1px solid ${C.blueBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:C.blue,flexShrink:0}}>{user?.name?.[0]?.toUpperCase()||"B"}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:2}}>{user?.name}</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2}}>{user?.email}</div>
            {user?.firm&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.blue,marginTop:2}}>🏢 {user.firm} {user.aum?`· ${user.aum}`:""}</div>}
          </div>
          <div style={{display:"flex",gap:16}}>
            {[["LOIs",lois.length],[" Active","—"],["Closed","—"]].map(([k,v])=>(
              <div key={k} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:24,fontWeight:700,color:C.blue,lineHeight:1}}>{v}</div>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginTop:3}}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:12}}>LOI Pipeline</div>
      {lois.length===0?(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"48px 16px",textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:12}}>📭</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:C.white,marginBottom:6}}>No LOIs submitted yet</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,color:C.muted}}>Browse the deal flow and submit your first Letter of Intent</div>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {lois.map((l,i)=>(
            <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"16px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:C.white,marginBottom:3}}>{l.dealName}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.muted}}>{new Date(l.ts).toLocaleDateString()} · {l.structure} · {l.financing}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:17,fontWeight:700,color:C.blue}}>{l.offerPrice?"$"+Number(l.offerPrice.replace(/[^0-9]/g,"")).toLocaleString():"Price TBD"}</div>
                  <span style={{background:`${C.green}15`,color:C.green,border:`1px solid ${C.green}25`,borderRadius:3,fontSize:9,fontWeight:700,padding:"2px 8px",fontFamily:"'Outfit',sans-serif",letterSpacing:"0.06em"}}>LOI SUBMITTED</span>
                </div>
              </div>
              {l.entity&&<div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,color:C.cyan,marginTop:6}}>🏢 {l.entity} · DD: {l.ddPeriod}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── FILTER DRAWER (mobile) ───────────────────────────────────────────────────
function FilterDrawer({filters,setFilters,search,setSearch,onClose,states}) {
  const inp = {width:"100%",fontFamily:"'Outfit',sans-serif",fontSize:13,color:C.white,background:C.surface,border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px",outline:"none",boxSizing:"border-box"}
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:900,display:"flex",alignItems:"flex-end"}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{background:C.card,border:`1px solid ${C.borderLt}`,borderRadius:"16px 16px 0 0",width:"100%",padding:"24px 20px 36px",maxHeight:"80vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:C.white}}>Filter Deal Flow</div>
          <button onClick={onClose} style={{background:`${C.white}10`,border:"none",color:C.white2,borderRadius:"50%",width:30,height:30,cursor:"pointer",fontSize:15}}>✕</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>Search</label>
            <input placeholder="Name, city, state…" value={search} onChange={e=>setSearch(e.target.value)} style={inp}/></div>
          <div><label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>Asset Type</label>
            <select value={filters.type} onChange={e=>setFilters(p=>({...p,type:e.target.value}))} style={{...inp,cursor:"pointer"}}>
              <option value="">All Asset Types</option>
              {["Gas Station","Convenience Store","Smoke Shop","Liquor Store"].map(t=><option key={t} value={t} style={{background:C.surface}}>{t}</option>)}
            </select></div>
          <div><label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>State</label>
            <select value={filters.state} onChange={e=>setFilters(p=>({...p,state:e.target.value}))} style={{...inp,cursor:"pointer"}}>
              <option value="">All States</option>
              {states.map(s=><option key={s} value={s} style={{background:C.surface}}>{s}</option>)}
            </select></div>
          <div><label style={{display:"block",fontFamily:"'Outfit',sans-serif",fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>Max Deal Size</label>
            <select value={filters.maxPrice} onChange={e=>setFilters(p=>({...p,maxPrice:e.target.value}))} style={{...inp,cursor:"pointer"}}>
              <option value="">Any Size</option>
              {[["500000","Under $500k"],["1000000","Under $1M"],["1500000","Under $1.5M"],["2000000","Under $2M"],["3000000","Under $3M"]].map(([v,l])=><option key={v} value={v} style={{background:C.surface}}>{l}</option>)}
            </select></div>
          {(filters.type||filters.state||filters.maxPrice||search)&&<button onClick={()=>{setFilters({type:"",state:"",maxPrice:""});setSearch("")}} style={{background:`${C.red}15`,border:`1px solid ${C.red}30`,color:C.red,borderRadius:6,padding:"9px",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>✕ Clear Filters</button>}
          <button onClick={onClose} style={{background:C.blue,color:"#fff",border:"none",borderRadius:8,padding:"13px",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:"pointer"}}>Apply & Close</button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function TillStreet() {
  const width     = useWidth()
  const isMobile  = width < 640
  const isTablet  = width >= 640 && width < 960
  const cols      = isMobile ? 1 : isTablet ? 2 : 3

  const [view, setView]               = useState("deals")
  const [displayMode, setDisplayMode] = useState(isMobile ? "grid" : "table")
  const [filters, setFilters]         = useState({type:"",state:"",maxPrice:""})
  const [search, setSearch]           = useState("")
  const [selected, setSelected]       = useState(null)
  const [user, setUser]               = useState(null)
  const [showAuth, setShowAuth]       = useState(false)
  const [authMode, setAuthMode]       = useState("login")
  const [lois, setLois]               = useState([])
  const [sortBy, setSortBy]           = useState("score")
  const [showFilters, setShowFilters] = useState(false)

  const STATES = [...new Set(DEALS.map(d=>d.state))].sort()
  const activeFilters = [filters.type,filters.state,filters.maxPrice,search].filter(Boolean).length

  let filtered = DEALS.filter(d => {
    if (filters.type && d.type !== filters.type) return false
    if (filters.state && d.state !== filters.state) return false
    if (filters.maxPrice && d.askingPrice > Number(filters.maxPrice)) return false
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.city.toLowerCase().includes(search.toLowerCase()) && !d.state.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })
  if (sortBy==="score")      filtered = [...filtered].sort((a,b)=>getMetrics(b).score-getMetrics(a).score)
  else if (sortBy==="price_asc")  filtered = [...filtered].sort((a,b)=>a.askingPrice-b.askingPrice)
  else if (sortBy==="price_desc") filtered = [...filtered].sort((a,b)=>b.askingPrice-a.askingPrice)
  else if (sortBy==="cap_rate")   filtered = [...filtered].sort((a,b)=>parseFloat(getMetrics(b).capRate)-parseFloat(getMetrics(a).capRate))
  else if (sortBy==="newest")     filtered = [...filtered].sort((a,b)=>a.daysListed-b.daysListed)

  const totalAUM = filtered.reduce((s,d)=>s+d.askingPrice,0)

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:C.bg,minHeight:"100vh",color:C.white}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet"/>

      {/* ── HEADER ── */}
      <header style={{background:C.surface,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",height:54,gap:12}}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}} onClick={()=>setView("deals")}>
            <div style={{width:28,height:28,background:C.blue,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>$</div>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:isMobile?14:16,fontWeight:700,color:C.white,letterSpacing:"0.02em"}}>TILL<span style={{color:C.blue}}>STREET</span></span>
          </div>
          {!isMobile && (
            <>
              <div style={{width:1,height:18,background:C.border,margin:"0 4px",flexShrink:0}}/>
              <nav style={{display:"flex",gap:2}}>
                {[["deals","Deal Flow"],["profile","Portfolio"]].map(([v,label])=>(
                  <button key={v} onClick={()=>setView(v)} style={{background:view===v?`${C.blue}15`:"none",border:"none",color:view===v?C.blue:C.muted,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:view===v?700:400,letterSpacing:"0.02em",transition:"all 0.15s"}}>
                    {label}
                  </button>
                ))}
              </nav>
            </>
          )}
          <div style={{flex:1}}/>
          {/* Market summary */}
          {!isMobile && filtered.length > 0 && (
            <div style={{display:"flex",gap:16,alignItems:"center",marginRight:8}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.white2,fontWeight:600}}>{filtered.length} deals · {fmtK(totalAUM)} pipeline</div>
              </div>
            </div>
          )}
          {lois.length>0 && <div style={{background:`${C.blue}20`,color:C.blue,border:`1px solid ${C.blue}30`,borderRadius:4,fontSize:11,fontWeight:700,padding:"3px 8px",fontFamily:"'JetBrains Mono',monospace",flexShrink:0}}>{lois.length} LOI{lois.length>1?"s":""}</div>}
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}} onClick={()=>setView("profile")}>
              <div style={{width:28,height:28,borderRadius:4,background:C.blueBg,border:`1px solid ${C.blueBd}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:C.blue}}>{user.name[0].toUpperCase()}</div>
              {!isMobile && <span style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2}}>{user.name.split(" ")[0]}</span>}
            </div>
          ) : (
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              {!isMobile && <button onClick={()=>{setAuthMode("login");setShowAuth(true)}} style={{background:"none",border:`1px solid ${C.border}`,color:C.white2,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12}}>Sign In</button>}
              <button onClick={()=>{setAuthMode("register");setShowAuth(true)}} style={{background:C.blue,border:"none",color:"#fff",padding:"5px 14px",borderRadius:6,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600}}>Access Deals</button>
            </div>
          )}
          {isMobile && (
            <button onClick={()=>setView(v=>v==="deals"?"profile":"deals")} style={{background:"none",border:"none",color:C.white2,cursor:"pointer",fontSize:18,padding:4,flexShrink:0}}>
              {view==="deals"?"👤":"📊"}
            </button>
          )}
        </div>
      </header>

      {view==="profile" ? (
        <ProfilePage user={user} lois={lois}/>
      ) : (
        <div style={{maxWidth:1400,margin:"0 auto",padding:isMobile?"14px 12px 80px":"20px 24px 60px"}}>
          {/* Hero */}
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:isMobile?"16px":"22px 28px",marginBottom:18}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:isMobile?16:11,fontWeight:isMobile?700:700,letterSpacing:isMobile?"0.01em":"0.2em",textTransform:isMobile?"none":"uppercase",color:isMobile?C.white:C.blue,marginBottom:isMobile?4:8}}>{isMobile?"TillStreet Deal Flow":"TILLSTREET — MAIN STREET ACQUISITION PLATFORM"}</div>
                {!isMobile && <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:700,color:C.white,marginBottom:4}}>Active Deal Flow</div>}
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.muted}}>{DEALS.length} acquisition targets · gas stations · c-stores · smoke shops · liquor stores</div>
              </div>
              {/* Type filters */}
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {[["⛽","Gas Stations","Gas Station"],["🏪","C-Stores","Convenience Store"],["💨","Smoke Shops","Smoke Shop"],["🍷","Liquor Stores","Liquor Store"]].map(([icon,label,type])=>(
                  <div key={label} onClick={()=>setFilters(p=>({...p,type:p.type===type?"":type}))}
                    style={{textAlign:"center",cursor:"pointer",background:filters.type===type?`${C.blue}20`:C.card,border:filters.type===type?`1px solid ${C.blue}`:`1px solid ${C.border}`,borderRadius:8,padding:isMobile?"6px 8px":"8px 12px",transition:"all 0.15s",minWidth:isMobile?52:64}}>
                    <div style={{fontSize:isMobile?18:20}}>{icon}</div>
                    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:isMobile?13:14,fontWeight:700,color:C.blue,lineHeight:1.2}}>{DEALS.filter(d=>d.type===type).length}</div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:isMobile?8:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginTop:1}}>{isMobile?label.split(" ")[0]:label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
            {isMobile ? (
              <button onClick={()=>setShowFilters(true)} style={{display:"flex",alignItems:"center",gap:6,background:activeFilters>0?C.blue:C.card,color:activeFilters>0?"#fff":C.white2,border:`1px solid ${activeFilters>0?C.blue:C.border}`,borderRadius:6,padding:"8px 14px",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",flexShrink:0}}>
                ⚙ Filters{activeFilters>0?` (${activeFilters})`:""}
              </button>
            ) : (
              <div style={{display:"flex",gap:8,flex:1,flexWrap:"wrap"}}>
                <input placeholder="Search deal name, city, state…" value={search} onChange={e=>setSearch(e.target.value)}
                  style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 12px",outline:"none",flex:1,minWidth:160}}/>
                <select value={filters.type} onChange={e=>setFilters(p=>({...p,type:e.target.value}))}
                  style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 12px",outline:"none",cursor:"pointer"}}>
                  <option value="" style={{background:C.surface}}>All Asset Types</option>
                  {["Gas Station","Convenience Store","Smoke Shop","Liquor Store"].map(t=><option key={t} value={t} style={{background:C.surface}}>{t}</option>)}
                </select>
                <select value={filters.state} onChange={e=>setFilters(p=>({...p,state:e.target.value}))}
                  style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 12px",outline:"none",cursor:"pointer"}}>
                  <option value="" style={{background:C.surface}}>All States</option>
                  {STATES.map(s=><option key={s} value={s} style={{background:C.surface}}>{s}</option>)}
                </select>
                <select value={filters.maxPrice} onChange={e=>setFilters(p=>({...p,maxPrice:e.target.value}))}
                  style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 12px",outline:"none",cursor:"pointer"}}>
                  <option value="" style={{background:C.surface}}>Any Deal Size</option>
                  {[["500000","Under $500k"],["1000000","Under $1M"],["1500000","Under $1.5M"],["2000000","Under $2M"],["3000000","Under $3M"]].map(([v,l])=><option key={v} value={v} style={{background:C.surface}}>{l}</option>)}
                </select>
                {activeFilters>0 && <button onClick={()=>{setFilters({type:"",state:"",maxPrice:""});setSearch("")}} style={{background:`${C.red}15`,border:`1px solid ${C.red}30`,color:C.red,borderRadius:6,padding:"7px 12px",fontFamily:"'Outfit',sans-serif",fontSize:12,cursor:"pointer"}}>✕ Clear</button>}
              </div>
            )}
            <div style={{display:"flex",gap:8,marginLeft:isMobile?"auto":"0",alignItems:"center"}}>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.white2,background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:"7px 10px",outline:"none",cursor:"pointer"}}>
                <option value="score" style={{background:C.surface}}>Deal Score ↓</option>
                <option value="cap_rate" style={{background:C.surface}}>Cap Rate ↓</option>
                <option value="price_asc" style={{background:C.surface}}>Price ↑</option>
                <option value="price_desc" style={{background:C.surface}}>Price ↓</option>
                <option value="newest" style={{background:C.surface}}>Newest</option>
              </select>
              <div style={{display:"flex",background:C.card,border:`1px solid ${C.border}`,borderRadius:6,overflow:"hidden"}}>
                {[["grid","⊞"],["table","☰"]].map(([m,icon])=>(
                  <button key={m} onClick={()=>setDisplayMode(m)} style={{padding:"7px 12px",border:"none",background:displayMode===m?C.blue:"none",color:displayMode===m?"#fff":C.muted,cursor:"pointer",fontSize:14,transition:"all 0.15s"}}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Count bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:12,color:C.muted}}>
              <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:16,fontWeight:700,color:C.white}}>{filtered.length}</span> deals · {fmtK(totalAUM)} total deal value
            </div>
          </div>

          {/* Results */}
          {displayMode==="grid" ? (
            <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:12}}>
              {filtered.map(d=><DealCard key={d.id} d={d} onSelect={setSelected}/>)}
            </div>
          ) : (
            isMobile ? (
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
                {filtered.map(d=><DealRow key={d.id} d={d} onSelect={setSelected} isMobile={true}/>)}
              </div>
            ) : (
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",minWidth:780}}>
                  <thead>
                    <tr style={{background:C.surface,borderBottom:`1px solid ${C.border}`}}>
                      {["SCR","Deal","Type","Asking","Mo. Rev.","EBITDA/yr","Cap Rate","EV Mult.","EV Range",""].map(h=>(
                        <th key={h} style={{padding:"10px 8px",textAlign:"left",fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{filtered.map(d=><DealRow key={d.id} d={d} onSelect={setSelected} isMobile={false}/>)}</tbody>
                </table>
              </div>
            )
          )}

          {filtered.length===0 && (
            <div style={{textAlign:"center",padding:"60px 16px",background:C.card,border:`1px solid ${C.border}`,borderRadius:10}}>
              <div style={{fontSize:36,marginBottom:12}}>🔍</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:C.white,marginBottom:8}}>No deals match your criteria</div>
              <button onClick={()=>{setFilters({type:"",state:"",maxPrice:""});setSearch("")}} style={{background:C.blue,color:"#fff",border:"none",borderRadius:6,padding:"9px 20px",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:4}}>Reset Filters</button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {selected && <DealModal d={selected} onClose={()=>setSelected(null)} user={user} lois={lois} onLOI={l=>setLois(p=>[...p,l])}/>}
      {showAuth && <AuthModal mode={authMode} onClose={()=>setShowAuth(false)} onAuth={u=>{setUser(u);setShowAuth(false)}}/>}
      {showFilters && <FilterDrawer filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} onClose={()=>setShowFilters(false)} states={STATES}/>}

      {/* Mobile bottom nav */}
      {isMobile && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:50,paddingBottom:"env(safe-area-inset-bottom)"}}>
          {[["deals","📊","Deals"],["profile","👤","Portfolio"]].map(([v,icon,label])=>(
            <button key={v} onClick={()=>setView(v)} style={{flex:1,padding:"11px 0 9px",border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <span style={{fontSize:18}}>{icon}</span>
              <span style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:view===v?700:400,color:view===v?C.blue:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
