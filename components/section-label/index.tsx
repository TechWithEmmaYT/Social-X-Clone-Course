import React from "react";

type SectionProps = {
  label: string;
  message?: string;
  children?: React.ReactNode;
};

const Section = ({ label, message, children }: SectionProps) => {
  return (
    <div className="w-full">
      <div>
        <h5 className="text-lg font-semibold">{label}</h5>
        {message && <p className="text-sm font-normal">{message}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Section;
