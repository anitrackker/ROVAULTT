async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/wallet/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser2' })
    });
    console.log('Status:', res.status);
    const json = await res.json();
    console.log('Wallets:', JSON.stringify(json, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }
}
test();
