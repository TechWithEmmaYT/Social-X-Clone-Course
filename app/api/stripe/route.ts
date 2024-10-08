import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated", status: "error" },
        { status: 401 }
      );
    }

    const currentUserId = +session.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const userSubscription = await prisma.subscription.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Social X Pro",
              description: "Unlimited access to premium services",
            },
            unit_amount: 1099,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeCheckoutSession.url }));
  } catch (error) {
    console.log(error, "error");
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
