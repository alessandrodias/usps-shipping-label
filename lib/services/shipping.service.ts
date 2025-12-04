"use client";

import { apiClient } from "./api-client";
import type {
  CreateShipmentRequest,
  CreateShipmentResponse,
  GetLabelRequest,
  GetLabelResponse,
  GetShipmentRequest,
  GetShipmentResponse,
  BuyPostageRequest,
  BuyPostageResponse,
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
   * Get a shipment
   */
  async getShipment(
    request: GetShipmentRequest
  ): Promise<ApiResponse<GetShipmentResponse>> {
    return apiClient.post<GetShipmentResponse>(
      "/api/easypost/shipments/get",
      request
    );
  }

  /**
   * Buy postage for a shipment
   */
  async buyPostage(
    request: BuyPostageRequest
  ): Promise<ApiResponse<BuyPostageResponse>> {
    return apiClient.post<BuyPostageResponse>(
      "/api/easypost/shipments/buy",
      request
    );
  }

  /**
   * Get a label for a shipment (requires postage to be purchased first)
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
