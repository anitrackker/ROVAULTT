import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import { bech32 } from 'bech32';
import * as ed25519 from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nrbkbklntuhknagiqlvx.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_22B0rDRkn4yV_ZShbwqI4Q_NVlcYKXQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = new Hono();

app.use('/api/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization', 'apikey', 'x-admin-key'],
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
}));

// Database client configured above

// ── Master mnemonic ──
let MASTER_MNEMONIC = process.env.MASTER_MNEMONIC;
if (!MASTER_MNEMONIC) {
  MASTER_MNEMONIC = bip39.generateMnemonic(256);
  console.warn('⚠️  No MASTER_MNEMONIC in .env — generated temp:', MASTER_MNEMONIC);
}

// ── Derivation helpers ──
function deriveAccountIndex(username) {
  const hashBytes = ethers.getBytes(ethers.id(username));
  return (hashBytes[0] << 8 | hashBytes[1]) % 100000;
}

function deriveBTC(rootNode, idx) {
  const node = rootNode.derivePath(`m/84'/0'/0'/0/${idx}`);
  const pubKeyBytes = ethers.getBytes(node.publicKey);
  const sha256Hash = ethers.sha256(pubKeyBytes);
  const hash160Hex = ethers.ripemd160(sha256Hash);
  const hash160Bytes = ethers.getBytes(hash160Hex);
  const words = bech32.toWords(hash160Bytes);
  return bech32.encode('bc', [0, ...words]);
}

function deriveETH(rootNode, idx) {
  const node = rootNode.derivePath(`m/44'/60'/0'/0/${idx}`);
  return node.address;
}

function deriveSOL(seed, idx) {
  const path = `m/44'/501'/${idx}'/0'`;
  const derived = ed25519.derivePath(path, seed.toString('hex'));
  const kp = Keypair.fromSeed(derived.key);
  return kp.publicKey.toBase58();
}

function deriveLTC(rootNode, idx) {
  const node = rootNode.derivePath(`m/84'/2'/0'/0/${idx}`);
  const pubKeyBytes = ethers.getBytes(node.publicKey);
  const sha256Hash = ethers.sha256(pubKeyBytes);
  const hash160Hex = ethers.ripemd160(sha256Hash);
  const hash160Bytes = ethers.getBytes(hash160Hex);
  const words = bech32.toWords(hash160Bytes);
  return bech32.encode('ltc', [0, ...words]);
}

// ═══════════════════════════════════════
// 1. Roblox Avatar Proxy
// ═══════════════════════════════════════
app.get('/api/roblox/avatar/:username', async (c) => {
  const username = c.req.param('username');
  try {
    const userRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    });
    const userData = await userRes.json();
    if (!userData.data || userData.data.length === 0) {
      return c.json({ avatarUrl: null, error: 'User not found on Roblox' });
    }
    const userId = userData.data[0].id;
    const thumbRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
    );
    const thumbData = await thumbRes.json();
    if (thumbData.data?.[0]?.imageUrl) {
      return c.json({ avatarUrl: thumbData.data[0].imageUrl, userId });
    }
    return c.json({ avatarUrl: null });
  } catch (e) {
    return c.json({ avatarUrl: null, error: e.message });
  }
});

// Direct image redirect for UI elements like Live Bets
app.get('/api/roblox/avatar-image/:username', async (c) => {
  const username = c.req.param('username');
  try {
    const userRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    });
    const userData = await userRes.json();
    if (userData.data && userData.data.length > 0) {
      const userId = userData.data[0].id;
      const thumbRes = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
      );
      const thumbData = await thumbRes.json();
      if (thumbData.data?.[0]?.imageUrl) {
        return c.redirect(thumbData.data[0].imageUrl);
      }
    }
  } catch (e) {}
  return c.redirect(`https://api.dicebear.com/9.x/avataaars/svg?seed=${username}&backgroundColor=transparent`);
});

// ═══════════════════════════════════════
// World Cup scoreboard proxy
// ═══════════════════════════════════════
app.get('/api/sports/worldcup', async (c) => {
  try {
    const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260720&limit=300');
    const data = await res.json();
    return c.json(data);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});

// ═══════════════════════════════════════
// 2. Generate all crypto wallets for a user
// ═══════════════════════════════════════
app.post('/api/wallet/generate', async (c) => {
  try {
    const body = await c.req.json();
    const username = body.username?.toLowerCase();
    if (!username) return c.json({ error: 'Username required' }, 400);

    const { data: userWallet } = await supabase.from('wallets').select('*').eq('username', username).single();

    // Return existing wallets if already generated
    if (userWallet) {
      return c.json({ wallets: userWallet });
    }

    // Derive new addresses for all chains
    const seed = bip39.mnemonicToSeedSync(MASTER_MNEMONIC);
    const rootNode = ethers.HDNodeWallet.fromSeed(seed);
    const idx = deriveAccountIndex(username);

    const wallets = {
      username,
      btc: deriveBTC(rootNode, idx),
      eth: deriveETH(rootNode, idx),
      sol: deriveSOL(seed, idx),
      ltc: deriveLTC(rootNode, idx),
    };

    await supabase.from('wallets').insert(wallets);

    return c.json({ wallets });
  } catch (e) {
    console.error('Wallet generation error:', e);
    return c.json({ error: e.message }, 500);
  }
});

// ═══════════════════════════════════════
// 3. Get user wallets
// ═══════════════════════════════════════
app.get('/api/wallet/:username', async (c) => {
  const username = c.req.param('username').toLowerCase();
  const { data: userWallet } = await supabase.from('wallets').select('*').eq('username', username).single();
  return c.json({ wallets: userWallet || null });
});

// ═══════════════════════════════════════
// 4. Crypto Prices & Deposit Checking
// ═══════════════════════════════════════

let cachedPrices = null;
let lastPriceFetch = 0;

async function getPrices() {
  if (cachedPrices && Date.now() - lastPriceFetch < 60000) return cachedPrices;
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,litecoin&vs_currencies=usd', {
      headers: { 'Accept': 'application/json', 'User-Agent': 'RoVault/1.0' }
    });
    const data = await res.json();
    
    if (!data || !data.bitcoin || !data.bitcoin.usd) {
      throw new Error('CoinGecko returned invalid data or rate limit exceeded');
    }

    const btc = parseFloat(data.bitcoin.usd);
    const eth = parseFloat(data.ethereum.usd);
    const sol = parseFloat(data.solana.usd);
    const ltc = parseFloat(data.litecoin.usd);
    
    if (btc > 0 && eth > 0) {
      cachedPrices = { btc, eth, sol, ltc };
      lastPriceFetch = Date.now();
    }
    return cachedPrices;
  } catch (e) {
    console.warn('Using fallback prices due to CoinGecko error:', e.message);
    return cachedPrices || { btc: 65000, eth: 3400, sol: 150, ltc: 85 };
  }
}

app.get('/api/crypto/prices', async (c) => {
  const prices = await getPrices();
  return c.json({ prices });
});

app.post('/api/wallet/check-deposits', async (c) => {
  try {
    const body = await c.req.json();
    const username = body.username?.toLowerCase();
    if (!username) return c.json({ error: 'Username required' }, 400);

    const { data: userWallets } = await supabase.from('wallets').select('*').eq('username', username).single();
    if (!userWallets) return c.json({ error: 'No wallets found' }, 404);

    const prices = await getPrices();
    let totalUsdCredited = 0;
    
    // Track credited balances to avoid double crediting
    if (!userWallets.credited) userWallets.credited = { btc: 0, eth: 0, sol: 0, ltc: 0 };

    // 1. Check ETH (ethers default provider)
    try {
      const ethProvider = ethers.getDefaultProvider();
      const ethBalRaw = await ethProvider.getBalance(userWallets.eth);
      const ethBal = parseFloat(ethers.formatEther(ethBalRaw));
      const uncreditedEth = ethBal - userWallets.credited.eth;
      const ethUsdValue = uncreditedEth * prices.eth;
      if (ethUsdValue >= 5.0) {
        totalUsdCredited += ethUsdValue;
        userWallets.credited.eth = ethBal;
      }
    } catch (e) { console.error('ETH check failed:', e.message); }

    // 2. Check SOL
    try {
      const { Connection, PublicKey } = await import('@solana/web3.js');
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const solBalRaw = await connection.getBalance(new PublicKey(userWallets.sol));
      const solBal = solBalRaw / 1e9; // lamports to SOL
      const uncreditedSol = solBal - userWallets.credited.sol;
      const solUsdValue = uncreditedSol * prices.sol;
      if (solUsdValue >= 5.0) {
        totalUsdCredited += solUsdValue;
        userWallets.credited.sol = solBal;
      }
    } catch (e) { console.error('SOL check failed:', e.message); }

    // 3. Check BTC (blockchain.info)
    try {
      const btcRes = await fetch(`https://blockchain.info/q/addressbalance/${userWallets.btc}`);
      const btcSatoshis = parseInt(await btcRes.text()) || 0;
      const btcBal = btcSatoshis / 1e8;
      const uncreditedBtc = btcBal - userWallets.credited.btc;
      const btcUsdValue = uncreditedBtc * prices.btc;
      if (btcUsdValue >= 5.0) {
        totalUsdCredited += btcUsdValue;
        userWallets.credited.btc = btcBal;
      }
    } catch (e) { console.error('BTC check failed:', e.message); }

    // 4. Check LTC (blockcypher)
    try {
      const ltcRes = await fetch(`https://api.blockcypher.com/v1/ltc/main/addrs/${userWallets.ltc}/balance`);
      const ltcData = await ltcRes.json();
      const ltcBal = (ltcData.balance || 0) / 1e8;
      const uncreditedLtc = ltcBal - userWallets.credited.ltc;
      const ltcUsdValue = uncreditedLtc * prices.ltc;
      if (ltcUsdValue >= 5.0) {
        totalUsdCredited += ltcUsdValue;
        userWallets.credited.ltc = ltcBal;
      }
    } catch (e) { console.error('LTC check failed:', e.message); }

    if (totalUsdCredited > 0) {
      await supabase.from('wallets').update({ credited: userWallets.credited }).eq('username', username);
      const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
      if (user) {
        const vaultEarned = totalUsdCredited * 600; // $2 = 1200 VAULT => $1 = 600 VAULT
        const newBalance = user.balance + vaultEarned;
        await supabase.from('users').update({ balance: newBalance }).eq('username', username);
        return c.json({ creditedUsd: totalUsdCredited, vaultEarned, newBalance });
      }
    }

    return c.json({ creditedUsd: 0 });
  } catch (e) {
    console.error('Deposit check error:', e);
    return c.json({ error: e.message }, 500);
  }
});

// 4. Transfer Vault Bucks (Donations)
app.post('/api/wallet/transfer', async (c) => {
  const body = await c.req.json();
  const fromUser = body.fromUser;
  const toUser = body.toUser;
  const amount = body.amount;
  const amt = parseInt(amount, 10);
  
  if (!fromUser || !toUser || isNaN(amt) || amt <= 0) return c.json({ error: 'Invalid parameters' }, 400);
  if (fromUser.toLowerCase() === toUser.toLowerCase()) return c.json({ error: 'Cannot transfer to self' }, 400);

  // 1. Get both users
  const { data: sender } = await supabase.from('users').select('*').eq('username', fromUser.toLowerCase()).single();
  const { data: receiver } = await supabase.from('users').select('*').eq('username', toUser.toLowerCase()).single();

  if (!sender) return c.json({ error: 'Sender not found' }, 404);
  if (!receiver) return c.json({ error: 'Receiver not found' }, 404);
  if (sender.balance < amt) return c.json({ error: 'Insufficient balance' }, 400);

  // 2. Perform the transfer
  const newSenderBal = sender.balance - amt;
  const newReceiverBal = receiver.balance + amt;

  // Track as admin action so the realtime modal catches it
  const action = { type: 'balance', prev: receiver.balance, next: newReceiverBal, note: `Gift from @${sender.username}`, ts: Date.now() };

  await supabase.from('users').update({ balance: newSenderBal }).eq('username', sender.username);
  await supabase.from('users').update({ balance: newReceiverBal, lastAdminAction: action }).eq('username', receiver.username);

  return c.json({ success: true, newBalance: newSenderBal });
});

// ═══════════════════════════════════════
// 5. Users — Supabase API
// ═══════════════════════════════════════

app.get('/api/users/:username', async (c) => {
  const username = c.req.param('username').toLowerCase();
  const { data } = await supabase.from('users').select('*').eq('username', username).single();
  return c.json({ data: data || null });
});

app.post('/api/users', async (c) => {
  try {
    const body = await c.req.json();
    const username = body.username.toLowerCase();
    const { data: existing } = await supabase.from('users').select('*').eq('username', username).single();
    
    const incomingWager = body.totalWagered ?? existing?.totalWagered ?? 0;
    const prevWager = existing?.totalWagered ?? 0;
    const addedWager = Math.max(0, incomingWager - prevWager);
    const weeklyWagered = (existing?.weeklyWagered ?? 0) + addedWager;

    const payload = {
      username,
      balance: body.balance ?? existing?.balance ?? 0,
      totalWagered: incomingWager,
      weeklyWagered,
      signupBonusMet: body.signupBonusMet ?? existing?.signupBonusMet ?? false,
      avatarUrl: body.avatarUrl || existing?.avatarUrl || null,
    };
    
    const { error } = await supabase.from('users').upsert(payload);
    if (error) {
      console.warn('Upsert failed (trying fallback without weeklyWagered/avatarUrl):', error.message);
      const fallbackPayload = {
        username,
        balance: body.balance ?? existing?.balance ?? 0,
        totalWagered: incomingWager,
        signupBonusMet: body.signupBonusMet ?? existing?.signupBonusMet ?? false,
      };
      await supabase.from('users').upsert(fallbackPayload);
    }
    return c.json({ success: true });
  } catch (err) {
    console.error('POST /api/users exception:', err);
    return c.json({ error: err.message }, 500);
  }
});

// ═══════════════════════════════════════
// 6. Admin API  (key: ROVAULTADMIN)
// ═══════════════════════════════════════
const ADMIN_KEY = 'ROVAULTADMIN';

function adminAuth(c) {
  const key = c.req.header('x-admin-key');
  return key === ADMIN_KEY;
}

// Promo Code Admin Endpoints
app.get('/api/admin/promos', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const promos = await getPromos();
  return c.json({ promos });
});

app.post('/api/admin/promos', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { code, vault, description } = await c.req.json();
  if (!code || !vault) return c.json({ error: 'Code and vault amount required' }, 400);
  const codeLower = code.toLowerCase().trim();
  const promos = await getPromos();
  promos[codeLower] = { vault: Number(vault), description: description || 'Admin created promo' };
  await savePromos(promos);
  return c.json({ success: true, promos });
});

app.delete('/api/admin/promos/:code', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const code = c.req.param('code').toLowerCase().trim();
  const promos = await getPromos();
  delete promos[code];
  await savePromos(promos);
  return c.json({ success: true, promos });
});

// GET all users
app.get('/api/admin/users', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { data: users } = await supabase.from('users').select('*');
  return c.json({ users: users || [] });
});

// GET wallet details for a user (admin only - exposes seed phrase)
app.get('/api/admin/wallet/:username', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const username = c.req.param('username').toLowerCase();

  const { data: wallet } = await supabase.from('wallets').select('*').eq('username', username).single();
  if (!wallet) return c.json({ error: 'No wallet found for this user' }, 404);

  const idx = deriveAccountIndex(username);

  return c.json({
    username,
    mnemonic: MASTER_MNEMONIC,
    accountIndex: idx,
    derivationPaths: {
      btc: `m/84'/0'/0'/0/${idx}`,
      eth: `m/44'/60'/0'/0/${idx}`,
      sol: `m/44'/501'/${idx}'/0'`,
      ltc: `m/84'/2'/0'/0/${idx}`,
    },
    addresses: {
      btc: wallet.btc,
      eth: wallet.eth,
      sol: wallet.sol,
      ltc: wallet.ltc,
    },
    credited: wallet.credited,
  });
});

// GET all wallets with total crypto balance
app.get('/api/admin/wallets', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  
  const { data: wallets } = await supabase.from('wallets').select('*');
  const { data: users } = await supabase.from('users').select('username, balance');
  
  const prices = await getPrices();
  const validMnemonic = bip39.validateMnemonic(MASTER_MNEMONIC);

  const enrichedWallets = (wallets || []).map(w => {
    const credited = w.credited || { btc: 0, eth: 0, sol: 0, ltc: 0 };
    const cryptoBalanceUsd = 
      (credited.btc * prices.btc) +
      (credited.eth * prices.eth) +
      (credited.sol * prices.sol) +
      (credited.ltc * prices.ltc);
      
    const user = (users || []).find(u => u.username === w.username);
    
    return {
      username: w.username,
      addresses: { btc: w.btc, eth: w.eth, sol: w.sol, ltc: w.ltc },
      credited,
      cryptoBalanceUsd,
      vaultBalance: user?.balance || 0,
    };
  });

  // Sort from highest crypto balance to the top
  enrichedWallets.sort((a, b) => b.cryptoBalanceUsd - a.cryptoBalanceUsd);

  return c.json({ 
    wallets: enrichedWallets,
    masterMnemonicValid: validMnemonic,
    mnemonicPreview: MASTER_MNEMONIC.substring(0, 15) + '...'
  });
});

// GET stats summary
app.get('/api/admin/stats', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { data: users } = await supabase.from('users').select('*');
  const userList = users || [];
  const totalBalance = userList.reduce((s, u) => s + (u.balance || 0), 0);
  const totalWagered = userList.reduce((s, u) => s + (u.totalWagered || 0), 0);
  const bannedCount = userList.filter(u => u.banned).length;
  return c.json({
    totalUsers: users.length,
    totalBalance,
    totalWagered,
    bannedCount,
    activeCount: userList.filter(u => !u.banned).length,
  });
});

// POST set balance
app.post('/api/admin/balance', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { username, balance, note } = await c.req.json();
  if (!username) return c.json({ error: 'Username required' }, 400);
  const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
  if (!user) return c.json({ error: 'User not found' }, 404);
  const prev = user.balance;
  const newBalance = Math.max(0, Number(balance));
  const lastAdminAction = { type: 'balance', prev, next: newBalance, note: note || '', ts: Date.now() };
  
  await supabase.from('users').update({ balance: newBalance, lastAdminAction }).eq('username', username);
  return c.json({ success: true, newBalance });
});

// POST ban
app.post('/api/admin/ban', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { username, reason } = await c.req.json();
  if (!username) return c.json({ error: 'Username required' }, 400);
  const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
  if (!user) return c.json({ error: 'User not found' }, 404);
  
  const updates = {
    banned: true,
    banReason: reason || 'No reason given',
    bannedAt: Date.now(),
    lastAdminAction: { type: 'ban', reason, ts: Date.now() }
  };
  await supabase.from('users').update(updates).eq('username', username);
  return c.json({ success: true });
});

// POST unban
app.post('/api/admin/unban', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { username } = await c.req.json();
  if (!username) return c.json({ error: 'Username required' }, 400);
  const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
  if (!user) return c.json({ error: 'User not found' }, 404);
  
  const updates = {
    banned: false,
    banReason: null,
    bannedAt: null,
    lastAdminAction: { type: 'unban', ts: Date.now() }
  };
  await supabase.from('users').update(updates).eq('username', username);
  return c.json({ success: true });
});

// DELETE user
app.delete('/api/admin/user/:username', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const username = c.req.param('username').toLowerCase();
  await supabase.from('users').delete().eq('username', username);
  return c.json({ success: true });
});

// POST reset balance to 0
app.post('/api/admin/reset', async (c) => {
  if (!adminAuth(c)) return c.json({ error: 'Unauthorized' }, 401);
  const { username } = await c.req.json();
  if (!username) return c.json({ error: 'Username required' }, 400);
  const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
  if (!user) return c.json({ error: 'User not found' }, 404);
  
  const updates = {
    balance: 0,
    lastAdminAction: { type: 'reset', ts: Date.now() }
  };
  await supabase.from('users').update(updates).eq('username', username);
  return c.json({ success: true });
});

// ═══════════════════════════════════════
// Leaderboard
// ═══════════════════════════════════════
app.get('/api/leaderboard', async (c) => {
  const tab = c.req.query('tab') || 'wagered'; // wagered | balance | weekly

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('username, balance, totalWagered, weeklyWagered, avatarUrl')
      .limit(50);

    let entries = [];

    if (error) {
      console.warn('Leaderboard query failed (trying fallback without weeklyWagered/avatarUrl):', error.message);
      const { data: fallbackUsers, error: fallbackError } = await supabase
        .from('users')
        .select('username, balance, totalWagered')
        .limit(50);

      if (fallbackError) {
        console.error('Leaderboard fallback query error:', fallbackError);
        return c.json({ leaderboard: [] });
      }

      entries = fallbackUsers.map(u => ({
        username: u.username,
        balance: Math.floor(u.balance ?? 0),
        totalWagered: Math.floor(u.totalWagered ?? 0),
        weeklyWagered: 0,
        avatarUrl: null,
      }));
    } else {
      entries = users.map(u => ({
        username: u.username,
        balance: Math.floor(u.balance ?? 0),
        totalWagered: Math.floor(u.totalWagered ?? 0),
        weeklyWagered: Math.floor(u.weeklyWagered ?? 0),
        avatarUrl: u.avatarUrl || null,
      }));
    }

    // Resolve missing avatars dynamically
    await fetchMissingRobloxAvatars(entries);

    return c.json({ leaderboard: sortEntries(entries, tab) });
  } catch (e) {
    console.error('Leaderboard route exception:', e);
    return c.json({ leaderboard: [] });
  }
});

async function fetchMissingRobloxAvatars(entries) {
  const missing = entries.filter(e => !e.avatarUrl);
  if (missing.length === 0) return;

  try {
    const usernames = missing.map(e => e.username);
    
    // 1. Get User IDs (Roblox allows up to 100 usernames per request)
    const userRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames, excludeBannedUsers: false })
    });
    const userData = await userRes.json();
    if (!userData.data || userData.data.length === 0) return;

    const usernameToId = {};
    const userIds = [];
    for (const u of userData.data) {
      if (u.requestedUsername) usernameToId[u.requestedUsername.toLowerCase()] = u.id;
      usernameToId[u.name.toLowerCase()] = u.id;
      userIds.push(u.id);
    }

    if (userIds.length === 0) return;

    // 2. Get Avatar URLs (Roblox allows up to 100 User IDs per request)
    const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userIds.join(',')}&size=150x150&format=Png&isCircular=false`);
    const thumbData = await thumbRes.json();
    if (!thumbData.data || thumbData.data.length === 0) return;

    const idToUrl = {};
    for (const t of thumbData.data) {
      if (t.state === 'Completed') {
        idToUrl[t.targetId] = t.imageUrl;
      }
    }

    // 3. Map back to entries and update DB in background
    for (const entry of missing) {
      const id = usernameToId[entry.username.toLowerCase()];
      if (id && idToUrl[id]) {
        entry.avatarUrl = idToUrl[id];
        
        // Fire and forget DB update to cache it
        supabase.from('users').update({ avatarUrl: entry.avatarUrl }).eq('username', entry.username).then(({error}) => {
          if (error) console.error('Failed to cache avatar:', error.message);
        });
      }
    }
  } catch (e) {
    console.error('Batch Roblox avatar fetch failed:', e);
  }
}

function sortEntries(entries, tab) {
  if (tab === 'balance') {
    return entries.sort((a, b) => b.balance - a.balance).slice(0, 50);
  } else if (tab === 'weekly') {
    return entries.sort((a, b) => b.weeklyWagered - a.weeklyWagered).slice(0, 50);
  } else {
    return entries.sort((a, b) => b.totalWagered - a.totalWagered).slice(0, 50);
  }
}

// ═══════════════════════════════════════
// Promo Codes
// ═══════════════════════════════════════
async function getPromos() {
  const { data } = await supabase.from('users').select('lastAdminAction').eq('username', '__system_promos__').single();
  if (!data) {
    const initial = { 'welcome4000': { vault: 4000, description: 'Welcome bonus' } };
    await supabase.from('users').upsert({ username: '__system_promos__', lastAdminAction: initial, balance: 0, totalWagered: 0 });
    return initial;
  }
  return data.lastAdminAction || {};
}

async function savePromos(promos) {
  await supabase.from('users').update({ lastAdminAction: promos }).eq('username', '__system_promos__');
}

app.post('/api/promo/redeem', async (c) => {
  const body = await c.req.json();
  const username = body.username?.toLowerCase();
  const code = body.code?.toLowerCase().trim();

  if (!username || !code) return c.json({ error: 'Missing username or code' }, 400);

  const promos = await getPromos();
  const promo = promos[code];
  if (!promo) return c.json({ error: 'Invalid promo code' }, 400);

  const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
  if (!user) return c.json({ error: 'User not found' }, 404);

  const redeemed = user.redeemedCodes || [];
  if (redeemed.includes(code)) return c.json({ error: 'You have already redeemed this code' }, 400);

  const newBalance = (user.balance ?? 0) + promo.vault;
  const newRedeemed = [...redeemed, code];

  await supabase.from('users').update({ balance: newBalance, redeemedCodes: newRedeemed }).eq('username', username);

  return c.json({ success: true, vault: promo.vault, newBalance, description: promo.description });
});

// ═══════════════════════════════════════
// Sports Bets Store & Live Resolution Engine
// ═══════════════════════════════════════
const BETS_FILE_PATH = path.join(process.cwd(), 'sports_bets.json');

function readBets() {
  if (!fs.existsSync(BETS_FILE_PATH)) {
    fs.writeFileSync(BETS_FILE_PATH, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(BETS_FILE_PATH, 'utf8'));
  } catch (e) {
    return [];
  }
}

function writeBets(bets) {
  fs.writeFileSync(BETS_FILE_PATH, JSON.stringify(bets, null, 2));
}

// 1. Get user bets
app.get('/api/sports/bets/:username', async (c) => {
  const username = c.req.param('username').toLowerCase();
  const bets = readBets();
  const userBets = bets.filter(b => b.username.toLowerCase() === username);
  return c.json({ bets: userBets });
});

// 2. Place a sports bet
app.post('/api/sports/bets', async (c) => {
  try {
    const body = await c.req.json();
    const { username, matchId, marketId, type, amount, sharesPurchased, initialOdds, question, category, outcome, isCombo, multiplier } = body;
    
    if (!username || !matchId || isNaN(amount) || amount <= 0) {
      return c.json({ error: 'Missing or invalid parameters' }, 400);
    }

    const usernameLower = username.toLowerCase();
    
    // Check and deduct balance
    const { data: user } = await supabase.from('users').select('*').eq('username', usernameLower).single();
    if (!user) return c.json({ error: 'User not found' }, 404);
    if (user.balance < amount) return c.json({ error: 'Insufficient balance' }, 400);

    const newBalance = user.balance - amount;
    const addedWager = amount;
    const weeklyWagered = (user.weeklyWagered || 0) + addedWager;
    const totalWagered = (user.totalWagered || 0) + addedWager;

    await supabase.from('users').update({ 
      balance: newBalance,
      weeklyWagered,
      totalWagered
    }).eq('username', usernameLower);

    const bets = readBets();
    const newBet = {
      id: Math.random().toString(36).substr(2, 9),
      username: usernameLower,
      matchId,
      marketId,
      type,
      amount,
      sharesPurchased,
      initialOdds,
      question,
      category: category || 'World Cup',
      outcome: outcome || type,
      isCombo: !!isCombo,
      comboOdds: multiplier || 1,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    bets.push(newBet);
    writeBets(bets);

    return c.json({ success: true, bet: newBet, newBalance });
  } catch (e) {
    console.error('Error placing bet:', e);
    return c.json({ error: e.message }, 500);
  }
});

// 3. Cashout sports bet
app.post('/api/sports/bets/cashout', async (c) => {
  try {
    const body = await c.req.json();
    const { betId, cashoutAmount } = body;
    
    if (!betId || isNaN(cashoutAmount) || cashoutAmount < 0) {
      return c.json({ error: 'Invalid parameters' }, 400);
    }

    const bets = readBets();
    const bet = bets.find(b => b.id === betId);
    if (!bet) return c.json({ error: 'Bet not found' }, 404);
    if (bet.status !== 'active') return c.json({ error: 'Bet already settled or cashed out' }, 400);

    bet.status = 'cashed_out';
    bet.cashoutAmount = cashoutAmount;
    bet.resolvedAt = new Date().toISOString();
    writeBets(bets);

    const { data: user } = await supabase.from('users').select('*').eq('username', bet.username).single();
    if (user) {
      const newBalance = user.balance + cashoutAmount;
      await supabase.from('users').update({ balance: newBalance }).eq('username', bet.username);
      return c.json({ success: true, newBalance });
    }

    return c.json({ success: true });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});

// Resolution function
function checkBetResolution(bet, match) {
  const comp = match.competitions[0];
  const homeTeam = comp.competitors.find(c => c.homeAway === 'home');
  const awayTeam = comp.competitors.find(c => c.homeAway === 'away');
  if (!homeTeam || !awayTeam) return null;

  const homeScore = parseInt(homeTeam.score) || 0;
  const awayScore = parseInt(awayTeam.score) || 0;
  const state = comp.status.type.state; // 'pre', 'in', 'post'
  const details = comp.details || [];
  const statsHome = homeTeam.statistics || [];
  const statsAway = awayTeam.statistics || [];
  const cornersHome = parseInt(statsHome.find(s => s.name === 'wonCorners')?.displayValue || 0);
  const cornersAway = parseInt(statsAway.find(s => s.name === 'wonCorners')?.displayValue || 0);
  const cornersTotal = cornersHome + cornersAway;
  const sotHome = parseInt(statsHome.find(s => s.name === 'shotsOnTarget')?.displayValue || 0);
  const sotAway = parseInt(statsAway.find(s => s.name === 'shotsOnTarget')?.displayValue || 0);

  const homeName = homeTeam.team.name.toLowerCase();
  const awayName = awayTeam.team.name.toLowerCase();

  const getPlayerGoals = (playerName) => {
    return details.filter(det => {
      const isGoal = det.type?.text?.includes('Goal');
      const hasAthlete = det.athletesInvolved?.some(ath => {
        const nameStr = (ath.displayName || ath.fullName || '').toLowerCase();
        return nameStr.includes(playerName.toLowerCase());
      });
      return isGoal && hasAthlete;
    }).length;
  };

  const resolveLeg = (legType, legOutcome) => {
    const lType = legType.toLowerCase();
    const lOutcome = (legOutcome || '').toLowerCase();

    // 1. Moneyline
    if (lType.includes('winner') || lType.includes('moneyline')) {
      if (state !== 'post') return null;
      if (lOutcome.includes(homeName)) return homeScore > awayScore ? 'win' : 'loss';
      if (lOutcome.includes(awayName)) return awayScore > homeScore ? 'win' : 'loss';
      if (lOutcome.includes('draw')) return homeScore === awayScore ? 'win' : 'loss';
    }

    // 2. Team to advance
    if (lType.includes('advance')) {
      if (state !== 'post') return null;
      if (lOutcome.includes(homeName)) return (homeTeam.winner === true || homeTeam.advance === true) ? 'win' : 'loss';
      if (lOutcome.includes(awayName)) return (awayTeam.winner === true || awayTeam.advance === true) ? 'win' : 'loss';
    }

    // 3. Both teams to score
    if (lType.includes('both teams to score') || lType.includes('btts')) {
      if (homeScore > 0 && awayScore > 0) {
        return lOutcome.includes('yes') ? 'win' : 'loss';
      }
      if (state === 'post') {
        return lOutcome.includes('no') ? 'win' : 'loss';
      }
      return null;
    }

    // 4. Player Props - Goals
    if (lType.includes('goalscorer') || lType.includes('goals') || lType.includes(' g')) {
      const nameMatch = lOutcome.match(/(messi|kane|bellingham)/) || lType.match(/(messi|kane|bellingham)/);
      if (nameMatch) {
        const player = nameMatch[0];
        const countMatch = lOutcome.match(/(\d+)\+/) || lType.match(/(\d+)\+/);
        const count = countMatch ? parseInt(countMatch[1]) : 1;
        const actual = getPlayerGoals(player);
        if (actual >= count) return 'win';
        if (state === 'post') return 'loss';
      }
      return null;
    }

    // 5. Shots on Target
    if (lType.includes('shots on target') || lType.includes('sot')) {
      if (state === 'post') {
        const isHome = lOutcome.includes('messi') || lOutcome.includes('alvarez') || lOutcome.includes('julián') || lType.includes('messi') || lType.includes('alvarez');
        const teamSot = isHome ? sotHome : sotAway;
        const nameMatch = lOutcome.match(/(messi|kane|bellingham|alvarez)/) || lType.match(/(messi|kane|bellingham|alvarez)/);
        const countMatch = lOutcome.match(/(\d+)\+/) || lType.match(/(\d+)\+/);
        const target = countMatch ? parseInt(countMatch[1]) : 2;
        
        if (nameMatch) {
          const p = nameMatch[0];
          const share = (p === 'messi' || p === 'kane') ? 0.45 : 0.30;
          const playerSot = Math.floor(teamSot * share);
          return playerSot >= target ? 'win' : 'loss';
        }
      }
      return null;
    }

    // 6. Halftime result
    if (lType.includes('halftime') || lType.includes('1h')) {
      if (comp.status.period >= 2 || state === 'post') {
        let hGoals = 0, aGoals = 0;
        details.forEach(det => {
          if (det.type?.text?.includes('Goal')) {
            const clockVal = parseInt(det.clock?.displayValue || '0');
            if (clockVal <= 45) {
              if (det.team?.id === homeTeam.team.id) hGoals++;
              else aGoals++;
            }
          }
        });
        if (lOutcome.includes('1h') || lOutcome.includes('halftime')) {
          if (lOutcome.includes(homeName) || lOutcome.includes('england') || lOutcome.includes('argentina')) {
            return hGoals > aGoals ? 'win' : 'loss';
          }
          if (lOutcome.includes('draw')) {
            return hGoals === aGoals ? 'win' : 'loss';
          }
        }
      }
      return null;
    }

    // 7. Exact Score
    if (lType.includes('exact score') || lType.includes('score-') || lOutcome.includes('exact score')) {
      const matchScore = lOutcome.match(/(\d+)-(\d+)/) || lType.match(/(\d+)-(\d+)/);
      if (matchScore) {
        const expectedHome = parseInt(matchScore[1]);
        const expectedAway = parseInt(matchScore[2]);
        if (state === 'post') {
          return (homeScore === expectedHome && awayScore === expectedAway) ? 'win' : 'loss';
        }
        if (homeScore > expectedHome || awayScore > expectedAway) {
          return 'loss';
        }
      }
      return null;
    }

    // 8. Total Corners
    if (lType.includes('corners') || lOutcome.includes('corners')) {
      if (cornersTotal > 9.5) {
        return lOutcome.includes('over') ? 'win' : 'loss';
      }
      if (state === 'post') {
        return cornersTotal < 9.5 ? 'win' : 'loss';
      }
      return null;
    }

    // 9. Penalty Shootout
    if (lType.includes('penalty') || lType.includes('shootout') || lOutcome.includes('penalty') || lOutcome.includes('shootout')) {
      const hasShootout = details.some(det => det.penaltyKick === true || det.shootout === true) || 
                          comp.status.displayClock?.includes('Pen') || 
                          (state === 'post' && homeScore === awayScore && comp.competitors.some(c => c.shootoutScore));
      if (hasShootout) return lOutcome.includes('yes') ? 'win' : 'loss';
      if (state === 'post' && !hasShootout) return lOutcome.includes('no') ? 'win' : 'loss';
      return null;
    }

    return null;
  };

  if (bet.isCombo) {
    const legs = [];
    const comboKey = (bet.marketId || '').toLowerCase();
    
    if (comboKey.includes('albi')) {
      legs.push({ type: 'Team to advance', outcome: homeName });
      legs.push({ type: 'Goals', outcome: 'Lionel Messi 2+ G' });
      legs.push({ type: 'Both teams to score', outcome: 'Yes' });
    } else if (comboKey.includes('lions')) {
      legs.push({ type: 'Team to advance', outcome: awayName });
      legs.push({ type: 'Goals', outcome: 'Harry Kane 1+ G' });
      legs.push({ type: 'Halftime result', outcome: 'England 1H' });
      legs.push({ type: 'Both teams to score', outcome: 'No' });
    } else if (comboKey.includes('rewind')) {
      legs.push({ type: 'Exact score', outcome: 'Draw 2-2' });
      legs.push({ type: 'Team to advance', outcome: homeName });
      legs.push({ type: 'Penalty shootout', outcome: 'Yes' });
    } else if (comboKey.includes('trident')) {
      legs.push({ type: 'Goals', outcome: 'Harry Kane 1+ G' });
      legs.push({ type: 'Goals', outcome: 'Jude Bellingham 1+ G' });
      legs.push({ type: 'Goals', outcome: 'Lionel Messi 1+ G' });
    } else if (comboKey.includes('kaneoffice')) {
      legs.push({ type: 'Moneyline', outcome: awayName });
      legs.push({ type: 'Goals', outcome: 'Harry Kane 1+ G' });
      legs.push({ type: 'Corners', outcome: 'Over 9.5 corners' });
    } else {
      return null;
    }

    const results = legs.map(l => resolveLeg(l.type, l.outcome));
    if (results.some(r => r === 'loss')) return 'loss';
    if (results.every(r => r === 'win')) return 'win';
    return null;
  }

  return resolveLeg(bet.question, bet.type);
}

// Background Job: check and resolve active bets
setInterval(async () => {
  const bets = readBets();
  const activeBets = bets.filter(b => b.status === 'active');
  if (activeBets.length === 0) return;

  try {
    const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260720&limit=300');
    const data = await res.json();
    if (!data || !data.events) return;

    let modified = false;

    for (const bet of activeBets) {
      const matchId = bet.matchId.replace('wc-', '');
      const match = data.events.find(e => String(e.id) === String(matchId));
      if (!match) continue;

      const resolution = checkBetResolution(bet, match);
      if (resolution === 'win' || resolution === 'loss') {
        bet.status = resolution === 'win' ? 'won' : 'lost';
        bet.resolvedAt = new Date().toISOString();
        modified = true;

        if (resolution === 'win') {
          const multiplier = bet.isCombo ? (bet.comboOdds || 1) : 1;
          const payoutAmount = Math.round(bet.sharesPurchased * multiplier * 100);
          bet.payout = payoutAmount;

          const { data: user } = await supabase.from('users').select('*').eq('username', bet.username).single();
          if (user) {
            const newBalance = user.balance + payoutAmount;
            await supabase.from('users').update({ balance: newBalance }).eq('username', bet.username);
            console.log(`[SPORTSBOOK] Bet ${bet.id} won! Paid out ${payoutAmount} Vaults to @${bet.username}.`);
          }
        } else {
          console.log(`[SPORTSBOOK] Bet ${bet.id} lost for @${bet.username}.`);
        }
      }
    }

    if (modified) {
      writeBets(bets);
    }
  } catch (e) {
    console.error('[SPORTSBOOK] Background poller resolution error:', e);
  }
}, 20000);

// --- GLOBAL ADMIN TRACKING (In-Memory for Dashboard) ---
global.pendingWithdrawals = global.pendingWithdrawals || [];
global.liveBetsFeed = global.liveBetsFeed || [];
global.housePnL = global.housePnL || { depositsUsd: 15420.5, withdrawalsUsd: 8210.2, ggr: 4125.0 };

// Helper to log a bet to the global feed
global.logBet = (username, game, amount, potentialPayout, details, avatarUrl) => {
  global.liveBetsFeed.unshift({ id: Date.now()+Math.random(), username, game, amount, potentialPayout, details, avatarUrl, time: new Date() });
  if (global.liveBetsFeed.length > 50) global.liveBetsFeed.pop();
};

app.post('/api/wallet/withdraw', async (c) => {
  try {
    const body = await c.req.json();
    const { username, amount, chain, address } = body;
    
    const { data: user } = await supabase.from('users').select('*').eq('username', username).single();
    if (!user || user.balance < amount) return c.json({ error: 'Insufficient balance' }, 400);
    
    // Deduct balance
    await supabase.from('users').update({ balance: user.balance - amount }).eq('username', username);
    
    const wReq = { id: Date.now().toString(), username, amount, chain, address, status: 'pending', time: new Date() };
    global.pendingWithdrawals.push(wReq);
    
    return c.json({ success: true, request: wReq });
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/admin/withdrawals', async (c) => {
  try {
    const prices = await getPrices();
    const enriched = global.pendingWithdrawals.map(w => {
      const usdValue = w.amount / 600; // 600 Vault = $1
      const chainLower = w.chain.toLowerCase();
      // Calculate crypto amount based on live prices
      const cryptoAmount = prices[chainLower] ? (usdValue / prices[chainLower]) : 0;
      return {
        ...w,
        usdValue,
        cryptoAmount
      };
    });
    return c.json({ withdrawals: enriched });
  } catch (e) {
    return c.json({ withdrawals: global.pendingWithdrawals });
  }
});

app.post('/api/admin/withdrawals/:id/approve', async (c) => {
  const id = c.req.param('id');
  const req = global.pendingWithdrawals.find(w => w.id === id);
  if (req) req.status = 'approved';
  return c.json({ success: true });
});

app.post('/api/admin/log-bet', async (c) => {
  try {
    const body = await c.req.json();
    global.logBet(body.username, body.game, body.amount, body.potentialPayout, body.details, body.avatarUrl);
    return c.json({ success: true });
  } catch (e) {
    return c.json({ success: false });
  }
});

app.get('/api/admin/live-bets', async (c) => {
  return c.json({ bets: global.liveBetsFeed });
});

// Public live feed for dashboard (no auth required)
app.get('/api/live-feed', async (c) => {
  return c.json({ bets: global.liveBetsFeed });
});

app.get('/api/admin/analytics', async (c) => {
  try {
    const { data: wallets } = await supabase.from('wallets').select('*');
    const { data: users } = await supabase.from('users').select('*');
    
    let totalDepositsUsd = 0;
    const prices = await getPrices();
    
    // Sum all credited crypto deposits based on current market prices
    wallets?.forEach(w => {
      if (w.credited) {
        totalDepositsUsd += (w.credited.btc || 0) * prices.btc;
        totalDepositsUsd += (w.credited.eth || 0) * prices.eth;
        totalDepositsUsd += (w.credited.sol || 0) * prices.sol;
        totalDepositsUsd += (w.credited.ltc || 0) * prices.ltc;
      }
    });

    let totalWagered = 0;
    let totalBalances = 0;
    users?.forEach(u => {
      totalWagered += (u.totalWagered || 0);
      totalBalances += (u.balance || 0);
    });

    // Approximate GGR (Gross Gaming Revenue) in Vaults converted to USD
    // GGR = Total Deposits - Total Player Balances - Total Withdrawals (simplified)
    const vaultsToUsd = (vaults) => vaults / 600; 
    
    let totalWithdrawalsUsd = 0;
    global.pendingWithdrawals.filter(w => w.status === 'approved').forEach(w => {
      totalWithdrawalsUsd += (w.amount / 600);
    });

    const ggrUsd = totalDepositsUsd - vaultsToUsd(totalBalances) - totalWithdrawalsUsd;

    return c.json({ 
      pnl: { 
        depositsUsd: totalDepositsUsd, 
        withdrawalsUsd: totalWithdrawalsUsd, 
        ggr: ggrUsd 
      } 
    });
  } catch (e) {
    return c.json({ pnl: global.housePnL });
  }
});

app.get('/api/admin/risk', async (c) => {
  // Calculate total exposure across active sportsbook bets
  let liability = { totalExposure: 0, highRiskMarkets: [] };
  try {
    const betsPath = path.join(process.cwd(), 'bets.json');
    if (fs.existsSync(betsPath)) {
      const bets = JSON.parse(fs.readFileSync(betsPath, 'utf8'));
      let marketExposure = {};
      bets.filter(b => b.status === 'active').forEach(b => {
        if (!marketExposure[b.marketId]) marketExposure[b.marketId] = 0;
        marketExposure[b.marketId] += (b.payout || (b.sharesPurchased * 100));
      });
      liability.totalExposure = Object.values(marketExposure).reduce((a,b)=>a+b, 0);
      liability.highRiskMarkets = Object.entries(marketExposure).map(([market, exp]) => ({ market, exposure: exp })).sort((a,b)=>b.exposure - a.exposure).slice(0, 5);
    }
  } catch(e) {}
  return c.json(liability);
});

const port = process.env.PORT || 3000;
console.log(`🚀 RoVault Backend API running on port ${port}`);
serve({ fetch: app.fetch, port });
