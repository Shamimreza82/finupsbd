// app/support/page.tsx (for App Router)
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";


export default function SupportFrom() {

    const {user} = useUser()

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });


  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async request
    await new Promise((res) => setTimeout(res, 1500));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Contact Support</h1>

      {submitted ? (
        <div className="p-4 rounded-lg bg-green-100 text-green-800">
          Thank you! Your message has been submitted. We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" disabled placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="Issue subject" value={form.subject} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="Describe your issue" value={form.message} onChange={handleChange} rows={5} required />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}
