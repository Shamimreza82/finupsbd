import serviceIcon1 from "@/assets/images/icons/service-icon-1.png";
import serviceIcon2 from "@/assets/images/icons/service-icon-2.png";
import serviceIcon4 from "@/assets/images/icons/service-icon-4.png";
import serviceIcon3 from "@/assets/images/icons/service-icon-5.png";
import Image from "next/image";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";

const services = [
  {
    id: 1,
    title: "FinupsBD Marketplace",
    description:
      "Discover the widest online catalogue of loans, credit cards, and insurance plans in Bangladesh, all sourced from reputable banks, NBFIs, and insurers. Search by product type, filter by rate or fee, and compare offers on a single screen instead of juggling ten browser tabs.",
    icon: serviceIcon1,
  },
  {
    id: 2,
    title: "Quick Eligibility Checker",
    description:
      "Pop in a few basics monthly income, job type, city and our smart checker instantly shows which products you’re likely to qualify for. Avoid blind applications, paperwork headaches, and needless rejections.",
    icon: serviceIcon2,
  },
  {
    id: 3,
    title: "Side-by-Side Product Comparison",
    description:
      "Line up interest rates, fees, repayment terms, and hidden perks in one clean dashboard. Whether you’re after the lowest-rate personal loan, a cashback credit card, or a budget-friendly insurance policy, you’ll spot the best-value deal in seconds.",
    icon: serviceIcon3,
  },
  {
    id: 4,
    title: "Learning Hub & Resources",
    description:
      "Short articles, how-to videos, and interactive calculators turn banking jargon into plain Bangla and English. Learn to budget smarter, borrow responsibly, and build wealth, then put that knowledge to work right here on FinupsBD.",
    icon: serviceIcon4,
  },
];

const Services = () => {
  return (
    <SectionWrapper className="pt-0 lg:!pt-20">
      <div className="container mx-auto px-4 lg:px-14 xl:px-14 2xl:px-0">
        <div className="mb-4 text-center lg:mb-16">
          <SectionBadge className="before:bg-[#7BE963]">
            Our Services
          </SectionBadge>
          <SectionTitle>Smart Financial Tools for You</SectionTitle>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="flex gap-2 rounded-lg bg-[#F9FAFB] px-4 py-6 lg:gap-2 lg:px-7 lg:py-8"
            >
              <div className="h-auto w-2/12">
                <Image src={icon} alt="Icon" width={64} height={64} />
              </div>
              <div className="w-10/12 space-y-2">
                <h2 className="text-md font-semibold text-green-950 lg:text-2xl">
                  {title}
                </h2>
                <p className="text-sm text-gray-950 lg:text-lg">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
