import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, MoveUpRight } from "lucide-react";
import Link from "next/link";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";
import { Button } from "../ui/button";

const accordion_data = [
  {
    id: 1,
    title: "Do I have to pay to use FinupsBD?",
    description:
      "Nope, our entire platform is 100% free for you. We partner with banks and insurers who may pay us a small commission when you successfully apply, but that never changes the rates or perks you see.",
  },
  {
    id: 2,
    title: "Is my personal information safe with FinupsBD?",
    description:
      "Absolutely. We use bank-level encryption and strict data-protection standards so your details stay locked down. Think of us as the digital vault for your finance info.",
  },
  {
    id: 3,
    title: "What if I don’t meet a lender’s requirements?",
    description:
      "No worries. Our instant qualification checker only shows you products you’re most likely to qualify for. If you do get turned down, we’ll point you toward other options, maybe a different tenure, a smaller amount, or an Islamic-finance alternative.",
  },
  {
    id: 6,
    title: "Can I apply for more than one product at the same time?",
    description:
      "Yes! You can submit multiple applications, just remember that each one may require its own documents. We’ll walk you through every step, so you never feel lost in the paperwork.",
  },
  {
    id: 5,
    title: "Is FinUps BD free to use?",
    description:
      "Yes, our platform is completely free for users to check their credit scores, compare products, and apply online",
  },
];

const FAQ = () => {
  return (
    <SectionWrapper className="py-0 lg:py-16">
      <div className="container mx-auto px-4 lg:px-14 xl:px-14 2xl:px-0">
        <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-16">
          <div className="mt-10 w-full lg:mt-0 lg:w-5/12">
            <SectionBadge className="!text-left before:bg-[#7BE963]">
              Here to help
            </SectionBadge>
            <SectionTitle className="lg:text-[40px] lg:leading-[48px]">
              Frequently Asked Questions
            </SectionTitle>
            <Link href="" className="my-6 flex gap-4">
              <Info />
              Need further support?
            </Link>
            <Link href="">
              <Button variant="default" className="h-12 w-36">
                View All
                <MoveUpRight size={28} strokeWidth={2.5} />
              </Button>
            </Link>
          </div>
          <div className="w-full lg:w-7/12">
            <Accordion
              defaultValue="1"
              className="fin-accordion default-accordion"
              type="single"
              collapsible
            >
              {accordion_data.map(({ id, title, description }, index) => (
                <AccordionItem
                  key={id}
                  className="accordion-item group"
                  value={id.toString()}
                >
                  <AccordionTrigger className="accordion-title">
                    <span className="title-text">{title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="accordion-content">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQ;
