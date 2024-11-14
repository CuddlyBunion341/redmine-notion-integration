export interface Project {
    id: number;
    name: string;
}

export interface Tracker {
    id: number;
    name: string;
}

export interface Status {
    id: number;
    name: string;
    is_closed: boolean;
    description: string;
}

export interface Priority {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
}

export interface FixedVersion {
    id: number;
    name: string;
}

export interface CustomField {
    id: number;
    name: string;
    value: string;
}

export interface Issue {
    id: number;
    project: Project;
    tracker: Tracker;
    status: Status;
    priority: Priority;
    author: User;
    assigned_to: User;
    fixed_version: FixedVersion;
    subject: string;
    description: string;
    start_date: string; // Consider using Date type or string to work with ISO date strings
    due_date: string | null; // Nullable
    done_ratio: number;
    is_private: boolean;
    estimated_hours: number | null; // Nullable
    total_estimated_hours: number | null; // Nullable
    spent_hours: number;
    total_spent_hours: number;
    custom_fields: CustomField[];
    created_on: string; // Consider using Date type or string to work with ISO date strings
    updated_on: string; // Consider using Date type or string to work with ISO date strings
    closed_on: string | null; // Nullable
}
