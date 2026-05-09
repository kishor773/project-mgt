-- =========================================================
-- PROJECT MANAGEMENT APPLICATION DATABASE SCHEMA
-- MySQL 8+
-- =========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS project_mgt;
CREATE DATABASE project_mgt;
USE project_mgt;
-- =========================================================
-- ORGANIZATIONS
-- =========================================================

CREATE TABLE organizations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    organization_id BIGINT NOT NULL,

    first_name VARCHAR(100),
    last_name VARCHAR(100),

    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    avatar_url TEXT,

    status ENUM(
        'active',
        'inactive',
        'invited'
    ) DEFAULT 'active',

    last_login_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_users_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- ROLES
-- =========================================================

CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================
-- USER ROLES
-- =========================================================

CREATE TABLE user_roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_user_role
        UNIQUE(user_id, role_id)
) ENGINE=InnoDB;

-- =========================================================
-- PROJECTS
-- =========================================================

CREATE TABLE projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    organization_id BIGINT NOT NULL,

    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),

    description TEXT,

    start_date DATE,
    end_date DATE,

    status ENUM(
        'planned',
        'active',
        'on_hold',
        'completed',
        'cancelled'
    ) DEFAULT 'planned',

    created_by BIGINT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_projects_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_projects_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- PROJECT MEMBERS
-- =========================================================

CREATE TABLE project_members (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    role ENUM(
        'owner',
        'manager',
        'developer',
        'tester',
        'viewer'
    ) DEFAULT 'developer',

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_members_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_members_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT uk_project_member
        UNIQUE(project_id, user_id)
) ENGINE=InnoDB;

-- =========================================================
-- MILESTONES
-- =========================================================

CREATE TABLE milestones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    project_id BIGINT NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    due_date DATE,

    status ENUM(
        'pending',
        'in_progress',
        'completed'
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_milestones_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- SPRINTS
-- =========================================================

CREATE TABLE sprints (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    project_id BIGINT NOT NULL,

    name VARCHAR(255) NOT NULL,
    goal TEXT,

    start_date DATE,
    end_date DATE,

    status ENUM(
        'planned',
        'active',
        'completed'
    ) DEFAULT 'planned',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_sprints_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- LABELS
-- =========================================================

CREATE TABLE labels (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    organization_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,
    color VARCHAR(20),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_labels_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- BOARD COLUMNS (KANBAN)
-- =========================================================

CREATE TABLE board_columns (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    project_id BIGINT NOT NULL,

    name VARCHAR(100) NOT NULL,

    position INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_board_columns_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- TASKS
-- =========================================================

CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    project_id BIGINT NOT NULL,
    sprint_id BIGINT NULL,
    milestone_id BIGINT NULL,

    board_column_id BIGINT NULL,

    parent_task_id BIGINT NULL,

    title VARCHAR(255) NOT NULL,
    description LONGTEXT,

    type ENUM(
        'task',
        'bug',
        'story',
        'epic',
        'improvement'
    ) DEFAULT 'task',

    priority ENUM(
        'low',
        'medium',
        'high',
        'critical'
    ) DEFAULT 'medium',

    status ENUM(
        'todo',
        'in_progress',
        'review',
        'blocked',
        'done'
    ) DEFAULT 'todo',

    assignee_id BIGINT NULL,
    reporter_id BIGINT NULL,

    estimated_hours DECIMAL(10,2) DEFAULT 0,
    actual_hours DECIMAL(10,2) DEFAULT 0,

    progress_percent TINYINT DEFAULT 0,

    recurrence_rule VARCHAR(255) NULL,

    start_date DATETIME NULL,
    due_date DATETIME NULL,
    completed_at DATETIME NULL,

    sort_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_tasks_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tasks_sprint
        FOREIGN KEY (sprint_id)
        REFERENCES sprints(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_tasks_milestone
        FOREIGN KEY (milestone_id)
        REFERENCES milestones(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_tasks_board_column
        FOREIGN KEY (board_column_id)
        REFERENCES board_columns(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_tasks_parent_task
        FOREIGN KEY (parent_task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tasks_assignee
        FOREIGN KEY (assignee_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_tasks_reporter
        FOREIGN KEY (reporter_id)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- TASK LABELS
-- =========================================================

CREATE TABLE task_labels (
    task_id BIGINT NOT NULL,
    label_id BIGINT NOT NULL,

    PRIMARY KEY(task_id, label_id),

    CONSTRAINT fk_task_labels_task
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_task_labels_label
        FOREIGN KEY (label_id)
        REFERENCES labels(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- TASK DEPENDENCIES
-- =========================================================

CREATE TABLE task_dependencies (
    task_id BIGINT NOT NULL,
    depends_on_task_id BIGINT NOT NULL,

    PRIMARY KEY(task_id, depends_on_task_id),

    CONSTRAINT fk_task_dependencies_task
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_task_dependencies_depends_on
        FOREIGN KEY (depends_on_task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- COMMENTS
-- =========================================================

CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    comment LONGTEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_comments_task
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- ATTACHMENTS
-- =========================================================

CREATE TABLE attachments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    task_id BIGINT NOT NULL,

    uploaded_by BIGINT NOT NULL,

    file_name VARCHAR(255),
    file_url TEXT,

    mime_type VARCHAR(100),
    file_size BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attachments_task
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attachments_user
        FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- TIME LOGS
-- =========================================================

CREATE TABLE time_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    started_at DATETIME,
    ended_at DATETIME,

    duration_minutes INT DEFAULT 0,

    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_time_logs_task
        FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_time_logs_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- ACTIVITY LOGS
-- =========================================================

CREATE TABLE activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    organization_id BIGINT NOT NULL,

    user_id BIGINT NULL,

    entity_type VARCHAR(100),
    entity_id BIGINT,

    action VARCHAR(100),

    old_values JSON,
    new_values JSON,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_activity_logs_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_activity_logs_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- NOTIFICATIONS
-- =========================================================

CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    type VARCHAR(100),

    title VARCHAR(255),
    message TEXT,

    is_read BOOLEAN DEFAULT FALSE,

    entity_type VARCHAR(100),
    entity_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_users_organization
ON users(organization_id);

CREATE INDEX idx_projects_organization
ON projects(organization_id);

CREATE INDEX idx_tasks_project
ON tasks(project_id);

CREATE INDEX idx_tasks_assignee
ON tasks(assignee_id);

CREATE INDEX idx_tasks_reporter
ON tasks(reporter_id);

CREATE INDEX idx_tasks_status
ON tasks(status);

CREATE INDEX idx_tasks_priority
ON tasks(priority);

CREATE INDEX idx_tasks_due_date
ON tasks(due_date);

CREATE INDEX idx_tasks_parent
ON tasks(parent_task_id);

CREATE INDEX idx_comments_task
ON comments(task_id);

CREATE INDEX idx_time_logs_task
ON time_logs(task_id);

CREATE INDEX idx_notifications_user
ON notifications(user_id);

CREATE INDEX idx_activity_logs_entity
ON activity_logs(entity_type, entity_id);

CREATE INDEX idx_activity_logs_org
ON activity_logs(organization_id);

-- =========================================================
-- DEFAULT ROLES
-- =========================================================

INSERT INTO roles (name, description)
VALUES
('Admin', 'System administrator'),
('Project Manager', 'Manages projects'),
('Developer', 'Development team member'),
('Tester', 'QA team member'),
('Viewer', 'Read-only access');

SET FOREIGN_KEY_CHECKS = 1;