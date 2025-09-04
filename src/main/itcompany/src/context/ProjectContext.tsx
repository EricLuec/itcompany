'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

export type Project = {
    id: number;
    name: string;
    description: string;
    manager: string;
    workerList: string[];
    creationDate: string;
    startDate: string;
    endDate: string;
    budget: number;
    status: ProjectStatus;
};

type ProjectContextType = {
    projects: Project[];
    loading: boolean;
    addProject: (project: Project) => void;
    refreshProjects: () => Promise<void>;
    deleteProject: (id: number) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/projects');
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const addProject = (project: Project) => {
        setProjects(prev => [...prev, project]);
    };

    const refreshProjects = async () => {
        await fetchProjects();
    };

    const deleteProject = async (id: number) => {
        if (!confirm('Dieses Projet wirklich löschen?')) return;
        try {
            const res = await fetch(`http://localhost:8080/projects/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            setProjects((prev) => prev.filter((project) => project.id !== id));
        } catch (err) {
            console.error(err);
            alert('Löschen fehlgeschlagen.');
        }
    };

    return (
        <ProjectContext.Provider value={{ projects, loading, addProject, refreshProjects, deleteProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (!context) throw new Error('useProjects must be used within a ProjectProvider');
    return context;
}
