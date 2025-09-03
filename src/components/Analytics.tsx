import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for charts
const velocityData = [
  { sprint: "Sprint 1", planned: 25, completed: 23 },
  { sprint: "Sprint 2", planned: 30, completed: 28 },
  { sprint: "Sprint 3", planned: 28, completed: 31 },
  { sprint: "Sprint 4", planned: 32, completed: 29 },
  { sprint: "Sprint 5", planned: 35, completed: 33 },
  { sprint: "Sprint 6", planned: 30, completed: 27 },
];

const burndownData = [
  { day: "Day 1", ideal: 100, actual: 100 },
  { day: "Day 2", ideal: 90, actual: 95 },
  { day: "Day 3", ideal: 80, actual: 88 },
  { day: "Day 4", ideal: 70, actual: 82 },
  { day: "Day 5", ideal: 60, actual: 68 },
  { day: "Day 6", ideal: 50, actual: 58 },
  { day: "Day 7", ideal: 40, actual: 45 },
  { day: "Day 8", ideal: 30, actual: 32 },
  { day: "Day 9", ideal: 20, actual: 25 },
  { day: "Day 10", ideal: 10, actual: 15 },
  { day: "Day 11", ideal: 0, actual: 8 },
];

const teamPerformance = [
  { name: "Sarah Johnson", completed: 12, inProgress: 3, efficiency: 85 },
  { name: "Mike Chen", completed: 10, inProgress: 2, efficiency: 92 },
  { name: "Emily Davis", completed: 8, inProgress: 4, efficiency: 78 },
  { name: "Alex Smith", completed: 14, inProgress: 1, efficiency: 96 },
  { name: "David Wilson", completed: 6, inProgress: 2, efficiency: 71 },
];

const activeSprintStats = {
  name: "Sprint 15",
  startDate: "Dec 15, 2024",
  endDate: "Dec 29, 2024",
  totalTasks: 35,
  completedTasks: 24,
  inProgressTasks: 8,
  blockedTasks: 3,
  velocity: 28.5,
  trend: "up"
};

export function Analytics() {
  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 bg-dashboard-bg min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Track team performance, project velocity, and sprint metrics.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Active Sprint Overview */}
      <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-lg sm:text-xl">{activeSprintStats.name}</span>
                <Badge variant="secondary" className="bg-info/10 text-info border-info/20 w-fit">
                  Active
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {activeSprintStats.startDate} - {activeSprintStats.endDate}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold">{activeSprintStats.velocity}</div>
                <div className="text-xs text-muted-foreground">Velocity</div>
              </div>
              <div className={cn(
                "flex items-center",
                activeSprintStats.trend === "up" ? "text-theme-custom-success" : "text-destructive"
              )}>
                {activeSprintStats.trend === "up" ? 
                  <TrendingUp className="h-4 w-4" /> : 
                  <TrendingDown className="h-4 w-4" />
                }
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-xl sm:text-2xl font-bold text-theme-custom-success">{activeSprintStats.completedTasks}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-info/10 border border-info/20">
              <div className="text-xl sm:text-2xl font-bold text-theme-custom-info">{activeSprintStats.inProgressTasks}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="text-xl sm:text-2xl font-bold text-theme-custom-warning">{activeSprintStats.blockedTasks}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Blocked</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30 border border-muted">
              <div className="text-xl sm:text-2xl font-bold text-foreground">{activeSprintStats.totalTasks}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Tasks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Velocity Chart */}
        <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-theme-custom-primary" />
              <span>Team Velocity</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Story points planned vs completed over sprints</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {velocityData.map((sprint, index) => (
                <div key={sprint.sprint} className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sprint.sprint}</span>
                    <span className="text-muted-foreground">
                      {sprint.completed}/{sprint.planned} points
                    </span>
                  </div>
                  <div className="flex space-x-1 h-4 sm:h-6">
                    <div 
                      className="bg-muted rounded-sm"
                      style={{ width: `${(sprint.planned / 35) * 100}%` }}
                    />
                    <div 
                      className="bg-theme-custom-primary rounded-sm"
                      style={{ width: `${(sprint.completed / 35) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-muted rounded-sm" />
                  <span>Planned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-theme-custom-primary rounded-sm" />
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Burndown Chart */}
        <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <TrendingDown className="h-4 sm:h-5 w-4 sm:w-5 text-theme-custom-warning" />
              <span>Sprint Burndown</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Current sprint progress tracking</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4">
              <div className="h-32 sm:h-48 relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Ideal line */}
                  <line x1="0" y1="0" x2="400" y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                  
                  {/* Actual progress line */}
                  <polyline 
                    points="0,0 40,10 80,24 120,36 160,64 200,84 240,110 280,136 320,150 360,170 400,184"
                    fill="none" 
                    stroke="hsl(var(--theme-custom-primary))" 
                    strokeWidth="3"
                  />
                  
                  {/* Data points */}
                  {burndownData.map((point, index) => (
                    <circle 
                      key={index}
                      cx={index * 40} 
                      cy={point.actual * 2} 
                      r="3" 
                      fill="hsl(var(--theme-custom-primary))"
                    />
                  ))}
                </svg>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-muted-foreground opacity-60 border-dashed" />
                  <span>Ideal Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-0.5 bg-theme-custom-primary" />
                  <span>Actual Progress</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <PieChart className="h-4 sm:h-5 w-4 sm:w-5 text-theme-custom-info" />
            <span>Team Performance</span>
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Individual team member productivity and efficiency</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {teamPerformance.map((member) => (
              <div key={member.name} className="p-3 sm:p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3">
                  <h4 className="font-medium text-sm sm:text-base">{member.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs w-fit",
                      member.efficiency >= 90 ? "bg-success/10 text-theme-custom-success border-success/20" :
                      member.efficiency >= 80 ? "bg-info/10 text-theme-custom-info border-info/20" :
                      "bg-warning/10 text-theme-custom-warning border-warning/20"
                    )}
                  >
                    {member.efficiency}% Efficiency
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-sm mb-3">
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-bold text-theme-custom-success">{member.completed}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-bold text-theme-custom-info">{member.inProgress}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-bold text-foreground">{member.completed + member.inProgress}</div>
                    <div className="text-xs text-muted-foreground">Total Tasks</div>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-theme-custom-primary to-violet-light h-2 rounded-full transition-all duration-300"
                    style={{ width: `${member.efficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}