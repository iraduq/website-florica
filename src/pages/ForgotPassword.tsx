// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = (data: ForgotPasswordForm) => {
    console.log("Password reset request:", data);
    setIsSubmitted(true);
    toast({
      title: "Reset link sent",
      description: "Check your email for password reset instructions.",
    });
  };

  return (
    <AuthLayout>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-1 sm:mb-2">
        Forgot password?
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        {isSubmitted
          ? "We've sent a password reset link to your email address."
          : "Enter your email address and we'll send you a link to reset your password."}
      </p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                 className={`pl-10 pr-4 py-2 sm:py-3 ${
                  errors.email ? "border-destructive" : ""
                 }`}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full py-2 sm:py-3 font-semibold">
            <Mail className="mr-2 h-4 w-4" />
            Send reset link
          </Button>
        </form>
      ) : (
        <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-success" />
          </div>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-primary hover:underline font-medium"
            >
              try again
            </button>
          </p>
        </div>
      )}

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
