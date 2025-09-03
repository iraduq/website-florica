import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Pipelines } from "./components/Pipelines";
import { Goals } from "./components/Goals";
import { Calendar } from "./components/Calendar";
import { Activity } from "./components/Activity";
import KanbanBoard from "./components/KanbanBoard";
import { NotificationCenter } from "./components/notifications/NotificationCenter";
import Projects from "./components/projects/Projects";
import Teams from "./components/Teams";
import FileManagement from "./components/FileManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ChatWidget, ChatWidgetIcon } from "./components/ChatWidget";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import UserProfile from "./components/UserProfile";
import { ColorCustomization } from "./components/ColorCustomization";
import { WorkspaceSettings } from "./components/workspace/WorkspaceSettings";

// Placeholder components for a clean routing structure
const WikiPage = () => <div className="p-6">Wiki Page</div>;
const LogsPage = () => <div className="p-6">Logs</div>;
const InviteUsers = () => <div className="p-6">Invite Users</div>;
const SubscriptionPlans = () => <div className="p-6">Subscription Plans</div>;
const NotFound = () => <div className="p-6">404 - Not Found</div>;

// Noul component de layout care încapsulează structura principală a aplicației.
const MainLayout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const unreadMessages = 3;

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Containerul principal al aplicației. Acum are un fundal care se schimbă și o tranziție. */}
      <div className="min-h-screen flex w-full bg-background transition-colors duration-300">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          {/* Zona de conținut principală. Am eliminat clasa de fundal de aici pentru a o muta la părinte. */}
          <main className="flex-1 overflow-auto">{children}</main>
          {isChatOpen && (
            <ChatWidget isOpen={isChatOpen} onToggle={toggleChat} />
          )}
          {!isChatOpen && (
            <ChatWidgetIcon
              onToggle={toggleChat}
              unreadCount={unreadMessages}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Authentication Routes - no layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/2fa" element={<TwoFactorAuth />} />

            {/* Main Application Routes - with layout */}
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/boards" element={<KanbanBoard />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/pipelines" element={<Pipelines />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/wiki" element={<WikiPage />} />
                    <Route path="/logs" element={<LogsPage />} />
                    <Route path="/members" element={<Teams />} />
                    <Route path="/files" element={<FileManagement />} />
                    <Route path="/colors" element={<ColorCustomization />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route
                      path="/settings/:tabId"
                      element={<WorkspaceSettings />}
                    />
                    <Route path="/invite" element={<InviteUsers />} />
                    <Route
                      path="/subscription"
                      element={<SubscriptionPlans />}
                    />
                    <Route
                      path="/notifications"
                      element={<NotificationCenter />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
