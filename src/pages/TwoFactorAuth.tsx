// src/pages/TwoFactorAuth.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";

interface TwoFactorAuthForm {
  code: string;
}

export default function TwoFactorAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TwoFactorAuthForm>();

  const onSubmit = (data: TwoFactorAuthForm) => {
    console.log("2FA code submitted:", data);
    toast({
      title: "Authentication successful",
      description: "You have been logged in successfully.",
    });
    navigate("/");
  };

  return (
    <AuthLayout>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-1 sm:mb-2">
        Two-factor authentication
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        Please enter the authentication code from your authenticator app.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-foreground font-medium">
            Authentication Code
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="code"
              type="text"
              placeholder="Enter your 6-digit code"
              maxLength={6}
              {...register("code", {
                required: "Authentication code is required",
                minLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Code must contain only numbers",
                },
              })}
              className={`pl-10 pr-4 py-2 sm:py-3 text-center text-base sm:text-lg tracking-widest ${
                errors.code ? "border-destructive" : ""
              }`}
            />
          </div>
          {errors.code && (
            <p className="text-sm text-destructive mt-1">
              {errors.code.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive a code or have an issue?{" "}
            <Link
              to="/forgot-password"
              className="text-primary hover:underline font-medium"
            >
              Contact support
            </Link>
          </p>
        </div>

        <Button type="submit" className="w-full py-2 sm:py-3 font-semibold">
          Verify Code
        </Button>
      </form>

      <div className="text-center pt-2 sm:pt-3 lg:pt-4">
        <Link
          to="/login"
          className="text-sm text-primary hover:underline flex items-center justify-center gap-2 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
}
