import productIcon0 from "@/assets/images/icons/product-icon-0.png";
import productIcon1 from "@/assets/images/icons/product-icon-1.png";
import productIcon2 from "@/assets/images/icons/product-icon-2.png";
import productIcon3 from "@/assets/images/icons/product-icon-3.png";
import productIcon4 from "@/assets/images/icons/product-icon-4.png";
import productIcon5 from "@/assets/images/icons/product-icon-5.png";
import productIcon6 from "@/assets/images/icons/product-icon-6.png";
import productIcon7 from "@/assets/images/icons/product-icon-7.png";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import SectionBadge from "../core/SectionBadge";
import SectionTitle from "../core/SectionTitle";
import SectionWrapper from "../core/SectionWrapper";

export default function FinancialProducts() {
  const products = [
    {
      id: 1,
      title: "Finups Agrim (Instant Loan)",
      description:
        "Do you need cash today? In as little as 24 hours, salaried professionals can receive up to ৳20,000 through our flagship instant loan. Clear fees, adjustable payback terms, and bank or MFS disbursements.",
      icon: productIcon0,
    },
    {
      id: 2,
      title: "Credit Cards",
      description:
        "Examine more than fifty Bangladeshi credit cards, including cash-back, travel, student, and Islamic choices. Compare annual fees, reward points, and welcome bonuses. ",
      icon: productIcon1,
    },
    {
      id: 3,
      title: "Personal Loans (PL)",
      description:
        "Organising a wedding, making tuition payments, or renovation your house? Arrange for fast approval and adjustable terms for unsecured personal loans. View all of the qualifying information, processing costs, and interest rates in one location.",
      icon: productIcon2,
    },

    {
      id: 4,
      title: "Home Loan (HL)",
      description:
        "Make your ideal flat a real address. To ensure you get the best deal before signing, compare home loan interest rates in Bangladesh, repayment terms up to 25 years, and hidden fees. ",
      icon: productIcon6,
    },

    {
      id: 5,
      title: "Life Insurance (LI)",
      description:
        "Term-life and endowment insurance from reputable Bangladeshi providers can help safeguard your family's future. Examine premium ranges, coverage amounts, and claim-settlement scores.",
      icon: productIcon3,
    },
    {
      id: 6,
      title: "Car Insurance",
      description:
        "Keep your money and your ride safe. Obtain quick quotes for third-party or comprehensive auto insurance. Before you drive, consider options like zero-depreciation and roadside assistance. ",
      icon: productIcon4,
    },
    {
      id: 7,
      title: "SME Loan",
      description:
        "Boost your factory, shop, or new business. Examine overdraft and SME loan options designed specifically for Bangladeshi business owners, offering affordable rates and minimal collateral needs.",
      icon: productIcon5,
    },

    {
      id: 8,
      title: "Finups Islamic",
      description:
        "Searching for financing that complies with Shariah? Examine halal credit cards, financing solutions, and Takaful plans that adhere to Islamic law no riba, no compromise. ",
      icon: productIcon7,
    },
  ];

  return (
    <SectionWrapper>
      <div className="bg-[#FFFCF5] py-16">
        <div className="container mx-auto px-4 lg:px-14 xl:px-14 2xl:px-0">
          <div className="mb-4 text-center lg:mb-16">
            <SectionBadge className="before:bg-[#FF5F00]">
              Featured Products
            </SectionBadge>
            <SectionTitle>Popular Financial Products</SectionTitle>
          </div>
          {/* Enhanced Products Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map(({ id, title, description, icon }) => (
              <Card
                key={id}
                className="group overflow-hidden border border-[#EAECF0] bg-white transition-all duration-300 hover:border-[#7BE963] hover:bg-[#F7FFF5] hover:shadow-lg"
              >
                <CardContent className="space-y-3 p-6 pt-8">
                  <div className="w-64 lg:w-32">
                    <Image src={icon} alt="Icon" className="h-auto w-16" />
                  </div>

                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-green-950">
                      {title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600">{description}</p>
                  {/* <Link
                    href=""
                    className="flex items-center group-hover:text-primary"
                  >
                    Compare Now
                    <ArrowRight className="ml-1 h-4 w-4 -rotate-45 transition-transform group-hover:-rotate-0" />
                  </Link> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
