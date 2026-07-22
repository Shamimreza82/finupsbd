"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GoldAndSilverCalculator from './GoldSilverCalculator';
import Link from 'next/link';
import ZakatSummaryCard from './ZakatSummaryCard';
import ZakatWarning from './ZakatWarning';
import { Wallet, Gem, TrendingUp, Briefcase, Home, Banknote, Package, ArrowDownCircle, Calculator, Info } from 'lucide-react';

const ZakatCalculatorNew = () => {
  const [language, setLanguage] = useState<'english' | 'bangla'>('english');
  const [values, setValues] = useState({
    // Cash & Bank
    cashAtHome: '',
    cashInBank: '',
    
    // Gold & Silver
    // goldWeight: '',
    goldValue: '',
    // silverWeight: '',
    silverValue: '',
    
    // Investments
    sharesStocks: '',
    moneyLent: '',
    
    // Business
    stockInTrade: '',
    businessCash: '',
    
    // Property
    investmentProperty: '',
    
    // Pension
    pensionCash: '',
    
    // Other Assets
    otherAssets: '',
    
    // Liabilities
    debts: '',
    outstandingBills: '',
    overdraft: '',
    creditCards: '',
    otherLiabilities: ''
  });

  const [goldPricePerGram, setGoldPricePerGram] = useState("20120");
  const [silverPricePerGram, setSilverPricePerGram] = useState("850");

  const translations = {
    english: {
      title: "Zakat Calculator",
      subtitle: "Calculate your Zakat obligation",
      cashBank: "Cash & Bank",
      cashAtHome: "Cash at Home",
      cashInBank: "Cash in Bank",
      goldSilver: "Gold & Silver",
      goldWeight: "Gold (grams)",
      goldValue: "Gold Value",
      silverWeight: "Silver (grams)",
      silverValue: "Silver Value",
      investments: "Investments",
      sharesStocks: "Shares/Stocks",
      moneyLent: "Money Lent to Others",
      business: "Business Assets",
      stockInTrade: "Stock in Trade",
      businessCash: "Business Cash/Bank Balance",
      property: "Property",
      investmentProperty: "Investment Property Value",
      pension: "Pension",
      pensionCash: "Pension Lump Sum (if accessible)",
      otherAssets: "Other Assets",
      otherAssetsLabel: "Other Zakatable Assets",
      liabilities: "Liabilities (Deductions)",
      debts: "Debts (Money Owed)",
      outstandingBills: "Outstanding Bills",
      overdraft: "Overdraft",
      creditCards: "Credit Card Balance",
      otherLiabilities: "Other Liabilities",
      totalAssets: "Total Assets",
      totalLiabilities: "Total Liabilities",
      netAssets: "Net Assets",
      zakatDue: "Zakat Due (2.5%)",
      print: "Print Calculator",
      priceSettings: "Gold & Silver Prices",
      goldPrice: "Gold Price (per gram)",
      silverPrice: "Silver Price (per gram)",
      nisabLabel: "Nisab Threshold",
      cashBankDesc: "Include all cash in hand and bank accounts",
      goldSilverDesc: "Enter the total market value of your gold and silver",
      investmentsDesc: "Include shares, stocks, and money lent to others",
      businessDesc: "Include business inventory and business bank balance",
      propertyDesc: "Value of properties held for investment (not your primary residence)",
      pensionDesc: "Include pension lump sum if you can access it",
      otherAssetsDesc: "Any other zakatable assets not listed above",
      liabilitiesDesc: "Deduct these from your total assets",
      note: "Note: Zakat is obligatory if your wealth exceeds the Nisab threshold and has been held for one lunar year.",
      disclaimer: "For detailed guidance, consult with a qualified Islamic scholar.",
      zakatResultTitle: "Your Zakat Obligation"
    },
    bangla: {
      title: "যাকাত ক্যালকুলেটর",
      subtitle: "আপনার যাকাতের পরিমাণ হিসাব করুন",
      cashBank: "নগদ অর্থ ও ব্যাংক",
      cashAtHome: "বাড়িতে নগদ অর্থ",
      cashInBank: "ব্যাংকে জমাকৃত অর্থ",
      goldSilver: "স্বর্ণ ও রৌপ্য",
      goldWeight: "স্বর্ণ (গ্রাম)",
      goldValue: "স্বর্ণের মূল্য",
      silverWeight: "রৌপ্য (গ্রাম)",
      silverValue: "রৌপ্যের মূল্য",
      investments: "বিনিয়োগ",
      sharesStocks: "শেয়ার/স্টক",
      moneyLent: "অন্যকে ধার দেওয়া অর্থ",
      business: "ব্যবসায়িক সম্পদ",
      stockInTrade: "ব্যবসায়িক পণ্য মজুদ",
      businessCash: "ব্যবসায়িক নগদ/ব্যাংক ব্যালেন্স",
      property: "সম্পত্তি",
      investmentProperty: "বিনিয়োগকৃত সম্পত্তির মূল্য",
      pension: "পেনশন",
      pensionCash: "পেনশন লাম্পসাম (যদি উত্তোলনযোগ্য হয়)",
      otherAssets: "অন্যান্য সম্পদ",
      otherAssetsLabel: "যাকাতযোগ্য অন্যান্য সম্পদ",
      liabilities: "দায় (বিয়োগ)",
      debts: "ঋণ (পরিশোধযোগ্য)",
      outstandingBills: "বকেয়া বিল",
      overdraft: "ওভারড্রাফট",
      creditCards: "ক্রেডিট কার্ড ব্যালেন্স",
      otherLiabilities: "অন্যান্য দায়",
      totalAssets: "মোট সম্পদ",
      totalLiabilities: "মোট দায়",
      netAssets: "নিট সম্পদ",
      zakatDue: "যাকাতের পরিমাণ (২.৫%)",
      print: "প্রিন্ট করুন",
      priceSettings: "স্বর্ণ ও রূপার মূল্য",
      goldPrice: "সোনার মূল্য (প্রতি গ্রাম)",
      silverPrice: "রূপার মূল্য (প্রতি গ্রাম)",
      nisabLabel: "নিসাব সীমা",
      cashBankDesc: "হাতে ও ব্যাংকে থাকা সকল নগদ অর্থ অন্তর্ভুক্ত করুন",
      goldSilverDesc: "আপনার স্বর্ণ ও রূপার বর্তমান বাজার মূল্য লিখুন",
      investmentsDesc: "শেয়ার, স্টক ও অন্যান্যকে ধার দেওয়া অর্থ অন্তর্ভুক্ত করুন",
      businessDesc: "ব্যবসায়িক পণ্য মজুদ ও ব্যাংক ব্যালেন্স অন্তর্ভুক্ত করুন",
      propertyDesc: "বিনিয়োগকৃত সম্পত্তির মূল্য (প্রধান বাসস্থান ছাড়া)",
      pensionDesc: "যদি উত্তোলনযোগ্য হয় তবে পেনশন লাম্পসাম অন্তর্ভুক্ত করুন",
      otherAssetsDesc: "অন্যান্য যাকাতযোগ্য সম্পদ যা উপরে তালিকাভুক্ত নয়",
      liabilitiesDesc: "আপনার মোট সম্পদ থেকে এগুলো বাদ দিন",
      note: "দ্রষ্টব্য: যদি আপনার সম্পদ নিসাব সীমা অতিক্রম করে এবং এক চন্দ্র বছর অতিক্রান্ত হয় তবেই যাকাত ফরজ।",
      disclaimer: "বিস্তারিত জানতে একজন যোগ্য ইসলামিক স্কলারের পরামর্শ নিন।",
      zakatResultTitle: "আপনার যাকাত বাধ্যবাধকতা"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleInputChange = (field: any, value:any) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setValues(prev => ({ ...prev, [field]: value }));
    }
  };

  const parseNumber = (value: any) => {
    return value === '' ? 0 : parseFloat(value) || 0;
  };

  const totalAssets = 
    parseNumber(values.cashAtHome) +
    parseNumber(values.cashInBank) +
    parseNumber(values.goldValue) +
    parseNumber(values.silverValue) +
    parseNumber(values.sharesStocks) +
    parseNumber(values.moneyLent) +
    parseNumber(values.stockInTrade) +
    parseNumber(values.businessCash) +
    parseNumber(values.investmentProperty) +
    parseNumber(values.pensionCash) +
    parseNumber(values.otherAssets);

  const totalLiabilities = 
    parseNumber(values.debts) +
    parseNumber(values.outstandingBills) +
    parseNumber(values.overdraft) +
    parseNumber(values.creditCards) +
    parseNumber(values.otherLiabilities);

  const GOLD_NISAB_GRAMS = 87.48;
  const SILVER_NISAB_GRAMS = 612;
  const goldNisabValue = parseFloat(goldPricePerGram) * GOLD_NISAB_GRAMS;
  const silverNisabValue = parseFloat(silverPricePerGram) * SILVER_NISAB_GRAMS;
  const nisab = Math.min(goldNisabValue, silverNisabValue);

  const netAssets = totalAssets - totalLiabilities;

  let zakatDue = 0

  if (!isNaN(nisab) && netAssets >= nisab) {
    zakatDue = netAssets * 0.025;
  }
  


  const handlePrint = () => {
    window.print();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 print:bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 print:mb-4">
          <div className="mt-4 flex justify-center gap-2 print:hidden">
            <Button
              onClick={() => setLanguage('english')}
              variant={language === 'english' ? 'default' : 'outline'}
              className={language === 'english' ? 'bg-emerald-600' : ''}
            >
              English
            </Button>
            <Button
              onClick={() => setLanguage('bangla')}
              variant={language === 'bangla' ? 'default' : 'outline'}
              className={language === 'bangla' ? 'bg-emerald-600' : ''}
            >
              বাংলা
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="shadow-lg print:shadow-none">
          <CardHeader className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 text-white print:bg-emerald-700 text-center">
            <CardTitle className="text-2xl font-bold">{t.title}</CardTitle>
            <CardDescription className="text-emerald-100 text-sm">{t.subtitle}</CardDescription>
            <div className="mt-3">
              <ZakatSummaryCard
              amount={isNaN(nisab) ? 0 : nisab}
              lastUpdated="20/01/2026"
              />
            </div>
          </CardHeader>
          
          <CardContent className="p-6 print:p-4">
            {/* Price Settings */}
            <Card className="mb-6 border-emerald-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-emerald-50">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <CardTitle className="text-sm font-semibold text-emerald-800">{t.priceSettings}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="goldPrice" className="text-sm font-medium">{t.goldPrice}</Label>
                    <Input
                      id="goldPrice"
                      type="text"
                      value={goldPricePerGram}
                      onChange={(e) => setGoldPricePerGram(e.target.value === '' ? '' : e.target.value.replace(/[^0-9.]/g, ''))}
                      placeholder="20120"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silverPrice" className="text-sm font-medium">{t.silverPrice}</Label>
                    <Input
                      id="silverPrice"
                      type="text"
                      value={silverPricePerGram}
                      onChange={(e) => setSilverPricePerGram(e.target.value === '' ? '' : e.target.value.replace(/[^0-9.]/g, ''))}
                      placeholder="850"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="p-3 bg-emerald-100 rounded-lg border border-emerald-200 text-center">
                      <p className="text-xs text-emerald-700 mb-1">{t.nisabLabel}:</p>
                      <p className="text-lg font-bold text-emerald-700">
                        ৳ {nisab && !isNaN(nisab) ? Math.round(nisab).toLocaleString(language === 'bangla' ? 'bn-BD' : 'en-US') : '0'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cash & Bank */}
            <Card className="mb-6 border-sky-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-sky-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-sky-600" />
                    <CardTitle className="text-sm font-semibold text-sky-800">{t.cashBank}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-xs text-sky-600 mt-1">{t.cashBankDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cashAtHome" className="text-sm font-medium">{t.cashAtHome}</Label>
                    <Input
                      id="cashAtHome"
                      type="text"
                      value={values.cashAtHome}
                      onChange={(e) => handleInputChange('cashAtHome', e.target.value)}
                      placeholder="e.g. 50000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashInBank" className="text-sm font-medium">{t.cashInBank}</Label>
                    <Input
                      id="cashInBank"
                      type="text"
                      value={values.cashInBank}
                      onChange={(e) => handleInputChange('cashInBank', e.target.value)}
                      placeholder="e.g. 200000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gold & Silver */}
            <Card className="mb-6 border-amber-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-amber-50 to-yellow-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-amber-600" />
                    <CardTitle className="text-sm font-semibold text-amber-800">{t.goldSilver}</CardTitle>
                  </div>
                  <Button asChild variant="outline" size="sm" className="border-amber-300 text-amber-700">
                    <Link href="/finups-islamic/tools/gold-silver-calculator" target='_blank'>
                      <Calculator className="w-3 h-3 mr-1" />
                      Calculator
                    </Link>
                  </Button>
                </div>
                <CardDescription className="text-xs text-amber-600 mt-1">{t.goldSilverDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="goldValue" className="text-sm font-medium">{t.goldValue}</Label>
                    <Input
                      id="goldValue"
                      type="text"
                      value={values.goldValue}
                      onChange={(e) => handleInputChange('goldValue', e.target.value)}
                      placeholder="e.g. 500000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silverValue" className="text-sm font-medium">{t.silverValue}</Label>
                    <Input
                      id="silverValue"
                      type="text"
                      value={values.silverValue}
                      onChange={(e) => handleInputChange('silverValue', e.target.value)}
                      placeholder="e.g. 30000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investments */}
            <Card className="mb-6 border-purple-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-purple-50 to-violet-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <CardTitle className="text-sm font-semibold text-purple-800">{t.investments}</CardTitle>
                </div>
                <CardDescription className="text-xs text-purple-600 mt-1">{t.investmentsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sharesStocks" className="text-sm font-medium">{t.sharesStocks}</Label>
                    <Input
                      id="sharesStocks"
                      type="text"
                      value={values.sharesStocks}
                      onChange={(e) => handleInputChange('sharesStocks', e.target.value)}
                      placeholder="e.g. 100000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moneyLent" className="text-sm font-medium">{t.moneyLent}</Label>
                    <Input
                      id="moneyLent"
                      type="text"
                      value={values.moneyLent}
                      onChange={(e) => handleInputChange('moneyLent', e.target.value)}
                      placeholder="e.g. 50000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Assets */}
            <Card className="mb-6 border-orange-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-orange-50 to-amber-50">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                  <CardTitle className="text-sm font-semibold text-orange-800">{t.business}</CardTitle>
                </div>
                <CardDescription className="text-xs text-orange-600 mt-1">{t.businessDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stockInTrade" className="text-sm font-medium">{t.stockInTrade}</Label>
                    <Input
                      id="stockInTrade"
                      type="text"
                      value={values.stockInTrade}
                      onChange={(e) => handleInputChange('stockInTrade', e.target.value)}
                      placeholder="e.g. 300000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessCash" className="text-sm font-medium">{t.businessCash}</Label>
                    <Input
                      id="businessCash"
                      type="text"
                      value={values.businessCash}
                      onChange={(e) => handleInputChange('businessCash', e.target.value)}
                      placeholder="e.g. 150000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property */}
            <Card className="mb-6 border-teal-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-teal-50 to-emerald-50">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-teal-600" />
                  <CardTitle className="text-sm font-semibold text-teal-800">{t.property}</CardTitle>
                </div>
                <CardDescription className="text-xs text-teal-600 mt-1">{t.propertyDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investmentProperty" className="text-sm font-medium">{t.investmentProperty}</Label>
                    <Input
                      id="investmentProperty"
                      type="text"
                      value={values.investmentProperty}
                      onChange={(e) => handleInputChange('investmentProperty', e.target.value)}
                      placeholder="e.g. 1000000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pension */}
            <Card className="mb-6 border-indigo-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-indigo-600" />
                  <CardTitle className="text-sm font-semibold text-indigo-800">{t.pension}</CardTitle>
                </div>
                <CardDescription className="text-xs text-indigo-600 mt-1">{t.pensionDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pensionCash" className="text-sm font-medium">{t.pensionCash}</Label>
                    <Input
                      id="pensionCash"
                      type="text"
                      value={values.pensionCash}
                      onChange={(e) => handleInputChange('pensionCash', e.target.value)}
                      placeholder="e.g. 500000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Assets */}
            <Card className="mb-6 border-stone-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-stone-50 to-slate-50">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-stone-600" />
                  <CardTitle className="text-sm font-semibold text-stone-800">{t.otherAssets}</CardTitle>
                </div>
                <CardDescription className="text-xs text-stone-600 mt-1">{t.otherAssetsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="otherAssets" className="text-sm font-medium">{t.otherAssetsLabel}</Label>
                    <Input
                      id="otherAssets"
                      type="text"
                      value={values.otherAssets}
                      onChange={(e) => handleInputChange('otherAssets', e.target.value)}
                      placeholder="e.g. 20000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-emerald-300 bg-gradient-to-r from-emerald-50 to-green-50 shadow-sm">
              <CardContent className="py-4 px-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-900 text-lg">{t.totalAssets}:</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-700">৳ {totalAssets.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Liabilities Section */}
            <Card className="mb-6 border-red-200 shadow-sm">
              <CardHeader className="py-3 px-4 bg-gradient-to-r from-red-50 to-rose-50">
                <div className="flex items-center gap-2">
                  <ArrowDownCircle className="w-4 h-4 text-red-600" />
                  <CardTitle className="text-sm font-semibold text-red-800">{t.liabilities}</CardTitle>
                </div>
                <CardDescription className="text-xs text-red-600 mt-1">{t.liabilitiesDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="debts" className="text-sm font-medium">{t.debts}</Label>
                    <Input
                      id="debts"
                      type="text"
                      value={values.debts}
                      onChange={(e) => handleInputChange('debts', e.target.value)}
                      placeholder="e.g. 200000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="outstandingBills" className="text-sm font-medium">{t.outstandingBills}</Label>
                    <Input
                      id="outstandingBills"
                      type="text"
                      value={values.outstandingBills}
                      onChange={(e) => handleInputChange('outstandingBills', e.target.value)}
                      placeholder="e.g. 15000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="overdraft" className="text-sm font-medium">{t.overdraft}</Label>
                    <Input
                      id="overdraft"
                      type="text"
                      value={values.overdraft}
                      onChange={(e) => handleInputChange('overdraft', e.target.value)}
                      placeholder="e.g. 50000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="creditCards" className="text-sm font-medium">{t.creditCards}</Label>
                    <Input
                      id="creditCards"
                      type="text"
                      value={values.creditCards}
                      onChange={(e) => handleInputChange('creditCards', e.target.value)}
                      placeholder="e.g. 25000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherLiabilities" className="text-sm font-medium">{t.otherLiabilities}</Label>
                    <Input
                      id="otherLiabilities"
                      type="text"
                      value={values.otherLiabilities}
                      onChange={(e) => handleInputChange('otherLiabilities', e.target.value)}
                      placeholder="e.g. 10000"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-red-300 bg-gradient-to-r from-red-50 to-rose-50 shadow-sm">
              <CardContent className="py-4 px-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900 text-lg">{t.totalLiabilities}:</span>
                  </div>
                  <span className="text-2xl font-bold text-red-700">৳ {totalLiabilities.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="mb-6 border-emerald-400 shadow-lg overflow-hidden">
              <CardHeader className="py-4 px-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  <CardTitle className="text-lg font-bold">{t.zakatResultTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Net Assets */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-blue-800">{t.netAssets}:</span>
                    <span className="text-xl font-bold text-blue-700">৳ {netAssets.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-blue-500">{t.totalAssets} - {t.totalLiabilities}</p>
                </div>

                {/* Zakat Result - Hero Display */}
                <div className={`p-6 rounded-xl text-center ${zakatDue > 0 ? 'bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-100 border-2 border-emerald-400' : 'bg-gradient-to-br from-gray-100 to-slate-100 border-2 border-gray-300'}`}>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{t.zakatDue}</p>
                  {zakatDue > 0 ? (
                    <div>
                      <p className="text-5xl font-bold text-emerald-700 mb-2">
                        ৳ {zakatDue.toFixed(2)}
                      </p>
                      <p className="text-xs text-emerald-500">
                        {language === 'english' ? 'Net assets exceed Nisab threshold' : 'নিট সম্পদ নিসাব সীমা অতিক্রম করেছে'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      {netAssets > 0 ? (
                        <p className="text-3xl font-bold text-gray-400 mb-2">
                          {language === 'english' ? 'BELOW NISAB' : 'নিসাবের নিচে'}
                        </p>
                      ) : (
                        <p className="text-3xl font-bold text-gray-400 mb-2">
                          {language === 'english' ? 'NO LIABILITIES' : 'কোন দায় নেই'}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {language === 'english' ? 'No zakat due at this time' : 'এই সময়ে যাকাত দিতে হবে না'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Note */}
                {netAssets > 0 && (
                  <Alert className="mt-4 bg-amber-50 border-amber-200">
                    <Info className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-xs text-amber-800">
                      <strong>{language === 'english' ? 'Note' : 'দ্রষ্টব্য'}:</strong> {t.note}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Actions */}
                <div className="mt-6 flex justify-center gap-3">
                  <Button 
                    onClick={handlePrint}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                  >
                    {t.print}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ZakatWarning/>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 print:mt-4 print:text-xs">
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculatorNew;