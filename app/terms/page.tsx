"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white p-6 pb-20">

      <h1 className="text-3xl font-bold mb-4">
        Terms & Conditions
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Last updated: May 2026
      </p>

      <div className="space-y-6 text-gray-700 text-sm leading-6">

        <section>
          <h2 className="font-bold text-lg mb-2">1. Acceptance of Terms</h2>
          <p>
            By using YouCashM, you agree to these Terms & Conditions.
            If you do not agree, you should stop using the platform.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">2. Eligibility</h2>
          <p>
            You must be of legal age in your country to use this platform.
            By registering, you confirm that the information provided is accurate.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">3. Game Nature</h2>
          <p>
            YouCashM is a real-time crash game where outcomes are determined
            by a provably fair system. Results are random and cannot be predicted or controlled.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">4. Deposits & Withdrawals</h2>
          <p>
            All deposits and withdrawals are processed through supported payment methods.
            Processing times may vary depending on network conditions or service providers.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">5. User Responsibility</h2>
          <p>
            Users are responsible for maintaining account security and ensuring safe usage.
            YouCashM is not responsible for losses caused by user decisions.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">6. Fair Play</h2>
          <p>
            The platform uses a provably fair system to ensure transparency and fairness.
            Any attempt to exploit or manipulate the system will result in account suspension.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-2">7. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the platform means acceptance of changes.
          </p>
        </section>

      </div>

    </div>
  );
}