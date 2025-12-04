"use server";

const EASYPOST_API_KEY = process.env.EASYPOST_API_KEY;

export async function POST(request: Request) {
  const { shipmentId } = await request.json();

  if (!shipmentId) {
    return new Response(JSON.stringify({ error: "Shipment ID is required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `https://api.easypost.com/v2/shipments/${shipmentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${EASYPOST_API_KEY}`,
        },
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      const { id, postage_label, rates } = responseData;

      return new Response(
        JSON.stringify({
          id,
          postage_label: postage_label || null,
          rates: rates || [],
        }),
        {
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: responseData.error?.message || "Failed to get shipment",
      }),
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Failed to get shipment",
      }),
      {
        status: 500,
      }
    );
  }
}
