"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loading from "@/public/loading.svg";
import { ReactNode, useEffect, useState } from "react";

function FormButton({
  children,
  variant,
  className,
  type,
}: {
  className?: string;
  children: ReactNode;
  type?:"submit"|"button";
  variant?:
    | "secondary"
    | "destructive"
    | "default"
    | "link"
    | "outline"
    | "ghost"
    | undefined
    | null;
}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending } variant={variant} className={className} type={type}>
      {pending  ? <Image src={Loading} alt="Loading" className="w-9 h-9 aspect-square" width={10} height={10} /> : children}
    </Button>
  );
}
FormButton.displayName = "FormButton";

export { FormButton };
