export default function BirthdayLogo({ size = 520 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 520"
      width={size}
      height={size}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Gradients */}
        <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF85AD" />
          <stop offset="60%" stopColor="#FF4D8D" />
          <stop offset="100%" stopColor="#C91B6B" />
        </radialGradient>
        <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF4D8D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF4D8D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5A0" />
          <stop offset="40%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF5A0" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#D4A800" />
        </linearGradient>
        <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFC0CB" />
          <stop offset="100%" stopColor="#FF85AD" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5A0" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFF5A0" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Outer ring path for curved text */}
        <path id="topArc" d="M 100,260 A 160,160 0 0,1 420,260" fill="none" />
        <path id="bottomArc" d="M 130,300 A 135,135 0 0,0 390,300" fill="none" />
      </defs>

      {/* ── Outer glow aura ── */}
      <circle cx="260" cy="260" r="200" fill="url(#heartGlow)" />

      {/* ── Decorative outer ring ── */}
      <circle cx="260" cy="260" r="215" fill="none" stroke="url(#rimGrad)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7" />
      <circle cx="260" cy="260" r="205" fill="none" stroke="url(#rimGrad)" strokeWidth="0.8" opacity="0.4" />

      {/* ── Diamond markers on ring ── */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r = 215, rad = (deg * Math.PI) / 180;
        const x = 260 + r * Math.cos(rad), y = 260 + r * Math.sin(rad);
        return <polygon key={i} points={`${x},${y-5} ${x+3},${y} ${x},${y+5} ${x-3},${y}`} fill="url(#goldGrad)" opacity="0.85" />;
      })}

      {/* ── Floral petals (background) ── */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const px = 260 + 175 * Math.cos(rad), py = 260 + 175 * Math.sin(rad);
        return (
          <g key={i} transform={`translate(${px},${py}) rotate(${deg})`}>
            <ellipse rx="14" ry="26" fill="#FFC0CB" opacity="0.35" />
            <ellipse rx="8" ry="16" fill="#FF85AD" opacity="0.25" />
          </g>
        );
      })}

      {/* ── Heart emblem (main) ── */}
      <g filter="url(#glow)">
        <path
          d="M260,185
             C260,185 215,148 188,148
             C155,148 132,172 132,200
             C132,245 175,275 260,320
             C345,275 388,245 388,200
             C388,172 365,148 332,148
             C305,148 260,185 260,185 Z"
          fill="url(#heartGrad)"
        />
      </g>
      {/* Heart inner highlight */}
      <path
        d="M230,168 C224,165 206,162 198,172 C190,182 192,196 200,204"
        fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="5" strokeLinecap="round"
      />

      {/* ── Crown above heart ── */}
      <g transform="translate(260,112)" filter="url(#goldGlow)">
        {/* Crown base band */}
        <rect x="-38" y="22" width="76" height="10" rx="3" fill="url(#crownGrad)" />
        {/* Crown points */}
        <polygon points="-38,22 -28,0 -16,16 0,-8 16,16 28,0 38,22" fill="url(#crownGrad)" />
        {/* Crown gems */}
        <circle cx="0" cy="-4" r="5" fill="#FF4D8D" stroke="#FFD700" strokeWidth="1.5" />
        <circle cx="-22" cy="14" r="3.5" fill="#FFC0CB" stroke="#FFD700" strokeWidth="1" />
        <circle cx="22" cy="14" r="3.5" fill="#FFC0CB" stroke="#FFD700" strokeWidth="1" />
        {/* Tiny sparkle on top gem */}
        <line x1="0" y1="-12" x2="0" y2="-18" stroke="#FFF5A0" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="-5" y1="-9" x2="-8" y2="-14" stroke="#FFF5A0" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="5" y1="-9" x2="8" y2="-14" stroke="#FFF5A0" strokeWidth="1.2" strokeLinecap="round"/>
      </g>

      {/* ── Birthday Cake (inside heart) ── */}
      <g transform="translate(260,252)">
        {/* Cake base tier */}
        <rect x="-34" y="4" width="68" height="26" rx="5" fill="url(#cakeGrad)" />
        {/* Cake top tier */}
        <rect x="-24" y="-16" width="48" height="22" rx="5" fill="#FFD1DC" />
        {/* Frosting drips */}
        <path d="M-34,4 Q-28,-2 -22,4 Q-16,-2 -10,4 Q-4,-2 2,4 Q8,-2 14,4 Q20,-2 26,4 Q32,-2 34,4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        <path d="M-24,-16 Q-19,-21 -14,-16 Q-9,-21 -4,-16 Q1,-21 6,-16 Q11,-21 16,-16 Q21,-21 24,-16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Candles */}
        {[-14, 0, 14].map((cx, i) => (
          <g key={i} transform={`translate(${cx},-16)`}>
            <rect x="-3" y="-14" width="6" height="14" rx="2" fill={['#FFD700','#FF4D8D','#FFF5A0'][i]} />
            {/* Flame */}
            <ellipse cx="0" cy="-17" rx="3" ry="5" fill="#FFD700" opacity="0.9" />
            <ellipse cx="0" cy="-18" rx="1.5" ry="3" fill="#FFF5A0" />
          </g>
        ))}
        {/* Cake decoration dots */}
        {[-22,-10,4,18].map((dx,i) => (
          <circle key={i} cx={dx} cy="17" r="2.5" fill="#FFD700" opacity="0.8"/>
        ))}
        {[-16,-4,8].map((dx,i) => (
          <circle key={i} cx={dx} cy="-5" r="2" fill="#FF4D8D" opacity="0.7"/>
        ))}
      </g>

      {/* ── Main text: "Happy Birthday My Love" ── */}
      <text
        x="260" y="370"
        textAnchor="middle"
        fontFamily="'Great Vibes', 'Dancing Script', cursive"
        fontSize="34"
        fill="url(#goldGrad)"
        filter="url(#softGlow)"
        letterSpacing="1"
      >
        Happy Birthday My Love
      </text>

      {/* ── Heart emoji after title ── */}
      <text x="260" y="396" textAnchor="middle" fontSize="13" fill="#FF4D8D" opacity="0.9" letterSpacing="6">
        ♥ · ♥ · ♥
      </text>

      {/* ── Date decorative rule ── */}
      <g transform="translate(260,416)">
        <line x1="-80" y1="0" x2="-28" y2="0" stroke="url(#rimGrad)" strokeWidth="1" />
        <polygon points="0,-4 4,0 0,4 -4,0" fill="url(#goldGrad)" />
        <line x1="28" y1="0" x2="80" y2="0" stroke="url(#rimGrad)" strokeWidth="1" />
      </g>

      {/* ── Date: "10 July 2006" ── */}
      <text
        x="260" y="444"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', 'Didact Gothic', Georgia, serif"
        fontSize="22"
        fontWeight="600"
        fill="url(#goldGrad)"
        filter="url(#goldGlow)"
        letterSpacing="5"
      >
        10 · JULY · 2006
      </text>

      {/* ── Sparkles scattered ── */}
      {[
        [100,130,18], [420,130,14], [80,260,10], [440,260,12],
        [130,400,10], [390,395,10], [200,140,8], [320,140,8],
        [165,455,8], [355,455,8],
      ].map(([x,y,s], i) => (
        <g key={i} transform={`translate(${x},${y})`} filter="url(#goldGlow)">
          <line x1="0" y1={-s} x2="0" y2={s} stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={-s} y1="0" x2={s} y2="0" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={-s*.65} y1={-s*.65} x2={s*.65} y2={s*.65} stroke="#FFF5A0" strokeWidth="1" strokeLinecap="round"/>
          <line x1={s*.65} y1={-s*.65} x2={-s*.65} y2={s*.65} stroke="#FFF5A0" strokeWidth="1" strokeLinecap="round"/>
          <circle r="2" fill="#FFD700"/>
        </g>
      ))}

      {/* ── Tiny floating hearts ── */}
      {[[155,192],[365,192],[140,310],[380,310]].map(([x,y],i) => (
        <text key={i} x={x} y={y} fontSize="14" textAnchor="middle" fill="#FF4D8D" opacity="0.6">♥</text>
      ))}

      {/* ── Floral accent roses (left & right) ── */}
      {/* Left rose */}
      <g transform="translate(96,265)" opacity="0.75">
        <circle r="9" fill="#FF4D8D" />
        <circle cx="-7" cy="-5" r="6" fill="#FF85AD" />
        <circle cx="7" cy="-5" r="6" fill="#FF85AD" />
        <circle cx="0" cy="-11" r="6" fill="#FFC0CB" />
        <circle cx="-10" cy="4" r="5" fill="#FF85AD" />
        <circle cx="10" cy="4" r="5" fill="#FF85AD" />
        <circle r="5" fill="#C91B6B" />
        {/* Leaves */}
        <ellipse cx="-14" cy="10" rx="7" ry="4" fill="#5a9e4a" opacity="0.7" transform="rotate(-30,-14,10)"/>
        <ellipse cx="14" cy="10" rx="7" ry="4" fill="#5a9e4a" opacity="0.7" transform="rotate(30,14,10)"/>
      </g>
      {/* Right rose */}
      <g transform="translate(424,265)" opacity="0.75">
        <circle r="9" fill="#FF4D8D" />
        <circle cx="-7" cy="-5" r="6" fill="#FF85AD" />
        <circle cx="7" cy="-5" r="6" fill="#FF85AD" />
        <circle cx="0" cy="-11" r="6" fill="#FFC0CB" />
        <circle cx="-10" cy="4" r="5" fill="#FF85AD" />
        <circle cx="10" cy="4" r="5" fill="#FF85AD" />
        <circle r="5" fill="#C91B6B" />
        <ellipse cx="-14" cy="10" rx="7" ry="4" fill="#5a9e4a" opacity="0.7" transform="rotate(-30,-14,10)"/>
        <ellipse cx="14" cy="10" rx="7" ry="4" fill="#5a9e4a" opacity="0.7" transform="rotate(30,14,10)"/>
      </g>

      {/* ── Bottom ornamental flourish ── */}
      <g transform="translate(260,470)" opacity="0.7">
        <path d="M-70,0 Q-50,-12 -30,0 Q-10,-12 0,0 Q10,-12 30,0 Q50,-12 70,0" fill="none" stroke="url(#rimGrad)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="-70" cy="0" r="2.5" fill="#FFD700"/>
        <circle cx="70" cy="0" r="2.5" fill="#FFD700"/>
        <circle cy="0" r="2.5" fill="#FF4D8D"/>
      </g>

      {/* ── Animated sparkle pulses (CSS) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@600&display=swap');
      `}</style>
    </svg>
  );
}
