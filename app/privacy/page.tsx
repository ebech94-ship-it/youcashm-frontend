"use client";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white p-6 pb-20">

      <h1 className="text-3xl font-bold mb-4">
        Privacy Policy
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Last updated: May 2026
      </p>

      <div className="space-y-6 text-gray-700 text-sm leading-6">

        <section>
          <h2 className="font-bold text-lg mb-2">1. Information We Collect</h2>
          <p>
            We collect basic information such as phone number, account activity,
            and transaction history to provide our services.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">2. How We Use Data</h2>
          <p>
            Your data is used to operate the platform, process transactions,
            improve user experience, and ensure security.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">3. Data Protection</h2>
          <p>
            We apply reasonable security measures to protect user data against
            unauthorized access, loss, or misuse.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">4. Payments</h2>
          <p>
            Payment data is processed through third-party providers.
            We do not store sensitive mobile money PINs or banking credentials.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">5. Sharing of Information</h2>
          <p>
            We do not sell personal data. Information may only be shared when required
            by law or to complete transactions.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">6. Cookies & Analytics</h2>
          <p>
            We may use cookies or analytics tools to understand usage patterns and improve performance.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">7. User Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting support.
          </p>
        </section>

      </div>

    </div>
  );
}