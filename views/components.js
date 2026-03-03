// ============================================================
// VIEW LAYER — Pure rendering functions, build DOM from data
// Developer-themed portfolio with terminal/code-editor aesthetic
// ============================================================

import {
  profileData,
  skillsData,
  projectsData,
  certificationsData,
  experienceData,
  educationData,
  socialLinks,
  contactInfo,
  navItems,
} from "../models/data.js";

// Helper — terminal window header with colored dots
function terminalHeader(title, lang = "") {
  return `
    <div class="terminal__header">
      <div class="terminal__dots">
        <span class="terminal__dot terminal__dot--red"></span>
        <span class="terminal__dot terminal__dot--yellow"></span>
        <span class="terminal__dot terminal__dot--green"></span>
      </div>
      <span class="terminal__title">${title}</span>
      ${lang ? `<span class="terminal__lang">${lang}</span>` : ""}
    </div>`;
}

// Helper — code-comment style section title
function sectionTitle(prefix, keyword, comment = "") {
  return `
    <h2 class="code-title animate-on-scroll">
      <span class="code-title__slashes">//</span>
      <span class="code-title__prefix">${prefix}</span>
      <span class="code-title__keyword">${keyword}</span>
      ${comment ? `<span class="code-title__comment">/* ${comment} */</span>` : ""}
    </h2>`;
}

// ─── Navigation ──────────────────────────────────────────────
export function renderNav() {
  return `
  <nav class="nav" id="nav">
    <div class="nav__container">
      <a href="#home" class="nav__logo" data-section="home">
        <span class="nav__logo-text">&lt;${profileData.firstName}</span><span class="nav__logo-slash">/&gt;</span>
      </a>
      <div class="nav__menu">
        ${navItems
          .map(
            (item) => `
          <a href="#${item.id}" class="nav__link" data-section="${item.id}">
            ${item.label}
          </a>`
          )
          .join("")}
      </div>
      <button class="nav__burger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

// ─── Hero ────────────────────────────────────────────────────
export function renderHero() {
  return `
  <section class="hero" id="home">
    <canvas class="hero__matrix" id="matrix-canvas"></canvas>
    <div class="hero__content animate-on-scroll">
      <div class="hero__terminal">
        ${terminalHeader("~/" + profileData.firstName.toLowerCase() + " — bash", "bash")}
        <div class="terminal__body">
          <div class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">whoami</span>
          </div>
          <div class="terminal__output">
            <h1 class="hero__name">${profileData.name}</h1>
          </div>
          <div class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">cat role.txt</span>
          </div>
          <div class="terminal__output">
            <div class="hero__role-wrapper">
              <span class="hero__typing" aria-live="polite"></span><span class="hero__cursor">█</span>
            </div>
          </div>
          <div class="terminal__line">
            <span class="terminal__prompt">$</span>
            <span class="terminal__cmd">echo $MISSION</span>
          </div>
          <div class="terminal__output terminal__output--muted">
            ${profileData.tagline}
          </div>
        </div>
      </div>
      <div class="hero__actions">
        <a href="#projects" class="btn btn--primary"><span class="btn__bracket">[</span> View My Work <span class="btn__bracket">]</span></a>
        <a href="#contact" class="btn btn--outline"><span class="btn__bracket">{</span> Get In Touch <span class="btn__bracket">}</span></a>
      </div>
    </div>
    <div class="hero__scroll-indicator">
      <div class="hero__mouse">
        <div class="hero__mouse-wheel"></div>
      </div>
      <p>Scroll Down</p>
    </div>
  </section>`;
}

// ─── About ───────────────────────────────────────────────────
export function renderAbout() {
  return `
  <section class="about section" id="about">
    <div class="container">
      <div class="about__grid animate-on-scroll">
        <div class="about__image-wrapper">
          <div class="about__image-ring"></div>
          <img class="about__avatar" src="${profileData.avatar}" alt="${profileData.name}" loading="lazy">
        </div>
        <div class="about__text">
          <h2 class="section__title">Hi, I'm <span class="syntax--string">"${profileData.firstName}"</span>. Nice to meet you.</h2>
          <p class="about__bio">${profileData.bio}</p>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── Skills ──────────────────────────────────────────────────
export function renderSkills() {
  return `
  <section class="skills section" id="skills">
    <div class="container">
      ${sectionTitle("const", "techStack", "what I work with")}
      <div class="skills__grid">
        ${skillsData
          .map(
            (skill, i) => `
          <div class="skill-card terminal-window animate-on-scroll" style="--delay: ${i * 0.15}s">
            ${terminalHeader(skill.title.toLowerCase().replace(/ & /g, "_") + ".json", "JSON")}
            <div class="terminal__body">
              <div class="skill-card__icon">${skill.icon}</div>
              <h3 class="skill-card__title">${skill.title}</h3>
              <p class="skill-card__desc">${skill.description}</p>
              <div class="skill-card__divider"></div>
              <p class="skill-card__label">${skill.enjoyTitle}</p>
              <p class="skill-card__value">${skill.enjoyList}</p>
              <p class="skill-card__label">${skill.toolsTitle}</p>
              <ul class="skill-card__tools">
                ${skill.tools.map((t) => `<li>${t}</li>`).join("")}
              </ul>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

// ─── Experience (Internships) ────────────────────────────────
export function renderExperience() {
  return `
  <section class="experience section" id="experience">
    <div class="container">
      ${sectionTitle("git log", "--oneline", "work history")}
      <div class="experience__timeline">
        ${experienceData
          .map(
            (exp, i) => `
          <div class="exp-card animate-on-scroll" style="--delay: ${i * 0.2}s">
            <div class="exp-card__dot"></div>
            <div class="exp-card__content terminal-window">
              ${terminalHeader(exp.company.toLowerCase().replace(/ /g, "_"), "log")}
              <div class="terminal__body">
                <div class="exp-card__header">
                  <div>
                    <h3 class="exp-card__role">${exp.role}</h3>
                    ${exp.subtitle ? `<p class="exp-card__subtitle">${exp.subtitle}</p>` : ""}
                    <p class="exp-card__company">${exp.company}</p>
                  </div>
                  <div class="exp-card__meta">
                    <span class="exp-card__period">${exp.period}</span>
                    <span class="exp-card__location">${exp.location}</span>
                  </div>
                </div>
                <ul class="exp-card__highlights">
                  ${exp.highlights.map((h) => `<li>${h}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

// ─── Projects ────────────────────────────────────────────────
export function renderProjects() {
  return `
  <section class="projects section" id="projects">
    <div class="container">
      ${sectionTitle("import", "projects", "from './portfolio'")}
      <div class="projects__grid">
        ${projectsData
          .map(
            (proj, i) => `
          <div class="project-card terminal-window animate-on-scroll" style="--delay: ${i * 0.15}s">
            ${terminalHeader(proj.title.toLowerCase().replace(/ /g, "-") + "/", proj.category)}
            <div class="terminal__body project-card__body">
              <h3 class="project-card__title">${proj.title}</h3>
              <span class="project-card__period">${proj.period}</span>
              <p class="project-card__desc">${proj.description}</p>
              <a href="${proj.link}" class="project-card__link" target="_blank" rel="noopener noreferrer">
                $ open ./README.md →
              </a>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

// ─── Certifications ──────────────────────────────────────────
export function renderCertifications() {
  return `
  <section class="certs section" id="certifications">
    <div class="container">
      ${sectionTitle("const", "certifications", "verified achievements")}
      <div class="certs__grid">
        ${certificationsData
          .map(
            (cert, i) => `
          <div class="cert-card terminal-window animate-on-scroll" style="--delay: ${i * 0.15}s">
            ${terminalHeader(cert.title.substring(0, 20).toLowerCase().replace(/ /g, "_") + ".cert", "✓")}
            <div class="cert-card__image-wrap">
              <img src="${cert.image}" alt="${cert.title}" loading="lazy">
              <div class="cert-card__overlay">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
            <div class="cert-card__body">
              <h3 class="cert-card__title">${cert.title}</h3>
              <p class="cert-card__issuer">${cert.issuer}</p>
              <p class="cert-card__desc">${cert.description}</p>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

// ─── Education ───────────────────────────────────────────────
export function renderEducation() {
  return `
  <section class="education section" id="education">
    <div class="container">
      ${sectionTitle("class", "Education", "extends Knowledge")}
      <div class="education__grid">
        ${educationData
          .map(
            (edu, i) => `
          <div class="edu-card terminal-window animate-on-scroll" style="--delay: ${i * 0.15}s">
            ${terminalHeader(edu.institution.substring(0, 25).toLowerCase().replace(/ /g, "_"), "📄")}
            <div class="terminal__body">
              <div class="edu-card__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h3 class="edu-card__degree">${edu.degree}</h3>
              <p class="edu-card__institution">${edu.institution}</p>
              <div class="edu-card__meta">
                <span>${edu.location}</span>
                <span>${edu.period}</span>
              </div>
              <div class="edu-card__grade">
                <span class="edu-card__grade-badge">${edu.grade}</span>
              </div>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

// ─── Contact ─────────────────────────────────────────────────
export function renderContact() {
  return `
  <section class="contact section" id="contact">
    <div class="container">
      ${sectionTitle("async function", "contact()", "let's connect")}
      <div class="contact__grid animate-on-scroll">
        <div class="contact__info terminal-window">
          ${terminalHeader("contact_info.json", "JSON")}
          <div class="terminal__body">
            <div class="contact__info-item">
              <div class="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h4>${contactInfo.location}</h4>
                <p>${contactInfo.address}</p>
              </div>
            </div>
            <div class="contact__info-item">
              <div class="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h4>${contactInfo.phone}</h4>
                <p>${contactInfo.phoneHours}</p>
              </div>
            </div>
            <div class="contact__info-item">
              <div class="contact__info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h4>${contactInfo.email}</h4>
                <p>Drop me a line anytime</p>
              </div>
            </div>
          </div>
        </div>
        <div class="contact__form-wrapper terminal-window">
          ${terminalHeader("compose_message.sh", "bash")}
          <div class="terminal__body">
            <h3 class="contact__form-heading">$ ./send_message.sh</h3>
            <form class="contact__form" id="emailjs-form" novalidate>
              <div class="contact__input-group">
                <input type="text" name="name" placeholder="your_name" required id="contact-name">
                <label for="contact-name">// name</label>
              </div>
              <div class="contact__input-group">
                <input type="email" name="email" placeholder="you@email.dev" required id="contact-email">
                <label for="contact-email">// email</label>
              </div>
              <div class="contact__input-group">
                <textarea name="message" placeholder="console.log('Your message here...')" required id="contact-message" rows="4"></textarea>
                <label for="contact-message">// message</label>
              </div>
              <button type="submit" class="btn btn--primary btn--full" id="contact-submit">
                <span class="btn__bracket">[</span> Execute Send <span class="btn__bracket">]</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── Footer ──────────────────────────────────────────────────
export function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__brand">
          <span class="nav__logo-text">&lt;${profileData.firstName}</span><span class="nav__logo-slash">/&gt;</span>
        </div>
        <p class="footer__tagline">// Building scalable backend systems & APIs</p>
        <div class="footer__social">
          ${socialLinks
            .map(
              (s) => `
          <a href="${s.url}" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.name}">
            ${s.icon}
          </a>`
            )
            .join("")}
        </div>
        <div class="footer__divider"></div>
        <p class="footer__copy">/* &copy; ${new Date().getFullYear()} ${profileData.name} | All rights reserved */</p>
      </div>
    </div>
  </footer>`;
}

// ─── Render entire app ──────────────────────────────────────
export function renderApp(container) {
  container.innerHTML = [
    renderNav(),
    renderHero(),
    renderAbout(),
    renderSkills(),
    renderExperience(),
    renderProjects(),
    renderCertifications(),
    renderEducation(),
    renderContact(),
    renderFooter(),
  ].join("");
}
