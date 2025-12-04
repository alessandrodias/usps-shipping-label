"use client";

import { CheckIcon } from "lucide-react";

interface StepperProps {
  steps: {
    title: string;
    description: string;
  }[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full bg-gray-500/30 px-4 py-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 w-full max-w-2/3 mx-auto">
        {steps.map((step, index: number) => (
          <div
            key={step.title}
            className={`flex flex-col items-center justify-center gap-2 ${
              index + 1 === currentStep ? "opacity-100" : "opacity-60"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index + 1 <= currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {currentStep > index + 1 ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <span className="text-white">{index + 1}</span>
              )}
            </div>

            <h2 className="text-lg font-bold">{step.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
