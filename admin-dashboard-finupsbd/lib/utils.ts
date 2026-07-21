import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




// Define supported formats as a union type
export type TDateFormat =
  | "YYYY-MM-DD"
  | "DD-MM-YYYY"
  | "MM/DD/YYYY"
  | "Full Date"
  | "YYYY-MM-DD h:mm A"
  | "DD-MM-YYYY h:mm A"
  | "MM/DD/YYYY h:mm A"
  | "Full Date Time";

export const formatDate = (
  isoString: string,
  format: TDateFormat = "YYYY-MM-DD"
): string => {
  const date = new Date(isoString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as const;

  // Convert hours and minutes to 12-hour format
  const get12HourTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const timeStr = get12HourTime(date);

  switch (format) {
    case "YYYY-MM-DD":
      return date.toISOString().split("T")[0];

    case "DD-MM-YYYY":
      return date
        .toLocaleDateString("en-GB", options)
        .replace(/\//g, "-");

    case "MM/DD/YYYY":
      return date.toLocaleDateString("en-US", options);

    case "Full Date":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    case "YYYY-MM-DD h:mm A":
      return `${date.toISOString().split("T")[0]} ${timeStr}`;

    case "DD-MM-YYYY h:mm A":
      return (
        date
          .toLocaleDateString("en-GB", options)
          .replace(/\//g, "-") +
        ` ${timeStr}`
      );

    case "MM/DD/YYYY h:mm A":
      return (
        date.toLocaleDateString("en-US", options) + ` ${timeStr}`
      );

    case "Full Date Time":
      return (
        date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) +
        ` ${timeStr}`
      );

    default:
      return date.toDateString();
  }
};


// // Example Usage
// console.log(formatDate("2025-03-26T03:20:00.000Z", "YYYY-MM-DD h:mm A"));
// // → "2025-03-26 3:20 AM"

// console.log(formatDate("2025-03-26T15:05:00.000Z", "DD-MM-YYYY h:mm A"));
// // → "26-03-2025 3:05 PM"

// console.log(formatDate("2025-03-26T15:05:00.000Z", "MM/DD/YYYY h:mm A"));
// // → "03/26/2025 3:05 PM"

// console.log(formatDate("2025-03-26T15:05:00.000Z", "Full Date Time"));
// → "Wednesday, March 26, 2025 3:05 PM"


///-----------------------------------------------------------------------------


export function formatEnums(loanType: string) {
  return loanType
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
// Example usage:
// console.log(formatLoanType("PERSONAL_LOAN")); // Output: "Personal Loan"

///-----------------------------------------------------------------------------

///-----------------------------------------------------------------------------


export function formatToBDTCurrency(input: string | number): string {
  const number = typeof input === "string" ? parseFloat(input.replace(/,/g, "")) : input;

  if (isNaN(number)) return "Invalid amount";

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number) + " BDT";
}

// Example usage:
// formatToBDTCurrency(2000000);         // "20,00,000.00 BDT"
// formatToBDTCurrency("200000");        // "2,00,000.00 BDT"
// formatToBDTCurrency("200000.5");      // "2,00,000.50 BDT"
// formatToBDTCurrency("2000000.00");    // "20,00,000.00 BDT"
// formatToBDTCurrency("invalid input"); // "Invalid amount"

// ///-----------------------------------------------------------------------------

///-----------------------------------------------------------------------------


export function formatDateString(dobString: string): string {
  const dob = new Date(dobString);
  return dob.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// console.log(formatDate("2025-06-12T00:00:00.000Z"));
// // Output: "June 12, 2025"

// ///-----------------------------------------------------------------------------

export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

// ///-----------------------------------------------------------------------------

///-----------------------------------------------------------------------------


  // EMI Calculator
  export const calculateEMI = (principal: number, rate: number, time: number) => {
    const monthlyRate = rate / (12 * 100)
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / (Math.pow(1 + monthlyRate, time) - 1)
    return Math.round(emi)
  }

// ///-----------------------------------------------------------------------------
