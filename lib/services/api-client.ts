"use client";

import type { ApiResponse } from "./types";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Base request method
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
        },
      });

      let data: T | { error: string };
      try {
        data = await response.json();
      } catch {
        // If response is not JSON, create an error response
        data = {
          error: response.statusText || "Unknown error occurred",
        } as { error: string };
      }

      if (!response.ok) {
        return {
          error:
            (data as { error?: string })?.error ||
            `Request failed with status ${response.status}`,
          status: response.status,
        };
      }

      return {
        data: data as T,
        status: response.status,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        status: 500,
      };
    }
  }
}

// Export a singleton instance for internal API routes
export const apiClient = new ApiClient();
