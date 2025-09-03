// src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Apple, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  const onSubmit = (data: RegisterForm) => {
    console.log("Register attempt:", data);
    toast({
      title: "Account created successfully",
      description: "Welcome to your new workspace!",
    });
    navigate("/");
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} signup`,
      description: `${provider} authentication would be implemented here.`,
    });
  };

  return (
    <AuthLayout>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-1 sm:mb-2">
        Create Your Workspace Account
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        Start managing your projects today.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-foreground font-medium">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName", {
                required: "First name is required",
              })}
              className={`py-2 sm:py-3 ${errors.firstName ? "border-destructive" : ""}`}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground font-medium">
              Last name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName", {
                required: "Last name is required",
              })}
              className={`py-2 sm:py-3 ${errors.lastName ? "border-destructive" : ""}`}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
               className={`pl-10 pr-10 py-2 sm:py-3 ${
                errors.password ? "border-destructive" : ""
               }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-foreground font-medium"
          >
            Confirm password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
               className={`pl-10 pr-10 py-2 sm:py-3 ${
                errors.confirmPassword ? "border-destructive" : ""
               }`}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            {...register("agreeToTerms", {
              required: "You must agree to the terms and conditions",
            })}
          />
          <Label
            htmlFor="agreeToTerms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-destructive mt-1">
            {errors.agreeToTerms.message}
          </p>
        )}

        <Button type="submit" className="w-full py-2 sm:py-3 font-semibold">
          Create Account
        </Button>
      </form>

      <div className="relative my-3 sm:my-4 lg:my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("Google")}
          className="w-full flex items-center justify-center gap-2 py-2 sm:py-3"
        >
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google"
            className="h-4 w-4"
          />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("Apple")}
          className="w-full flex items-center justify-center gap-2 py-2 sm:py-3"
        >
          <Apple className="h-4 w-4" />
          Continue with Apple
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground mt-3 sm:mt-4 lg:mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
