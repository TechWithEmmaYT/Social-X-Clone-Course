import { PLAN_TYPE } from "@/constants/pricing-plans";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000; //1 day in milliseconds;

export async function checkUserSubscription() {
  try {
    const session = await auth();
    if (!session?.user?.id) return;

    const currentUserId = +session.user.id;
    const userSubscription = await prisma.subscription.findUnique({
      where: {
        userId: currentUserId,
      },
      select: {
        plan: true,
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });

    console.log(userSubscription);

    if (!userSubscription || !userSubscription.plan) {
      return PLAN_TYPE.FREE;
    }

    const isProPlanValid =
      userSubscription.plan === PLAN_TYPE.PRO &&
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS >
        Date.now();
    return isProPlanValid ? PLAN_TYPE.PRO : PLAN_TYPE.FREE;
  } catch (error) {
    return PLAN_TYPE.FREE;
  }
}
