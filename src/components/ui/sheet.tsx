"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  children,
  side = "bottom",
  className,
}: {
  children: React.ReactNode;
  side?: "bottom" | "right";
  className?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={cn(
          "fixed z-50 bg-white focus:outline-none",
          side === "bottom" &&
            "bottom-0 left-0 right-0 rounded-t-xl border-t border-border max-h-[90vh] overflow-y-auto data-[state=open]:animate-slide-up",
          side === "right" &&
            "top-0 right-0 bottom-0 w-full max-w-md border-l border-border data-[state=open]:animate-slide-in-right",
          className
        )}
      >
        {side === "bottom" && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-border rounded-full" />
          </div>
        )}
        {children}
        <Dialog.Close className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors">
          <X size={18} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function SheetHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-4 pt-2 border-b border-border", className)}>{children}</div>;
}

export function SheetTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-base font-medium text-ink", className)}>{children}</h2>;
}

export function SheetBody({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function SheetFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-t border-border flex gap-3 justify-end", className)}>
      {children}
    </div>
  );
}
