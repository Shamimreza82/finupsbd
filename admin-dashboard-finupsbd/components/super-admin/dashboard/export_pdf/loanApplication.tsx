/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Page, Text, View, StyleSheet, Image, Svg, Rect } from "@react-pdf/renderer";
import { TApplicationData } from "@/types/applicationTypes/applicationPageTypes";
import { formatDate as _formatDate, formatToBDTCurrency as _bdt } from "@/lib/utils";
import logo from '@/public/logo-lg.png'

/** ---------- Helpers ---------- */
const safe = (v: any, fallback = "—") => (v === undefined || v === null || v === "" ? fallback : String(v));
const formatDate = (d?: string | Date, fmt?: "DD-MM-YYYY" | undefined) => (d ? _formatDate(typeof d === 'string' ? d : d.toISOString(), fmt) : "—");
const bdt = (n?: string | number) => (n === undefined || n === null ? "—" : _bdt(n));

/** ---------- Layout constants (A4-friendly) ---------- */
const P_LEFT = 40;
const P_RIGHT = 40;
const P_BOTTOM = 64;
const HEADER_H = 70;       // logo + title line
const META_H = 46;         // meta strip line
const PAGE_TOP_PAD = HEADER_H + META_H + 24; // reserve full header height (IMPORTANT)




/** ---------- Styles ---------- */
const styles = StyleSheet.create({
  page: {
    paddingTop: PAGE_TOP_PAD,
    paddingBottom: P_BOTTOM,
    paddingHorizontal: P_LEFT,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },

  /* Fixed header (no overlap) */
  headerWrap: { position: "absolute", left: P_LEFT, right: P_RIGHT, top: 24 },
  
  headerRow: { height: HEADER_H, flexDirection: "row", alignItems: "center" },
  bankLogo: { width: 96, height: 28, objectFit: "contain" },
  titleBlock: { flex: 1, paddingLeft: 10 },
  bankTitle: { fontSize: 14, fontWeight: "bold", color: "#c1121f", marginBottom: 2 },
  formTitle: { fontSize: 11, color: "#374151" },
  photoBox: { width: 78, height: 78, border: "1 solid #000", objectFit: "cover" },

  metaStrip: {
    height: META_H,
    marginTop: 8,
    backgroundColor: "#f6f7fb",
    border: "1 solid #e5e7eb",
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  metaItem: { flex: 1, color: "#555", fontSize: 10 },

  /* Fixed footer */
  footer: {
    position: "absolute",
    left: P_LEFT,
    right: P_RIGHT,
    bottom: 20,
    fontSize: 9,
    color: "#6b7280",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  /* Watermark (optional) */
  wm: {
    position: "absolute",
    top: "40%",
    left: "16%",
    fontSize: 48,
    color: "#e5e7eb",
    opacity: 0.35,
    transform: "rotate(-18deg)",
  },

  /* Sections */
  section: { marginBottom: 14, break: "avoid" }, // try to keep each section intact
  sectionHead: {
    backgroundColor: "#eef2ff",
    border: "1 solid #dbeafe",
    color: "#111827",
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
  sectionBody: {
    borderLeft: "1 solid #eef2ff",
    borderRight: "1 solid #eef2ff",
    borderBottom: "1 solid #eef2ff",
    padding: 8,
  },

  /* Grid: keep columns aligned */
  grid: { flexDirection: "row", flexWrap: "wrap" },
  col2: { width: "50%", paddingRight: 10, marginTop: 6 },
  col3: { width: "33.3333%", paddingRight: 10, marginTop: 6 },

  label: { color: "#6b7280", fontSize: 9, marginBottom: 1 },
  value: { color: "#0f172a", fontSize: 10 },

  /* Table with page-break safety */
  table: { marginTop: 6, border: "1 solid #e5e7eb", break: "avoid" },
  tr: { flexDirection: "row" },
  th: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRight: "1 solid #e5e7eb",
    padding: 6,
    fontWeight: "bold",
    fontSize: 9,
    color: "#374151",
  },
  td: { flex: 1, borderTop: "1 solid #e5e7eb", borderRight: "1 solid #e5e7eb", padding: 6, fontSize: 9.5, color: "#111827" },

  /* Checkboxes & Declaration */
  tickRow: { flexDirection: "row", alignItems: "center", marginTop: 6, gap: 6, break: "avoid" },
  box: { width: 10, height: 10, border: "1 solid #111", marginRight: 6 },
  declaration: { marginTop: 8, fontSize: 9.5, lineHeight: 1.5, textAlign: "justify", color: "#111827" },

  /* Signatures */
  signWrap: { marginTop: 22, flexDirection: "row", gap: 24, break: "avoid" },
  signBox: { flex: 1, marginTop: 22, borderTop: "1 solid #111", textAlign: "center", paddingTop: 6, fontSize: 9.5 },
});





/** ---------- Small building blocks ---------- */
const Row = ({ children }: { children: React.ReactNode }) => <View style={styles.grid}>{children}</View>;

const Field2 = ({ label, value }: { label: string; value?: any }) => (
  <View style={styles.col2}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{safe(value)}</Text>
  </View>
);
const Field3 = ({ label, value }: { label: string; value?: any }) => (
  <View style={styles.col3}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{safe(value)}</Text>
  </View>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionHead}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const Checkbox = ({ checked = false }: { checked?: boolean }) => (
  <Svg style={styles.box}>
    <Rect x="0" y="0" width="10" height="10" stroke="#111" fill={checked ? "#111" : "transparent"} />
  </Svg>
);




/** ---------- Main PDF ---------- */
export const MyDocument  = ({ applicationData }: { applicationData: TApplicationData }) => {
  const photoUrl = applicationData.document?.[0]?.url
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${applicationData.document[0].url}`
    : undefined;

  const BANK_LOGO_URL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/assets/bank-logo.png`; // replace or remove

  const pi = applicationData.personalInfo;
  const ri = applicationData.residentialInformation;
  const ei = applicationData.employmentInformation;
  const li = applicationData.loanInfo;
  const lr = applicationData.loanRequest;
  const gi = applicationData.guarantorInfo;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Optional watermark */}
        <Text style={styles.wm}>Finups BD</Text>

        {/* FIXED HEADER */}
        <View style={styles.headerWrap} fixed>
          <View style={styles.headerRow}>
            {BANK_LOGO_URL ? <Image src={logo.src} style={styles.bankLogo} /> : <View />}
             <Text style={styles.formTitle}>Loan Application Form</Text>
            <View style={styles.titleBlock}>
             
            </View>
            {photoUrl ? <Image src={photoUrl} style={styles.photoBox} /> : <View style={styles.photoBox} />}
          </View>

          <View style={styles.metaStrip}>
            <Text style={styles.metaItem}>Application ID: {safe(applicationData.applicationId)}</Text>
            <Text style={styles.metaItem}>Status: {safe(applicationData.status)}</Text>
            <Text style={styles.metaItem}>Application date: {formatDate(applicationData.createdAt)}</Text>
            <Text style={styles.metaItem}>Application Last Updated: {formatDate(applicationData.updatedAt)}</Text>
          </View>
        </View>

        {/* 1. Applicant Information */}
        <Section title="1. Applicant Information">
          <Row>
            <Field3 label="Full Name" value={pi.fullName} />
            <Field3 label="Date of Birth" value={formatDate(pi.dateOfBirth, "DD-MM-YYYY")} />
            <Field3 label="Place of Birth" value={pi.placeOfBirth} />
          </Row>
          <Row>
            <Field3 label="NID Number" value={pi.NIDNumber} />
            <Field3 label="Nationality" value={pi.nationality} />
            <Field3 label="Gender" value={pi.gender} />
          </Row>
          <Row>
            <Field3 label="Marital Status" value={pi.maritalStatus} />
            <Field3 label="Religion" value={pi.religion} />
            <Field3 label="Education" value={pi.educationalLevel} />
          </Row>
          <Row>
            <Field3 label="Mobile" value={pi.mobileNumber} />
            <Field3 label="Alternate Mobile" value={pi.alternateMobileNumber} />
            <Field3 label="Email" value={pi.emailAddress} />
          </Row>
        </Section>

        {/* 2. Family Information */}
        <Section title="2. Family Information">
          <Row>
            <Field2 label="Father’s Name" value={pi.fatherName} />
            <Field2 label="Mother’s Name" value={pi.motherName} />
          </Row>
          <Row>
            <Field2 label="Spouse Name" value={pi.spouseName} />
          </Row>
        </Section>

        {/* 3. Address & Residency */}
        <Section title="3. Address & Residency">
          <Row>
            <Field2
              label="Present Address"
              value={`${safe(ri.presentAddress)}, ${safe(ri.presentThana)}, ${safe(ri.presentDistrict)}-${safe(ri.presentPostalCode)}`}
            />
            <Field2
              label="Permanent Address"
              value={`${safe(ri.permanentAddress)}, ${safe(ri.permanentThana)}, ${safe(ri.permanentDistrict)}-${safe(ri.permanentPostalCode)}`}
            />
          </Row>
          <Row>
            <Field3 label="Present Ownership Status" value={ri.presentOwnershipStatus} />
            <Field3 label="Present Length of Stay" value={ri.presentLengthOfStay} />
            <Field3 label="Permanent Ownership Status" value={ri.permanentOwnershipStatus} />
          </Row>
        </Section>

        {/* 4. Employment & Income */}
        <Section title="4. Employment & Income">
          <Row>
            <Field3 label="Employment Status" value={ei.employmentStatus} />
            <Field3 label="Employment Type" value={ei.employmentType} />
            <Field3 label="Date of Joining" value={formatDate(ei.dateOfJoining)} />
          </Row>
          <Row>
            <Field3 label="Organization" value={ei.organizationName} />
            <Field3 label="Department" value={ei.department} />
            <Field3 label="Designation" value={ei.designation} />
          </Row>
          <Row>
            <Field3 label="Official Contact" value={ei.officialContact} />
            <Field3 label="eTIN" value={ei.eTin || ei.tin} />
            <Field3 label="Total Experience" value={`${safe(ei.totalExperienceYears, "0")} yrs ${safe(ei.totalExperienceMonths, "0")} mos`} />
          </Row>
          <Row>
            <Field3 label="Gross Monthly Income" value={bdt(ei.grossMonthlyIncome)} />
            <Field3 label="Rent/Other Income" value={bdt(ei.rentIncome || ei.otherIncome)} />
            <Field3 label="Total Income" value={bdt(ei.totalIncome)} />
          </Row>
        </Section>

        {/* 5. Loan Request */}
        <Section title="5. Loan Request">
          <Row>
            <Field3 label="Requested Amount" value={bdt(lr.loanAmount)} />
            <Field3 label="Tenure (Months)" value={lr.loanTenure} />
            <Field3 label="Preferred EMI Start Day" value={lr.emiStartDate} />
          </Row>
          <Row>
            <Field2 label="Purpose" value={lr.loanPurpose} />
          </Row>
        </Section>

        {/* 6. Financial Obligations */}
        <Section title="6. Financial Obligations">
          {/* Credit Cards */}
          {!!li?.creditCards?.length && (
            <>
              <Text style={{ color: "#374151", fontSize: 10, marginTop: 2 }}>Credit Cards</Text>
              <View style={styles.table}>
                <View style={styles.tr}>
                  <Text style={styles.th}>Issuer</Text>
                  <Text style={styles.th}>Limit (BDT)</Text>
                  <Text style={styles.th}>Close Before Disbursement</Text>
                </View>
                {li.creditCards.map((cc) => (
                  <View key={cc.id} style={styles.tr}>
                    <Text style={styles.td}>{safe(cc.issuerName)}</Text>
                    <Text style={styles.td}>{bdt(cc.cardLimit)}</Text>
                    <Text style={styles.td}>{cc.toBeClosedBeforeDisbursement ? "Yes" : "No"}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Existing Loans */}
          {!!li?.existingLoans?.length && (
            <>
              <Text style={{ color: "#374151", fontSize: 10, marginTop: 8 }}>Existing Loans</Text>
              <View style={styles.table}>
                <View style={styles.tr}>
                  <Text style={styles.th}>Loan Type</Text>
                  <Text style={styles.th}>Lender</Text>
                  <Text style={styles.th}>Disbursed</Text>
                  <Text style={styles.th}>Outstanding</Text>
                  <Text style={styles.th}>EMI</Text>
                </View>
                {li.existingLoans.map((ex) => (
                  <View key={ex.id} style={styles.tr}>
                    <Text style={styles.td}>{safe(ex.loanType)}</Text>
                    <Text style={styles.td}>{safe(ex.lenderName)}</Text>
                    <Text style={styles.td}>{bdt(ex.disbursedAmount)}</Text>
                    <Text style={styles.td}>{bdt(ex.outstanding)}</Text>
                    <Text style={styles.td}>{bdt(ex.emi)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Bank Accounts (optional) */}
          {!!li?.bankAccounts?.length && (
            <>
              <Text style={{ color: "#374151", fontSize: 10, marginTop: 8 }}>Bank Accounts</Text>
              <View style={styles.table}>
                <View style={styles.tr}>
                  <Text style={styles.th}>Bank Name</Text>
                  <Text style={styles.th}>Account No.</Text>
                </View>
                {li.bankAccounts.map((acc) => (
                  <View key={acc.id} style={styles.tr}>
                    <Text style={styles.td}>{safe(acc.bankName)}</Text>
                    <Text style={styles.td}>{safe(acc.accountNumber)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </Section>

        {/* 7. Guarantor */}
        <Section title="7. Guarantor Information">
          <Row>
            <Field3 label="Business Guarantor Email" value={gi.businessGurantorEmail} />
            <Field3 label="Business Guarantor Phone" value={gi.businessGurantorPhone} />
            <Field3 label="Personal Guarantor Email" value={gi.personalGurantorEmail} />
          </Row>
          <Row>
            <Field3 label="Personal Guarantor Phone" value={gi.personalGurantorphone} />
            <Field3 label="Guarantor Email Sent?" value={gi.isEmailSend ? "Yes" : "No"} />
            <Field3 label="" value="" />
          </Row>
        </Section>

        {/* 8. Declaration & Consents (no Documents section) */}
        <Section title="8. Declaration & Consents">
          <View style={styles.tickRow}><Checkbox checked /><Text>I declare the information provided is true and complete.</Text></View>
          <View style={styles.tickRow}><Checkbox checked /><Text>I authorize the Bank to verify my information and obtain my credit report.</Text></View>
          <View style={styles.tickRow}><Checkbox /><Text>I consent to close specified credit cards before loan disbursement (if applicable).</Text></View>
          <Text style={styles.declaration}>
            I understand the Bank may approve or reject my application at its sole discretion. Any misstatement may lead to cancellation of the facility.
          </Text>
          <View style={styles.signWrap}>
            <Text style={styles.signBox}>Applicant’s Signature</Text>
            <Text style={styles.signBox}>Date</Text>
          </View>
        </Section>

        {/* FIXED FOOTER */}
        <View style={styles.footer} fixed>
          <Text>© FinupsBD. | Loan Application</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};
