"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddress } from "@/app/contexts";
import { schema, defaultValues } from "./address-form.schema";

import { US_STATES } from "@/utils/us_states";
import Button from "@/components/button/button";
import ValidationMessage from "@/components/validation-message/validation-message";
import StatusTag from "@/components/status-tag/status-tag";

interface AddressFormProps {
  type: "from" | "to";
}

export default function AddressForm({ type }: AddressFormProps) {
  const { fromAddress, toAddress, setFromAddress, setToAddress } = useAddress();
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
    defaultValues:
      type === "from" && fromAddress !== null
        ? fromAddress
        : type === "to" && toAddress !== null
        ? toAddress
        : defaultValues,
  });

  const handleVerifyAddress = async (
    type: "from" | "to",
    data: z.infer<typeof schema>
  ) => {
    if (status === "validating") return;

    setStatus("validating");

    try {
      const response = await fetch(`/api/easypost/addresses/verify`, {
        method: "POST",
        body: JSON.stringify({ address: data }),
      });

      if (response.ok) {
        const { valid } = await response.json();

        if (valid === true) {
          if (type === "from") {
            setFromAddress(data);
          } else {
            setToAddress(data);
          }

          setStatus("valid");
          return;
        }
      }

      setStatus("invalid");
    } catch (error) {
      setStatus("invalid");
      console.error(error);
    }
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    handleVerifyAddress(type, data);
  };

  const handleReset = () => {
    if (type === "from") {
      setFromAddress(null);
    } else {
      setToAddress(null);
    }

    reset(defaultValues);
    setStatus(null);
  };

  // Sync form with initial values when they change
  useEffect(() => {
    const address = type === "from" ? fromAddress : toAddress;

    if (address) {
      reset(address);
      setStatus("valid");
    } else {
      reset(defaultValues);
      setStatus(null);
    }
  }, [type, fromAddress, toAddress, reset]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full lg:max-w-1/2">
      <div className="flex items-center justify-between gap-2 w-full">
        <p className="text-lg font-bold">
          {type === "from" ? "Sender Address" : "Recipient Address"}
        </p>

        <StatusTag status={status} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-center gap-4 w-full"
      >
        <input
          {...register("street")}
          type="text"
          placeholder="Street"
          className="w-full p-2 rounded-md border border-gray-600"
        />
        {errors.street && <ValidationMessage message={errors.street.message} />}

        <input
          {...register("city")}
          type="text"
          placeholder="City"
          className="w-full p-2 rounded-md border border-gray-600"
        />
        {errors.city && <ValidationMessage message={errors.city.message} />}

        <select
          {...register("state")}
          className="w-full p-2 rounded-md border border-gray-600"
        >
          <option value="" disabled>
            Select State
          </option>

          {US_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
        {errors.state && <ValidationMessage message={errors.state.message} />}

        <div className="flex items-center justify-between gap-4 w-full lg:flex-row flex-col">
          <div className="flex flex-col items-start gap-2 w-full">
            <input
              {...register("zip")}
              type="text"
              placeholder="Zip"
              className="w-full lg:w-[140px] p-2 rounded-md border border-gray-600"
              maxLength={5}
            />
            {errors.zip && <ValidationMessage message={errors.zip.message} />}
          </div>

          {status === "valid" ? (
            <Button
              type="button"
              onClick={handleReset}
              className="w-full lg:w-[240px]! bg-white text-black! hover:bg-red-300"
            >
              <span className="flex items-center justify-center gap-2">
                <XIcon className="w-4 h-4" />
                Clear Address
              </span>
            </Button>
          ) : (
            <div className="flex items-center justify-end gap-4 w-full lg:flex-row flex-col">
              <Button
                type="submit"
                isLoading={status === "validating"}
                disabled={isSubmitting || !isValid}
                className="w-full lg:w-[150px]!"
              >
                {status === "validating" ? "Validating..." : "Validate Address"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
