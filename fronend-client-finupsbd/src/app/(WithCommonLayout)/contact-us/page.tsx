import Image from "next/image";
import { ContactForm } from "./contact-form";
import icon_mail from "/public/icon-mail.svg";
import icon_map from "/public/icon-map-pin.svg";
import icon_phone from "/public/icon-phone.svg";

const ContactUsPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 lg:px-14 xl:px-14 2xl:px-0">
      <section className="space-y-4 py-20 text-center">
        <h2 className="font-bold text-primary">About Us</h2>
        <h3 className="text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
          We’d love to hear from you
        </h3>
      </section>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-lg bg-[#F7FFF5] p-6 text-center shadow-sm">
          <Image
            src={icon_mail}
            alt="Email Us"
            width={40}
            height={40}
            className="mx-auto mb-5"
          />
          <h4 className="mb-2 text-lg font-semibold">Email Us</h4>
          <p className="mb-4 text-sm text-gray-600">
            Our friendly team is here to help.
          </p>
          <a href="mailto:support@finupsbd.com" className="text-primary">
            support@finupsbd.com
          </a>
        </div>
        <div className="rounded-lg bg-[#F7FFF5] p-6 text-center shadow-sm">
          <Image
            src={icon_map}
            alt="Call Us"
            width={40}
            height={40}
            className="mx-auto mb-5"
          />
          <h4 className="mb-2 text-lg font-semibold">Office Address</h4>
          <p className="mb-4 text-sm text-gray-600">
            Come say hello at our office HQ.
          </p>
          <p className="text-primary">Sector 4, Uttara, Dhaka, Bangladesh</p>
        </div>
        <div className="rounded-lg bg-[#F7FFF5] p-6 text-center shadow-sm">
          <Image
            src={icon_phone}
            alt="Call Us"
            width={40}
            height={40}
            className="mx-auto mb-5"
          />
          <h4 className="mb-2 text-lg font-semibold">Call Us</h4>
          <p className="mb-4 text-sm text-gray-600">
            Our team is available to assist you.
          </p>
          <a href="tel:+8801719185563" className="text-primary">
            +880 1719-185563
          </a>
        </div>
      </section>
      <section className="my-12">
        <ContactForm />
      </section>
    </div>
  );
};

export default ContactUsPage;
