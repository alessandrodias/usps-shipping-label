"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface PackageFormData {
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
}

interface PackageContextType {
  packageData: PackageFormData;
  setPackageData: (data: PackageFormData) => void;
  updatePackageField: <K extends keyof PackageFormData>(
    field: K,
    value: PackageFormData[K]
  ) => void;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

const initialPackageData: PackageFormData = {
  weight: null,
  length: null,
  width: null,
  height: null,
};

export function PackageProvider({ children }: { children: ReactNode }) {
  const [packageData, setPackageData] =
    useState<PackageFormData>(initialPackageData);

  const updatePackageField = <K extends keyof PackageFormData>(
    field: K,
    value: PackageFormData[K]
  ) => {
    setPackageData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PackageContext.Provider
      value={{
        packageData,
        setPackageData,
        updatePackageField,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

export function usePackage() {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error("usePackage must be used within a PackageProvider");
  }
  return context;
}
