import { Footer } from "@/components/footer";
import React from "react";
import { BorderContainer } from "@/components/layout/border-container";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3">
      <BorderContainer>
        <div className="flex flex-col min-h-screen max-w-4xl items-start mx-auto">
          <div className="flex-grow mt-20 md:mt-20 w-full">{children}</div>
          <Footer />
        </div>
      </BorderContainer>
    </div>
  );
};

export default Layout;
