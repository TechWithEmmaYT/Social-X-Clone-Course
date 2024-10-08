export enum PLAN_TYPE {
  FREE = "FREE",
  PRO = "PRO",
}

export enum DURATION_TYPE {
  MONTHLY = "MONTHLY",
}

export const PRICING_CARDS = [
  {
    planType: PLAN_TYPE.FREE,
    duration: DURATION_TYPE.MONTHLY,
    typeName: "Free",
    price: "0",
    description: "Limited features available",
    highlightFeature: "",
    features: [
      "Add post",
      "Follow people",
      "Limited Media Upload",
      "Limited Replies",
    ],
  },
  {
    planType: PLAN_TYPE.PRO,
    duration: DURATION_TYPE.MONTHLY,
    typeName: "Premium",
    price: "10.99",
    description: "Billed monthly",
    highlightFeature: "Everything in Free, and",
    features: [
      "Verification Checkmark",
      "Boost Following",
      "Unlimited Media Upload",
      "Unlimited Replies",
    ],
  },
];

export const PRO_PLAN = PRICING_CARDS[1];
