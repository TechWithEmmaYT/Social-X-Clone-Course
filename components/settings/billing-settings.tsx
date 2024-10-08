import React from "react";
import { PLAN_TYPE, PRICING_CARDS } from "@/constants/pricing-plans";
import { CheckCircle2 } from "lucide-react";
import Section from "../section-label";
import UpgradeCard from "./upgrade-card";
import Image from "next/image";
import { checkUserSubscription } from "@/app/actions/subcription";
import SubscriptionButton from "./subscription-button";

const BillingSettings = async () => {
  const plan = await checkUserSubscription();
  const planFeatures = PRICING_CARDS.find(
    (card) => card.planType.toUpperCase() === plan?.toUpperCase()
  )?.features;

  if (!planFeatures) return;
  return (
    <div
      className="w-full px-4
     pt-5
    "
    >
      <div>
        <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plan."
        />
      </div>
      <div
        className="flex justify-start lg:justify-center
      mt-4 gap-2
      "
      >
        {plan && plan === PLAN_TYPE.FREE ? (
          <UpgradeCard />
        ) : plan && plan === PLAN_TYPE.PRO ? (
          <div
            className="relative w-full *:
          max-w-[350px] h-[220px]
            "
          >
            <Image
              src="/images/creditcard.png"
              width={400}
              height={400}
              alt="Pro Plan"
              className="
                w-full h-full
                "
            />
            <div
              className="absolute top-0
               rounded-lg
               left-0 w-ful h-full
               flex items-center justify-center
               inset-0 bg-black/20
              "
            >
              <SubscriptionButton />
            </div>
          </div>
        ) : null}

        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
          <p className="text-sm font-semibold">{plan}</p>
          <div className="flex gap- flex-col mt-2">
            {planFeatures.map((feature) => (
              <div key={feature} className="flex gap-2">
                <CheckCircle2 className="text-muted-foreground" />
                <p className="text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
