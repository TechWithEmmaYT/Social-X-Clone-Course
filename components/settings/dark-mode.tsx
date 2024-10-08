"use client";
import React from "react";
import { useTheme } from "next-themes";
import Section from "../section-label";
import { cn } from "@/lib/utils";
import { SystemMode } from "../themes-placeholder/systemmode";
import { LightMode } from "../themes-placeholder/lightmode";
import { DarkMode } from "../themes-placeholder/darkmode";

const DarkModetoggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="w-full px-4 pt-5">
      <div>
        <Section label="Theme mode" message="Choose light or dark mode" />
      </div>
      <div className="mt-4 w-full">
        <div
          className="flex flex-col items-start
               gap-5 sm:flex-row
              "
        >
          {/* {SystemMode} */}

          <div className="w-full sm:w-1/3 lg:w-1/2 h-fit">
            <div
              role="button"
              className={cn(
                `cursor-pointer overflow-hidden rounded-2xl
            border-4 border-transparent
                      `,
                theme === "system" && "border-primary"
              )}
              onClick={() => setTheme("system")}
            >
              <SystemMode />
            </div>
            <p className="mt-2 text-center">System mode</p>
          </div>

          {/* {LightMode} */}
          <div className="w-full sm:w-1/3 lg:w-1/2 h-fit">
            <div
              role="button"
              className={cn(
                `cursor-pointer overflow-hidden rounded-2xl
            border-4 border-transparent
                      `,
                theme === "light" && "border-primary"
              )}
              onClick={() => setTheme("light")}
            >
              <LightMode />
            </div>
            <p className="mt-2 text-center">Light mode</p>
          </div>

          {/* {DarkMode} */}

          <div className="w-full sm:w-1/3 lg:w-1/2 h-fit">
            <div
              role="button"
              className={cn(
                `cursor-pointer overflow-hidden rounded-2xl
            border-4 border-transparent
                      `,
                theme === "dark" && "border-primary"
              )}
              onClick={() => setTheme("dark")}
            >
              <DarkMode />
            </div>
            <p className="mt-2 text-center">Dark mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModetoggle;
