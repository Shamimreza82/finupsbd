const DNDPage = () => {
  return (
    <div className="dnd-page">
      <div className="textbox space-y-6">
        <h2 className="mb-4 text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
          Do Not Disturb (DND) Registration – Finups BD
        </h2>
        <div>
          <p>We respect your privacy and your time.</p>
          <p>
            If you do not wish to receive notifications, promotional calls, or
            updates about our products and services, you can opt out.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">How to Opt Out:</h3>
          <p>
            Email us at{" "}
            <a
              href="mailto:privacy@finupsbd.com"
              className="font-medium text-primary"
            >
              privacy@finupsbd.com
            </a>{" "}
            with your registered <strong>email ID and/or mobile number</strong>{" "}
            requesting DND.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Terms & Conditions:</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Once your request is processed, you will no longer receive
              marketing calls, notifications, or promotional offers from Finups
              BD.
            </li>
            <li>
              If you change your email ID or mobile number, you need to
              re-register your DND request for the new contact details.
            </li>
            <li>
              Important transactional messages (such as application status,
              account alerts, or compliance-related updates) will continue to be
              sent.
            </li>
            <li>
              It may take up to 72 business hours for your DND request to be
              fully processed.
            </li>
            <li>
              This DND applies only to Finups BD communications and does not
              stop messages/calls from other financial institutions or third
              parties.
            </li>
            <li>
              You will receive an email confirming that your DND request has
              been activated.
            </li>
          </ul>
        </div>
      </div>

      <div className="section-divider separator">
        <hr className="my-10 border-gray-200" />
      </div>

      <div className="textbox space-y-6">
        <h2 className="mb-4 text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
          DND De registration
        </h2>
        <p>
          If you wish to hear from us again about new products, offers, and
          updates, you can easily opt back in.
        </p>
        <div>
          <h3 className="mb-2 text-xl font-semibold">How to De register:</h3>
          <p>
            Email us at{" "}
            <a
              href="mailto:privacy@finupsbd.com"
              className="font-medium text-primary"
            >
              privacy@finupsbd.com
            </a>{" "}
            com with your registered contact details requesting removal from the
            DND list.
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Terms & Conditions:</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              By choosing to receive updates, you agree to allow Finups BD to
              contact you via SMS, email, and phone for information about our
              products and services.
            </li>
            <li>
              This consent overrides any Do Not Call (DNC) / Do Not Disturb
              (DND) registration you may have on your phone number for
              communications originating from Finups BD.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DNDPage;
