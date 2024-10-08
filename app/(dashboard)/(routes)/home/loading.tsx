import React from "react";
import { Spinner } from "@/components/spinner";

const Loading = () => {
  return (
    <div className="h-screen w-full bg-baground">
      <div className="flex flex-col h-screen items-center w-full justify-center">
        <Spinner size="icon" />
      </div>
    </div>
  );
};

export default Loading;
