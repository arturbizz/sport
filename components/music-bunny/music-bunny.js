class MusicBunny {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.container.classList.add('music-bunny-container');
    this.container.innerHTML = `
      <object data="music-bunny.svg" type="image/svg+xml" id="bunny-object" style="width:200px; height:200px;"></object>
      <div class="bunny-speech-bubble" id="bunny-speech"></div>
    `;

    this.svgObject = this.container.querySelector('#bunny-object');
    this.speechBubble = this.container.querySelector('#bunny-speech');
    this.svgDoc = null;

    this.emotion = 'idle';
    this.instrument = null;
    this.mouseTracking = false;
    this.autoBehaviors = [];
    this.init();
  }

  async init() {
    // Ждём загрузки SVG
    this.svgObject.addEventListener('load', () => {
      this.svgDoc = this.svgObject.contentDocument;
      if (this.svgDoc) {
        this.startAutoBehaviors();
        this.setupMouseTracking();
      }
    });
  }

  // === УПРАВЛЕНИЕ ВИДИМОСТЬЮ ===
  show() { this.container.style.display = 'block'; }
  hide() { this.container.style.display = 'none'; }

  // === СООБЩЕНИЯ ===
  say(text) {
    if (!this.speechBubble) return;
    this.speechBubble.textContent = text;
    this.speechBubble.classList.add('show');
    clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      this.speechBubble.classList.remove('show');
    }, 3000);
  }

  // === ЭМОЦИИ ===
  setEmotion(name) {
    this.emotion = name;
    if (!this.svgDoc) return;

    const mouth = this.svgDoc.getElementById('mouth');
    const eyes = this.svgDoc.getElementById('eyes');

    // Сброс
    mouth.innerHTML = '<path d="M 92 112 Q 100 122 108 112" fill="none" stroke="#2d3436" stroke-width="2" stroke-linecap="round"/><path d="M 94 112 Q 100 118 106 112" fill="#ff7675"/>';
    eyes.innerHTML = `
      <g id="left-eye">
        <ellipse cx="83" cy="95" rx="8" ry="10" fill="white"/>
        <ellipse cx="85" cy="95" rx="5" ry="7" fill="#2d3436"/>
        <circle cx="87" cy="93" r="2" fill="white"/>
      </g>
      <g id="right-eye">
        <ellipse cx="117" cy="95" rx="8" ry="10" fill="white"/>
        <ellipse cx="115" cy="95" rx="5" ry="7" fill="#2d3436"/>
        <circle cx="113" cy="93" r="2" fill="white"/>
      </g>
    `;

    const emotions = {
      happy: () => {
        mouth.innerHTML = '<path d="M 88 108 Q 100 125 112 108" fill="none" stroke="#2d3436" stroke-width="2.5" stroke-linecap="round"/>';
      },
      love: () => {
        mouth.innerHTML = '<path d="M 92 112 Q 100 118 108 112" fill="none" stroke="#2d3436" stroke-width="2" stroke-linecap="round"/>';
        eyes.innerHTML = `
          <g id="left-eye"><ellipse cx="83" cy="95" rx="8" ry="10" fill="white"/><ellipse cx="85" cy="95" rx="5" ry="7" fill="#2d3436"/><circle cx="87" cy="93" r="2" fill="white"/><path d="M 75 90 Q 83 85 91 90" fill="#ff7675"/></g>
          <g id="right-eye"><ellipse cx="117" cy="95" rx="8" ry="10" fill="white"/><ellipse cx="115" cy="95" rx="5" ry="7" fill="#2d3436"/><circle cx="113" cy="93" r="2" fill="white"/><path d="M 109 90 Q 117 85 125 90" fill="#ff7675"/></g>
        `;
      },
      wow: () => {
        mouth.innerHTML = '<ellipse cx="100" cy="115" rx="6" ry="8" fill="#2d3436"/>';
        eyes.innerHTML = `
          <g id="left-eye"><circle cx="83" cy="95" r="9" fill="white" stroke="#2d3436" stroke-width="1.5"/><circle cx="85" cy="95" r="4" fill="#2d3436"/></g>
          <g id="right-eye"><circle cx="117" cy="95" r="9" fill="white" stroke="#2d3436" stroke-width="1.5"/><circle cx="115" cy="95" r="4" fill="#2d3436"/></g>
        `;
      },
      sad: () => {
        mouth.innerHTML = '<path d="M 92 118 Q 100 112 108 118" fill="none" stroke="#2d3436" stroke-width="2" stroke-linecap="round"/>';
        eyes.innerHTML = `
          <g id="left-eye"><ellipse cx="83" cy="98" rx="8" ry="10" fill="white"/><ellipse cx="85" cy="98" rx="5" ry="7" fill="#2d3436"/><circle cx="87" cy="96" r="2" fill="white"/></g>
          <g id="right-eye"><ellipse cx="117" cy="98" rx="8" ry="10" fill="white"/><ellipse cx="115" cy="98" rx="5" ry="7" fill="#2d3436"/><circle cx="113" cy="96" r="2" fill="white"/></g>
        `;
      },
      angry: () => {
        mouth.innerHTML = '<path d="M 92 118 Q 100 112 108 118" fill="none" stroke="#2d3436" stroke-width="2" stroke-linecap="round"/>';
        eyes.innerHTML = `
          <g id="left-eye"><ellipse cx="83" cy="95" rx="8" ry="10" fill="white"/><path d="M 75 90 L 91 100" stroke="#2d3436" stroke-width="2"/><ellipse cx="85" cy="95" rx="3" ry="5" fill="#2d3436"/></g>
          <g id="right-eye"><ellipse cx="117" cy="95" rx="8" ry="10" fill="white"/><path d="M 109 100 L 125 90" stroke="#2d3436" stroke-width="2"/><ellipse cx="115" cy="95" rx="3" ry="5" fill="#2d3436"/></g>
        `;
      },
      sleep: () => {
        mouth.innerHTML = '<ellipse cx="100" cy="115" rx="4" ry="3" fill="#2d3436"/>';
        eyes.innerHTML = `
          <g id="left-eye"><path d="M 75 95 Q 83 98 91 95" fill="none" stroke="#2d3436" stroke-width="2"/></g>
          <g id="right-eye"><path d="M 109 95 Q 117 98 125 95" fill="none" stroke="#2d3436" stroke-width="2"/></g>
        `;
      }
    };

    if (emotions[name]) emotions[name]();
  }

  // === ДЕЙСТВИЯ ===
  wave() {
    const arm = this.svgDoc?.getElementById('right-arm');
    if (arm) {
      arm.classList.add('bunny-wave-arm');
      setTimeout(() => arm.classList.remove('bunny-wave-arm'), 1500);
    }
  }

  jump() {
    this.container.querySelector('svg')?.classList.add('bunny-jump');
    setTimeout(() => this.container.querySelector('svg')?.classList.remove('bunny-jump'), 600);
  }

  clap() {
    this.container.querySelector('svg')?.classList.add('bunny-clap');
    setTimeout(() => this.container.querySelector('svg')?.classList.remove('bunny-clap'), 300);
  }

  // === СЛЕЖЕНИЕ ЗА МЫШЬЮ ===
  lookAtMouse(enable) {
    this.mouseTracking = enable;
    if (!enable) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
    } else {
      this.mouseMoveHandler = (e) => this.lookAt(e.clientX, e.clientY);
      document.addEventListener('mousemove', this.mouseMoveHandler);
    }
  }

  lookAt(x, y) {
    if (!this.svgDoc) return;
    const eyes = this.svgDoc.querySelectorAll('#left-eye ellipse:last-of-type, #right-eye ellipse:last-of-type');
    const containerRect = this.container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const dx = Math.min(Math.max((x - centerX) / 50, -3), 3);
    const dy = Math.min(Math.max((y - centerY) / 50, -3), 3);
    eyes.forEach(eye => eye.setAttribute('transform', `translate(${dx}, ${dy})`));
  }

  // === АКСЕССУАРЫ ===
  setInstrument(name) {
    // Упрощённая версия: меняем иконку рядом или добавляем SVG-элемент
    this.instrument = name;
    // В реальной реализации здесь может быть добавление соответствующего SVG-аксессуара
  }

  // === АВТОМАТИЧЕСКОЕ ПОВЕДЕНИЕ ===
  startAutoBehaviors() {
    // Моргание
    setInterval(() => {
      this.container.querySelector('svg')?.classList.add('bunny-blink');
      setTimeout(() => this.container.querySelector('svg')?.classList.remove('bunny-blink'), 150);
    }, 3000);

    // Дыхание
    this.container.querySelector('svg')?.classList.add('bunny-breathe');
  }

  destroy() {
    clearInterval(this.autoBehaviors);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    this.container.innerHTML = '';
  }
}

// Авто-инициализация, если есть контейнер
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('music-bunny');
  if (container) {
    window.bunny = new MusicBunny('music-bunny');
  }
});
