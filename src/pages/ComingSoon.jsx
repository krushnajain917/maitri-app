import PageShell from '../components/PageShell';

export default function ComingSoon({ title }) {
  return (
    <PageShell>
      <div className="px-5 desktop:px-6" style={{ maxWidth: 1140, margin: '0 auto', textAlign: 'center', paddingTop: 96 }}>
        <p className="font-jost" style={{ fontWeight: 300, fontSize: 13, color: '#999', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
          {title}
        </p>
        <h1 className="font-brush" style={{ fontWeight: 400, fontSize: 48, color: '#1a1a1a', margin: 0 }}>
          coming soon
        </h1>
      </div>
    </PageShell>
  );
}
