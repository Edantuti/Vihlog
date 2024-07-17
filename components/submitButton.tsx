"use client";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, className }: { children?: string | ReactNode, className?:string }) {
  const { pending } = useFormStatus();
  return <Button className={className} disabled={pending}>{children ? children : "Submit"}</Button>;
}
