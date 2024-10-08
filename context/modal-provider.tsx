"use client";
import BirthDayModal from "@/components/birthday-modal";
import ProModal from "@/components/pro-modal";
import React, { useEffect } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ProModal />
      <BirthDayModal />
    </>
  );
};

export default ModalProvider;
