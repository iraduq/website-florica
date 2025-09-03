// src/components/projects/KanbanColumn.js
import React from "react";
import ProjectCard from "./ProjectCard";

const KanbanColumn = ({
  title,
  status,
  projects,
  onEdit,
  onDelete,
  onDuplicate,
  onTogglePin,
  onSelect,
  selectedProjects,
  teamMembers,
  onDropProject,
  onDragOver,
}) => {
  const statusColor = {
    "In Progress":
      "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200",
    "On Hold":
      "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200",
    Active: "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200",
    Completed: "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
    Archived: "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200",
  };
  return (
    <div
      className="flex-1 min-w-[280px] rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDropProject(e, status)}
    >
      <div className={`p-4 font-bold text-center ${statusColor[status]}`}>
        {title} ({projects.length})
      </div>
      <div className="p-4 space-y-4 overflow-y-auto flex-grow bg-zinc-50 dark:bg-zinc-900">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
            onTogglePin={onTogglePin}
            onSelect={onSelect}
            isSelected={selectedProjects.includes(project.id)}
            showCheckbox={selectedProjects.length > 0}
            teamMembers={teamMembers}
          />
        ))}
        {projects.length === 0 && (
          <p className="text-center text-zinc-400 italic text-sm">
            Niciun proiect în această coloană.
          </p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
