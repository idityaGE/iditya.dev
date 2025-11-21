import React from "react";
import { BackButton } from "@/components/blog/back-button";
import { BorderContainer } from "@/components/layout/border-container";

const MDXLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-3">
      <BorderContainer>
        <div className="flex flex-col min-h-screen max-w-4xl items-start mx-auto">
          <div className="flex-grow mt-10 w-full">
            {children}
            <div className="border-t py-10 flex justify-center">
              <BackButton href="/blogs" label="SEE ALL BLOGS" />
            </div>
          </div>
        </div>
      </BorderContainer>
    </div>
  );
};

export default MDXLayout;
