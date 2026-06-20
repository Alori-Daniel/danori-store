import { NextResponse } from "next/server";

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    access_code: string;
    authorization_url: string;
    reference: string;
  };
}

export async function POST(request: Request) {
  try {
    console.log("Payment API Request Received");
    const { email, amount } = await request.json();
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer sk_test_340f30df769598b07cd35784839df9add1cb0908`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url: "http://localhost:3000/verify-payment",
        }),
      },
    );
    if (!response.ok) {
      console.log("Failed response from Paystack:", response.statusText);
      return NextResponse.json(
        { error: "Failed to initialize Paystack transaction" },
        { status: response.status },
      );
    }

    const result: PaystackResponse = await response.json();
    console.log("Paystack init", result);

    return NextResponse.json(result);
  } catch (error) {
    console.log("Payment API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  } finally {
    console.log("Payment API processed");
  }
}
