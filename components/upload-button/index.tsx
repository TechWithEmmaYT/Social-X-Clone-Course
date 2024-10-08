import React, { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PropsType {
  accept?: Record<string, string[]>;
  disabled?: boolean;
  onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<PropsType> = ({
  accept = {
    "image/png": [".png"],
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
  },
  onFileSelect,
  disabled,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const acceptedExtensions = Object.values(accept)
      .flat()
      .map((ext) => ext.replace(".", ""));
    if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
      toast({
        title: "Error",
        description: "File type is not supported!",
        variant: "destructive",
      });
      return;
    }
    onFileSelect(file);
  };
  return (
    <label
      className="relative 
    inline-block cursor-pointer"
    >
      <input
        type="file"
        accept={Object.keys(accept).join(", ")}
        className="absolute inset-0
         w-full h-full appearance-none
          opacity-0 !cursor-pointer"
        style={{ cursor: "pointer !important" }}
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        className="!text-primary
               !p-0 gap-1
         !bg-transparent"
      >
        <ImageIcon color="rgb(29,155,240)" size="16px" className="shrink-0" />
        <span className="font-semibold text-sm">Upload photo</span>
      </Button>
    </label>
  );
};

export default UploadButton;
