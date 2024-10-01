"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loading from "@/public/loading.svg";
import { ReactNode, useEffect, useState } from "react";

function FormButton({
  children,
  variant,
  disabled,
  className,
  type,
}: {
  readonly className?: string;
  children: ReactNode;
  readonly disabled?: boolean;
  readonly type?: "submit" | "button";
  readonly variant?:
    | "secondary"
    | "destructive"
    | "default"
    | "link"
    | "outline"
    | "ghost"
    | null;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      variant={variant}
      className={className}
      type={type}
    >
      {pending ? (
        <Image
          src={Loading}
          alt="Loading"
          className="w-9 h-9 aspect-square"
          width={10}
          height={10}
        />
      ) : (
        children
      )}
    </Button>
  );
}
FormButton.displayName = "FormButton";

export { FormButton };
