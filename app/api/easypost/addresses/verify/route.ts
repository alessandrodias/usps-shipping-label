"use server";

import { AddressFormData } from "@/app/contexts";

const EASYPOST_API_KEY = process.env.EASYPOST_API_KEY;

export async function POST(request: Request) {
  const { address }: { address: AddressFormData } = await request.json();

  if (!address) {
    return new Response(JSON.stringify({ error: "Address is required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(`https://api.easypost.com/v2/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EASYPOST_API_KEY}`,
      },
      body: JSON.stringify({
        street1: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: "US",
        verify: true,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (responseData?.verifications?.zip4?.success) {
        return new Response(JSON.stringify({ valid: true }), {
          status: 200,
        });
      }
    }

    return new Response(JSON.stringify({ valid: false }), {
      status: 400,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to verify address" }), {
      status: 500,
    });
  }
}
