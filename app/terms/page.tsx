export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-slate-500 mb-8">Last Updated: January 16, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">1. Acceptance</h2>
          <p>
            By using Stash, you agree to these terms. If you don`t agree, please don`t use the app.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">2. Usage Rules</h2>
          <p>You agree NOT to use Stash to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Save illegal, harmful, or malicious content.</li>
            <li>Abuse our API or scrape our services.</li>
            <li>Attempt to hack or disrupt the service.</li>
          </ul>
          <p className="mt-2">We reserve the right to ban users who violate these rules.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">3. `As Is` Service</h2>
          <p>
            Stash is provided `as is` without any warranties. We are not responsible for data loss, service downtime, or any damages resulting from the use of this app. This is a solo-developer project—use at your own risk.
          </p>
        </section>
      </div>
    </div>
  );
}