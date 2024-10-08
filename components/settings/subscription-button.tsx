"use client";
import React from "react";
import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../spinner";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { BASE_URL } from "@/lib/base-url";

const SubscriptionButton = () => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/stripe`);
      console.log(response, "response:");
      if (response.data.url && typeof window !== "undefined") {
        window.location.href = response.data.url;
      } else {
        toast({
          title: "Error",
          description: "Stripe session URL not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `
        An error occurred while processing
        your subscription. Please try again.
        `,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      className="shadow gap-1"
      onClick={handleClick}
    >
      <>
        <Lock size="17px" />
        Manage Subscription
      </>
      {loading && <Spinner size="default" />}
    </Button>
  );
};

export default SubscriptionButton;
