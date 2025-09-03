import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Bell,
  Mail,
  Smartphone,
  AlertTriangle,
  Trash2,
  Key,
  UserX,
  Download,
  Upload,
  Settings,
  Globe,
  Moon,
  Sun,
  Monitor,
  Users,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  LogOut,
  Zap,
} from "lucide-react";

export default function ProfileSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [theme, setTheme] = useState("light");

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    suspiciousActivityAlerts: true,
    sessionTimeout: "4",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskAssignments: true,
    projectUpdates: true,
    teamMentions: true,
    dailyDigest: false,
    weeklyReport: true,
    marketingEmails: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "team",
    activityVisible: true,
    statusVisible: true,
    contactInfoVisible: false,
  });

  const handleSecurityToggle = (setting) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleNotificationToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log("Password change requested");
  };

  const handleTwoFactorSetup = () => {
    console.log("Setting up 2FA");
  };

  const handleAccountDeletion = () => {
    if (isDeleting) {
      console.log("Account deletion confirmed");
    } else {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 10000);
    }
  };

  const handleDataExport = () => {
    console.log("Exporting user data");
  };

  const handleLogoutAllSessions = () => {
    console.log("Logging out all sessions");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
            <Settings className="h-6 w-6 mr-3 text-purple-600" />
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account security, notifications, and privacy
            preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-600" />
                Security & Authentication
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-10 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-10 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="New password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="pl-10 pr-10 h-10 focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Confirm password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Update Password
                  </Button>
                </form>
              </div>

              {/* Two-Factor Authentication */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Shield
                        className={`h-5 w-5 mr-2 ${
                          securitySettings.twoFactorEnabled
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <h3 className="font-medium text-gray-900">
                        Two-Factor Authentication
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {securitySettings.twoFactorEnabled
                        ? "2FA is enabled. Your account is protected with an additional security layer."
                        : "Add an extra layer of security to your account."}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={() =>
                        handleSecurityToggle("twoFactorEnabled")
                      }
                    />
                    {securitySettings.twoFactorEnabled && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTwoFactorSetup}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        <Key className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Security Alerts */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Security Alerts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Login notifications
                      </span>
                    </div>
                    <Switch
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={() =>
                        handleSecurityToggle("loginNotifications")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Suspicious activity alerts
                      </span>
                    </div>
                    <Switch
                      checked={securitySettings.suspiciousActivityAlerts}
                      onCheckedChange={() =>
                        handleSecurityToggle("suspiciousActivityAlerts")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Session Management */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Active Sessions
                    </h3>
                    <p className="text-sm text-gray-600">
                      Manage your active login sessions
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogoutAllSessions}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout All Sessions
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-purple-600" />
                Notifications
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Email & Push Notifications */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Delivery Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Email notifications
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() =>
                        handleNotificationToggle("emailNotifications")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Push notifications
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={() =>
                        handleNotificationToggle("pushNotifications")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Team Notifications */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Team & Project Updates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Task assignments
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.taskAssignments}
                      onCheckedChange={() =>
                        handleNotificationToggle("taskAssignments")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Project updates
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.projectUpdates}
                      onCheckedChange={() =>
                        handleNotificationToggle("projectUpdates")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Team mentions
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.teamMentions}
                      onCheckedChange={() =>
                        handleNotificationToggle("teamMentions")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Digest Notifications */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Digest & Reports
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Daily digest
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={() =>
                        handleNotificationToggle("dailyDigest")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Weekly report
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReport}
                      onCheckedChange={() =>
                        handleNotificationToggle("weeklyReport")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Marketing emails
                      </span>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() =>
                        handleNotificationToggle("marketingEmails")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Privacy & Visibility
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Profile Visibility */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  Profile Visibility
                </h3>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">
                    Who can see your profile?
                  </Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={privacySettings.profileVisibility}
                    onChange={(e) =>
                      setPrivacySettings((prev) => ({
                        ...prev,
                        profileVisibility: e.target.value,
                      }))
                    }
                  >
                    <option value="public">Everyone (Public)</option>
                    <option value="team">Team Members Only</option>
                    <option value="private">Private (Only Me)</option>
                  </select>
                </div>
              </div>

              {/* Activity Settings */}
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Activity & Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Show activity status
                      </span>
                    </div>
                    <Switch
                      checked={privacySettings.activityVisible}
                      onCheckedChange={() =>
                        handlePrivacyToggle("activityVisible")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Show online status
                      </span>
                    </div>
                    <Switch
                      checked={privacySettings.statusVisible}
                      onCheckedChange={() =>
                        handlePrivacyToggle("statusVisible")
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">
                        Show contact information
                      </span>
                    </div>
                    <Switch
                      checked={privacySettings.contactInfoVisible}
                      onCheckedChange={() =>
                        handlePrivacyToggle("contactInfoVisible")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-purple-600" />
                Preferences
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Theme Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Theme</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === "light"
                        ? "bg-purple-50 border-purple-200 text-purple-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span className="text-sm">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === "dark"
                        ? "bg-purple-50 border-purple-200 text-purple-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span className="text-sm">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      theme === "system"
                        ? "bg-purple-50 border-purple-200 text-purple-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Monitor className="h-4 w-4" />
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data & Account Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Download className="h-5 w-5 mr-2 text-purple-600" />
                Data & Account Management
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Data Export */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Export Account Data
                  </h3>
                  <p className="text-sm text-gray-600">
                    Download a copy of your account data and activity
                  </p>
                </div>
                <Button
                  onClick={handleDataExport}
                  variant="outline"
                  className="text-purple-600 border-purple-200 hover:bg-purple-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>

              {/* Account Deletion */}
              <div className="border-t pt-6">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-red-900">
                        Delete Account
                      </h3>
                      <p className="text-sm text-red-700">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-red-700">
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </p>
                    <Button
                      onClick={handleAccountDeletion}
                      variant={isDeleting ? "default" : "outline"}
                      className={
                        isDeleting
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "text-red-600 border-red-300 hover:bg-red-50"
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? "Confirm Deletion" : "Delete Account"}
                    </Button>
                    {isDeleting && (
                      <p className="text-xs text-red-600 font-medium">
                        Click again to confirm account deletion
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
