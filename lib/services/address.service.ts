"use client";

import { apiClient } from "./api-client";
import type {
  VerifyAddressRequest,
  VerifyAddressResponse,
  ApiResponse,
} from "./types";

/**
 * Address service
 * Handles all address-related API operations
 */
class AddressService {
  /**
   * Verify an address
   */
  async verifyAddress(
    request: VerifyAddressRequest
  ): Promise<ApiResponse<VerifyAddressResponse>> {
    return apiClient.post<VerifyAddressResponse>(
      "/api/easypost/addresses/verify",
      request
    );
  }
}

// Export a singleton instance
export const addressService = new AddressService();
