import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  MoreHorizontal,
  Clock,
  Flag,
  MessageSquare,
  Paperclip,
  Calendar as CalendarIcon,
  User,
  Tag,
  MessageCircle,
  Save,
  Trash2,
  Copy,
  ExternalLink,
  KanbanSquare,
  List,
  GanttChartSquare,
  CalendarDays,
  Search,
  History,
  CheckCircle2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockAssignees = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/api/placeholder/32/32",
    initials: "SJ",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/api/placeholder/32/32",
    initials: "MC",
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "/api/placeholder/32/32",
    initials: "ED",
  },
  {
    id: "4",
    name: "Alex Smith",
    avatar: "/api/placeholder/32/32",
    initials: "AS",
  },
];

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  createdAt: Date;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface HistoryEntry {
  id: string;
  action: string;
  timestamp: Date;
  details?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate?: Date;
  tags: string[];
  comments: Comment[];
  attachments: Attachment[];
  status: "todo" | "inprogress" | "review" | "completed";
  subtasks: Subtask[];
  progress: number;
  history: HistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
  wipLimit?: number;
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "border-muted-foreground/20",
    wipLimit: 5,
    tasks: [
      {
        id: "1",
        title: "Design user onboarding flow",
        description:
          "Create wireframes and mockups for the new user registration process",
        priority: "high",
        assignee: mockAssignees[0],
        dueDate: new Date(2025, 11, 28),
        tags: ["Design", "UX"],
        comments: [
          {
            id: "c1",
            author: mockAssignees[1],
            content:
              "We should consider A/B testing different onboarding flows",
            createdAt: new Date(2025, 11, 20),
          },
        ],
        attachments: [
          {
            id: "a1",
            name: "onboarding-wireframes.figma",
            size: "2.4 MB",
            type: "figma",
            url: "#",
          },
        ],
        status: "todo",
        subtasks: [
          { id: "s1", text: "Research competitor onboarding", completed: true },
          { id: "s2", text: "Sketch wireframes", completed: false },
          { id: "s3", text: "Create high-fidelity mockups", completed: false },
        ],
        progress: 33,
        history: [
          {
            id: "h1",
            action: "Task created",
            timestamp: new Date(2025, 11, 15),
            details: "Created by Sarah Johnson",
          },
          {
            id: "h2",
            action: "Comment added",
            timestamp: new Date(2025, 11, 20),
            details: "Comment added by Mike Chen",
          },
        ],
        createdAt: new Date(2025, 11, 15),
        updatedAt: new Date(2025, 11, 20),
      },
      {
        id: "2",
        title: "Setup CI/CD pipeline",
        description:
          "Configure GitHub Actions for automated testing and deployment",
        priority: "medium",
        assignee: mockAssignees[1],
        dueDate: new Date(2025, 11, 30),
        tags: ["DevOps", "Backend"],
        comments: [],
        attachments: [],
        status: "todo",
        subtasks: [
          {
            id: "s4",
            text: "Create GitHub Actions workflow",
            completed: false,
          },
        ],
        progress: 0,
        history: [
          {
            id: "h3",
            action: "Task created",
            timestamp: new Date(2025, 11, 18),
            details: "Created by Mike Chen",
          },
        ],
        createdAt: new Date(2025, 11, 18),
        updatedAt: new Date(2025, 11, 18),
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "border-info/50",
    wipLimit: 3,
    tasks: [
      {
        id: "4",
        title: "Implement payment gateway",
        description: "Integrate Stripe payment processing for subscriptions",
        priority: "high",
        assignee: mockAssignees[3],
        dueDate: new Date(2025, 11, 29),
        tags: ["Backend", "Payment"],
        comments: [
          {
            id: "c2",
            author: mockAssignees[0],
            content:
              "Make sure to implement webhook handling for payment confirmations",
            createdAt: new Date(2025, 11, 22),
          },
        ],
        attachments: [],
        status: "inprogress",
        subtasks: [
          { id: "s5", text: "Set up Stripe account", completed: true },
          { id: "s6", text: "Implement API endpoints", completed: true },
          { id: "s7", text: "Test payment flow", completed: false },
        ],
        progress: 66,
        history: [
          {
            id: "h4",
            action: "Task created",
            timestamp: new Date(2025, 11, 16),
            details: "Created by Alex Smith",
          },
          {
            id: "h5",
            action: "Status changed",
            timestamp: new Date(2025, 11, 20),
            details: "Status changed from 'To Do' to 'In Progress'",
          },
          {
            id: "h6",
            action: "Comment added",
            timestamp: new Date(2025, 11, 22),
            details: "Comment added by Sarah Johnson",
          },
        ],
        createdAt: new Date(2025, 11, 16),
        updatedAt: new Date(2025, 11, 22),
      },
    ],
  },
  {
    id: "review",
    title: "Review Ready",
    color: "border-warning/50",
    wipLimit: 2,
    tasks: [
      {
        id: "8",
        title: "Review marketing copy",
        description:
          "Review and approve the new website copy for the homepage.",
        priority: "medium",
        assignee: mockAssignees[0],
        dueDate: new Date(2025, 11, 27),
        tags: ["Marketing", "Copywriting"],
        comments: [],
        attachments: [],
        status: "review",
        subtasks: [
          {
            id: "s8",
            text: "Check for grammar and spelling",
            completed: false,
          },
        ],
        progress: 0,
        history: [
          {
            id: "h7",
            action: "Task created",
            timestamp: new Date(2025, 11, 25),
            details: "Created by Sarah Johnson",
          },
        ],
        createdAt: new Date(2025, 11, 25),
        updatedAt: new Date(2025, 11, 25),
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    color: "border-success/50",
    tasks: [
      {
        id: "6",
        title: "User authentication system",
        description: "Implement JWT-based authentication with refresh tokens",
        priority: "low",
        assignee: mockAssignees[1],
        tags: ["Backend", "Security"],
        comments: [],
        attachments: [],
        status: "completed",
        subtasks: [
          { id: "s9", text: "Design database schema", completed: true },
          { id: "s10", text: "Implement API endpoints", completed: true },
        ],
        progress: 100,
        history: [
          {
            id: "h8",
            action: "Task created",
            timestamp: new Date(2025, 11, 10),
            details: "Created by Mike Chen",
          },
          {
            id: "h9",
            action: "Status changed",
            timestamp: new Date(2025, 11, 25),
            details: "Status changed to 'Completed'",
          },
        ],
        createdAt: new Date(2025, 11, 10),
        updatedAt: new Date(2025, 11, 25),
      },
    ],
  },
];

const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "review", label: "Review Ready" },
  { value: "completed", label: "Completed" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const priorityColors = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200",
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newTag, setNewTag] = useState("");
  const [viewMode, setViewMode] = useState("board");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent":
        return "border-l-destructive bg-destructive/5";
      case "medium":
        return "border-l-warning bg-warning/5";
      case "low":
        return "border-l-success bg-success/5";
      default:
        return "border-l-muted";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setEditedTask({ ...task });
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask) return;

    const targetColumn = columns.find((col) => col.id === targetColumnId);
    if (
      targetColumn &&
      targetColumn.wipLimit &&
      targetColumn.tasks.length >= targetColumn.wipLimit &&
      targetColumn.id !== draggedTask.status
    ) {
      toast({
        title: "WIP Limit Reached",
        description: `Cannot move task. The "${targetColumn.title}" column has reached its limit of ${targetColumn.wipLimit} tasks.`,
        variant: "destructive",
      });
      return;
    }

    const newColumns = columns.map((column) => {
      const filteredTasks = column.tasks.filter(
        (task) => task.id !== draggedTask.id
      );

      if (column.id === targetColumnId) {
        const historyEntry = {
          id: Date.now().toString(),
          action: "Status changed",
          timestamp: new Date(),
          details: `Status changed from '${draggedTask.status}' to '${targetColumn.title}'`,
        };
        const updatedTask = {
          ...draggedTask,
          status: targetColumnId as Task["status"],
          history: [...draggedTask.history, historyEntry],
          updatedAt: new Date(),
        };
        return {
          ...column,
          tasks: [...filteredTasks, updatedTask],
        };
      } else {
        return {
          ...column,
          tasks: filteredTasks,
        };
      }
    });

    setColumns(newColumns);
    setDraggedTask(null);
  };

  const calculateProgress = (subtasks: Subtask[]): number => {
    if (subtasks.length === 0) return 0;
    const completed = subtasks.filter((st) => st.completed).length;
    return Math.floor((completed / subtasks.length) * 100);
  };

  const handleSaveTask = (updatedTask: Task) => {
    const isNew = !columns.some((col) =>
      col.tasks.some((task) => task.id === updatedTask.id)
    );
    const newColumns = columns.map((column) => {
      if (column.id === updatedTask.status) {
        if (isNew) {
          return {
            ...column,
            tasks: [updatedTask, ...column.tasks],
          };
        } else {
          return {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === updatedTask.id
                ? { ...updatedTask, updatedAt: new Date() }
                : task
            ),
          };
        }
      } else {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== updatedTask.id),
        };
      }
    });

    setColumns(newColumns);
    setIsModalOpen(false);
    toast({
      title: "Task saved",
      description: "Task has been successfully saved.",
    });
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Task",
      description: "",
      priority: "medium",
      assignee: mockAssignees[0],
      tags: [],
      comments: [],
      attachments: [],
      status: "todo",
      subtasks: [],
      progress: 0,
      history: [
        {
          id: Date.now().toString(),
          action: "Task created",
          timestamp: new Date(),
          details: "New task created.",
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEditedTask(newTask);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    const newColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskId),
    }));
    setColumns(newColumns);
    setIsModalOpen(false);
    toast({
      title: "Task deleted",
      description: "Task has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim() && editedTask) {
      const comment = {
        id: Date.now().toString(),
        author: mockAssignees[3], // Assuming current user is Alex
        content: newComment,
        createdAt: new Date(),
      };
      setEditedTask((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, comment],
              history: [
                ...prev.history,
                {
                  id: Date.now().toString(),
                  action: "Comment added",
                  timestamp: new Date(),
                  details: "New comment added.",
                },
              ],
            }
          : null
      );
      setNewComment("");
    }
  };

  const handleAddTag = () => {
    if (
      newTag.trim() &&
      editedTask &&
      !editedTask.tags.includes(newTag.trim())
    ) {
      setEditedTask((prev) =>
        prev
          ? {
              ...prev,
              tags: [...prev.tags, newTag.trim()],
              history: [
                ...prev.history,
                {
                  id: Date.now().toString(),
                  action: "Tag added",
                  timestamp: new Date(),
                  details: `Tag '${newTag.trim()}' added.`,
                },
              ],
            }
          : null
      );
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTask((prev) =>
      prev
        ? {
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
            history: [
              ...prev.history,
              {
                id: Date.now().toString(),
                action: "Tag removed",
                timestamp: new Date(),
                details: `Tag '${tagToRemove}' removed.`,
              },
            ],
          }
        : null
    );
  };

  const handleAddSubtask = () => {
    if (editedTask) {
      const newSubtask: Subtask = {
        id: Date.now().toString(),
        text: "",
        completed: false,
      };
      const updatedSubtasks = [...editedTask.subtasks, newSubtask];
      const updatedProgress = calculateProgress(updatedSubtasks);
      setEditedTask((prev) =>
        prev
          ? {
              ...prev,
              subtasks: updatedSubtasks,
              progress: updatedProgress,
              history: [
                ...prev.history,
                {
                  id: Date.now().toString(),
                  action: "Subtask added",
                  timestamp: new Date(),
                },
              ],
            }
          : null
      );
    }
  };

  const handleUpdateSubtask = (id: string, newText: string) => {
    if (editedTask) {
      const updatedSubtasks = editedTask.subtasks.map((st) =>
        st.id === id ? { ...st, text: newText } : st
      );
      setEditedTask((prev) =>
        prev ? { ...prev, subtasks: updatedSubtasks } : null
      );
    }
  };

  const handleDeleteSubtask = (id: string) => {
    if (editedTask) {
      const updatedSubtasks = editedTask.subtasks.filter((st) => st.id !== id);
      const updatedProgress = calculateProgress(updatedSubtasks);
      setEditedTask((prev) =>
        prev
          ? {
              ...prev,
              subtasks: updatedSubtasks,
              progress: updatedProgress,
              history: [
                ...prev.history,
                {
                  id: Date.now().toString(),
                  action: "Subtask removed",
                  timestamp: new Date(),
                },
              ],
            }
          : null
      );
    }
  };

  const handleToggleSubtask = (id: string, checked: boolean) => {
    if (editedTask) {
      const updatedSubtasks = editedTask.subtasks.map((st) =>
        st.id === id ? { ...st, completed: checked } : st
      );
      const updatedProgress = calculateProgress(updatedSubtasks);
      setEditedTask((prev) =>
        prev
          ? {
              ...prev,
              subtasks: updatedSubtasks,
              progress: updatedProgress,
              history: [
                ...prev.history,
                {
                  id: Date.now().toString(),
                  action: "Subtask status changed",
                  timestamp: new Date(),
                  details: `Subtask ${checked ? "completed" : "un-checked"}.`,
                },
              ],
            }
          : null
      );
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("ro-RO", {
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const formatDateFull = (date?: Date) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const allTasks = useMemo(() => {
    let tasks = columns.flatMap((column) => column.tasks);
    if (searchTerm) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterAssignee && filterAssignee !== "all") {
      tasks = tasks.filter((task) => task.assignee.id === filterAssignee);
    }
    if (filterPriority && filterPriority !== "all") {
      tasks = tasks.filter((task) => task.priority === filterPriority);
    }
    return tasks;
  }, [columns, searchTerm, filterAssignee, filterPriority]);

  const filteredColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter(
        (task) =>
          (searchTerm
            ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true) &&
          (filterAssignee !== "all"
            ? task.assignee.id === filterAssignee
            : true) &&
          (filterPriority !== "all" ? task.priority === filterPriority : true)
      ),
    }));
  }, [columns, searchTerm, filterAssignee, filterPriority]);

  const renderKanbanBoard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full overflow-x-auto pb-4">
      {filteredColumns.map((column) => (
        <div key={column.id} className="flex flex-col h-full min-w-[280px]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {column.tasks.length}
                {column.wipLimit && `/${column.wipLimit}`}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={handleAddTask}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div
            className={cn(
              "flex-1 space-y-3 p-4 rounded-lg border-2 border-dashed transition-colors min-h-[500px]",
              column.color,
              "hover:bg-muted/20",
              column.wipLimit && column.tasks.length >= column.wipLimit
                ? "border-theme-custom-warning/50" // Modificat
                : column.color
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {column.tasks.map((task) => (
              <Card
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onClick={() => handleTaskClick(task)}
                className={cn(
                  "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
                  "bg-white/50 backdrop-blur-sm dark:bg-slate-900/50",
                  getPriorityColor(task.priority),
                  "hover:scale-[1.01]"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium leading-tight">
                      {task.title}
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  {task.description && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {task.subtasks.length > 0 && (
                    <div className="mb-3">
                      <Progress value={task.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.progress}% complete
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs capitalize",
                        getPriorityBadgeColor(task.priority)
                      )}
                    >
                      <Flag className="mr-1 h-2 w-2" />
                      {task.priority}
                    </Badge>
                    {task.dueDate && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {formatDate(task.dueDate)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignee.avatar} />
                      <AvatarFallback className="text-xs">
                        {task.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {task.comments.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{task.comments.length}</span>
                        </div>
                      )}
                      {task.attachments.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Paperclip className="h-3 w-3" />
                          <span>{task.attachments.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="ghost"
              className="w-full h-12 border-2 border-dashed border-muted-foreground/20 hover:border-theme-custom-primary/50 hover:bg-theme-custom-primary/5 transition-colors" // Modificat
              onClick={handleAddTask}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add a task
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      <Card className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="grid grid-cols-12 p-4 font-bold text-muted-foreground border-b">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Assignee</div>
          <div className="col-span-1 text-center">Priority</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Progress</div>
          <div className="col-span-2 text-center">Due Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
      </Card>
      {allTasks.map((task) => (
        <Card
          key={task.id}
          className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50"
          onClick={() => handleTaskClick(task)}
        >
          <div className="grid grid-cols-12 p-4 items-center">
            <div className="col-span-4 font-medium text-sm">{task.title}</div>
            <div className="col-span-2 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback className="text-xs">
                  {task.assignee.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground hidden md:inline">
                {task.assignee.name}
              </span>
            </div>
            <div className="col-span-1 text-center">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize",
                  getPriorityBadgeColor(task.priority)
                )}
              >
                {task.priority}
              </Badge>
            </div>
            <div className="col-span-1 text-center">
              <Badge variant="secondary" className="capitalize text-xs">
                {task.status}
              </Badge>
            </div>
            <div className="col-span-1 text-center text-xs text-muted-foreground">
              <Progress value={task.progress} className="h-2" />
            </div>
            <div className="col-span-2 text-center text-xs text-muted-foreground">
              {task.dueDate ? formatDateFull(task.dueDate) : "N/A"}
            </div>
            <div className="col-span-1 text-right">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCalendarView = () => (
    <div className="text-center py-20 text-muted-foreground">
      <CalendarDays className="mx-auto h-16 w-16 mb-4 text-theme-custom-primary" />{" "}
      {/* Modificat */}
      <p className="text-xl font-bold">Calendar View Coming Soon</p>
      <p className="text-sm">
        This view will display your tasks on a calendar based on their due
        dates.
      </p>
    </div>
  );

  const renderGanttView = () => (
    <div className="text-center py-20 text-muted-foreground">
      <GanttChartSquare className="mx-auto h-16 w-16 mb-4 text-theme-custom-primary" />{" "}
      {/* Modificat */}
      <p className="text-xl font-bold">Gantt Chart Coming Soon</p>
      <p className="text-sm">
        This view will provide a project timeline to visualize task
        dependencies.
      </p>
    </div>
  );

  return (
    <div className="flex-1 p-4 sm:p-6 bg-dashboard-bg min-h-screen">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Project Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Visualize and manage project tasks.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "board" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("board")}
            className={cn(
              viewMode === "board"
                ? "bg-theme-custom-primary hover:bg-theme-custom-primary/90 text-white"
                : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "hidden sm:inline-flex"
            )}
          >
            <KanbanSquare className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={cn(
              viewMode === "list"
                ? "bg-theme-custom-primary hover:bg-theme-custom-primary/90 text-white"
                : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "hidden sm:inline-flex"
            )}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className={cn(
              viewMode === "calendar"
                ? "bg-theme-custom-primary hover:bg-theme-custom-primary/90 text-white"
                : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "hidden sm:inline-flex"
            )}
          >
            <CalendarDays className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "gantt" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("gantt")}
            className={cn(
              viewMode === "gantt"
                ? "bg-theme-custom-primary hover:bg-theme-custom-primary/90 text-white"
                : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "hidden sm:inline-flex"
            )}
          >
            <GanttChartSquare className="h-4 w-4" />
          </Button>

          <Button
            className="bg-theme-custom-primary hover:bg-theme-custom-primary/90" // Modificat
            onClick={handleAddTask}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-9 focus:ring-theme-custom-primary focus:border-theme-custom-primary" // Modificat
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label className="hidden sm:block">Assignee:</Label>
          <Select value={filterAssignee} onValueChange={setFilterAssignee}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              {mockAssignees.map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label className="hidden sm:block">Priority:</Label>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {priorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(searchTerm ||
          filterAssignee !== "all" ||
          filterPriority !== "all") && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
              setFilterAssignee("all");
              setFilterPriority("all");
            }}
          >
            Reset Filters
          </Button>
        )}
      </div>
      <div className="mb-4">
        {viewMode === "board" && renderKanbanBoard()}
        {viewMode === "list" && renderListView()}
        {viewMode === "calendar" && renderCalendarView()}
        {viewMode === "gantt" && renderGanttView()}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Task Details</DialogTitle>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => editedTask && handleSaveTask(editedTask)}
                  size="sm"
                  className="bg-theme-custom-primary hover:bg-theme-custom-primary/90" // Modificat
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate Task
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                      onClick={() =>
                        selectedTask && handleDeleteTask(selectedTask.id)
                      }
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DialogHeader>

          {editedTask && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
              <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editedTask.title}
                    onChange={(e) =>
                      setEditedTask((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                    className="text-lg font-medium focus:ring-theme-custom-primary focus:border-theme-custom-primary" // Modificat
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editedTask.description}
                    onChange={(e) =>
                      setEditedTask((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                    rows={4}
                    placeholder="Add a description..."
                    className="focus:ring-theme-custom-primary focus:border-theme-custom-primary" // Modificat
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-theme-custom-success" />{" "}
                    {/* Modificat */}
                    <Label>Subtasks ({editedTask.progress}%)</Label>
                  </div>
                  <Progress value={editedTask.progress} className="h-2" />
                  <div className="space-y-2">
                    {editedTask.subtasks.map((subtask, index) => (
                      <div
                        key={subtask.id}
                        className="flex items-center space-x-2 group"
                      >
                        <Checkbox
                          id={`subtask-${subtask.id}`}
                          checked={subtask.completed}
                          onCheckedChange={(checked) =>
                            handleToggleSubtask(subtask.id, checked as boolean)
                          }
                          className="data-[state=checked]:bg-theme-custom-primary data-[state=checked]:border-theme-custom-primary" // Modificat
                        />
                        <Input
                          id={`subtask-input-${subtask.id}`}
                          value={subtask.text}
                          onChange={(e) =>
                            handleUpdateSubtask(subtask.id, e.target.value)
                          }
                          placeholder={`Subtask ${index + 1}`}
                          className="flex-1 focus:ring-theme-custom-primary focus:border-theme-custom-primary" // Modificat
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteSubtask(subtask.id)}
                        >
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddSubtask}
                    className="hover:bg-theme-custom-primary/10 hover:text-theme-custom-primary" // Modificat
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subtask
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-theme-custom-info" />{" "}
                    {/* Modificat */}
                    <Label>Comments ({editedTask.comments.length})</Label>
                  </div>
                  <div className="space-y-4">
                    {editedTask.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback>
                            {comment.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">
                              {comment.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Intl.DateTimeFormat("ro-RO", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(comment.createdAt)}
                            </span>
                          </div>
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockAssignees[3].avatar} />
                      <AvatarFallback>
                        {mockAssignees[3].initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={2}
                        className="focus:ring-theme-custom-primary focus:border-theme-custom-primary" // Modificat
                      />
                      <Button
                        onClick={handleAddComment}
                        size="sm"
                        disabled={!newComment.trim()}
                        className="bg-theme-custom-primary hover:bg-theme-custom-primary/90" // Modificat
                      >
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-theme-custom-info" />{" "}
                    {/* Modificat */}
                    <Label>Attachments ({editedTask.attachments.length})</Label>
                  </div>
                  {editedTask.attachments.length > 0 ? (
                    <div className="space-y-2">
                      {editedTask.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center space-x-3">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">
                                {attachment.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {attachment.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed rounded-lg bg-muted/50">
                      <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No attachments
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add Attachment
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 overflow-y-auto pr-2 lg:col-span-1">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editedTask.status}
                    onValueChange={(value) =>
                      setEditedTask((prev) =>
                        prev
                          ? { ...prev, status: value as Task["status"] }
                          : null
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={editedTask.priority}
                    onValueChange={(value) =>
                      setEditedTask((prev) =>
                        prev
                          ? { ...prev, priority: value as Task["priority"] }
                          : null
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                getPriorityBadgeColor(option.value) // Modificat
                              )}
                            />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge
                    className={cn(
                      "capitalize w-fit",
                      getPriorityBadgeColor(editedTask.priority) // Modificat
                    )}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {editedTask.priority}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Select
                    value={editedTask.assignee?.id || "all"}
                    onValueChange={(value) => {
                      const assignee = mockAssignees.find(
                        (a) => a.id === value
                      );
                      setEditedTask((prev) =>
                        prev ? { ...prev, assignee: assignee! } : null
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssignees.map((assignee) => (
                        <SelectItem key={assignee.id} value={assignee.id}>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span>{assignee.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editedTask.assignee && (
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={editedTask.assignee.avatar} />
                        <AvatarFallback className="text-xs">
                          {editedTask.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {editedTask.assignee.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !editedTask.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editedTask.dueDate
                          ? formatDateFull(editedTask.dueDate)
                          : "Set due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editedTask.dueDate}
                        onSelect={(date) => {
                          setEditedTask((prev) =>
                            prev ? { ...prev, dueDate: date } : null
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {editedTask.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag..."
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      className="focus:ring-theme-custom-primary focus:border-theme-custom-primary" // Modificat
                    />
                    <Button
                      onClick={handleAddTag}
                      size="sm"
                      disabled={!newTag.trim()}
                      className="bg-theme-custom-primary hover:bg-theme-custom-primary/90" // Modificat
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <History className="h-4 w-4" />
                    <Label>Activity Log</Label>
                  </div>
                  <div className="space-y-3">
                    {editedTask.history
                      .slice()
                      .reverse()
                      .map((entry) => (
                        <div
                          key={entry.id}
                          className="text-xs text-muted-foreground"
                        >
                          <span className="font-medium text-foreground">
                            {entry.action}
                          </span>
                          {entry.details && `: ${entry.details}`}
                          <span className="block text-[10px] opacity-70">
                            {new Intl.DateTimeFormat("ro-RO", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(entry.timestamp)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
