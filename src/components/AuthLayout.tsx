// src/components/AuthLayout.tsx
import { ReactNode } from "react";
import { GitBranch, Rocket, User } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-background">
      {/* Left Side: Dynamic Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-3 sm:p-4 lg:p-8 bg-card">
        <div className="max-w-sm sm:max-w-md w-full space-y-3 sm:space-y-4 lg:space-y-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center border border-border rounded-lg bg-muted shadow-sm">
                <GitBranch className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                DevOpsFlow
              </span>
            </div>
          </div>
          {children}
        </div>
      </div>

      {/* Right Side: Promotional Content (Common) */}
      <div className="hidden lg:flex w-full lg:w-1/2 p-6 sm:p-12 lg:p-16 flex-col justify-center text-primary-foreground relative overflow-hidden bg-gradient-to-t from-muted to-primary">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 z-0 bg-gradient-to-br from-primary-foreground/10 via-transparent to-primary-foreground/5"></div>
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            background: "url('/images/textura.png')",
            backgroundSize: "256px 256px",
            pointerEvents: "none",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 space-y-8 max-w-lg mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Empower Your Team. Deliver with Confidence.
          </h2>
          <div className="relative pl-12">
            <Rocket className="absolute left-0 top-0 h-8 w-8 text-primary-foreground/80" />
            <p className="text-lg italic text-primary-foreground/90">
              "Our team's productivity soared with this platform. Streamlined
              workflows and seamless collaboration are game-changers."
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full mr-4 border-2 border-primary-foreground/30 shadow-lg flex items-center justify-center bg-primary-foreground/10">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-lg">Alex Devlin</p>
              <p className="text-primary-foreground/80 text-sm">
                Lead Project Manager at Innovate Solutions
              </p>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-sm uppercase tracking-wider text-primary-foreground/80 mb-6 font-semibold">
              Trusted by Leading Innovators
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 opacity-90">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/microsoft.png"
                  alt="Microsoft"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">
                  Microsoft
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/asana.png"
                  alt="Asana"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">Asana</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/jira.png"
                  alt="Jira"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">Jira</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/slack.png"
                  alt="Slack"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">Slack</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/dropbox.png"
                  alt="Dropbox"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">Dropbox</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/atlassian.png"
                  alt="Atlassian"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">
                  Atlassian
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/github.png"
                  alt="GitHub"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">GitHub</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/gitlab.png"
                  alt="GitLab"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-xs sm:text-sm font-medium">GitLab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
