import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import BirthdayLogo from './BirthdayLogo';
import LoginPage from './LoginPage';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const GRADIENTS = [
  'linear-gradient(135deg,#ff9a9e,#fad0c4)',
  'linear-gradient(135deg,#fbc2eb,#a6c1ee)',
  'linear-gradient(135deg,#fddb92,#d1fdff)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  'linear-gradient(135deg,#ff9a9e,#a18cd1)',
  'linear-gradient(135deg,#ffd1ff,#fad0c4)',
];

const DEFAULT_CONTENT = {
  hero: {
    pre: '✨ For You, My Love ✨',
    sub: 'Today is all about celebrating the most beautiful person in my world.',
    body: 'Every smile of yours lights up my life, and every moment with you becomes a memory I never want to lose.',
    cta: 'Open My Surprise 💝',
  },
  story: {
    title: 'Our Beautiful Journey ✨',
    sub: 'Every chapter written together',
    items: [
      { icon: '💬', title: 'Where It All Began', text: 'From our very first conversation, something shifted in my world.' },
      { icon: '🌹', title: 'Falling For You', text: 'Every laugh, every glance — I found myself falling deeper every day.' },
      { icon: '💑', title: 'Us Against The World', text: 'Side by side, we turned ordinary moments into extraordinary memories.' },
      { icon: '🌟', title: 'Today & Always', text: 'You have brought happiness, warmth, and meaning into my world in ways I never imagined.' },
    ],
  },
  gallery: {
    title: 'Our Favorite Memories 📸',
    sub: 'Moments frozen in time',
    photos: [
      { label: 'Tum 💕', url: '/images/1783615604196-658996858_18085527137337424_8584076664170005720_n.jpg' },
      { label: 'Bus Tum 😄', url: '/images/1783615604196-658996858_18085527137337424_8584076664170005720_n.jpg' },
      { label: 'Bus Tum Ho 🌍', url: '/images/1783615604196-658996858_18085527137337424_8584076664170005720_n.jpg' },
      { label: 'Bus Tum Ho Rahogi ✨', url: '/images/1783615604196-658996858_18085527137337424_8584076664170005720_n.jpg' },
      { label: 'hai Bus Tum Ho Rahogi 🌸', url: '/images/1783615604196-658996858_18085527137337424_8584076664170005720_n.jpg' },
      { label: 'han bus Tumhen hi Rahana hai', url: '/images/1783615604196-658996858_18085527137337424_8584076664170005720_n.jpg' },
    ],
  },
  reasons: {
    title: '10 Reasons Why I Love You ❤️',
    sub: 'Let me count the ways…',
    items: [
      { icon: '😊', text: 'Your beautiful smile' },
      { icon: '💝', text: 'Your caring heart' },
      { icon: '🌸', text: 'Your kindness' },
      { icon: '✨', text: 'Your honesty' },
      { icon: '😄', text: 'Your sense of humor' },
      { icon: '🤝', text: 'Your support' },
      { icon: '🧠', text: 'Your intelligence' },
      { icon: '💪', text: 'Your strength' },
      { icon: '🌟', text: 'The happiness you bring into my life' },
      { icon: '💖', text: 'Because you are uniquely you' },
    ],
  },
  letter: {
    title: 'A Letter From My Heart 💌',
    body: 'Someone once said something very true: when I wasn’t even looking for you, I found you. But now I want you to stay with me forever. I feel like you are the one person I have been looking for all this time. Now that I have found you, I don’t want anything else. Don’t worry, I am with you in every situation and every condition. Whenever you need me, I will be there with you, and I will never let go of your hand. I will never fall short in loving you. I have so many things to write, but I feel like this space will not be enough because there is so much love that it cannot be expressed in words.',
    sign: '— Yours, Always 💕',
  },
  wish: {
    title: 'My Birthday Wish For You 🎂',
    body: 'I want you to always be happy, and I hope you get everything you want. May all your dreams come true. I am with you in every situation, and I will always be there for you. May you always have good health and stay happy wherever you are.',
    icons: '🌸 🎂 🌟 💐 🎁 ✨',
  },
  proposal: {
    title: 'One More Special Surprise ❤️',
    sub: 'There is something I have wanted to tell you from the bottom of my heart.',
    heading: 'Will You Be Mine Forever? 💍',
    body: "Even though we haven’t met yet and we only talk on calls, somehow you have become such a special part of my life. I really enjoy every conversation we have, and talking to you has become one of my favorite parts of the day. I don’t just want to celebrate your birthday today, I hope one day I can be there with you to celebrate your future birthdays, your dreams, your success, and all the beautiful moments in your life. I don’t know what the future holds, but I do know that I want you to be a part of it. I love you. ❤️",
    btn1: '💖 YES, FOREVER',
    btn2: '🥰 ABSOLUTELY YES',
    celebration: '🎉 You Just Made Me The Happiest Person In The World ❤️',
  },
  forever: {
    title: 'Forever Starts Here 💕',
    body: 'We haven’t met yet, but somehow you have already become such a special part of my life. I don’t know what forever holds, but if I had a choice, I’d choose you to be a part of mine. ❤️',
  },
  footer: { text: 'Made With Endless Love ❤️' },
  login: {
    pageTitle: '❤️ A Special Surprise Awaits ❤️',
    heading: 'Welcome, My Love',
    subheading: 'Enter your special date to unlock your surprise.',
    placeholder: 'Enter Your Birthday',
    btnText: 'Unlock My Surprise ❤️',
    errorMsg: 'Oops! Try your special date again ❤️',
    successMsg: 'Welcome, Beautiful ❤️',
    successSub: 'Your surprise is waiting for you...',
    tagline: 'Made with endless love, just for you 💕',
    hint: 'Hint: the day you came into this world 🌸',
  },
  password: '1072006',
};

function useContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  useEffect(() => {
    fetch(`${API}/api/content`)
      .then(r => r.json())
      .then(data => {
        // Rewrite legacy /uploads/ paths to /images/ for Netlify static hosting
        if (data.gallery?.photos) {
          data.gallery.photos = data.gallery.photos.map(p => ({
            ...p,
            url: p.url ? p.url.replace('/uploads/', '/images/') : p.url,
          }));
        }
        setContent(data);
      })
      .catch(() => {});
  }, []);
  return content;
}

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return <div ref={ref} className={`anim-section ${visible ? 'visible' : ''} ${className}`}>{children}</div>;
}

// Stable data — computed once at module level, never recreated
const HERO_HEARTS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.7 + 3) % 100}%`,
  delay: `${(i * 0.45) % 8}s`,
  size: `${12 + (i * 7) % 20}px`,
  emoji: ['❤️', '💕', '💗', '💖', '💝'][i % 5],
}));

const HERO_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 3.4 + 1) % 100}%`,
  delay: `${(i * 0.33) % 10}s`,
  duration: `${6 + (i * 0.27) % 8}s`,
}));

// Stable confetti data — no Math.random() at render time
const CONFETTI_PIECES = Array.from({ length: 80 }, (_, i) => ({
  left: `${(i * 1.27) % 100}%`,
  background: ['#FF4D6D', '#FFB6C1', '#FFD700', '#fff', '#a18cd1', '#fbc2eb'][i % 6],
  delay: `${(i * 0.025) % 2}s`,
  duration: `${2 + (i * 0.025) % 2}s`,
  width: `${6 + (i * 0.1) % 8}px`,
  height: `${6 + (i * 0.13) % 8}px`,
  borderRadius: i % 2 === 0 ? '50%' : '2px',
}));

function FloatingHearts() {
  return (
    <div className="hearts-container" aria-hidden="true">
      {HERO_HEARTS.map((h, i) => (
        <div key={i} className="heart" style={{ left: h.left, animationDelay: h.delay, fontSize: h.size }}>
          {h.emoji}
        </div>
      ))}
    </div>
  );
}

function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {HERO_PARTICLES.map((p, i) => (
        <div key={i} className="particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
      ))}
    </div>
  );
}

function Typewriter({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span>{displayed}<span className="cursor">|</span></span>;
}

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div className="confetti-wrap" aria-hidden="true">
      {CONFETTI_PIECES.map((p, i) => (
        <div key={i} className="confetti-piece" style={{
          left: p.left,
          background: p.background,
          animationDelay: p.delay,
          animationDuration: p.duration,
          width: p.width,
          height: p.height,
          borderRadius: p.borderRadius,
        }} />
      ))}
    </div>
  );
}

const SONG = '/song/Kya Batayein (Official Video) _ Samyak P _ Abhijeet S _ Shayra A _ Unbound Records_320k.mp3';

function MusicPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(true);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}); }
  }, [playing, audioRef]);

  return (
    <div className="music-player">
      <button className="music-btn" onClick={toggle} title="Toggle music">
        {playing ? '🎵' : '🎶'}
        <span>{playing ? 'Pause Music' : 'Play Music'}</span>
      </button>
    </div>
  );
}

function LightboxModal({ photo, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!photo) return null;
  const hasUrl = photo.url && photo.url.trim() !== '';
  const imgSrc = hasUrl ? photo.url : null;
  const bgStyle = hasUrl ? { background: '#111' } : { background: GRADIENTS[photo.idx] || GRADIENTS[0] };

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-inner" style={bgStyle} onClick={e => e.stopPropagation()}>
        {imgSrc
          ? <img src={imgSrc} alt={photo.label} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 16, objectFit: 'contain' }} />
          : <span className="lightbox-label">{photo.label}</span>
        }
        <button className="lightbox-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default function App() {
  const content = useContent();
  const { hero, story, gallery, reasons, letter, wish, proposal, forever, footer, login, password } = content;

  const audioRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = useCallback(() => {
    setLoggedIn(true);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 100);
  }, []);
  const [revealed, setRevealed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [videoOpen, setVideoOpen] = useState(null); // null | 1 | 2

  const openVideo = useCallback((num) => {
    setVideoOpen(num);
    audioRef.current?.pause();
  }, [audioRef]);

  const closeVideo = useCallback(() => {
    setVideoOpen(null);
    audioRef.current?.play().catch(() => {});
  }, [audioRef]);

  const celebrate = useCallback(() => {
    setCelebrated(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 5000);
  }, []);

  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'custom-cursor';
    el.textContent = '💗';
    document.body.appendChild(el);
    const move = (e) => {
      el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => { window.removeEventListener('mousemove', move); el.remove(); };
  }, []);

  if (!loggedIn) return <LoginPage onLogin={handleLogin} content={login} password={password} audioRef={audioRef} />;

  // Guard against content still loading — all arrays must exist before mapping
  if (!story?.items || !gallery?.photos || !reasons?.items) return null;

  return (
    <div className="app">
      {/* Single persistent audio element — never unmounts */}
      <audio ref={audioRef} loop src={SONG} />
      <MusicPlayer audioRef={audioRef} />
      <Confetti active={confetti} />
      <LightboxModal photo={lightbox} onClose={() => setLightbox(null)} />

      {/* HERO */}
      <section className="hero">
        <Particles />
        <FloatingHearts />
        <div className="hero-content">
          <div className="hero-logo-wrap">
            <BirthdayLogo size={420} />
          </div>
          <p className="hero-sub">{hero.sub}</p>
          <p className="hero-body">{hero.body}</p>
          <a href="#story" className="cta-btn">{hero.cta}</a>
        </div>
        <div className="scroll-hint" aria-hidden="true">↓</div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="section story-section">
        <AnimatedSection>
          <h2 className="section-title">{story.title}</h2>
          <p className="section-sub">{story.sub}</p>
        </AnimatedSection>
        <div className="timeline">
          {story.items.map((item, i) => (
            <AnimatedSection key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-card glass">
                <div className="timeline-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery-section">
        <AnimatedSection>
          <h2 className="section-title">{gallery.title}</h2>
          <p className="section-sub">{gallery.sub}</p>
        </AnimatedSection>
        <div className="gallery-grid">
          {gallery.photos.map((p, i) => (
            <AnimatedSection key={i}>
              <div
                className="photo-card"
                style={{ background: p.url ? 'none' : GRADIENTS[i] }}
                onClick={() => setLightbox({ ...p, idx: i })}
              >
                {p.url && <img src={p.url} alt={p.label} className="photo-img" />}
                <div className="photo-overlay"><span>🔍 View</span></div>
                <div className="photo-label">{p.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* REASONS */}
      <section className="section reasons-section">
        <AnimatedSection>
          <h2 className="section-title">{reasons.title}</h2>
          <p className="section-sub">{reasons.sub}</p>
        </AnimatedSection>
        <div className="reasons-grid">
          {reasons.items.map((r, i) => (
            <AnimatedSection key={i}>
              <div className="reason-card glass">
                <div className="reason-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="reason-icon">{r.icon}</div>
                <p>{r.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* LOVE LETTER */}
      <section className="section letter-section">
        <AnimatedSection>
          <h2 className="section-title">{letter.title}</h2>
        </AnimatedSection>
        <AnimatedSection>
          <div className="letter-card glass">
            <div className="letter-decor" aria-hidden="true">💌</div>
            <p>{letter.body}</p>
            <p className="letter-sign">{letter.sign}</p>
          </div>
        </AnimatedSection>
      </section>

      {/* BIRTHDAY WISH */}
      <section className="section wish-section">
        <AnimatedSection>
          <h2 className="section-title">{wish.title}</h2>
          <div className="wish-card glass">
            <p>{wish.body}</p>
            <div className="wish-icons" aria-hidden="true">{wish.icons}</div>
          </div>
        </AnimatedSection>
      </section>

      {/* PROPOSAL */}
      <section className="section proposal-section">
        <FloatingHearts />
        <AnimatedSection>
          <h2 className="section-title">{proposal.title}</h2>
          <p className="section-sub">{proposal.sub}</p>
        </AnimatedSection>

        {!revealed ? (
          <AnimatedSection>
            <button className="reveal-btn" onClick={() => setRevealed(true)}>
              💍 Reveal The Surprise
            </button>
          </AnimatedSection>
        ) : (
          <AnimatedSection className="proposal-reveal">
            <h2 className="proposal-heading">
              <Typewriter text={proposal.heading} speed={60} />
            </h2>
            <p className="proposal-text">{proposal.body}</p>
            {!celebrated ? (
              <div className="proposal-btns">
                <button className="yes-btn" onClick={celebrate}>{proposal.btn1}</button>
                <button className="yes-btn secondary" onClick={celebrate}>{proposal.btn2}</button>
              </div>
            ) : (
              <div className="celebration-msg">{proposal.celebration}</div>
            )}
          </AnimatedSection>
        )}
      </section>

      {/* FOREVER */}
      <section className="section forever-section">
        <AnimatedSection>
          <h2 className="section-title">{forever.title}</h2>
          <p className="forever-text">{forever.body}</p>
        </AnimatedSection>
      </section>

      {/* VIDEO */}
      <section className="section video-section">
        <AnimatedSection>
          <h2 className="section-title">A Special Message For You 🎥</h2>
          <p className="section-sub">Something I made just for you</p>
        </AnimatedSection>
        <AnimatedSection>
          <div className="video-play-wrap">
            <button className="video-play-btn" onClick={() => openVideo(1)}>
              <span className="video-play-icon">▶</span>
              <span>Play Our Video 💕</span>
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* VIDEO POPUP */}
      {videoOpen && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeVideo}>✕</button>
            <video
              key={videoOpen}
              src="/video/mynew.MP4"
              controls
              autoPlay
            />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <p>{footer.text}</p>
        <div className="footer-hearts" aria-hidden="true">💕 💗 💖 💝 💕</div>
      </footer>
    </div>
  );
}
