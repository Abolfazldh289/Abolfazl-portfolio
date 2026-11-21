const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Index() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#050b09', color: '#e8f5ee', fontFamily: 'Arial, sans-serif', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#10b981', letterSpacing: '.2em' }}>ABOLFAZL · PORTFOLIO</p>
        <h1 style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>Choose your language</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28 }}>
          <a href={`${basePath}/en/`} style={{ color: '#06130d', background: '#10b981', padding: '14px 28px', borderRadius: 999, textDecoration: 'none', fontWeight: 700 }}>English</a>
          <a href={`${basePath}/fa/`} style={{ color: '#e8f5ee', border: '1px solid #10b981', padding: '14px 28px', borderRadius: 999, textDecoration: 'none', fontWeight: 700 }}>فارسی</a>
        </div>
      </div>
    </main>
  );
}
