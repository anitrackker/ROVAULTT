/**
 * VaultIcon — custom currency glyph for RoVault VAULT token.
 * Looks like a $ but uses a bold V with two vertical strokes through it.
 * Drop-in replacement for <span className="currency-symbol">VAULT</span>.
 */
export const VaultIcon = ({ size = 18, color = '#00e676', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="VAULT"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    {/* Two vertical bars through the V, like a $ */}
    <line x1="7"  y1="1.5" x2="7"  y2="18.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="13" y1="1.5" x2="13" y2="18.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    {/* Bold V shape */}
    <polyline
      points="3,3 10,17 17,3"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/** Inline currency label: icon + number, used in control panels */
export const VaultAmount = ({ amount, size = 16, className = '' }) => (
  <span
    className={`vault-amount-inline ${className}`}
    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700, color: '#00e676' }}
  >
    <VaultIcon size={size} />
    {amount}
  </span>
);
