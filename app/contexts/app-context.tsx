"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { AddressFormData } from "./address-context";
import type { PackageFormData } from "./package-context";

interface AppContextType {
  // Address state
  fromAddress: AddressFormData | null;
  toAddress: AddressFormData | null;
  setFromAddress: (address: AddressFormData | null) => void;
  setToAddress: (address: AddressFormData | null) => void;

  // Package state
  packageData: PackageFormData;
  setPackageData: (data: PackageFormData) => void;
  updatePackageField: <K extends keyof PackageFormData>(
    field: K,
    value: PackageFormData[K]
  ) => void;

  // Shipping state
  shipmentId: string | null;
  setShipmentId: (shipmentId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialPackageData: PackageFormData = {
  weight: null,
  length: null,
  width: null,
  height: null,
};

export function AppProvider({ children }: { children: ReactNode }) {
  // Address state
  const [fromAddress, setFromAddress] = useState<AddressFormData | null>(null);
  const [toAddress, setToAddress] = useState<AddressFormData | null>(null);

  // Package state
  const [packageData, setPackageData] =
    useState<PackageFormData>(initialPackageData);

  // Shipping state
  const [shipmentId, setShipmentId] = useState<string | null>(null);

  // Package methods
  const updatePackageField = <K extends keyof PackageFormData>(
    field: K,
    value: PackageFormData[K]
  ) => {
    setPackageData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AppContext.Provider
      value={{
        // Address
        fromAddress,
        toAddress,
        setFromAddress,
        setToAddress,
        // Package
        packageData,
        setPackageData,
        updatePackageField,
        // Shipping
        shipmentId,
        setShipmentId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Convenience hooks for specific contexts
export function useAddress() {
  const { fromAddress, toAddress, setFromAddress, setToAddress } = useApp();

  return {
    fromAddress,
    toAddress,
    setFromAddress,
    setToAddress,
  };
}

export function usePackage() {
  const { packageData, setPackageData, updatePackageField } = useApp();
  return {
    packageData,
    setPackageData,
    updatePackageField,
  };
}

export function useShipping() {
  const { shipmentId, setShipmentId } = useApp();
  return {
    shipmentId,
    setShipmentId,
  };
}
