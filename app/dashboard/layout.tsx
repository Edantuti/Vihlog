import React from "react";

import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ToastContainer } from "@/components/ToastContainer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-36 mt-20">{children}</main>
      <ToastContainer />
    </>
  );
}
