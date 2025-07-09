// === Globale Spracheinstellung ===
let currentLang = 'de';

document.addEventListener('DOMContentLoaded', function () {
  // Sprache aus Cookie auslesen (falls vorhanden)
  const cookieLang = document.cookie.match(/preferredLanguage=(de|en)/);
  if (cookieLang) {
    currentLang = cookieLang[1];
  }

  // Sprache anwenden
  applyLanguage(currentLang);

  // === Sprachumschaltung ===
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(button => {
    button.addEventListener('click', function () {
      langButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      currentLang = this.getAttribute('data-lang');
      applyLanguage(currentLang);
    });
  });

  function applyLanguage(lang) {
    document.querySelectorAll('.lang-de, .lang-en').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
      // Wenn es ein Blockelement ist → block, sonst inline
      el.style.display = (el.tagName === 'DIV' || el.tagName === 'P' || el.tagName === 'SECTION') ? 'block' : 'inline';
    });
    document.cookie = `preferredLanguage=${lang}; path=/; max-age=31536000`;
  }

  // === Swiper Initialisierung (ohne Zähler) ===
  const swiper = new Swiper('.swiper.slideshow', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: false,
  });

  // === Akkordeon ===
  document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isOpen = content.style.display === 'block';
      content.style.display = isOpen ? 'none' : 'block';
      const textDe = isOpen ? 'Mehr erfahren' : 'Weniger anzeigen';
      const textEn = isOpen ? 'Learn more' : 'Show less';
      const deEl = button.querySelector('.lang-de');
      const enEl = button.querySelector('.lang-en');
      if (deEl) deEl.textContent = textDe;
      if (enEl) enEl.textContent = textEn;
    });
  });

  // === Blog-Filter ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const articles = document.querySelectorAll('.blog-article');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const filter = button.getAttribute('data-filter');

      articles.forEach(article => {
        article.style.display = (filter === 'all' || article.classList.contains(`filter-${filter}`)) ? 'flex' : 'none';
      });
    });
  });

  // === Engagement-Filter ===
  const volunteerFilterButtons = document.querySelectorAll('#volunteer .filter-btn');
  volunteerFilterButtons.forEach(button => {
    button.addEventListener('click', function () {
      volunteerFilterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      document.querySelectorAll('#volunteer .timeline-item').forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(`filter-${filter}`)) ? 'block' : 'none';
      });
    });
  });

  // === Share-Funktion ===
  const facts = {
    1: {
      text: "Menschen erinnern sich besser an emotionale Ereignisse.",
      url: "https://deine-seite.de/fakt1",
    },
    2: {
      text: "Multitasking reduziert nachweislich die Konzentration.",
      url: "https://deine-seite.de/fakt2",
    },
    3: {
      text: "Spiegelneuronen helfen uns, Empathie zu empfinden.",
      url: "https://deine-seite.de/fakt3",
    },
  };

  window.shareFact = function (id) {
    const fact = facts[id];
    if (!fact) return;

    if (navigator.share) {
      navigator.share({
        title: "Psychologie-Fakt",
        text: fact.text,
        url: fact.url,
      }).catch((err) => console.error("Teilen abgebrochen:", err));
    } else {
      navigator.clipboard.writeText(fact.url).then(() => {
        alert((currentLang === 'de' ? "Link kopiert: " : "Link copied: ") + fact.url);
      });
    }
  };

  // === Projekt-Details laden ===
  window.loadProjectDetails = function (projectId) {
    const projectData = {
      project1: {
        title: { de: "Webprojekt 1", en: "Web Project 1" },
        description: {
          de: "Dies ist eine Beschreibung des ersten Webprojekts.",
          en: "This is a description of the first web project.",
        },
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "images/portfolio-1.jpg",
      },
      project2: {
        title: { de: "App Projekt", en: "App Project" },
        description: {
          de: "Dies ist eine Beschreibung des App Projekts.",
          en: "This is a description of the app project.",
        },
        technologies: ["React Native", "Firebase"],
        image: "images/portfolio-2.jpg",
      },
      project3: {
        title: { de: "Anderes Projekt", en: "Other Project" },
        description: {
          de: "Dies ist eine Beschreibung des anderen Projekts.",
          en: "This is a description of the other project.",
        },
        technologies: ["Photoshop", "Illustrator"],
        image: "images/portfolio-3.jpg",
      },
    };

    const project = projectData[projectId];
    if (!project) return;

    document.getElementById('projectTitle').textContent = project.title[currentLang];
    document.getElementById('projectDetails').innerHTML = `
      <div class="row">
        <div class="col-md-6">
          <img src="${project.image}" alt="${project.title[currentLang]}" class="img-fluid mb-3">
        </div>
        <div class="col-md-6">
          <h4>${project.title[currentLang]}</h4>
          <p>${project.description[currentLang]}</p>
          <h5>${currentLang === 'de' ? 'Technologien' : 'Technologies'}:</h5>
          <ul>${project.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  };

  // === Kontaktformular (Demo) ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const messageText = currentLang === 'de'
        ? 'Nachricht erfolgreich gesendet!'
        : 'Message sent successfully!';
      alert(messageText);
      this.reset();
    });
  }

  // === Copy-to-Clipboard für Kontaktdaten ===
  document.querySelectorAll('.copy-text').forEach(el => {
    el.addEventListener('click', function () {
      navigator.clipboard.writeText(this.textContent).then(() => {
        alert((currentLang === 'de' ? 'Kopiert: ' : 'Copied: ') + this.textContent);
      });
    });
  });
});

// === Persönlichkeitstest (Platzhalter, falls du ihn später brauchst) ===
let score = {
  Dominant: 0,
  Initiativ: 0,
  Stetig: 0,
  Gewissenhaft: 0
};

let currentQuestion = 0;

window.handleAnswer = function (choice) {
  console.log("User chose:", choice);
  window.location.href = "/persönlichkeitstest";
};
