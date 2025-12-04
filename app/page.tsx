"use client";

import { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useAddress, usePackage, useShipping } from "@/app/contexts";

import AddressForm from "@/components/address-form/address-form";
import PackageForm from "@/components/package-form/package-form";
import GenerateLabelForm from "@/components/generate-label-form/generate-label-form";

import Button from "@/components/button/button";
import Stepper from "@/components/stepper/stepper";

const STEPS = [
  {
    title: "Address Information",
    description: "Enter the address information for the sender and recipient.",
  },
  {
    title: "Package Details",
    description: "Enter the package details for the shipment.",
  },
  {
    title: "Download Label",
    description: "Download the shipping label",
  },
];

export default function Home() {
  const { fromAddress, toAddress, setFromAddress, setToAddress } = useAddress();
  const { packageData, setPackageData } = usePackage();
  const { shipmentId, setShipmentId } = useShipping();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepValidations, setStepValidations] = useState<{
    [key: number]: boolean;
  }>({
    1: false,
    2: false,
    3: false,
  });

  // Validate current step based on context data
  useEffect(() => {
    if (currentStep === 1) {
      const isValid = fromAddress !== null && toAddress !== null;
      setStepValidations((prev) => ({ ...prev, 1: isValid }));
    } else if (currentStep === 2) {
      const isValid =
        packageData.weight !== null &&
        packageData.length !== null &&
        packageData.width !== null &&
        packageData.height !== null;
      setStepValidations((prev) => ({ ...prev, 2: isValid }));
    }
  }, [currentStep, fromAddress, toAddress, packageData]);

  const handleStepChange = (step: number) => {
    if (step === currentStep) return;
    setCurrentStep(step);
  };

  const handleGenerateNewLabel = () => {
    setCurrentStep(1);
    setShipmentId(null);
    setFromAddress(null);
    setToAddress(null);
    setPackageData({
      weight: null,
      length: null,
      width: null,
      height: null,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 mx-auto min-h-screen">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="text-3xl font-bold">USPS Shipping Label</h1>
        <p className="text-base text-gray-400">
          Use the form below to generate a USPS shipping label for your
          packages.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-14 border-2 border-gray-600 rounded-2xl w-full overflow-hidden min-h-[500px]">
        <Stepper steps={STEPS} currentStep={currentStep} />

        <div className="flex flex-col items-center justify-center gap-10 w-full lg:flex-row lg:gap-10 lg:max-w-2/3 max-w-full flex-1">
          {currentStep === 1 && (
            <div className="flex flex-col items-center justify-center gap-8 w-full p-4">
              <p className="text-lg">{STEPS[currentStep - 1].description}</p>

              <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-10 w-full gap-14">
                <AddressForm type="from" />
                <AddressForm type="to" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col items-center justify-center gap-8 w-full p-4">
              <p className="text-lg">{STEPS[currentStep - 1].description}</p>
              <PackageForm />
            </div>
          )}

          {currentStep === 3 && <GenerateLabelForm />}
        </div>

        <div className="flex flex-row items-center justify-between lg:gap-10 gap-2 w-full bg-gray-500/30 p-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              onClick={() => handleStepChange(currentStep - 1)}
              disabled={currentStep === 1}
              className="w-fit! px-4"
            >
              <span className="flex items-center justify-start gap-2">
                <ArrowLeftIcon className="w-4 h-4" /> Back
              </span>
            </Button>
          ) : (
            <div className="w-[200px]" />
          )}

          {currentStep < STEPS.length ? (
            <Button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              disabled={
                currentStep === STEPS.length || !stepValidations[currentStep]
              }
              className="w-fit! px-4"
            >
              <span className="flex items-center justify-end gap-2">
                Continue <ArrowRightIcon className="w-4 h-4 ml-2" />
              </span>
            </Button>
          ) : shipmentId ? (
            <Button
              type="button"
              onClick={handleGenerateNewLabel}
              className="w-[200px]!"
            >
              Generate New Label
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
