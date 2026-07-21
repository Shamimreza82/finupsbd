// import { PrismaClient } from '@prisma/client';

import { chatWithGeminiAI } from '../../../config/gemini.config';

// const prisma = new PrismaClient();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const model = 'gpt-4o-mini';

// async function interactWithAssistant(
//   assistantId: string,
//   message: string
// ): Promise<string> {
//   // Fetch active personal loans
//   const personalLoans = await prisma.personalLoan.findMany({
//     where: { isActive: true },
//     include: {
//       features: true,
//       eligibility: true,
//       feesCharges: true,
//     },
//   });

//   // Prepare loan details for the AI prompt
//   const loanDetails = personalLoans
//     .map((loan) => {
//       const features = loan.features
//         ? `Features: Loan Amount (${loan.features.minimumAmount} - ${loan.features.maximumAmount}), Tenure (${loan.features.minimumYear}-${loan.features.maximumYear} years)`
//         : '';

//       const eligibility = loan.eligibility
//         ? `Eligibility: Minimum Income (${loan.eligibility.minimumIncome}), Age Requirement (${loan.eligibility.ageRequirement})`
//         : '';

//       const fees = loan.feesCharges
//         ? `Fees: Processing Fee (${loan.feesCharges.processingFee}), Prepayment Fee (${loan.feesCharges.prepaymentFee})`
//         : '';

//       return `
//       Bank: ${loan.bankName}
//       Amount: ${loan.amount}
//       Interest Rate: ${loan.interestRate}%
//       Monthly EMI: ${loan.monthlyEmi}
//       ${features}
//       ${eligibility}
//       ${fees}
//       https://www.finupsbd.com/application  visit this website for more information
//       `;
//     })
//     .join('\n');

//   // Construct the AI prompt

//   const prompt = `
//     You are a professional financial advisor specializing in personal loans at FinupsBD and your name is Reza. Your goal is to provide expert guidance and tailored loan solutions to meet your clients' financial needs. For inquiries, clients can reach you directly at 01531297879. Below is the latest information about the most attractive and flexible personal loan options currently available through FinupsBD.
//     ${loanDetails}

//     User Question: ${message}

//     Provide a detailed and accurate response. Do not include any additional information make sure every responce should like human.
//   `;

// //   async function main() {
// //     const stream = await openai.chat.completions.create({
// //         model: model,
// //         messages: [{ role: "user", content: prompt }],
// //         store: true,
// //         stream: true,
// //     });
// //     for await (const chunk of stream) {
// //         process.stdout.write(chunk.choices[0]?.delta?.content || "");
// //     }
// // }

// // const result = main()

//   // Get a response from OpenAI
//   const response = await openai.chat.completions.create({
//     model: model,
//     messages: [{ role: 'user', content: prompt }],
//   });

//   return response.choices[0].message.content as string;

// }

async function mcp(prompt: string) {
  // Implementation for mcp function

  const res = await chatWithGeminiAI(prompt);

  return res;
}

export const AiServices = {
  // interactWithAssistant,
  mcp,
};
