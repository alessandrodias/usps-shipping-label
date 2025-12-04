"use server";

const EASYPOST_API_KEY = process.env.EASYPOST_API_KEY;

export async function POST(request: Request) {
  const { fromAddress, toAddress, packageData } = await request.json();

  if (!fromAddress || !toAddress || !packageData) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(`https://api.easypost.com/v2/shipments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EASYPOST_API_KEY}`,
      },
      body: JSON.stringify({
        mode: "test",
        shipment: {
          to_address: toAddress,
          from_address: fromAddress,
          parcel: {
            weight: packageData.weight,
            length: packageData.length,
            width: packageData.width,
            height: packageData.height,
          },
        },
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (responseData?.id) {
        return new Response(JSON.stringify({ id: responseData.id }), {
          status: 200,
        });
      }
    }

    return new Response(
      JSON.stringify({ error: "Failed to create shipment" }),
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create shipment" }),
      {
        status: 500,
      }
    );
  }
}
