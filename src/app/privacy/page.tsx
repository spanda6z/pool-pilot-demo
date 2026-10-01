export default function PrivacyPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-black">Privacy Policy</h1>
      <section className="pixel-card p-6 text-sm text-secondary space-y-3">
        <p>Placeholder privacy policy for the demo build.</p>
        <p>
          We do not collect private keys or seed phrases. Wallet addresses may appear
          in on-chain activity and public indexers. Server logs are minimized.
        </p>
        <p className="text-coral text-xs">Replace with a full policy before production.</p>
      </section>
    </div>
  );
}
