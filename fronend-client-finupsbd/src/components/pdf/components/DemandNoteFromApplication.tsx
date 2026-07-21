// components/pdf/DemandNoteFromApplication.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/** Types */
export type TAgreementDoc = {
  id: string;
  applicationId: string;
  fullName: string;
  nid: string;
  loanName: string;
  loanType: string;
  presrntAddress: string;
  requstedAmount: number;
  eligibleLoan: number;
  interestRate: number;
  periodMonths: number;
  monthlyEMI: number;
  processingFee: number;
  loanAmountInWord: string;
  loanAmountInBangla: string;
  loanTenure: number;
  emiStartDate: number;
  applicationDate: string; // ISO
  dueDate: string;         // ISO
  fatherName?: string;
  place?: string;
  loanSerial?: string;
  bankName?: string;
};

/** Helpers */
const formatDate = (iso: string) =>
  new Date(iso)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ /g, "-");

const formatAmountGroup = (v: string | number) => {
  const n = typeof v === "string" ? Number(v) : v;
  if (!isFinite(n)) return String(v);
  return new Intl.NumberFormat("en-IN").format(n);
};

const guessPlace = (addr?: string) => {
  if (!addr) return "DHAKA";
  const last = addr.split(",").pop() || "";
  const city = last.split("-")[0]?.trim().toUpperCase();
  return city || "DHAKA";
};

/** Styles */
const S = StyleSheet.create({
  page: { padding: 28, backgroundColor: "#fff", fontSize: 10, lineHeight: 1.45, fontFamily: "Helvetica" },

  titleBar: {
    backgroundColor: "#111",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "bold",
  },

  row: { flexDirection: "row" },
  colLeft: { width: "58%" },
  colRight: { width: "42%" },

  kvRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  label: { color: "#222", marginRight: 6 },
  underline: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#333",
    minHeight: 14,
    justifyContent: "flex-end",
    paddingBottom: 2,
    flex: 1,
  },
  valBold: { fontWeight: "bold" },

  pill: {
    borderWidth: 0.8,
    borderColor: "#777",
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  ml6: { marginLeft: 6 },
  para: { marginTop: 16 },
  tiny: { fontSize: 9, color: "#444", marginTop: 10 },
  signWrap: { marginTop: 48 },
  signLine: { width: 180, borderTopWidth: 0.8, borderTopColor: "#333" },
});

/** "Label: ______ value" */
const KV = ({ k, v }: { k: string; v?: string }) => (
  <View style={S.kvRow}>
    <Text style={S.label}>{k}</Text>
    <View style={S.underline}>{v ? <Text style={S.valBold}>{v}</Text> : null}</View>
  </View>
);

/** Inline fill for interest % */
const InlineFill = ({ text, min }: { text?: string; min?: number }) => {
  const content = text ?? "";
  const filler = " ".repeat(Math.max(0, (min ?? 6) - content.length));
  return <Text style={S.valBold}>{content}{filler}</Text>;
};

/** PDF */
export default function DemandNoteFromApplication({ applicationData }: { applicationData: TAgreementDoc }) {
  const d = applicationData;

  const date = formatDate(d.applicationDate);
  const place = d.place || guessPlace(d.presrntAddress);
  const approvalId = d.applicationId;
  const serial = d.loanSerial || d.applicationId;
  const amountNum = Number(d.eligibleLoan ?? d.requstedAmount ?? 0);
  const amount = formatAmountGroup(amountNum);
  const amountWords = d.loanAmountInWord || d.loanAmountInBangla || "";
  const bankName = d.bankName || "BRAC Bank Limited";

  return (
    <Document>
      <Page size="A4" style={S.page} wrap>
        {/* Title */}
        <Text style={S.titleBar}>Demand Promissory Note</Text>

        {/* Meta rows */}
        <View style={[S.row, { marginTop: 10 }]}>
          {/* Left block */}
          <View style={S.colLeft}>
            <KV k="Date:" v={date} />
            <KV k="Place:" v={place} />
            <KV k="No.:" />
            <KV k="BDT" v={amount} />
          </View>

          {/* Right block */}
          <View style={[S.colRight, { paddingLeft: 10 }]}>
            <View style={S.kvRow}>
              <Text style={S.label}>Loan Approval ID:</Text>
              <View style={[S.pill, { flex: 1 }, S.ml6]}>
                <Text style={S.valBold}>{approvalId}</Text>
              </View>
            </View>
            <View style={S.kvRow}>
              <Text style={S.label}>Loan Serial #</Text>
              <View style={[S.pill, { flex: 1 }, S.ml6]}>
                <Text style={S.valBold}>{serial}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={S.para}>
          <Text>
            On demand I/we, <Text style={S.valBold}>{d.fullName || " "}</Text>, son/daughter of{" "}
            <Text style={S.valBold}>{d.fatherName || " "}</Text>, of{" "}
            <Text style={S.valBold}>{d.presrntAddress}</Text> – do hereby irrevocably and
            unconditionally promise to pay jointly and severally to or to the order of{" "}
            <Text style={S.valBold}>{bankName}</Text>, the sum of taka{" "}
            <Text style={S.valBold}>BDT {amount}</Text> (
            <Text style={S.valBold}>{amountWords}</Text>) received with interest thereon from this
            date @ <InlineFill text={String(d.interestRate)} min={4} /> % per annum.
          </Text>
        </View>

        {/* Note */}
        <Text style={S.tiny}>
          All payments under this note shall be made free and clear of and without any deductions
          and withholdings of any kinds whatsoever.
        </Text>

        {/* Signature */}
        <View style={S.signWrap}>
          <View style={S.signLine} />
          <Text style={[S.tiny, { marginTop: 3 }]}>Applicant’s Signature</Text>
        </View>
      </Page>
    </Document>
  );
}
