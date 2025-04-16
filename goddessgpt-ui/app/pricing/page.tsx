"use client";

import React, { useState } from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import LandingNavbar from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      description: "Basic access to our supportive AI companion",
      price: { monthly: "$0", yearly: "$0" },
      features: [
        "Basic conversation limit (30/day)",
        "General wellness support",
        "Basic emotional guidance",
        "Community access (limited)",
      ],
      cta: "Get Started",
      ctaLink: "/signup",
      popular: false,
    },
    {
      name: "Premium",
      description: "Enhanced support for your wellness journey",
      price: { monthly: "$9.99", yearly: "$99.99" },
      features: [
        "Unlimited conversations",
        "Personalized wellness plans",
        "Priority response time",
        "Full community access",
        "Custom meditation guides",
        "Journal and progress tracking",
      ],
      cta: "Start Free Trial",
      ctaLink: "/signup?plan=premium",
      popular: true,
    },
    {
      name: "Professional",
      description: "Complete wellness ecosystem for professionals",
      price: { monthly: "$19.99", yearly: "$199.99" },
      features: [
        "All Premium features",
        "Advanced health analytics",
        "Integration with health apps",
        "Monthly wellness consultation",
        "Personalized research updates",
        "Family accounts (up to 3)",
        "24/7 priority support",
      ],
      cta: "Contact Sales",
      ctaLink: "/contact",
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <BeamsBackground className="overflow-x-hidden min-h-screen">
        <LandingNavbar />
        
        <main className="flex-1 py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Choose the perfect plan for your wellness journey with no hidden fees
              </p>
              
              {/* Billing toggle */}
              <div className="mt-8 inline-flex items-center rounded-full border border-pink-900/20 p-1 bg-white/10 backdrop-blur-sm">
                <button
                  onClick={() => setBillingInterval("monthly")}
                  className={`${
                    billingInterval === "monthly"
                      ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                      : "text-gray-300 hover:text-white"
                  } rounded-full px-4 py-2 text-sm font-medium transition-colors`}
                >
                  Monthly billing
                </button>
                <button
                  onClick={() => setBillingInterval("yearly")}
                  className={`${
                    billingInterval === "yearly"
                      ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                      : "text-gray-300 hover:text-white"
                  } rounded-full px-4 py-2 text-sm font-medium transition-colors`}
                >
                  Yearly billing
                  <span className="ml-1 text-xs font-normal rounded-full bg-pink-500/20 px-2 py-0.5">
                    Save 15%
                  </span>
                </button>
              </div>
            </div>
            
            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`backdrop-blur-sm border ${
                    plan.popular
                      ? "border-pink-500 bg-white/15 relative overflow-hidden"
                      : "border-pink-900/20 bg-white/10"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white text-xs font-medium px-4 py-1 rounded-bl-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">
                        {billingInterval === "monthly" ? plan.price.monthly : plan.price.yearly}
                      </span>
                      <span className="text-gray-300 ml-2">
                        {billingInterval === "monthly" ? "/month" : "/year"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">
                            <CheckIcon className="h-3 w-3" />
                          </div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={plan.ctaLink}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* FAQ Section */}
            <div className="mt-20 text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto text-left">
                <div className="bg-white/10 backdrop-blur-sm border border-pink-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Can I change my plan later?
                  </h3>
                  <p className="text-gray-300">
                    Yes, you can upgrade, downgrade, or cancel your plan at any time through your account settings.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-pink-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Is there a free trial?
                  </h3>
                  <p className="text-gray-300">
                    Yes, Premium plans come with a 7-day free trial so you can experience all the benefits before committing.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-pink-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    How secure is my personal data?
                  </h3>
                  <p className="text-gray-300">
                    Your privacy is our priority. All data is encrypted and we never share your information with third parties.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-pink-900/20 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-300">
                    We accept all major credit cards, PayPal, and Apple Pay for your convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-6 sm:py-8 text-center text-gray-400 text-sm relative z-10 border-t border-pink-900/20">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} GoddessGPT. A safe space for women.</p>
          </div>
        </footer>
      </BeamsBackground>
    </div>
  );
} 