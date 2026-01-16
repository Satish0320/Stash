export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-slate-900 dark:text-slate-100">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-slate-500 mb-8">Last Updated: January 16, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">1. The Gist</h2>
          <p>
            Stash (`we`,`us`) is a link management tool. We respect your privacy and only collect what is strictly necessary to run the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account Info:</strong> Your name, email, and avatar (via Google/GitHub login).</li>
            <li><strong>Content:</strong> The URLs, titles, and metadata of links you save.</li>
            <li><strong>Usage:</strong> Basic logs to prevent abuse and debug errors.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">3. How We Use It</h2>
          <p>We do not sell your data. We only use your information to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Provide the Stash service.</li>
            <li>Generate link previews (titles, images).</li>
            <li>Maintain your saved collections.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">4. Delete Your Data</h2>
          <p>
            You own your data. You can delete your account at any time from the dashboard, which will permanently wipe all your links and personal info from our database immediately.
          </p>
        </section>
      </div>
    </div>
  );
}