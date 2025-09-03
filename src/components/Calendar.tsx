import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  Trash2,
  Edit,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Definirea tipului pentru un eveniment din calendar
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  project: string;
  participants: string[];
}

// Date mock extinse
const initialMockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Team Sync-up",
    date: "2025-12-10",
    time: "10:00 AM",
    project: "Internal",
    participants: ["John Doe", "Jane Smith"],
  },
  {
    id: "event-2",
    title: "Project Alpha Deadline",
    date: "2025-12-15",
    time: "EOD",
    project: "Project Alpha",
    participants: ["All Team"],
  },
  {
    id: "event-3",
    title: "Client Meeting",
    date: "2025-12-10",
    time: "02:00 PM",
    project: "Project Beta",
    participants: ["John Doe"],
  },
  {
    id: "event-4",
    title: "Sprint Planning",
    date: "2026-01-05",
    time: "11:00 AM",
    project: "Internal",
    participants: ["All Team"],
  },
  {
    id: "event-5",
    title: "Code Review Session",
    date: "2025-12-22",
    time: "03:00 PM",
    project: "Project Gamma",
    participants: ["Jane Smith", "Alex King"],
  },
  {
    id: "event-6",
    title: "Design Huddle",
    date: "2025-12-10",
    time: "09:00 AM",
    project: "Internal",
    participants: ["John Doe", "Alex King"],
  },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialMockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    project: "",
    participants: "",
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i + 1),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    return days;
  };

  const getEventsForDay = (day: Date) => {
    const dayString = day.toISOString().split("T")[0];
    return events.filter((event) => event.date === dayString);
  };

  const handleOpenDialog = (event?: CalendarEvent) => {
    if (event) {
      setEditingEventId(event.id);
      setNewEvent({
        title: event.title,
        date: event.date,
        time: event.time,
        project: event.project,
        participants: event.participants.join(", "),
      });
    } else {
      setEditingEventId(null);
      setNewEvent({
        title: "",
        date: "",
        time: "",
        project: "",
        participants: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    const eventData = {
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      project: newEvent.project || "N/A",
      participants: newEvent.participants
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    if (editingEventId) {
      setEvents(
        events.map((event) =>
          event.id === editingEventId ? { ...event, ...eventData } : event
        )
      );
    } else {
      const newCalendarEvent = {
        id: `event-${Date.now()}`,
        ...eventData,
      };
      setEvents([...events, newCalendarEvent]);
    }

    setIsDialogOpen(false);
    setEditingEventId(null);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      project: "",
      participants: "",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().toISOString().split("T")[0];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6 min-h-screen bg-dashboard-bg">
      {/* Header-ul paginii */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
            Calendar
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Vizualizați și gestionați programul și termenele limită ale echipei.
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="w-full sm:w-auto text-sm lg:text-base"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adaugă Eveniment
        </Button>
      </div>

      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between p-3 sm:p-4 lg:p-6 border-b">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 sm:h-10 sm:w-10">
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-center">
            {currentDate.toLocaleString("ro-RO", {
              month: "long",
              year: "numeric",
            })}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 sm:h-10 sm:w-10">
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Numele zilelor săptămânii */}
          <div className="grid grid-cols-7 text-center font-medium text-xs sm:text-sm text-muted-foreground border-b border-border py-2">
            {["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"].map((day) => (
              <div key={day} className="py-1 sm:py-2">
                {day}
              </div>
            ))}
          </div>
          {/* Zilele calendarului */}
          <div className="grid grid-cols-7 flex-1">
            {days.map((day, index) => {
              const dayEvents = getEventsForDay(day.date);
              const isToday = day.date.toISOString().split("T")[0] === today;
              return (
                <div
                  key={index}
                  className={cn(
                    "relative border-r border-b border-border min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] p-1 sm:p-2 overflow-hidden",
                    !day.isCurrentMonth &&
                      "text-muted-foreground/50 bg-muted/20",
                    isToday && "bg-theme-custom-primary/10"
                  )}
                >
                  <span
                    className={cn(
                      "block text-sm sm:text-lg font-semibold",
                      isToday && "text-theme-custom-primary"
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="mt-1 space-y-1 cursor-pointer">
                          {dayEvents.slice(0, 2).map((event) => (
                            <Badge
                              key={event.id}
                              className="w-full justify-start hover:bg-muted/50 transition-colors bg-theme-custom-primary/10 text-theme-custom-primary text-xs font-normal px-1 sm:px-2 py-0.5 whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                              <span className="flex items-center">
                                <Clock className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                                <span className="truncate text-xs">{`${event.time} - ${event.title}`}</span>
                              </span>
                            </Badge>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-xs text-muted-foreground ml-1">
                              + {dayEvents.length - 2} altele
                            </span>
                          )}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 sm:w-80 p-4 max-h-96 overflow-y-auto">
                        <div className="space-y-4">
                          <h4 className="font-bold text-base sm:text-lg">
                            Evenimente în {day.date.toLocaleDateString("ro-RO")}
                          </h4>
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className="space-y-2 border-b pb-2 last:border-b-0 last:pb-0"
                            >
                              <h4 className="font-medium text-sm sm:text-base">
                                {event.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-muted-foreground flex items-center space-x-2">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{event.time}</span>
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground flex items-center space-x-2">
                                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{event.participants.join(", ")}</span>
                              </p>
                              <div className="flex justify-end space-x-2 mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOpenDialog(event)}
                                  className="text-xs"
                                >
                                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-red-500 hover:text-red-600"
                                  onClick={() => handleDeleteEvent(event.id)}
                                >
                                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                  Șterge
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog pentru adăugarea/modificarea unui eveniment */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {editingEventId ? "Editează Eveniment" : "Adaugă Eveniment Nou"}
            </DialogTitle>
            <CardDescription className="text-xs sm:text-sm">
              {editingEventId
                ? "Modifică detaliile evenimentului."
                : "Completează detaliile pentru noul tău eveniment din calendar."}
            </CardDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="title" className="sm:text-right text-xs sm:text-sm">
                Titlu
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="sm:col-span-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="date" className="sm:text-right text-xs sm:text-sm">
                Dată
              </Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="sm:col-span-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="time" className="sm:text-right text-xs sm:text-sm">
                Oră
              </Label>
              <Input
                id="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className="sm:col-span-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="project" className="sm:text-right text-xs sm:text-sm">
                Proiect
              </Label>
              <Input
                id="project"
                value={newEvent.project}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, project: e.target.value })
                }
                className="sm:col-span-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="participants" className="sm:text-right text-xs sm:text-sm">
                Participanți
              </Label>
              <Input
                id="participants"
                value={newEvent.participants}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, participants: e.target.value })
                }
                placeholder="ex. John Doe, Jane Smith"
                className="sm:col-span-3 text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveEvent} className="w-full sm:w-auto text-sm">
              {editingEventId ? "Salvează Modificările" : "Salvează Eveniment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
