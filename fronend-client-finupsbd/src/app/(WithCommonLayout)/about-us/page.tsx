import about_hero from "@/assets/images/about-us/about-us-hero.png";
import looking_ahed from "@/assets/images/about-us/looking-ahead.jpg";
import about_mission from "@/assets/images/about-us/mission.png";
import about_vision from "@/assets/images/about-us/vision.jpg";
import who_we_are from "@/assets/images/about-us/who-we-are.jpg";

import Image from "next/image";
import check_icom from "/public/check-icon.svg";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 lg:px-14 lg:py-16 xl:px-14">
      {/* <section className="mb-6 space-y-4 lg:mb-24 lg:space-y-6">
        <p className="font-bold text-primary">About Us</p>
        <h2 className="text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
          Empowering Financial Freedom for <br className="hidden lg:block" />{" "}
          Bangladesh
        </h2>
        <p className="w-full lg:w-4/5">
          At FinupsBD, we are on a mission to simplify financial decisions for
          every Bangladeshi. We understand that navigating loans, credit cards,
          and other financial products can be overwhelming. That’s why we’ve
          created a one-stop platform to help you make informed choices, check
          your eligibility, and apply for financial products with ease.
        </p>
        <p className="w-full lg:w-4/5">
          Our team of financial experts and tech enthusiasts is dedicated to
          providing you with transparent, reliable, and user-friendly solutions.
          Whether you’re looking for a personal loan, a credit card, or guidance
          on improving your financial health, we’re here to help you every step
          of the way.
        </p>
        <Image src={about_hero} alt="Description of the image" />
      </section> */}

      <section className="mb-6 lg:mb-24">
        <h2 className="mb-6 font-bold text-primary">About Us</h2>
        <h3 className="mb-2 text-2xl font-semibold lg:text-4xl lg:leading-[50px]">
          Our Story
        </h3>
        <p className="w-full">
          Founded to bridge the gap between consumers and financial products,
          FinUps BD is Bangladesh’s premier all-in-one digital financial
          marketplace. Born from a vision to simplify complex financial
          decisions, our platform empowers urban and semi-urban individuals and
          the SMEs that drive our economy to compare, apply for, and manage
          loans, credit cards, insurance, and investments in one seamless
          experience.
        </p>
        <Image src={about_hero} alt="Description of the image" />
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Our Mission (Why We Exist)
          </h2>
          <p>
            To provide Bangladeshi consumers with an all-inclusive platform that
            simplifies financial decision-making through comprehensive, unbiased
            comparisons of financial products.
          </p>
          <h2 className="mt-5 text-xl font-semibold lg:mt-6 lg:text-2xl">
            What We Do:
          </h2>
          <ul className="mt-4 space-y-4 pl-4">
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Transparent Comparisons:</b> We surface side-by-side listings
                of loans, credit cards, insurance plans, and investment products
                so you see all the numbers up front, with no surprises.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Instant Eligibility Checks:</b> Our AI-driven engine quickly
                tells you which offers you’re likely to qualify for, saving you
                time and sparing you countless “sorry, you’re not eligible”
                messages.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Seamless Applications:</b> Upload documents in seconds, track
                your status in real time, and get notified by SMS or email
                finishing paperwork has never been this painless.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Learning Resources:</b> We break down complex concepts into
                short videos, quick-read guides, and interactive tools, so you
                can build your financial confidence at your own pace.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <Image src={about_mission} alt="Our Mission" />
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Image src={about_vision} alt="Our Vision" />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Our Vision (Where We’re Headed)
          </h2>
          <p>
            To be the most trusted and widely used financial marketplace in
            Bangladesh, fostering financial inclusion and literacy for every
            citizen.
          </p>
          <h2 className="mt-5 text-xl font-semibold lg:mt-14 lg:text-2xl">
            Core Values:
          </h2>
          <ul className="mt-4 space-y-4 pl-4">
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Empathy:</b> We listen first then build. Every feature starts
                with a real user story.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Integrity:</b>No hidden fees. No fine print. Ever.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Innovation:</b> We harness cutting-edge AI and secure APIs so
                you stay ahead of the curve.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Image
                src={check_icom}
                alt="Check Icon"
                width={20}
                height={20}
                className="relative top-2"
              />
              <span>
                <b>Collaboration:</b> Partnering with top banks, NBFIs, and
                regulatory bodies to ensure your experience is smooth and
                compliant.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Why We’re Different
          </h2>
          <p>
            To provide Bangladeshi consumers with an all-inclusive platform that
            simplifies financial decision-making through comprehensive, unbiased
            comparisons of financial products.
          </p>
        </div>
        <div>
          <Image src={who_we_are} alt="Our Mission" />
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Image src={looking_ahed} alt="Our Vision" />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            Looking Ahead
          </h2>
          <p>
            As we expand our offerings from Shariah-compliant finance to SME
            lending and beyond our commitment remains the same to bring every
            Bangladeshi the freedom to choose, the tools to understand, and the
            confidence to decide.
          </p>
        </div>
      </section>

      {/* <section className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="font-bold text-primary">Join our team</p>
          <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
            We’re just getting started
          </h2>
          <p>
            Our philosophy is simple, hire a team of diverse, passionate people
            and foster a culture that empowers you to do your best work.
          </p>
          <Button>
            <Link href="#">Join With Us</Link>
          </Button>
        </div>
        <div>
          <Image src={about_career} alt="Our Mission" />
        </div>
      </section> */}
    </div>
  );
};

export default AboutUsPage;
