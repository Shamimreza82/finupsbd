import Link from "next/link";

const DisclaimerPage = () => {
  return (
    <div className="dnd-page">
      <div className="space-y-10">
        {/* start textbox */}
        <div className="textbox">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl lg:leading-[40px]">
            Disclaimer – Finups BD
          </h2>
          <div className="space-y-4">
            <p>
              Finups BD strives to provide clear, unbiased, and comprehensive
              information about financial products and services available in
              Bangladesh. The information displayed on our website
              <Link
                href="https://www.finupsbd.com"
                className="font-medium text-primary"
              >
                {" "}
                www.finupsbd.com
              </Link>{" "}
              (hereinafter referred to as “Website” or “Finups BD Platform”) is
              for general guidance and educational purposes. While we make every
              effort to ensure accuracy and reliability, Finups BD does not
              guarantee that all information will always be current, complete,
              or free of errors.
            </p>
            <p>
              The content presented on this platform does not constitute
              financial advice or an endorsement of any specific financial
              institution or product. Users are strongly encouraged to exercise
              discretion and make independent decisions before applying for any
              financial product or service.
            </p>
          </div>
        </div>

        {/* start textbox */}
        <div className="textbox">
          <h2 className="mb-4 text-xl font-semibold lg:text-3xl">
            Intellectual Property & Content Updates
          </h2>

          <div className="space-y-4">
            <p>
              All information provided on the Finups BD platform is subject to
              change at the sole discretion of Finups BD without prior notice.
              While we aim to maintain high standards of quality and accuracy,
              Finups BD, its employees, partners, and affiliates are not legally
              responsible for any errors, omissions, or consequences arising
              from the use of the platform.
            </p>

            <p>
              The materials available on the Website are proprietary.
              Unauthorized reproduction or distribution of any content, text,
              graphics, or design elements may violate copyright and
              intellectual property rights.
            </p>
          </div>
        </div>

        {/* start textbox */}
        <div className="textbox">
          <h2 className="mb-4 text-xl font-semibold lg:text-3xl">
            User Responsibility
          </h2>
          <p>
            The financial, insurance, and legal information shared on Finups BD
            is provided as a service to our users and should be used for
            informational purposes only. Users acknowledge and agree that their
            association with the platform is voluntary and entirely at their own
            risk. Finups BD, its parent company, directors, officers, employees,
            or partners are not responsible for any financial loss, damage, or
            consequences resulting from actions taken based on the information
            available on this Website.
          </p>
        </div>

        <div className="textbox">
          <h2 className="mb-4 text-xl font-semibold lg:text-3xl">
            Intermediary Role
          </h2>
          <div className="space-y-4">
            <p>
              Visitors and users of this Website are hereby informed that Finups
              BD acts as a <strong>digital intermediary</strong> between
              consumers and financial institutions (banks, NBFIs, insurance
              companies, and other licensed financial partners). Finups BD does
              not provide loans, credit cards, or financial products directly.
              The final decision regarding approval, disbursement, and terms of
              any product lies solely with the respective financial institution.
            </p>
            <p>
              Accordingly, Finups BD, its management, or any associated parties
              shall not be held liable for the outcome of any user’s decision to
              apply for a product through this platform.
            </p>
          </div>
        </div>

        <div className="textbox">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl lg:leading-[40px]">
            Fraud and Security Advisory
          </h2>
          <div className="space-y-4">
            <p className="font-semibold">
              Beware of Fraudulent Calls, Messages, and Emails.
            </p>
            <ul className="list-disc space-y-4 pl-5">
              <li>
                <strong>
                  {" "}
                  Finups BD will never ask you to pay cash, deposit money, or
                  share confidential information
                </strong>{" "}
                (PIN, OTP, passwords, card details) to process an application.
              </li>
              <li>
                All official communication from Finups BD will only be through
                our verified channels listed on{" "}
                <Link
                  href="https://www.finupsbd.com"
                  className="font-medium text-primary"
                >
                  {" "}
                  www.finupsbd.com
                </Link>
              </li>
              <li>
                If you receive a suspicious phone call, email, or message asking
                for money or sensitive information on behalf of Finups BD,
                please report it immediately to{" "}
                <a
                  href="mailto:support@finupsbd.com"
                  className="font-medium text-primary"
                >
                  support@finupsbd.com
                </a>{" "}
                with details.
              </li>
            </ul>
          </div>
        </div>

        <div className="textbox">
          <h2 className="mb-4 text-xl font-semibold lg:text-3xl">
            Your Security is Our Priority
          </h2>
          <p>
            We use advanced encryption and secure channels to protect your data.
            However, users must take personal precautions such as safeguarding
            their login credentials and avoiding sharing sensitive information
            over phone calls or unofficial links.
          </p>
        </div>

        <div className="textbox">
          <h3 className="mb-4 text-xl font-semibold lg:text-2xl">
            Finups BD – Your trusted platform for smarter financial decisions.
          </h3>
          <p>
            <Link
              href="https://www.finupsbd.com"
              className="font-medium text-primary"
            >
              {" "}
              www.finupsbd.com
            </Link>
          </p>
          <p>
            <Link
              href="mailto:support@finupsbd.com"
              className="font-medium text-primary"
            >
              Email: support@Finupsbd.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
