
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Phone, Mail, CheckCircle, Camera, Calculator, Plus, Minus, Hammer, Paintbrush, Wrench, Zap, Droplets, Home } from "lucide-react";
import "./styles.css";

function App() {
  const [tv65, setTv65] = useState(0);
  const [tvStandard, setTvStandard] = useState(0);
  const [chairs, setChairs] = useState(0);
  const [smallFurniture, setSmallFurniture] = useState(0);
  const [mediumFurniture, setMediumFurniture] = useState(0);
  const [largeFurniture, setLargeFurniture] = useState(0);
  const [outlets, setOutlets] = useState(0);
  const [fixtures, setFixtures] = useState(0);
  const [faucets, setFaucets] = useState(0);
  const [drywallPatches, setDrywallPatches] = useState(0);
  const [difficulty, setDifficulty] = useState("standard");

  const serviceMinimum = 150;

  const quote = useMemo(() => {
    const base =
      tv65 * 140 +
      tvStandard * 110 +
      chairs * 25 +
      smallFurniture * 60 +
      mediumFurniture * 120 +
      largeFurniture * 200 +
      outlets * 40 +
      fixtures * 150 +
      faucets * 225 +
      drywallPatches * 175;

    const multiplier = difficulty === "easy" ? 0.95 : difficulty === "complex" ? 1.2 : 1;
    const adjusted = Math.round(base * multiplier);
    const total = adjusted > 0 && adjusted < serviceMinimum ? serviceMinimum : adjusted;
    const low = total === 0 ? 0 : Math.max(serviceMinimum, Math.round(total * 0.9));
    const high = total === 0 ? 0 : Math.round(total * 1.15);
    return { total, low, high };
  }, [tv65, tvStandard, chairs, smallFurniture, mediumFurniture, largeFurniture, outlets, fixtures, faucets, drywallPatches, difficulty]);

  const resetQuote = () => {
    setTv65(0); setTvStandard(0); setChairs(0); setSmallFurniture(0); setMediumFurniture(0); setLargeFurniture(0);
    setOutlets(0); setFixtures(0); setFaucets(0); setDrywallPatches(0); setDifficulty("standard");
  };

  const Counter = ({ label, value, setValue, helper }) => (
    <div className="counter-card">
      <div>
        <strong>{label}</strong>
        <p>{helper}</p>
      </div>
      <div className="counter">
        <button type="button" onClick={() => setValue(Math.max(0, value - 1))}><Minus size={16} /></button>
        <span>{value}</span>
        <button type="button" onClick={() => setValue(value + 1)}><Plus size={16} /></button>
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
            <Counter label="65 inch+ TV Mount" value={tv65} setValue={setTv65} helper="$140 each, standard drywall install" />

<Counter label="Standard TV Mount" value={tvStandard} setValue={setTvStandard} helper="$110 each, under 65 inch" />

<Counter label="Dining Chairs" value={chairs} setValue={setChairs} helper="$25 each" />

<Counter label="Small Furniture" value={smallFurniture} setValue={setSmallFurniture} helper="$60 each" />

<Counter label="Medium Furniture" value={mediumFurniture} setValue={setMediumFurniture} helper="$120 each" />

<Counter label="Large Furniture" value={largeFurniture} setValue={setLargeFurniture} helper="$200 each" />

<Counter label="Outlet / Switch Swap" value={outlets} setValue={setOutlets} helper="$40 each, service minimum applies" />

<Counter label="Light Fixture Swap" value={fixtures} setValue={setFixtures} helper="$150 each, basic fixture" />

<Counter label="Ceiling Fan Install" value={fixtures} setValue={setFixtures} helper="$185 each, standard replacement" />

<Counter label="Faucet Install" value={faucets} setValue={setFaucets} helper="$225 each, customer supplies faucet" />

<Counter label="Toilet Repair / Leak" value={faucets} setValue={setFaucets} helper="$150 each, basic repair" />

<Counter label="Small Drywall Patch" value={drywallPatches} setValue={setDrywallPatches} helper="$175 each, simple patch" />

<Counter label="Door Handle / Lock Swap" value={outlets} setValue={setOutlets} helper="$65 each" />

<Counter label="Smoke Detector Install" value={smallFurniture} setValue={setSmallFurniture} helper="$45 each" />

<Counter label="Curtain / Blind Install" value={mediumFurniture} setValue={setMediumFurniture} helper="$85 each" />

<Counter label="Shelf / Mirror Mounting" value={largeFurniture} setValue={setLargeFurniture} helper="$95 each" />

<Counter label="Garbage Disposal Swap" value={fixtures} setValue={setFixtures} helper="$275 each" />

<Counter label="Bathroom Vanity Install" value={faucets} setValue={setFaucets} helper="$450 each, labor only" />

<Counter label="Interior Door Install" value={drywallPatches} setValue={setDrywallPatches} helper="$250 each, standard slab door" />

<Counter label="Small Grass Cut" value={chairs} setValue={setChairs} helper="$50 each, small rowhome yard" />
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
