"use client";

import { apiClient } from "./api-client";
import type {
  CreateShipmentRequest,
  CreateShipmentResponse,
  GetLabelRequest,
  GetLabelResponse,
  ApiResponse,
} from "./types";

/**
 * Shipping service
 * Handles all shipment-related API operations
 */
class ShippingService {
  /**
   * Create a new shipment
   */
  async createShipment(
    request: CreateShipmentRequest
  ): Promise<ApiResponse<CreateShipmentResponse>> {
    return apiClient.post<CreateShipmentResponse>(
      "/api/easypost/shipments/create",
      request
    );
  }

  /**
   * Get a label for a shipment
   */
  async getLabel(
    request: GetLabelRequest
  ): Promise<ApiResponse<GetLabelResponse>> {
    return apiClient.post<GetLabelResponse>(
      "/api/easypost/shipments/label",
      request
    );
  }
}

// Export a singleton instance
export const shippingService = new ShippingService();
