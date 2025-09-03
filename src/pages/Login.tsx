// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Apple, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/AuthLayout";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log("Login attempt:", data);
    toast({
      title: "Login successful",
      description: "Welcome back to your dashboard!",
    });
    navigate("/");
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login`,
      description: `${provider} authentication would be implemented here.`,
    });
  };

  return (
    <AuthLayout>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-1 sm:mb-2">
        Sign In to Your Workspace
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        Plan, track, and collaborate on your projects seamlessly.
      </p>

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

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
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

        <div className="flex justify-end text-sm">
          <Link
            to="/forgot-password"
            className="text-primary hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" className="w-full py-2 sm:py-3 font-semibold">
          Sign In
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
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
