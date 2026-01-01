"use client";

import React, { type FC, type ReactNode } from "react";
import QCProvider from "../available-flights/providers/QueryProvider";
import Script from "next/script";

interface LayoutProps {
  children: ReactNode;
}

const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <QCProvider>{children}</QCProvider>;
      <Script
        type="text/javascript"
        src="https://app.stg.midtrans.com/snap/snap.js"
        data-client-key={midtransClientKey}
      />
      ;
    </>
  );
};

export default Layout;
