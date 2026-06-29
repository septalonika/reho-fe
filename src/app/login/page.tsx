"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrosshairSimple } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/schemas";
import { cn } from "@/lib/utils";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    await new Promise((r) => setTimeout(r, 600));
    console.log("login", data);
    // TODO: wire Supabase
  }

  return (
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
  );
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    await new Promise((r) => setTimeout(r, 600));
    console.log("register", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Nama Lengkap</label>
        <Input placeholder="Maria Lestari" error={errors.name?.message} {...register("name")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Email</label>
        <Input type="email" placeholder="email@gereja.id" error={errors.email?.message} {...register("email")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Sandi</label>
        <Input type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
      </div>
      <div>
        <label className="text-xs text-ink-muted mb-1 block">Konfirmasi Sandi</label>
        <Input type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Mendaftar…" : "Daftar"}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-canvas px-5 relative overflow-hidden">
      {/* Ambient background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-surface/60 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <CrosshairSimple size={20} weight="bold" className="text-ink" />
          <span className="text-sm font-semibold text-ink tracking-tight">GKII Rehobot</span>
        </div>

        {/* Double-bezel form card */}
        <div className="p-[5px] rounded-[24px] bg-[rgba(26,23,20,0.04)] ring-1 ring-[rgba(26,23,20,0.06)]">
          <div className="rounded-[calc(24px-5px)] bg-canvas shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] p-8">
            <div className="mb-7">
              <h1 className="font-serif text-3xl text-ink tracking-tight mb-1.5">
                {tab === "login" ? "Selamat datang" : "Buat akun"}
              </h1>
              <p className="text-sm text-ink-muted">
                {tab === "login"
                  ? "Masuk ke portal jemaat GKII Rehobot."
                  : "Daftar untuk mengakses fitur jemaat."}
              </p>
            </div>

            <div className="flex border-b border-border mb-6">
              {(["login", "register"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "flex-1 pb-2.5 text-sm transition-all duration-300 border-b-2 -mb-px",
                    tab === t ? "border-ink text-ink font-medium" : "border-transparent text-ink-muted hover:text-ink"
                  )}
                >
                  {t === "login" ? "Masuk" : "Daftar"}
                </button>
              ))}
            </div>

            {tab === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        <p className="text-center text-[10px] text-ink-muted mt-6">
          GKII Rehobot · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
