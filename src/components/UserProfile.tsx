import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Award,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Edit3,
  Check,
  X,
  Camera,
  Briefcase,
  Users,
  Clock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Andrei",
    lastName: "Ionescu",
    displayName: "Andrei Ionescu",
    email: "andrei.ionescu@devteam.ro",
    phone: "+40 721 234 567",
    location: "Cluj-Napoca, România",
    company: "DevTeam Solutions",
    department: "Engineering",
    position: "Senior Software Engineer",
    manager: "Maria Popescu",
    joinDate: "January 2022",
    employeeId: "EMP-2022-045",
    bio: "Passionate full-stack developer with 6+ years of experience in building scalable web applications. Specialized in React, Node.js, and cloud technologies. Team lead for the core platform development.",
    skills: ["React", "Node.js", "TypeScript", "Azure", "Docker", "GraphQL"],
    website: "https://andrei-dev.ro",
    github: "https://github.com/andrei-ionescu",
    linkedin: "https://linkedin.com/in/andrei-ionescu-dev",
    twitter: "https://twitter.com/andrei_codes",
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving profile:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setProfileData((prev) => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Dark Mode Toggle a fost mutat în Header */}

        {/* Header Section */}
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-theme-custom-primary to-theme-custom-accent">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute bottom-6 left-8 flex items-end space-x-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-lg shadow-lg flex items-center justify-center border-2 border-background">
                  <User className="h-14 w-14 text-muted-foreground" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 bg-theme-custom-primary hover:bg-theme-custom-primary/90 text-white p-1.5 rounded-md shadow-md transition-colors">
                    <Camera className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="text-white pb-2">
                <h1 className="text-2xl font-semibold mb-1">
                  {profileData.displayName}
                </h1>
                <p className="text-muted-foreground/80 font-medium">
                  {profileData.position}
                </p>
                <p className="text-muted-foreground/60 flex items-center text-sm mt-1">
                  <Building className="h-3 w-3 mr-1" />
                  {profileData.department} • {profileData.company}
                </p>
              </div>
            </div>
            <div className="absolute top-6 right-6">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="secondary"
                  className="bg-background/20 backdrop-blur-sm text-foreground border border-border hover:bg-background/30"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="bg-background/20 backdrop-blur-sm text-foreground border-border hover:bg-background/30"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-theme-custom-success hover:bg-theme-custom-success/90 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Profile Information */}
          <div className="xl:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center mb-6">
                <User className="h-5 w-5 mr-2 text-theme-custom-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="displayName"
                    className="text-sm font-medium text-foreground"
                  >
                    Display Name
                  </Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) =>
                      handleInputChange("displayName", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Phone className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <MapPin className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center mb-6">
                <Briefcase className="h-5 w-5 mr-2 text-theme-custom-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Work Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="position"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Award className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="department"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Building className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="manager"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Users className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    Manager
                  </Label>
                  <Input
                    id="manager"
                    value={profileData.manager}
                    onChange={(e) =>
                      handleInputChange("manager", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="employeeId"
                    className="text-sm font-medium text-foreground"
                  >
                    Employee ID
                  </Label>
                  <Input
                    id="employeeId"
                    value={profileData.employeeId}
                    disabled={true}
                    className="h-10 bg-muted/10 text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 mr-2 text-theme-custom-primary" />
                <h2 className="text-lg font-semibold text-foreground">About</h2>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-foreground"
                >
                  Biography
                </Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-theme-custom-primary focus:border-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 mr-2 text-theme-custom-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Skills & Expertise
                </h2>
              </div>
              {!isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-theme-custom-primary/10 text-theme-custom-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label
                    htmlFor="skills"
                    className="text-sm font-medium text-foreground"
                  >
                    Skills (comma separated)
                  </Label>
                  <Input
                    id="skills"
                    value={profileData.skills.join(", ")}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary"
                    placeholder="React, Node.js, TypeScript..."
                  />
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center mb-6">
                <Globe className="h-5 w-5 mr-2 text-theme-custom-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Social & Professional Links
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="website"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Personal Website
                  </Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="linkedin"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Linkedin className="h-4 w-4 mr-1 text-theme-custom-primary" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="github"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={profileData.github}
                    onChange={(e) =>
                      handleInputChange("github", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="twitter"
                    className="text-sm font-medium text-foreground flex items-center"
                  >
                    <Twitter className="h-4 w-4 mr-1 text-theme-custom-info" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={profileData.twitter}
                    onChange={(e) =>
                      handleInputChange("twitter", e.target.value)
                    }
                    disabled={!isEditing}
                    className="h-10 focus:border-theme-custom-primary focus:ring-theme-custom-primary disabled:bg-muted/10 disabled:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-4">
              <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">
                    Joined {profileData.joinDate}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">Active today</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">
                    Reports to {profileData.manager}
                  </span>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-4">
              <h3 className="font-semibold text-foreground mb-4">
                Team Contributions
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Active Projects
                  </span>
                  <span className="font-semibold text-theme-custom-primary">
                    3
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Completed Tasks
                  </span>
                  <span className="font-semibold text-theme-custom-success">
                    127
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Team Reviews
                  </span>
                  <span className="font-semibold text-theme-custom-primary">
                    45
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-4">
              <h3 className="font-semibold text-foreground mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-theme-custom-primary/20 pl-3">
                  <p className="text-muted-foreground">
                    Updated project roadmap
                  </p>
                  <p className="text-muted-foreground text-xs">2 hours ago</p>
                </div>
                <div className="border-l-2 border-theme-custom-success/20 pl-3">
                  <p className="text-muted-foreground">Completed code review</p>
                  <p className="text-muted-foreground text-xs">5 hours ago</p>
                </div>
                <div className="border-l-2 border-theme-custom-primary/20 pl-3">
                  <p className="text-muted-foreground">Joined team meeting</p>
                  <p className="text-muted-foreground text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
