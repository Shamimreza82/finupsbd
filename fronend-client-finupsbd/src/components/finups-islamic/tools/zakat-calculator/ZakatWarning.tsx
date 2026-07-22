"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ZakatWarning() {
  return (
    <Card className="border-destructive/40 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
        <CardTitle className="text-destructive text-sm font-semibold">
          সতর্কতাবাণী
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs leading-relaxed text-muted-foreground space-y-2">
        <p>
          যাকাত একটি ফরয ইবাদত। সুক্ষ ও যথাযথভাবে যাকাত হিসাব করা যাকাত প্রদানকারী
          প্রত্যেকের কর্তব্য। এই ওয়েবসাইটটি যাকাত হিসাব কার্যে সহায়তাকারী মাত্র।
          এটি চূড়ান্ত নির্ভূল হিসাবের নিশ্চয়তা প্রদানকারী নয়।
        </p>
        <p>
          চূড়ান্তভাবে সঠিক হিসাবের জন্য সঠিক তথ্য প্রদান করা আবশ্যক। ভুল তথ্যের
          কারণে যাকাতের হিসাব ভুল হলে তা ব্যবহারকারীর উপর বর্তাবে।
        </p>
        <p>
          পরামর্শ: প্রাথমিক হিসাবের পর কোনো অভিজ্ঞ মুফতি সাহেবের মাধ্যমে যাচাই
          করে নিন।
        </p>
        <p className="text-red-600 font-semibold"> এই ফরমের কোনো তথ্য সংরক্ষণ কিংবা পর্যবেক্ষণ করা হয় না।</p>
      </CardContent>
    </Card>
  );
}
