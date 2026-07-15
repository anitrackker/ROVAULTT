import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#8b9cc7',
        lineHeight: '1.7'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '16px', borderRadius: '16px' }}>
          <ShieldCheck size={32} color="#a855f7" />
        </div>
        <div>
          <h1 style={{ color: 'white', margin: 0, fontSize: '32px' }}>Privacy Policy & Terms</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px' }}>Last updated: July 2026</p>
        </div>
      </div>

      <section style={{ marginBottom: '32px', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ color: 'white', marginTop: 0, fontSize: '20px' }}>1. Premium Virtual Currency (Vaults)</h2>
        <p>
          RoVault operates exclusively using our proprietary premium virtual currency known as "Vaults". Gameplay is conducted entirely with Vaults rather than direct fiat or real-world cash wagers. 
        </p>
        <p style={{ marginTop: '12px' }}>
          Users may top up their accounts by making secure cryptocurrency deposits, which are instantly converted into Vaults at a platform rate of <strong>1,200 Vaults per $2.00 USD</strong>. These Vaults constitute your active platform balance and are used to participate in games, engage with the ecosystem, and accumulate rewards.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '20px' }}>2. Information We Collect</h2>
        <p>
          We collect minimal information necessary to operate the platform securely:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Your Roblox Username and associated Avatar thumbnail.</li>
          <li>Your platform activity, including games played, virtual wagers placed, and chat messages sent.</li>
          <li>Blockchain public addresses generated for your deposit wallets.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '20px' }}>3. How We Use Your Information</h2>
        <p>
          Your information is used strictly to provide the RoVault service:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>To maintain your account balance and track your virtual winnings.</li>
          <li>To display your public profile on leaderboards and in the live chat.</li>
          <li>To verify deposits sent to your uniquely generated crypto wallets.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '20px' }}>4. Cookies and Local Storage</h2>
        <p>
          We use local storage mechanisms to persist your session, ensuring you do not have to log in repeatedly when you refresh the page. We also use cookies to store your preferences, such as dismissing the initial cookie notice banner.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ color: 'white', fontSize: '20px' }}>5. Provably Fair System</h2>
        <p>
          Our platform relies on a mathematically verifiable Provably Fair system. Server seeds, client seeds, and nonces are used to generate game outcomes in a completely transparent manner. We do not manipulate these outcomes.
        </p>
      </section>

      <div style={{ textAlign: 'center', marginTop: '60px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p>© 2026 RoVault. All rights reserved.</p>
      </div>
    </motion.div>
  );
}
