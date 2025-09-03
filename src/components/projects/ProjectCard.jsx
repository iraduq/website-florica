// src/components/projects/ProjectCard.js
import React from "react";
import {
  FolderOpenIcon,
  EditIcon,
  DuplicateIcon,
  TrashIcon,
  CalendarIcon,
  StatusIcon,
  PriorityIcon,
  TagsIcon,
  UserIcon,
  MethodologyIcon,
  PinIcon,
} from "../common/Icons";

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onTogglePin,
  onSelect,
  isSelected,
  showCheckbox,
  teamMembers,
}) => {
  const statusColor = {
    "In Progress": "bg-theme-custom-info", // Modificat
    "On Hold": "bg-theme-custom-warning", // Modificat
    Active: "bg-theme-custom-success", // Modificat
    Completed: "bg-zinc-500", // Poate rămâne așa, sau poți adăuga o culoare personalizată de status "completed"
    Archived: "bg-zinc-400", // La fel
  };

  const priorityColor = {
    Low: "bg-gray-300",
    Medium: "bg-theme-custom-accent", // Modificat
    High: "bg-orange-500", // Aici poți folosi o culoare de warning mai intensă, sau o definești ca "critical"
    Critical: "bg-theme-custom-warning", // Modificat
  };

  const statusLabel = {
    "In Progress": "În curs",
    "On Hold": "În așteptare",
    Active: "Activ",
    Completed: "Finalizat",
    Archived: "Arhivat",
  };

  const priorityLabel = {
    Low: "Joasă",
    Medium: "Medie",
    High: "Înaltă",
    Critical: "Critică",
  };

  const membersToDisplay = project.team.slice(0, 3);
  const moreMembersCount = project.team.length - membersToDisplay.length;

  return (
    <div
      className={`bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-theme-custom-primary/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${
        isSelected ? "ring-2 ring-theme-custom-primary" : "" // Modificat
      }`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("projectId", project.id);
      }}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {project.icon ? (
              <img
                src={project.icon}
                alt={`${project.name} icon`}
                className="h-6 w-6 object-contain"
              />
            ) : (
              <FolderOpenIcon />
            )}
            <h3 className="text-lg font-bold truncate text-zinc-900 dark:text-zinc-100">
              {project.name}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {showCheckbox && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(project.id)}
                className="form-checkbox h-4 w-4 text-theme-custom-primary rounded" // Modificat
              />
            )}
            <button
              onClick={() => onTogglePin(project.id)}
              className={`p-2 rounded-full transition-colors ${
                project.isPinned
                  ? "text-theme-custom-primary hover:bg-zinc-100 dark:hover:bg-zinc-700" // Modificat
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
              aria-label="Fixează proiect"
            >
              <PinIcon />
            </button>
            <button
              onClick={() => onEdit(project)}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Editează Proiect"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDuplicate(project)}
              className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              aria-label="Duplică Proiect"
            >
              <DuplicateIcon />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2 rounded-full text-theme-custom-warning dark:text-theme-custom-warning/80 hover:bg-theme-custom-warning/10 dark:hover:bg-theme-custom-warning/20 transition-colors" // Modificat
              aria-label="Șterge Proiect"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
          {project.description}
        </p>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          <div className="flex items-center gap-2">
            <StatusIcon />
            <span
              className={`h-2 w-2 rounded-full ${statusColor[project.status]}`}
            ></span>
            Status: {statusLabel[project.status]}
          </div>
          <div className="flex items-center gap-2">
            <PriorityIcon />
            <span
              className={`h-2 w-2 rounded-full ${
                priorityColor[project.priority]
              }`}
            ></span>
            Prioritate: {priorityLabel[project.priority]}
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon /> Creat: {project.createdAt}
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon /> Deadline: {project.deadline}
          </div>
          <div className="flex items-center gap-2">
            <UserIcon /> Owner: {project.owner}
          </div>
          <div className="flex items-center gap-2">
            <MethodologyIcon /> Metodologie: {project.methodology}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs px-2 py-1 rounded-full"
            >
              <TagsIcon />
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-700 pt-4 mt-2">
        <span>Actualizat: {project.lastUpdated}</span>
        <div className="flex items-center -space-x-2">
          {membersToDisplay.map((initials) => {
            const member = teamMembers.find((m) => m.initials === initials);
            return (
              <div
                key={initials}
                className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ring-2 ring-white dark:ring-zinc-800 bg-theme-custom-primary`} // Modificat
              >
                {initials}
                {member && member.isOnline && (
                  <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-theme-custom-success ring-1 ring-white dark:ring-zinc-800"></div> // Modificat
                )}
              </div>
            );
          })}
          {moreMembersCount > 0 && (
            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs text-zinc-600 dark:text-zinc-300 ring-2 ring-white dark:ring-800">
              +{moreMembersCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
