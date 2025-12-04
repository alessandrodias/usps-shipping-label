"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckIcon, XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePackage } from "@/app/contexts";
import { schema, defaultValues } from "./package-form.schema";

import Button from "@/components/button/button";
import ValidationMessage from "@/components/validation-message/validation-message";
import StatusTag from "@/components/status-tag/status-tag";

const isValidPackageData = ({
  weight,
  length,
  width,
  height,
}: {
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
}) => {
  return (
    weight !== null &&
    Number(weight) > 0 &&
    length !== null &&
    Number(length) > 0 &&
    width !== null &&
    Number(width) > 0 &&
    height !== null &&
    Number(height) > 0
  );
};

export default function PackageForm() {
  const { packageData, setPackageData } = usePackage();
  const [status, setStatus] = useState<
    "validating" | "valid" | "invalid" | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: isValidPackageData(packageData)
      ? {
          weight: packageData.weight?.toString() || "",
          length: packageData.length?.toString() || "",
          width: packageData.width?.toString() || "",
          height: packageData.height?.toString() || "",
        }
      : defaultValues,
  });

  const handleVerifyPackage = async (data: z.infer<typeof schema>) => {
    if (status === "validating") return;

    setStatus("validating");

    try {
      if (
        isValidPackageData({
          weight: Number(data.weight),
          length: Number(data.length),
          width: Number(data.width),
          height: Number(data.height),
        })
      ) {
        setStatus("valid");
        setPackageData({
          weight: Number(data.weight),
          length: Number(data.length),
          width: Number(data.width),
          height: Number(data.height),
        });
        return;
      }

      setStatus("invalid");
    } catch (error) {
      setStatus("invalid");
      console.error(error);
    }
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    handleVerifyPackage(data);
  };

  const handleReset = () => {
    reset(defaultValues);
    setPackageData({
      weight: null,
      length: null,
      width: null,
      height: null,
    });
    setStatus(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full lg:max-w-2/3">
      <div className="flex items-center justify-between gap-2 w-full">
        <p className="text-lg font-bold">Package Details</p>
        <StatusTag status={status} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-10 w-full">
          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <input
              {...register("weight")}
              type="text"
              placeholder="Weight"
              className="w-full p-2 rounded-md border border-gray-600"
            />
            <span className="text-sm text-gray-500">
              The weight of the package in pounds. Example: 10
            </span>

            {errors.weight && (
              <ValidationMessage message={errors.weight.message} />
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <input
              {...register("length")}
              type="text"
              placeholder="Length"
              className="w-full p-2 rounded-md border border-gray-600"
            />
            <span className="text-sm text-gray-500">
              The length of the package in inches. Example: 10
            </span>

            {errors.length && (
              <ValidationMessage message={errors.length.message} />
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <input
              {...register("width")}
              type="text"
              placeholder="Width"
              className="w-full p-2 rounded-md border border-gray-600"
            />
            <span className="text-sm text-gray-500">
              The width of the package in inches. Example: 10
            </span>
            {errors.width && (
              <ValidationMessage message={errors.width.message} />
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-1 w-full">
            <input
              {...register("height")}
              type="text"
              placeholder="Height"
              className="w-full p-2 rounded-md border border-gray-600"
            />

            <span className="text-sm text-gray-500">
              The height of the package in inches. Example: 10
            </span>

            {errors.height && (
              <ValidationMessage message={errors.height.message} />
            )}
          </div>
        </div>

        {status === "valid" ? (
          <Button
            type="button"
            onClick={handleReset}
            className="w-full lg:w-[120px]! bg-white text-black! hover:bg-red-300"
          >
            <span className="flex items-center justify-center gap-2">
              <XIcon className="w-4 h-4" />
              Reset
            </span>
          </Button>
        ) : (
          <Button
            type="submit"
            isLoading={status === "validating"}
            disabled={isSubmitting || !isValid}
            className="w-full lg:w-[150px]! mx-auto"
          >
            {status === "validating" ? "Validating..." : "Confirm"}
          </Button>
        )}
      </form>
    </div>
  );
}
