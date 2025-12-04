"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface AddressFormData {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressContextType {
  fromAddress: AddressFormData | null;
  toAddress: AddressFormData | null;
  setFromAddress: (address: AddressFormData | null) => void;
  setToAddress: (address: AddressFormData | null) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [fromAddress, setFromAddress] = useState<AddressFormData | null>(null);
  const [toAddress, setToAddress] = useState<AddressFormData | null>(null);

  return (
    <AddressContext.Provider
      value={{
        fromAddress,
        toAddress,
        setFromAddress,
        setToAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
}
