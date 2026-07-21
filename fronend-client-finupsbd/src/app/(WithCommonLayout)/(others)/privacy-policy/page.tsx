import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-page">
      <h1 className="mb-6 text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
        Finups BD Privacy Policy
      </h1>
      <h4 className="text-lg font-medium text-primary">
        Last Updated: July 4, 2025
      </h4>

      <div className="mb-8 mt-8 space-y-8 text-justify">
        {/* Start Text Box */}
        <div className="textbox">
          <ol className="list-decimal space-y-8 pl-7">
            <li>
              <h2>Introduction</h2>
              <p>
                At Finups BD ("Finups," "we," "us," or "our"), your privacy
                matters greatly to us. We genuinely care about safeguarding the
                personal information you trust us with. This Privacy Policy
                explains clearly how we collect, use, and protect your data when
                you visit our website{" "}
                <Link
                  href="https://www.finupsbd.com"
                  className="font-medium text-primary"
                >
                  www.finupsbd.com
                </Link>{" "}
                and use our services. By using our platform, you're agreeing to
                the terms outlined here.
              </p>
            </li>
            <li>
              <h2>Types of Information Collected</h2>
              <p>
                To provide you with excellent and tailored services, we gather
                certain types of information:
              </p>
              <ul className="mt-4 space-y-2 pl-1">
                <li>
                  <h2> 2.1 Information You Share with Us</h2>
                  <p>
                    When registering or using our services, you might provide
                    details like your name, contact info, ID documents (such as
                    National ID or Passport), financial statements, employment
                    information, and guarantor details. We use this information
                    strictly to help process your requests and deliver the best
                    service possible.
                  </p>
                </li>
                <li>
                  <h2> 2.2 Information We Automatically Collect</h2>
                  <p>
                    We also automatically collect details about your device and
                    how you use our site, such as your IP address, browser type,
                    device type, the pages you visit, and your activity
                    timestamps. This helps us continually improve your
                    experience, enhance security, and maintain our platform's
                    performance.
                  </p>
                </li>
                <li>
                  <h2> 2.3 Information from Trusted Partners</h2>
                  <p>
                    Sometimes we might receive additional information about you
                    from third parties like credit bureaus or financial
                    institutions. This helps us provide accurate services,
                    especially for credit scoring, verification, and processing
                    your requests faster.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h2>Why We Collect Information</h2>
              <p>We use your data for important reasons:</p>
              <ul className="ml-12 mt-2 list-disc space-y-2">
                <li>
                  <strong>Delivering Our Services:</strong> Handling your loan
                  applications, verifying your identity, processing payments,
                  and managing your account effectively.
                </li>
                <li>
                  <strong>Enhancing Your Experience:</strong> Tailoring our
                  recommendations and improving our services based on your
                  feedback and usage patterns.
                </li>
                <li>
                  <strong>Keeping in Touch:</strong> Sending you essential
                  updates, responding quickly to your questions, and
                  occasionally sending you special offers (only if you agree!).
                </li>
                <li>
                  <strong>Protecting You and Us:</strong> Carrying out risk
                  assessments, preventing fraud, and making sure we follow all
                  legal requirements to protect your interests.
                </li>
              </ul>
            </li>
            <li>
              <h2>About Cookies</h2>
              <p>
                We use cookies and similar tech to make your experience
                smoother. They help us remember your preferences, understand how
                you use our site, and show content relevant to you. You can
                adjust cookie settings in your browser, but keep in mind this
                may limit some features.
              </p>
            </li>
            <li>
              <h2>Sharing Your Information</h2>
              <p>
                We may share your information carefully and only when necessary:
              </p>
              <ul className="ml-12 mt-2 list-disc space-y-2">
                <li>
                  <strong>With Our Partners:</strong> Trusted vendors who help
                  us provide verification, hosting, analytics, payments, and
                  marketing services.
                </li>
                <li>
                  <strong>Financial Institutions:</strong> Banks and financial
                  institutions that process your loan applications and offer
                  relevant products.
                </li>
                <li>
                  <strong>Credit Bureaus and Regulators:</strong> To comply with
                  legal obligations and maintain financial transparency.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> If legally required by
                  authorities, to protect our rights or prevent fraud.
                </li>
              </ul>
            </li>
            <li>
              <h2>Protecting Your Information</h2>
              <p>
                We take your data's security seriously, using encryption, secure
                storage, controlled access, and regular security checks.
                However, please remember no system can be entirely foolproof,
                but we are continually working to keep your information safe.
              </p>
            </li>
            <li>
              <h2>Retaining Your Data</h2>
              <p>
                We keep your personal data only as long as necessary or required
                by law. Once no longer needed, we securely delete or anonymize
                it.
              </p>
            </li>
            <li>
              <h2>Your Rights</h2>
              <p>
                You have full control over your personal information. You can
                access, update, or request its deletion at any time. You can
                also withdraw consent for marketing messages or ask us to limit
                how we use your data. Simply contact our Data Protection Officer
                using the details provided below.
              </p>
            </li>
            <li>
              <h2>International Data Transfers</h2>
              <p>
                Your data might sometimes be stored or processed outside
                Bangladesh, but we ensure strong safeguards and encryption to
                keep it secure wherever it goes.
              </p>
            </li>
            <li>
              <h2>Third-Party Links</h2>
              <p>
                Our site may have links to other websites. We're not responsible
                for their privacy practices, so please review their policies if
                you visit them.
              </p>
            </li>
            <li>
              <h2>Children’s Privacy</h2>
              <p>
                We don't provide services to minors under 18 and do not
                knowingly collect their information. If we accidentally do, we
                immediately remove it upon learning.
              </p>
            </li>
            <li>
              <h2>Updates to This Policy</h2>
              <p>
                We may occasionally update this policy. If we make significant
                changes, we’ll let you know clearly through our site or
                directly. Your continued use afterward means you agree to these
                updates.
              </p>
            </li>
            <li>
              <h2>Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests about your
                privacy, we’d love to hear from you:
              </p>
              <h3>Data Protection Officer</h3>
              <p>Finups BD</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@finupsbd.com" className="text-primary">
                  privacy@finupsbd.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+8801711356235" className="text-primary">
                  +880 1711 356 235
                </a>
              </p>
              <p className="mt-4">
                Thank you for trusting Finups BD, we're committed to keeping
                your data safe and providing you with the best service possible.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
