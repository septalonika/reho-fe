"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetBody, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/ui.store";
import { loginSchema, type LoginInput } from "@/lib/schemas";

export function AuthGateSheet() {
  const { authSheetOpen, authSheetCallback, closeAuthSheet } = useUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    console.log("login", data);
    // TODO: wire Supabase auth
    closeAuthSheet();
    authSheetCallback?.();
  }

  return (
    <Sheet open={authSheetOpen} onOpenChange={(open) => !open && closeAuthSheet()}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Masuk untuk melanjutkan</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs text-ink-muted mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="email@gereja.id"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div>
              <label className="text-xs text-ink-muted mb-1 block">Sandi</label>
              <Input
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Masuk…" : "Masuk"}
            </Button>
          </form>
        </SheetBody>
        <SheetFooter className="justify-center border-0 pt-0">
          <p className="text-xs text-ink-muted">
            Belum punya akun?{" "}
            <a href="/login?tab=register" className="text-ink underline underline-offset-2">
              Daftar
            </a>
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
