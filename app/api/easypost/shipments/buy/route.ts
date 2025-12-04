"use server";

const EASYPOST_API_KEY = process.env.EASYPOST_API_KEY;

export async function POST(request: Request) {
  const { shipmentId, rateId } = await request.json();

  if (!shipmentId || !rateId) {
    return new Response(
      JSON.stringify({ error: "Both Shipment ID and Rate ID are required" }),
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `https://api.easypost.com/v2/shipments/${shipmentId}/buy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${EASYPOST_API_KEY}`,
        },
        body: JSON.stringify({
          rate: {
            id: rateId,
          },
        }),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      const { id, postage_label } = responseData;

      return new Response(
        JSON.stringify({
          id,
          postage_label: postage_label || null,
        }),
        {
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({
        error: responseData.error?.message || "Failed to buy postage",
      }),
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to buy postage",
      }),
      {
        status: 500,
      }
    );
  }
}
