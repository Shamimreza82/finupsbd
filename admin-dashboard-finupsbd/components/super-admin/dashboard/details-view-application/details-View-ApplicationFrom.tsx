"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  User,
  MapPin,
  CreditCard,
  Building2,
  FileText,
  DollarSign,
  Calendar,
  Shield,
  Download,
  Eye,
  Calculator,
  CheckCircle,
  Phone,
  Printer,
  Search,
  Activity,
  Moon,
  Sun,
  MessageSquare,
  FileImage,
  Briefcase,
} from "lucide-react"
import { useState } from "react"
import { TApplicationData } from "@/types/applicationTypes/applicationPageTypes"

import StatusProgressBar from "@/components/Small-component/StatusProgressBar"
import StatusBadge from "@/components/Small-component/StatusBadge"
import { ApplicationFeedBackForm } from "./application-feedback"
import { TLoanStatusType } from "@/types/sharedTypes"
import { calculateEMI, formatDate, formatToBDTCurrency } from "@/lib/utils"
import Image from "next/image"
import GuarantorInfo from "./GuarantorInfo"
import dynamic from "next/dynamic"

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
)
const MyDocument = dynamic(
  () => import("../export_pdf/loanApplication").then((mod) => ({ default: mod.MyDocument })),
  { ssr: false }
)
import Link from "next/link"


// Register a font if needed
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.ttf' });



export default function DetailsViewApplicationFrom({ applicationData }: { applicationData: TApplicationData }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  // const [selectedDocument, setSelectedDocument] = useState(null)
  // const [showEMICalculator, setShowEMICalculator] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  // const [filterStatus, setFilterStatus] = useState("all")
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(12.75)
  const [tenure, setTenure] = useState(24)

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6`}>
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div
          className={` rounded-lg shadow-sm border p-6 transition-colors duration-300`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold`}>
                {applicationData.user?.name ? applicationData.user?.name : <div>Applicant Name</div>}
              </h1>
              <p className={` mt-1`}>
                Application ID: {applicationData.applicationId}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                <Moon className="w-4 h-4" />
              </div>

              <ApplicationFeedBackForm id={applicationData.id} />
              <Button>
                <Link href={`/dashboard/application/application-events/${applicationData.id}`} className="flex items-center">
                  Events
                </Link>
              </Button>

              <div>
                <StatusBadge status={applicationData?.status as TLoanStatusType}></StatusBadge>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Download className="w-4 h-4" />
                    /
                    <Printer className="w-4 h-4" />
                    Export PDF / Print
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Loan Application PDF</DialogTitle>
                  </DialogHeader>
                  <PDFViewer style={{ width: '100%', height: '100%' }}>
                    <MyDocument applicationData={applicationData} />
                  </PDFViewer>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Application Date/Time</p>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatDate(applicationData.createdAt, "DD-MM-YYYY h:mm A")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* <DollarSign className="w-5 h-5 text-green-600" /> */}
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Requested Amount</p>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {formatToBDTCurrency(applicationData.loanRequest.loanAmount)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-600" />
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Tenure</p>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {applicationData.loanRequest.loanTenure} months
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Documents</p>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {applicationData.document.length} files
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Additional Documents</p>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {applicationData.additionalDocument.length} files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <StatusProgressBar status={applicationData.status as TLoanStatusType} />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="financial">Financial Info</TabsTrigger>
            <TabsTrigger value="employment">Employment Info</TabsTrigger>
            <TabsTrigger value="guarantors">Guarantors</TabsTrigger>
            <TabsTrigger value="offer">Loan Offer</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            {
              applicationData?.additionalDocument.length > 0 && <TabsTrigger value="additionalDoc">Additional Doc</TabsTrigger>
            }
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Applicant Summary */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <User className="w-5 h-5" />
                    Applicant Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${applicationData?.document[0]?.url}`}
                        alt={applicationData.personalInfo.fullName}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.fullName}
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {applicationData.personalInfo.educationalLevel} • {applicationData.personalInfo.maritalStatus}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Email</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.emailAddress}
                      </p>
                    </div>
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Mobile</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.mobileNumber}
                      </p>
                    </div>
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>NID Number</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.NIDNumber}
                      </p>
                    </div>
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Date of Birth</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatDate(applicationData.personalInfo.dateOfBirth, "DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Loan Request Summary */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <DollarSign className="w-5 h-5" />
                    Loan Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className={`text-3xl font-bold text-blue-600`}>
                      {formatToBDTCurrency(applicationData.loanRequest.loanAmount)}
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>Requested Amount</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Tenure</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.loanRequest.loanTenure} months
                      </p>
                    </div>
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Purpose</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.loanRequest.loanPurpose}
                      </p>
                    </div>
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>EMI Start Date</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.loanRequest.emiStartDate}th of month
                      </p>
                    </div>
                  </div>
                  {/* <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setShowEMICalculator(true)}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate EMI
                  </Button> */}
                </CardContent>
              </Card>

              {/* Application Status */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <Activity className="w-5 h-5" />
                    Application Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <StatusBadge status={applicationData.status as TLoanStatusType} />
                  </div>
                  <Separator />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Application ID</span>
                      <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.applicationId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Created</span>
                      <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatDate(applicationData.createdAt, "DD-MM-YYYY")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Last Updated</span>
                      <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatDate(applicationData.updatedAt, "DD-MM-YYYY")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Active</span>
                      <span className={`font-medium ${applicationData.isActive ? "text-green-600" : "text-red-600"}`}>
                        {applicationData.isActive ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Details */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Full Name</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.fullName}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Fathers Name</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.fatherName}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Mothers Name</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.motherName}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Spouse Name</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.spouseName}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Date of Birth</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatDate(applicationData.personalInfo.dateOfBirth, "DD-MM-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Place of Birth</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.placeOfBirth}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Gender</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.gender}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Marital Status</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.maritalStatus}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Education Level</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.educationalLevel}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Religion</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.religion}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Nationality</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.nationality}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Passport Number</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {applicationData.personalInfo.passportNumber}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Residential Information */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <MapPin className="w-5 h-5" />
                    Residential Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Present Address */}
                  <div>
                    <h4 className={`font-medium mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Present Address
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Address</p>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {applicationData.residentialInformation.presentAddress}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>District</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.presentDistrict}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Division</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.presentDivision}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Thana</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.presentThana}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Postal Code</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.presentPostalCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Permanent Address */}
                  <div>
                    <h4 className={`font-medium mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Permanent Address
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Address</p>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {applicationData.residentialInformation.permanentAddress}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>District</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.permanentDistrict}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Division</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.permanentDivision}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Thana</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.permanentThana}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Postal Code</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.residentialInformation.permanentPostalCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Info Tab */}
          <TabsContent value="financial" className="space-y-6">
            {/* Bank Accounts */}
            <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <Building2 className="w-5 h-5" />
                  Bank Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bank Name</TableHead>
                      <TableHead>Account Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationData.loanInfo.bankAccounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                          {account.bankName.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell>{account.accountNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Credit Cards */}
            <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <CreditCard className="w-5 h-5" />
                  Credit Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Card Limit</TableHead>
                      <TableHead>To Be Closed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationData.loanInfo.creditCards.map((card, index) => (
                      <TableRow key={index}>
                        <TableCell className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                          {card.issuerName.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell>{formatToBDTCurrency(card.cardLimit)}</TableCell>
                        <TableCell>
                          <Badge variant={card.toBeClosedBeforeDisbursement ? "destructive" : "secondary"}>
                            {card.toBeClosedBeforeDisbursement ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Existing Loans */}
            <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`${isDarkMode ? "text-white" : ""}`}>Existing Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loan Type</TableHead>
                      <TableHead>Lender</TableHead>
                      <TableHead>Disbursed Amount</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>EMI</TableHead>
                      <TableHead>Adjustment Plan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationData.loanInfo.existingLoans.map((loan, index) => (
                      <TableRow key={index}>
                        <TableCell className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                          {loan.loanType.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell>{loan.lenderName.replace(/_/g, " ")}</TableCell>
                        <TableCell>{formatToBDTCurrency(loan.disbursedAmount)}</TableCell>
                        <TableCell>{formatToBDTCurrency(loan.outstanding)}</TableCell>
                        <TableCell>{formatToBDTCurrency(loan.emi)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{loan.adjustmentPlan.replace(/_/g, " ")}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Employment Info Tab */}
          <TabsContent value="employment" className="space-y-6">
            <div className="space-y-6">
              {/* Current Employment Details */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <User className="w-5 h-5" />
                    Current Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Employee ID</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.employeeId}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Designation</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.designation}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Department</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Date of Joining</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                          {formatDate(applicationData?.employmentInformation?.dateOfJoining, "DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Employment Status</label>
                        <div className="mt-1">
                          <Badge variant="secondary">{applicationData?.employmentInformation?.employmentStatus}</Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Employment Type</label>
                        <div className="mt-1">
                          <Badge variant="outline">{applicationData?.employmentInformation?.employmentType}</Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">eTIN</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.eTin}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Information */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <Building2 className="w-5 h-5" />
                    Organization Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Organization Name</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.organizationName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Organization Address</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""} flex items-start gap-2`}>
                          <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          {applicationData?.employmentInformation?.organizationAddress}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Official Contact</label>
                        <p className={`font-medium ${isDarkMode ? "text-white" : ""} flex items-center gap-2`}>
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {applicationData?.employmentInformation?.officialContact}
                        </p>
                      </div>
                      {applicationData?.employmentInformation?.institutionName && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Institution Name</label>
                          <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.institutionName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income Information */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <DollarSign className="w-5 h-5" />
                    Income Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Gross Monthly Income</label>
                        <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : ""}`}>
                          ৳{Number.parseInt(applicationData?.employmentInformation?.grossMonthlyIncome).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Other Income</label>
                        <p className={`text-xl font-semibold ${isDarkMode ? "text-white" : ""}`}>
                          ৳{Number.parseInt(applicationData?.employmentInformation?.otherIncome).toLocaleString()}
                        </p>
                      </div>
                      {applicationData?.employmentInformation?.otherProfession && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Other Profession</label>
                          <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.otherProfession}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Information (if applicable) */}
              {(applicationData?.employmentInformation?.businessName || applicationData?.employmentInformation?.businessAddress || applicationData?.employmentInformation?.businessRegistrationNumber) && (
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                      <Briefcase className="w-5 h-5" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {applicationData?.employmentInformation?.businessName && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.businessName}</p>
                          </div>
                        )}
                        {applicationData?.employmentInformation?.businessAddress && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Business Address</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.businessAddress}</p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {applicationData?.employmentInformation?.businessRegistrationNumber && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                              {applicationData?.employmentInformation?.businessRegistrationNumber}
                            </p>
                          </div>
                        )}
                        {applicationData?.employmentInformation?.businessType && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.businessType}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Previous Employment (if applicable) */}
              {applicationData?.employmentInformation?.hasPreviousOrganization && (
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                      <Calendar className="w-5 h-5" />
                      Previous Employment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {applicationData?.employmentInformation?.previousOrganizationName && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Previous Organization</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                              {applicationData?.employmentInformation?.previousOrganizationName}
                            </p>
                          </div>
                        )}
                        {applicationData?.employmentInformation?.previousDesignation && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Previous Designation</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                              {applicationData?.employmentInformation?.previousDesignation}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {(applicationData?.employmentInformation?.previousServiceYears || applicationData?.employmentInformation?.previousServiceMonths) && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Service Duration</label>
                            <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                              {applicationData?.employmentInformation?.previousServiceYears && `${applicationData?.employmentInformation?.previousServiceYears} years`}
                              {applicationData?.employmentInformation?.previousServiceYears && applicationData?.employmentInformation?.previousServiceMonths && ", "}
                              {applicationData?.employmentInformation?.previousServiceMonths && `${applicationData?.employmentInformation?.previousServiceMonths} months`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Professional Information */}
              {(applicationData?.employmentInformation?.professionalTitle || applicationData?.employmentInformation?.professionalRegistrationNumber) && (
                <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                      <User className="w-5 h-5" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {applicationData?.employmentInformation?.professionalTitle && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Professional Title</label>
                          <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>{applicationData?.employmentInformation?.professionalTitle}</p>
                        </div>
                      )}
                      {applicationData?.employmentInformation?.professionalRegistrationNumber && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                          <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>
                            {applicationData?.employmentInformation?.professionalRegistrationNumber}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Guarantors Tab */}
          <TabsContent value="guarantors" className="space-y-6">
            <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <User className="w-5 h-5" />
                  Guarantor Information
                </CardTitle>
                <CardDescription>Contact information for guarantors</CardDescription>
              </CardHeader>
              <CardContent>
                {applicationData.guarantorInfo ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Guarantor */}
                    <div className="space-y-4">
                      <h4 className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Personal Guarantor
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo.personalGurantorEmail}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Phone</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo.personalGurantorphone}
                          </p>
                        </div>
                      </div>
                      <div>
                        {
                          applicationData?.personalGuarantor ?
                            <GuarantorInfo data={applicationData.personalGuarantor} type="personal" />
                            : <Badge variant={"destructive"} className="text-xl">Data not available</Badge>
                        }
                      </div>
                    </div>


                    {/* Business Guarantor */}
                    <div className="space-y-4">
                      <h4 className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Business Guarantor
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo.businessGurantorEmail}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Phone</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo.businessGurantorPhone}
                          </p>
                        </div>
                      </div>
                      <div>
                        {
                          applicationData?.businessGuarantor ?
                            <GuarantorInfo data={applicationData.businessGuarantor} type="business" />
                            : <Badge variant={"destructive"} className="text-xl">Data not available</Badge>
                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Guarantor */}
                    <div className="space-y-4">
                      <h4 className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Personal Guarantor
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Phone</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData?.guarantorInfo}
                          </p>
                        </div>
                      </div>
                      <div>
                        {
                          applicationData?.personalGuarantor ?
                            <GuarantorInfo data={applicationData.personalGuarantor} type="personal" />
                            : <Badge variant={"destructive"} className="text-xl">Data not available</Badge>
                        }
                      </div>
                    </div>


                    {/* Business Guarantor */}
                    <div className="space-y-4">
                      <h4 className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Business Guarantor
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Email</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo}
                          </p>
                        </div>
                        <div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Phone</p>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {applicationData.guarantorInfo}
                          </p>
                        </div>
                      </div>
                      <div>
                        {
                          applicationData?.businessGuarantor ?
                            <GuarantorInfo data={applicationData.businessGuarantor} type="business" />
                            : <Badge variant={"destructive"} className="text-xl">Data not available</Badge>
                        }
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <FileText className="w-5 h-5" />
                  Uploaded Documents
                </CardTitle>
                <CardDescription>All documents submitted with this loan application</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationData.document
                      .filter((doc) => doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                {doc.mimeType.includes("pdf") ? (
                                  <FileText className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <FileImage className="w-4 h-4 text-green-400" />
                                )}
                              </div>
                              <div>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {doc.originalName}
                                </p>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  {doc.mimeType}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.mimeType}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(doc.uploadedAt, "DD-MM-YYYY")}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>{doc.originalName}</DialogTitle>
                                  </DialogHeader>
                                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                    {doc.mimeType.includes("image") ? (
                                      <Image
                                        height={200}
                                        width={200}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                                        alt={doc.originalName}
                                        className="max-w-full max-h-full object-contain"
                                      />
                                    ) : doc.mimeType.includes("pdf") ? (
                                      <iframe
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                                        className="w-full h-full rounded-lg"
                                      />
                                    ) : (
                                      <p className="text-gray-500">Document preview not available</p>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm" asChild>
                                <Button variant="outline" size="sm" asChild>
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`} target="_blank"
                                    download={doc.originalName} // 👈 forces automatic download with original name
                                  >
                                    <Download className="w-4 h-4" />
                                  </a>
                                </Button>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loan Offer Tab */}
          <TabsContent value="offer" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loan Offer Details */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`${isDarkMode ? "text-white" : ""}`}>Eligible Loan Offer</CardTitle>
                  <CardDescription>Based on your application, heres the loan offer available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="flex items-center justify-center mb-4">
                        <Image
                          height={300}
                          width={300}
                          src={applicationData.eligibleLoanOffer.bankImage || "/placeholder.svg"}
                          alt="Bank Logo"
                          className="h-12 object-contain"
                        />
                      </div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
                        {applicationData.eligibleLoanOffer.bankName}
                      </p>
                      <p className="text-4xl font-bold text-blue-600 mb-2">
                        {formatToBDTCurrency(applicationData.eligibleLoanOffer.eligibleLoan)}
                      </p>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Eligible Amount</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Interest Rate</p>
                        <p className={`font-medium text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {applicationData.eligibleLoanOffer.interestRate}% per annum
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Loan Period</p>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {applicationData.eligibleLoanOffer.periodMonths} months
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Processing Fee</p>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {applicationData.eligibleLoanOffer.processingFee}%
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Loan Type</p>
                        <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {applicationData.eligibleLoanOffer.loanType.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Offer
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Negotiate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EMI Calculator */}
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                    <Calculator className="w-5 h-5" />
                    EMI Calculator
                  </CardTitle>
                  <CardDescription>Calculate your monthly installments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="loan-amount">Loan Amount</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tenure">Tenure (months)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <Separator />

                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>Monthly EMI</p>
                    <p className="text-3xl font-bold text-green-600">
                      {formatToBDTCurrency(calculateEMI(loanAmount, interestRate, tenure))}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Total Interest</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatToBDTCurrency(calculateEMI(loanAmount, interestRate, tenure) * tenure - loanAmount)}
                      </p>
                    </div>
                    <div>
                      <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Total Amount</p>
                      <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {formatToBDTCurrency(calculateEMI(loanAmount, interestRate, tenure) * tenure)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          {/* Documents Tab */}
          <TabsContent value="additionalDoc" className="space-y-6">
            <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : ""}`}>
                  <FileText className="w-5 h-5" />
                  Uploaded Documents
                </CardTitle>
                <CardDescription>All documents submitted with this loan application</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationData.additionalDocument
                      .filter((doc) => doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                {doc.mimeType.includes("pdf") ? (
                                  <FileText className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <FileImage className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              <div>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {doc.originalName}
                                </p>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                  {doc.mimeType}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.mimeType}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(doc.uploadedAt, "DD-MM-YYYY")}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>{doc.originalName}</DialogTitle>
                                  </DialogHeader>
                                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                    {doc.mimeType.includes("image") ? (
                                      <Image
                                        height={200}
                                        width={200}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                                        alt={doc.originalName}
                                        className="max-w-full max-h-full object-contain"
                                      />
                                    ) : doc.mimeType.includes("pdf") ? (
                                      <iframe
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`}
                                        className="w-full h-full rounded-lg"
                                      />
                                    ) : (
                                      <p className="text-gray-500">Document preview not available</p>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc.url}`} target="_blank"
                                  download={doc.originalName} // 👈 forces automatic download with original name
                                >
                                  <Download className="w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
