// Service layer types

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface CreateShipmentRequest {
  fromAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  toAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  packageData: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
}

export interface CreateShipmentResponse {
  id: string;
}

export interface VerifyAddressRequest {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface VerifyAddressResponse {
  valid: boolean;
}

export interface GetLabelRequest {
  shipmentId: string;
}

export interface GetLabelResponse {
  labelUrl: string;
}
