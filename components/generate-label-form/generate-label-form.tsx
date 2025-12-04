"use client";

import { useState } from "react";
import { DownloadIcon } from "lucide-react";

import { useAddress, usePackage, useShipping } from "@/app/contexts";
import { shippingService } from "@/lib/services";

import Button from "@/components/button/button";

export default function GenerateLabelForm() {
  const { fromAddress, toAddress } = useAddress();
  const { packageData } = usePackage();
  const { shipmentId, setShipmentId } = useShipping();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateShipment = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await shippingService.createShipment({
        fromAddress: fromAddress!,
        toAddress: toAddress!,
        packageData: {
          weight: packageData.weight!,
          length: packageData.length!,
          width: packageData.width!,
          height: packageData.height!,
        },
      });

      if (response.data?.id) {
        setShipmentId(response.data.id);
      } else {
        setShipmentId(null);
        setError(response.error || "Failed to create shipment");
      }
    } catch (error) {
      setShipmentId(null);
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadLabel = async () => {
    if (isLoading || !shipmentId) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await shippingService.getLabel({ shipmentId });

      if (response.data?.labelUrl) {
        window.open(response.data.labelUrl, "_blank");
      } else {
        setShipmentId(null);
        setError(response.error || "Failed to download label");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setShipmentId(null);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-bold">
          {shipmentId ? "Your label is ready 🎉" : "Generate Label"}
        </h2>
        <p className="text-base">
          {shipmentId
            ? "Click the button below to download the shipping label"
            : "Click the button below to generate the shipping label"}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-fit text-center">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!shipmentId ? (
        <Button
          type="button"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleCreateShipment}
          className="w-[200px]! bg-blue-500! hover:bg-blue-600! text-lg"
        >
          {isLoading ? "Generating..." : "Generate Label"}
        </Button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            type="button"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleDownloadLabel}
            className="w-[250px]! bg-green-500! hover:bg-green-600! text-xl p-6"
          >
            <span className="flex items-center justify-center gap-2">
              <DownloadIcon className="w-6 h-6" />
              Download Label
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}
