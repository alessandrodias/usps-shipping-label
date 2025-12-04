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
    const params = new URLSearchParams({
      file_format: "ZPL",
    });

    const response = await fetch(
      `https://api.easypost.com/v2/shipments/${shipmentId}/label?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${EASYPOST_API_KEY}`,
        },
      }
    );

    // const responseData = await response.json();

    const mockLabelUrl = {
      labelUrl: "http://localhost:3000/shipping-label.webp",
    };

    return new Response(JSON.stringify(mockLabelUrl), {
      status: 200,
    });

    // if (response.ok) {
    //   const labelUrl = responseData.postage_label?.label_url;
    //   if (!labelUrl) {
    //     throw new Error("Failed to get label URL");
    //   }

    //   return new Response(JSON.stringify({ labelUrl }), {
    //     status: 200,
    //   });
    // }

    // return new Response(JSON.stringify({ error: "Failed to get label URL" }), {
    //   status: 400,
    // });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to get label URL" }), {
      status: 500,
    });
  }
}
