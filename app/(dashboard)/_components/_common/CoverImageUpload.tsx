"use client";
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import Image from "next/image";

interface PropsType {
  value?: string;
  diabled?: boolean;
  onRemove?: () => void;
  onChange: (image: string) => void;
}

const CoverImageUpload: React.FC<PropsType> = ({
  value,
  onChange,
  onRemove,
}) => {
  const [base64, setBase64] = React.useState(value);

  const handleChange = useCallback(
    (image: string) => {
      onChange(image);
    },
    [onChange]
  );

  const handleRemove = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      setBase64("");
      onRemove?.();
    },
    [onChange]
  );
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles?.length === 0) return;
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="cover--uploader">
      <Dropzone
        accept={{
          "image/png": [".png"],
          "image/jpg": [".jpg"],
          "image/jpeg": [".jpeg"],
        }}
        onDrop={(acceptedFiles) => {
          handleDrop(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".png, .jpg, .jpeg"
              {...getInputProps()}
            />
            <div className="w-full h-44 relative">
              {base64 && (
                <div
                  className="
                w-full h-full overflow-hidden
                              "
                >
                  <Image
                    src={base64}
                    alt=""
                    fill
                    className="
                    w-full h-full  object-cover
                    object-center
                rounded-md

                    "
                  />
                </div>
              )}
              <div
                className="absolute inset-0 w-full h-full
                bg-gray-950/10 flex items-center justify-start
                rounded-md
              "
              >
                <div
                  className="w-full flex 
                               justify-center gap-3
                               items-center
                              "
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full shadow w-10
                    h-10 p-2 bg-background dark:bg-black/80
                    hover:bg-opacity-60
                                      "
                  >
                    <Camera size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full shadow w-10
                    h-10 p-2 bg-background dark:bg-black/80
                    hover:bg-opacity-60
                                      "
                    onClick={handleRemove}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default CoverImageUpload;
