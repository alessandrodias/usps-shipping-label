// Service layer exports
export { shippingService } from "./shipping.service";
export { addressService } from "./address.service";
export { apiClient } from "./api-client";

export type {
  ApiResponse,
  CreateShipmentRequest,
  CreateShipmentResponse,
  VerifyAddressRequest,
  VerifyAddressResponse,
  GetLabelRequest,
  GetLabelResponse,
} from "./types";
