// src/components/projects/Projects.js
import React, { useState, useEffect } from "react";
import { initialProjects, teamMembers } from "../../data/mockData";
import { useToast } from "../common/useToast";
import Dialog from "../common/Dialog";
import { ToastContainer } from "../common/Toast";
import ProjectCard from "./ProjectCard";
import KanbanColumn from "./KanbanColumn";
import { PlusIcon, FolderOpenIcon } from "../common/Icons.jsx";
import { cn } from "@/lib/utils"; // Importă utilitarul `cn` pentru a combina clasele Tailwind.

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [archivedProjects, setArchivedProjects] = useState([]);
  const { toasts, toast } = useToast();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [showArchived, setShowArchived] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [archiveFolderName, setArchiveFolderName] = useState("");
  const [isArchiveDialogOpen, setArchiveDialogOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    owner: "",
    deadline: "",
    status: "Active",
    methodology: "Scrum",
    tags: "",
    priority: "Medium",
    repo: "",
    type: "internal",
    progress: 0,
    notes: "",
    icon: "",
  });
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const [editProject, setEditProject] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const [projectToDuplicate, setProjectToDuplicate] = useState(null);
  const [duplicateName, setDuplicateName] = useState("");
  const [isDuplicateDialogOpen, setDuplicateDialogOpen] = useState(false);

  const statuses = [
    "Active",
    "In Progress",
    "On Hold",
    "Completed",
    "Archived",
  ];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const types = ["internal", "external", "research", "feature development"];

  const handleCreateProject = () => {
    if (newProject.name && newProject.owner && newProject.deadline) {
      const tagsArray = newProject.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      const projectToAdd = {
        ...newProject,
        id: `proj-${Date.now()}`,
        team: teamMembers
          .filter((member) => member.name === newProject.owner)
          .map((m) => m.initials),
        tags: tagsArray,
        createdAt: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
        isPinned: false,
      };
      setProjects([...projects, projectToAdd]);
      setNewProject({
        name: "",
        description: "",
        owner: "",
        deadline: "",
        status: "Active",
        methodology: "Scrum",
        tags: "",
        priority: "Medium",
        repo: "",
        type: "internal",
        progress: 0,
        notes: "",
        icon: "",
      });
      setCreateDialogOpen(false);
      toast({
        title: "Proiect creat!",
        description: "Proiectul a fost adăugat cu succes.",
      });
    }
  };

  const handleArchiveProject = (id) => {
    const projectToArchive = projects.find((proj) => proj.id === id);
    if (projectToArchive) {
      setProjects(projects.filter((proj) => proj.id !== id));
      setArchivedProjects([
        ...archivedProjects,
        { ...projectToArchive, isPinned: false, status: "Archived" },
      ]);
      toast({
        title: "Proiect arhivat!",
        description: "Proiectul a fost mutat în arhivă.",
        variant: "destructive",
      });
    }
  };

  const handleUnarchiveProject = (id) => {
    const projectToUnarchive = archivedProjects.find((proj) => proj.id === id);
    if (projectToUnarchive) {
      setArchivedProjects(archivedProjects.filter((proj) => proj.id !== id));
      setProjects([...projects, { ...projectToUnarchive, status: "Active" }]);
      toast({
        title: "Proiect dezarhivat!",
        description: "Proiectul a fost restaurat.",
      });
    }
  };

  const handleEdit = (project) => {
    setEditProject({
      ...project,
      tags: project.tags.join(", "),
    });
    setEditDialogOpen(true);
  };

  const handleUpdateProject = () => {
    if (
      editProject &&
      editProject.name &&
      editProject.owner &&
      editProject.deadline
    ) {
      const tagsArray = editProject.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      const updatedProjects = projects.map((proj) =>
        proj.id === editProject.id
          ? {
              ...proj,
              name: editProject.name,
              description: editProject.description,
              owner: editProject.owner,
              deadline: editProject.deadline,
              status: editProject.status,
              methodology: editProject.methodology,
              priority: editProject.priority,
              repo: editProject.repo,
              tags: tagsArray,
              lastUpdated: new Date().toISOString().slice(0, 10),
              progress: editProject.progress,
              type: editProject.type,
              notes: editProject.notes,
              icon: editProject.icon,
            }
          : proj
      );
      setProjects(updatedProjects);
      setEditDialogOpen(false);
      setEditProject(null);
      toast({
        title: "Proiect actualizat!",
        description: "Modificările au fost salvate.",
      });
    }
  };

  const handleDuplicate = (project) => {
    setProjectToDuplicate(project);
    setDuplicateName(`${project.name} (Copie)`);
    setDuplicateDialogOpen(true);
  };

  const handleDuplicateProject = () => {
    if (projectToDuplicate && duplicateName) {
      const newProject = {
        ...projectToDuplicate,
        id: `proj-${Date.now()}`,
        name: duplicateName,
        lastUpdated: new Date().toISOString().slice(0, 10),
      };
      setProjects([...projects, newProject]);
      setDuplicateDialogOpen(false);
      setProjectToDuplicate(null);
      toast({
        title: "Proiect duplicat!",
        description: "O copie a fost creată.",
      });
    }
  };

  const handleTogglePin = (id) => {
    setProjects(
      projects.map((proj) =>
        proj.id === id ? { ...proj, isPinned: !proj.isPinned } : proj
      )
    );
  };

  const handleSelectProject = (id) => {
    setSelectedProjects((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((projId) => projId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    if (selectedProjects.length > 0) {
      setShowBulkActions(true);
    } else {
      setShowBulkActions(false);
    }
  }, [selectedProjects]);

  const handleBulkArchive = () => {
    setArchiveDialogOpen(true);
  };

  const handleConfirmArchive = () => {
    if (!archiveFolderName) {
      toast({
        title: "Nume obligatoriu",
        description: "Vă rugăm introduceți un nume pentru folderul de arhivă.",
        variant: "destructive",
      });
      return;
    }

    const projectsToArchive = projects.filter((p) =>
      selectedProjects.includes(p.id)
    );
    const newArchivedFolder = {
      name: archiveFolderName,
      id: `archive-folder-${Date.now()}`,
      projects: projectsToArchive.map((p) => ({
        ...p,
        isPinned: false,
        status: "Archived",
      })),
    };

    setArchivedProjects([...archivedProjects, newArchivedFolder]);
    setProjects(projects.filter((p) => !selectedProjects.includes(p.id)));
    setSelectedProjects([]);
    setArchiveDialogOpen(false);
    setArchiveFolderName("");
    toast({
      title: "Proiecte arhivate!",
      description: `Proiectele au fost mutate în folderul "${archiveFolderName}".`,
      variant: "destructive",
    });
  };

  const handleBulkDelete = () => {
    if (showArchived) {
      const updatedArchivedFolders = archivedProjects.map((folder) => ({
        ...folder,
        projects: folder.projects.filter(
          (p) => !selectedProjects.includes(p.id)
        ),
      }));
      setArchivedProjects(updatedArchivedFolders);
      toast({
        title: "Proiecte șterse definitiv!",
        description: "Proiectele arhivate selectate au fost șterse.",
        variant: "destructive",
      });
    } else {
      setProjects(projects.filter((p) => !selectedProjects.includes(p.id)));
      toast({
        title: "Proiecte șterse!",
        description: "Proiectele selectate au fost eliminate.",
        variant: "destructive",
      });
    }
    setSelectedProjects([]);
  };

  const handleDropProject = (e, newStatus) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    if (!projectId) return;

    setProjects(
      projects.map((proj) => {
        if (proj.id === projectId) {
          return { ...proj, status: newStatus };
        }
        return proj;
      })
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const currentProjects = showArchived ? archivedProjects : projects;

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const filteredProjects = sortedProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags &&
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
      (project.owner &&
        project.owner.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFilteredAndGroupedProjects = () => {
    switch (groupBy) {
      case "status": {
        const projectsByStatus = statuses.reduce((acc, status) => {
          acc[status] = filteredProjects.filter((p) => p.status === status);
          return acc;
        }, {});
        return projectsByStatus;
      }
      case "priority": {
        const projectsByPriority = priorities.reduce((acc, priority) => {
          acc[priority] = filteredProjects.filter(
            (p) => p.priority === priority
          );
          return acc;
        }, {});
        return projectsByPriority;
      }
      case "owner": {
        const projectsByOwner = teamMembers.reduce((acc, member) => {
          acc[member.name] = filteredProjects.filter(
            (p) => p.owner === member.name
          );
          return acc;
        }, {});
        return projectsByOwner;
      }
      case "type": {
        const projectsByType = types.reduce((acc, type) => {
          acc[type] = filteredProjects.filter((p) => p.type === type);
          return acc;
        }, {});
        return projectsByType;
      }
      default: {
        const pinned = filteredProjects.filter((p) => p.isPinned);
        const unpinned = filteredProjects.filter((p) => !p.isPinned);
        return { "Toate Proiectele": [...pinned, ...unpinned] };
      }
    }
  };

  return (
    <div className="font-sans antialiased text-zinc-900 dark:text-zinc-100 bg-gray-50 dark:bg-zinc-900 min-h-screen p-4 sm:p-8">
      <style>{`
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <div className="flex gap-2 items-center">
            <span>Vizualizare:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-zinc-200 dark:bg-zinc-700 text-theme-custom-primary" // Modificat
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "kanban"
                  ? "bg-zinc-200 dark:bg-zinc-700 text-theme-custom-primary" // Modificat
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              Kanban
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <span>Grupează după:</span>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="p-2 border rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-theme-custom-primary transition-shadow" // Modificat
            >
              <option value="none">Niciuna</option>
              <option value="status">Status</option>
              <option value="priority">Prioritate</option>
              <option value="owner">Owner</option>
              <option value="type">Tip Proiect</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                showArchived
                  ? "bg-theme-custom-info/10 dark:bg-theme-custom-info/50 text-theme-custom-info" // Modificat
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {showArchived ? "Vezi Proiecte Active" : "Vezi Proiecte Arhivate"}
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Caută proiecte..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] border rounded-full p-2 bg-white dark:bg-zinc-800 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-theme-custom-primary transition-shadow" // Modificat
          />
          <button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-theme-custom-primary hover:bg-theme-custom-primary/90 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 shadow-md flex items-center gap-2" // Modificat
          >
            <PlusIcon />
            Proiect Nou
          </button>
        </div>
      </header>

      {showBulkActions && (
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-md mb-6 flex items-center gap-4">
          <span className="font-medium">
            {selectedProjects.length} proiecte selectate
          </span>
          <button
            onClick={showArchived ? handleBulkDelete : handleBulkArchive}
            className="bg-theme-custom-warning hover:bg-theme-custom-warning/90 text-white font-medium py-1 px-3 rounded-lg text-sm" // Modificat
          >
            {showArchived ? "Șterge definitiv" : "Arhivează"}
          </button>
          <button
            onClick={() => setSelectedProjects([])}
            className="border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 font-medium py-1 px-3 rounded-lg text-sm"
          >
            Anulează
          </button>
        </div>
      )}

      {currentProjects.length === 0 ? (
        <div className="text-center text-zinc-500 dark:text-zinc-400 mt-16">
          <FolderOpenIcon />
          <p className="text-xl mt-4">Nu există proiecte încă.</p>
          <p>Începe prin a crea unul!</p>
        </div>
      ) : showArchived ? (
        <div className="space-y-8 mt-8">
          {archivedProjects.length > 0 ? (
            archivedProjects.map((folder) => (
              <div key={folder.id}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FolderOpenIcon />
                  {folder.name} ({folder.projects.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {folder.projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onEdit={handleEdit}
                      onDelete={() => handleUnarchiveProject(project.id)}
                      onDuplicate={handleDuplicate}
                      onTogglePin={handleTogglePin}
                      onSelect={handleSelectProject}
                      isSelected={selectedProjects.includes(project.id)}
                      showCheckbox={true}
                      teamMembers={teamMembers}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500 dark:text-zinc-400 mt-16">
              <p className="text-xl mt-4">Nu există proiecte în arhivă.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <div className="space-y-8">
              {Object.entries(getFilteredAndGroupedProjects()).map(
                ([group, projectsInGroup]) => {
                  if (!Array.isArray(projectsInGroup)) return null;
                  return (
                    <div key={group}>
                      <h2 className="text-xl font-bold mb-4">
                        {group} ({projectsInGroup.length})
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsInGroup.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onEdit={handleEdit}
                            onDelete={handleArchiveProject}
                            onDuplicate={handleDuplicate}
                            onTogglePin={handleTogglePin}
                            onSelect={handleSelectProject}
                            isSelected={selectedProjects.includes(project.id)}
                            showCheckbox={true}
                            teamMembers={teamMembers}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

          {viewMode === "kanban" && (
            <div className="flex flex-col sm:flex-row gap-6 overflow-x-auto pb-4">
              {statuses
                .filter((s) => s !== "Archived")
                .map((status) => {
                  const projectsForColumn = filteredProjects.filter(
                    (p) => p.status === status
                  );
                  return (
                    <KanbanColumn
                      key={status}
                      title={status}
                      status={status}
                      projects={projectsForColumn}
                      onEdit={handleEdit}
                      onDelete={handleArchiveProject}
                      onDuplicate={handleDuplicate}
                      onTogglePin={handleTogglePin}
                      onSelect={handleSelectProject}
                      selectedProjects={selectedProjects}
                      teamMembers={teamMembers}
                      onDropProject={handleDropProject}
                      onDragOver={handleDragOver}
                    />
                  );
                })}
            </div>
          )}
        </>
      )}

      {/* Dialogs */}
      <Dialog
        isOpen={isCreateDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        title="Creează Proiect Nou"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nume Proiect
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              placeholder="Introdu numele proiectului"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descriere</label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              rows={3}
              placeholder="Descriere detaliată a proiectului"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Owner</label>
              <select
                value={newProject.owner}
                onChange={(e) =>
                  setNewProject({ ...newProject, owner: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              >
                <option value="">Selectează owner</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Deadline</label>
              <input
                type="date"
                value={newProject.deadline}
                onChange={(e) =>
                  setNewProject({ ...newProject, deadline: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={newProject.status}
                onChange={(e) =>
                  setNewProject({ ...newProject, status: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              >
                {statuses
                  .filter((s) => s !== "Archived")
                  .map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Prioritate
              </label>
              <select
                value={newProject.priority}
                onChange={(e) =>
                  setNewProject({ ...newProject, priority: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (separate prin virgulă)
            </label>
            <input
              type="text"
              value={newProject.tags}
              onChange={(e) =>
                setNewProject({ ...newProject, tags: e.target.value })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              placeholder="frontend, backend, urgent"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setCreateDialogOpen(false)}
              className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Anulează
            </button>
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-theme-custom-primary text-white rounded-lg hover:bg-theme-custom-primary/90" // Modificat
            >
              Creează Proiect
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Editează Proiect"
      >
        {editProject && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nume Proiect
              </label>
              <input
                type="text"
                value={editProject.name}
                onChange={(e) =>
                  setEditProject({ ...editProject, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Descriere
              </label>
              <textarea
                value={editProject.description}
                onChange={(e) =>
                  setEditProject({
                    ...editProject,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Owner</label>
                <select
                  value={editProject.owner}
                  onChange={(e) =>
                    setEditProject({ ...editProject, owner: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
                >
                  <option value="">Selectează owner</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  value={editProject.deadline}
                  onChange={(e) =>
                    setEditProject({ ...editProject, deadline: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editProject.status}
                  onChange={(e) =>
                    setEditProject({ ...editProject, status: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
                >
                  {statuses
                    .filter((s) => s !== "Archived")
                    .map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Prioritate
                </label>
                <select
                  value={editProject.priority}
                  onChange={(e) =>
                    setEditProject({ ...editProject, priority: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Tags (separate prin virgulă)
              </label>
              <input
                type="text"
                value={editProject.tags}
                onChange={(e) =>
                  setEditProject({ ...editProject, tags: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setEditDialogOpen(false)}
                className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Anulează
              </button>
              <button
                onClick={handleUpdateProject}
                className="px-4 py-2 bg-theme-custom-primary text-white rounded-lg hover:bg-theme-custom-primary/90" // Modificat
              >
                Salvează
              </button>
            </div>
          </div>
        )}
      </Dialog>

      <Dialog
        isOpen={isDuplicateDialogOpen}
        onClose={() => setDuplicateDialogOpen(false)}
        title="Duplică Proiect"
      >
        <div className="space-y-4">
          <p>Introduceți un nume pentru copia proiectului:</p>
          <input
            type="text"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
            placeholder="Numele noului proiect"
          />
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setDuplicateDialogOpen(false)}
              className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Anulează
            </button>
            <button
              onClick={handleDuplicateProject}
              className="px-4 py-2 bg-theme-custom-primary text-white rounded-lg hover:bg-theme-custom-primary/90" // Modificat
            >
              Duplică
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={isArchiveDialogOpen}
        onClose={() => setArchiveDialogOpen(false)}
        title="Arhivează Proiecte"
      >
        <div className="space-y-4">
          <p>Introduceți un nume pentru folderul de arhivă:</p>
          <input
            type="text"
            value={archiveFolderName}
            onChange={(e) => setArchiveFolderName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-theme-custom-primary focus:border-transparent dark:bg-zinc-700 dark:text-zinc-100" // Modificat
            placeholder="Numele folderului..."
          />
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setArchiveDialogOpen(false)}
              className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Anulează
            </button>
            <button
              onClick={handleConfirmArchive}
              className="px-4 py-2 bg-theme-custom-primary text-white rounded-lg hover:bg-theme-custom-primary/90" // Modificat
            >
              Arhivează
            </button>
          </div>
        </div>
      </Dialog>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
