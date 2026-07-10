import React, { useState, useRef, useEffect, useCallback } from 'react';
import './LoginPage.css';

// Stable data — computed once at module level
const HEARTS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.7 + 2) % 100}%`,
  delay: `${(i * 0.46) % 10}s`,
  duration: `${7 + (i * 0.38) % 8}s`,
  size: `${14 + (i * 1.1) % 22}px`,
  emoji: ['❤️', '💕', '💗', '💖', '💝', '🌸'][i % 6],
}));

const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${(i * 2.9 + 1) % 100}%`,
  delay: `${(i * 0.34) % 12}s`,
  duration: `${5 + (i * 0.24) % 9}s`,
}));

export default function LoginPage({ onLogin, content = {}, password = '1072006', audioRef }) {
  const c = {
    pageTitle:   content.pageTitle   || '❤️ A Special Surprise Awaits ❤️',
    heading:     content.heading     || 'Welcome, My Love',
    subheading:  content.subheading  || 'Enter your special date to unlock your surprise.',
    placeholder: content.placeholder || 'Enter Your Birthday',
    btnText:     content.btnText     || 'Unlock My Surprise ❤️',
    errorMsg:    content.errorMsg    || 'Oops! Try your special date again ❤️',
    successMsg:  content.successMsg  || 'Welcome, Beautiful ❤️',
    successSub:  content.successSub  || 'Your surprise is waiting for you...',
    tagline:     content.tagline     || 'Made with endless love, just for you 💕',
    hint:        content.hint        || 'Hint: the day you came into this world 🌸',
  };

  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | success
  const [shake, setShake] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('div');
    el.className = 'lp-cursor';
    el.textContent = '💗';
    document.body.appendChild(el);
    const move = (e) => {
      el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => { window.removeEventListener('mousemove', move); el.remove(); };
  }, []);

  // password is included in deps so it always uses the latest value from the API
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (value === password) {
      setStatus('success');
      audioRef.current?.play().catch(() => {});
      setTimeout(() => onLogin(), 2600);
    } else {
      setStatus('error');
      setShake(true);
      setTimeout(() => { setShake(false); setStatus('idle'); }, 1800);
    }
  }, [value, password, onLogin, audioRef]);

  return (
    <div className="lp-root">

      <div className="lp-orb lp-orb-1" />
      <div className="lp-orb lp-orb-2" />
      <div className="lp-orb lp-orb-3" />

      <div className="lp-particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <div key={p.id} className="lp-particle" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }} />
        ))}
      </div>

      <div className="lp-hearts" aria-hidden="true">
        {HEARTS.map(h => (
          <div key={h.id} className="lp-heart" style={{ left: h.left, animationDelay: h.delay, animationDuration: h.duration, fontSize: h.size }}>
            {h.emoji}
          </div>
        ))}
      </div>

      <div className={`lp-card ${shake ? 'lp-shake' : ''} ${status === 'success' ? 'lp-success-card' : ''}`}>
        {status === 'success' ? (
          <div className="lp-success-state">
            <div className="lp-success-heart">💖</div>
            <p className="lp-success-msg">{c.successMsg}</p>
            <p className="lp-success-sub">{c.successSub}</p>
            <div className="lp-success-dots">
              <span /><span /><span />
            </div>
          </div>
        ) : (
          <>
            <div className="lp-emblem" aria-hidden="true">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <defs>
                  <radialGradient id="hg" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FF85AD" />
                    <stop offset="100%" stopColor="#FF4D8D" />
                  </radialGradient>
                  <filter id="hglow">
                    <feGaussianBlur stdDeviation="3" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <path filter="url(#hglow)" fill="url(#hg)"
                  d="M36,24 C36,24 25,16 18,16 C10,16 4,22 4,30 C4,42 18,52 36,64 C54,52 68,42 68,30 C68,22 62,16 54,16 C47,16 36,24 36,24Z"/>
                <text x="36" y="44" textAnchor="middle" fontSize="18" fill="white" opacity="0.9">💍</text>
              </svg>
            </div>

            <div className="lp-divider-top" aria-hidden="true">
              <span />✦<span />
            </div>

            <p className="lp-page-title">{c.pageTitle}</p>
            <h1 className="lp-heading">{c.heading}</h1>
            <p className="lp-subheading">{c.subheading}</p>

            <form onSubmit={handleSubmit} className="lp-form">
              <div className="lp-input-wrap">
                <span className="lp-input-icon">🔐</span>
                <input
                  ref={inputRef}
                  type={showPass ? 'text' : 'password'}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={c.placeholder}
                  className="lp-input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <label className="lp-checkbox-label">
                <input
                  type="checkbox"
                  className="lp-checkbox"
                  checked={showPass}
                  onChange={e => setShowPass(e.target.checked)}
                />
                <span className="lp-checkbox-box">
                  <svg className="lp-check-icon" viewBox="0 0 12 10" fill="none">
                    <polyline points="1,5 4.5,8.5 11,1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="lp-checkbox-text">Show password</span>
              </label>

              {status === 'error' && (
                <p className="lp-error">{c.errorMsg}</p>
              )}

              <button type="submit" className="lp-btn">
                <span>{c.btnText}</span>
              </button>
            </form>

            <div className="lp-hint"><span>✨</span><p>{c.hint}</p></div>

            <div className="lp-divider-bot" aria-hidden="true">
              <span />💕<span />
            </div>
          </>
        )}
      </div>

      {status !== 'success' && (
        <p className="lp-tagline">{c.tagline}</p>
      )}
    </div>
  );
}
