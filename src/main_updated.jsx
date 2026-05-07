
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Phone, Mail, CheckCircle, Camera, Calculator, Plus, Minus, Hammer, Paintbrush, Wrench, Zap, Droplets, Home } from "lucide-react";
import "./styles.css";

const ESTIMATE_ITEMS = [
  { id: "tv65", label: "65 inch+ TV Mount", price: 140, helper: "$140 each, standard drywall install" },
  { id: "tvStandard", label: "Standard TV Mount", price: 110, helper: "$110 each, under 65 inch" },
  { id: "chairs", label: "Dining Chairs", price: 25, helper: "$25 each" },
  { id: "smallFurniture", label: "Small Furniture Assembly", price: 60, helper: "$60 each" },
  { id: "mediumFurniture", label: "Medium Furniture Assembly", price: 120, helper: "$120 each" },
  { id: "largeFurniture", label: "Large Furniture Assembly", price: 200, helper: "$200 each" },
  { id: "outlets", label: "Outlet / Switch Swap", price: 40, helper: "$40 each, service minimum applies" },
  { id: "fixtures", label: "Light Fixture Swap", price: 150, helper: "$150 each, basic fixture" },
  { id: "ceilingFan", label: "Ceiling Fan Install", price: 185, helper: "$185 each, standard replacement" },
  { id: "faucets", label: "Faucet Install", price: 225, helper: "$225 each, customer supplies faucet" },
  { id: "toiletRepair", label: "Toilet Repair / Leak", price: 150, helper: "$150 each, basic repair" },
  { id: "drywallPatches", label: "Small Drywall Patch", price: 175, helper: "$175 each, simple patch" },
  { id: "doorLock", label: "Door Handle / Lock Swap", price: 65, helper: "$65 each" },
  { id: "smokeDetector", label: "Smoke Detector Install", price: 45, helper: "$45 each" },
  { id: "curtainBlinds", label: "Curtain / Blind Install", price: 85, helper: "$85 each" },
  { id: "shelfMirror", label: "Shelf / Mirror Mounting", price: 95, helper: "$95 each" },
  { id: "garbageDisposal", label: "Garbage Disposal Swap", price: 275, helper: "$275 each" },
  { id: "vanity", label: "Bathroom Vanity Install", price: 450, helper: "$450 each, labor only" },
  { id: "interiorDoor", label: "Interior Door Install", price: 250, helper: "$250 each, standard slab door" },
  { id: "grassSmall", label: "Small Grass Cut", price: 50, helper: "$50 each, small rowhome yard" }
];


function App() {
  const [counts, setCounts] = useState(() => Object.fromEntries(ESTIMATE_ITEMS.map((item) => [item.id, 0])));
  const [difficulty, setDifficulty] = useState("standard");

  const serviceMinimum = 150;

  const quote = useMemo(() => {
    const base = ESTIMATE_ITEMS.reduce((sum, item) => sum + counts[item.id] * item.price, 0);
    const multiplier = difficulty === "easy" ? 0.95 : difficulty === "complex" ? 1.2 : 1;
    const adjusted = Math.round(base * multiplier);
    const total = adjusted > 0 && adjusted < serviceMinimum ? serviceMinimum : adjusted;
    const low = total === 0 ? 0 : Math.max(serviceMinimum, Math.round(total * 0.9));
    const high = total === 0 ? 0 : Math.round(total * 1.15);
    return { total, low, high };
  }, [counts, difficulty]);

  const resetQuote = () => {
    setCounts(Object.fromEntries(ESTIMATE_ITEMS.map((item) => [item.id, 0])));
    setDifficulty("standard");
  };

  const setItemCount = (id, value) => {
    setCounts((prev) => ({ ...prev, [id]: Math.max(0, value) }));
  };

  const Counter = ({ item }) => (
    <div className="counter-card">
      <div>
        <strong>{item.label}</strong>
        <p>{item.helper}</p>
      </div>
      <div className="counter">
        <button type="button" onClick={() => setItemCount(item.id, counts[item.id] - 1)}><Minus size={16} /></button>
        <span>{counts[item.id]}</span>
        <button type="button" onClick={() => setItemCount(item.id, counts[item.id] + 1)}><Plus size={16} /></button>
      </div>
    </div>
  );

  const services = [
    { icon: <Paintbrush />, title: "Painting & Drywall", text: "Patch holes, repair walls, paint rooms, touch-ups, and ceiling repairs." },
    { icon: <Wrench />, title: "Furniture & Mounting", text: "TV mounting, furniture assembly, shelving, mirrors, and wall-mounted items." },
    { icon: <Zap />, title: "Fixtures & Outlets", text: "Light fixtures, switches, outlet swaps, USB outlets, and basic electrical upgrades." },
    { icon: <Droplets />, title: "Minor Plumbing", text: "Faucet swaps, toilet leaks, vanity installs, drain fixes, and basic plumbing repairs." },
    { icon: <Home />, title: "Landlord Turnovers", text: "Fast rent-ready repairs for small landlords, investors, and property owners." },
    { icon: <Hammer />, title: "General Repairs", text: "Small handyman repairs, trim, doors, hardware, maintenance, and punch lists." }
  ];

  const estimateText = quote.total === 0 ? "$0" : `$${quote.low}-$${quote.high}`;
  const smsBody = encodeURIComponent(`Hi, I used the website estimator. My estimated range is ${estimateText}. I want to send photos for confirmation.`);

  return (
    <main>
      <header className="site-header">
        <a href="#" className="brand"><img src="/logo.png" alt="Thomas Remodeling & Property Maintenance logo" /></a>
        <nav>
          <a href="#services">Services</a>
          <a href="#calculator">Calculator</a>
          <a href="#landlords">Landlords</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn primary small" href="tel:2672422133">Call Now</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="pill"><CheckCircle size={16} /> Philadelphia Home Repairs & Property Maintenance</div>
          <h1>Fast, Clean Repairs for Homes & Rentals</h1>
          <p>Drywall, paint, TV mounting, furniture assembly, fixtures, faucets, toilets, and landlord turnovers — done clean, secure, and professionally.</p>
          <div className="button-row">
            <a className="btn primary" href="tel:2672422133"><Phone size={20} /> Call 267-242-2133</a>
            <a className="btn light" href="#calculator"><Calculator size={20} /> Estimate My Job</a>
          </div>
        </div>

        <div className="quote-card">
          <h2>Request a Fast Quote</h2>
          <p>Send photos and a short description of what needs to be fixed.</p>
          <form>
            <input placeholder="Name" />
            <input placeholder="Phone number" />
            <input placeholder="Property address" />
            <select>
              <option>What do you need help with?</option>
              <option>Painting / drywall</option>
              <option>TV mounting / furniture assembly</option>
              <option>Fixture or outlet replacement</option>
              <option>Plumbing repair</option>
              <option>Landlord turnover</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Briefly describe the job"></textarea>
            <a className="btn dark full" href={`sms:2672422133?body=${encodeURIComponent("Hi, I would like a quote. I can send photos and job details.")}`}>Submit Quote Request</a>
          </form>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <h2>Core Services</h2>
          <p>Simple repairs, clean finishes, and practical property maintenance for homeowners and landlords.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="calculator" className="section calculator-section">
        <div className="section-heading">
          <div className="pill orange"><Calculator size={16} /> Instant Price Estimator</div>
          <h2>Estimate Simple Handyman Jobs</h2>
          <p>Use this for predictable jobs. Final price may change after photos or on-site review.</p>
        </div>

        <div className="calculator-layout">
          <div className="calculator-grid">
            {ESTIMATE_ITEMS.map((item) => (
              <Counter key={item.id} item={item} />
            ))}
          </div>

          <aside className="estimate-card">
            <h3>Estimated Quote</h3>
            <label>Job difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy / open access</option>
              <option value="standard">Standard</option>
              <option value="complex">Complex / older home / tight access</option>
            </select>
            <div className="estimate-result">
              <span>Estimated Range</span>
              <strong>{quote.total === 0 ? "$0" : `$${quote.low}–$${quote.high}`}</strong>
              <small>Minimum service visit: ${serviceMinimum}</small>
            </div>
            <p>This is an estimate, not a final contract. Photos, wall type, materials, hidden issues, parking, and job condition can affect the final quote.</p>
            <a className="btn primary full" href={`sms:2672422133?body=${smsBody}`}>Text Photos for Confirmation</a>
            <button className="btn outline full" onClick={resetQuote}>Reset Calculator</button>
          </aside>
        </div>
      </section>

      <section id="landlords" className="section landlord-section">
        <div>
          <h2>Built for Small Landlords & Investors</h2>
          <p>Vacant units cost money. We help with punch lists, paint, patches, fixture swaps, basic plumbing, and fast rent-ready repairs.</p>
          <ul>
            <li><CheckCircle /> Turnover punch lists</li>
            <li><CheckCircle /> Before/after photos</li>
            <li><CheckCircle /> Small repairs bundled into one visit</li>
            <li><CheckCircle /> Clear pricing before work starts</li>
          </ul>
        </div>
        <div className="dark-card">
          <Camera size={42} />
          <h3>Easy Quote Process</h3>
          <p>Text photos, the address, and a short description. We’ll give you next steps and a quote range.</p>
          <a className="btn primary" href="sms:2672422133">Text for Quote</a>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Ready to get it fixed?</h2>
        <p>Call, text, or email Thomas Remodeling & Property Maintenance.</p>
        <div className="button-row center">
          <a className="btn primary" href="tel:2672422133"><Phone size={20} /> 267-242-2133</a>
          <a className="btn light" href="mailto:thomasremodelingandprop.maint@gmail.com"><Mail size={20} /> Email Us</a>
        </div>
      </section>

      <footer>© 2026 Thomas Remodeling & Property Maintenance. All rights reserved.</footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
