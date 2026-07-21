"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";
import sitelayot from "../../../public/site-layout.png";

interface AccordionData {
  id: string;
  title: string;
  description: string;
}

const accordionData: AccordionData[] = [
  {
    id: "1",
    title: "Get your coffee and sign up",
    description:
      "You can sign up for free with your email address or phone number. There are no hidden fees. Your personal dashboard will be open in less than a minute.",
  },
  {
    id: "2",
    title: "Swipe Through Smart Matches",
    description:
      "Tell us how much money you make and what kind of job you have. Our instant qualification checker will show you the loans, credit cards, and insurance plans you are most likely to get. Choose the lowest rate, the fastest payout, or halal options, whatever works best for you.",
  },
  {
    id: "3",
    title: "Apply and Track Your Applications",
    description:
      'Pick the deal you like best, upload the documents you need right from your phone, and then click <a href="/register" class="font-semibold text-primary">Apply</a>. We talk to the lender back and forth, and we send you live status updates by SMS, email, or your FinupsBD dashboard.',
  },
];

const HowWeWorks = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 lg:px-14 xl:px-14 2xl:px-0">
        <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-16">
          {/* Left Column */}
          <div className="flex-1">
            <div className="mb-10">
              <SectionBadge className="!text-left before:bg-[#7BE963]">
                How It Works
              </SectionBadge>
              <SectionTitle className="lg:text-[40px] lg:leading-[48px]">
                Three Quick Steps to Finance in a Coffee Break
              </SectionTitle>
              <p className="mt-4 text-sm">
                Don't waste time on paperwork marathons. You can find, qualify
                for, and apply for the right financial product with FinupsBD in
                the time it takes to drink your latte.
              </p>
            </div>
            <div>
              <Accordion
                defaultValue="1"
                className="fin-accordion with-numbers"
                type="single"
                collapsible
              >
                {accordionData.map(({ id, title, description }, index) => (
                  <AccordionItem
                    key={id}
                    className="accordion-item group"
                    value={id.toString()}
                  >
                    <AccordionTrigger className="accordion-title">
                      <div className="flex items-center gap-4">
                        <span className="number">{index + 1}</span>
                        <span className="title-text">{title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="accordion-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: description.toString(),
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="flex-1 rounded-2xl bg-[#F9FAFB] py-12">
            <Image
              src={sitelayot}
              alt="Site Layout"
              className="mx-auto object-cover"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HowWeWorks;
