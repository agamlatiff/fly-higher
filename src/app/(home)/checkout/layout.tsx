"use client";

import React, { type FC, type ReactNode } from "react";
import QCProvider from "../available-flights/providers/QueryProvider";
import Script from "next/script";

interface LayoutProps {
  children: ReactNode;
}

const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "";
const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true";
const snapUrl = isProduction
  ? "https://app.midtrans.com/snap/snap.js"
  : "https://app.sandbox.midtrans.com/snap/snap.js";

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <QCProvider>{children}</QCProvider>
      <Script
        type="text/javascript"
        src={snapUrl}
        data-client-key={midtransClientKey}
      />
    </>
  );
};

export default Layout;
