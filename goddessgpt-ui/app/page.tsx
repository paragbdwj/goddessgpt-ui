import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">🤖 Welcome to GodessGPT</h1>
      
      <Card className="max-w-md mb-6">
        <CardHeader>
          <CardTitle>shadcn/ui Components</CardTitle>
          <CardDescription>
            A beautiful, accessible component library built with Radix UI and Tailwind CSS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a simple example using shadcn/ui components. The boilerplate has been removed.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 