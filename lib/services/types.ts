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

export interface GetShipmentRequest {
  shipmentId: string;
}

export interface GetShipmentResponse {
  id: string;
  postage_label: {
    id: string;
    label_url: string;
  } | null;
  rates: Array<{
    id: string;
    service: string;
    rate: string;
    carrier: string;
  }>;
}

export interface CreateShipmentResponse {
  id: string;
  postage_label: {
    id: string;
    label_url: string;
  } | null;
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

export interface BuyPostageRequest {
  shipmentId: string;
  rateId: string;
}

export interface BuyPostageResponse {
  id: string;
  postage_label: {
    id: string;
    label_url: string;
  } | null;
}

export interface GetLabelRequest {
  shipmentId: string;
}

export interface GetLabelResponse {
  labelUrl: string;
}
