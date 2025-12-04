"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ShippingContextType {
  shipmentId: string | null;
  setShipmentId: (shipmentId: string | null) => void;
}

const ShippingContext = createContext<ShippingContextType | undefined>(
  undefined
);

export function ShippingProvider({ children }: { children: ReactNode }) {
  const [shipmentId, setShipmentId] = useState<string | null>(null);

  return (
    <ShippingContext.Provider
      value={{
        shipmentId,
        setShipmentId,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  const context = useContext(ShippingContext);
  if (context === undefined) {
    throw new Error("useShipping must be used within a ShippingProvider");
  }
  return context;
}
