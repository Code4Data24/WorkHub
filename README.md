# Project Management System

A high-availability, multi-tenant workspace platform built using a decoupled Client–Server architecture inside a monorepo.

Live: (https://work-hub-sand.vercel.app)
For Demo , can login with email vinanit727@esyline.com and password @Test1290

---

## Architecture

**Backend:** Node.js (ESM) + Express REST API  
**Frontend:** React 19 + React Router v7 (Framework Mode) + Vite 6  
**Database:** MongoDB (Mongoose with relational modeling)  
**Styling:** Tailwind CSS v4 + Radix UI + shadcn/ui  
**State Management:** TanStack React Query + React Hook Form  
**Security:** Arcjet + JWT Authentication  

---

---

## Backend Design

### Request Pipeline

- CORS (restricted origin)
- JSON body parsing
- Morgan logging
- Arcjet firewall
- JWT authentication middleware
- Zod schema validation
- Centralized error handlers (404 / 500)

### Security

- Token bucket rate limiter (5 req / 10 sec)
- SQL injection shielding
- Bot detection
- Disposable email blocking
- Bearer JWT verification

### Data Modeling (MongoDB)

Relational mapping via Mongoose references:

- **User**
- **Workspace** (multi-tenant root, role-based members)
- **Project** (soft delete via `isArchived`)
- **Task** (nested subtasks, attachments, status workflow)
- **Comment** (mentions, reactions)
- **Activity** (audit logging)

### Route Separation

Routes → Middleware → Controllers → Models

- `/auth` – Register, login, reset password
- `/workspace` – CRUD, invite tokens
- `/project` – Workspace-scoped projects
- `/task` – Granular updates, subtasks, archival
- `/user` – Profile management

Note: Archival endpoint uses legacy route  
`/tasks/:taskId/achieved`

---

## Frontend Architecture

### Routing

React Router v7 Framework Mode with nested layouts:

- Auth Layout
- Dashboard Layout
- User Layout

### State Strategy

Server-state managed via TanStack React Query:

- Optimistic updates
- Targeted cache invalidation
- Mutation rollback on failure

Axios wrapper injects Bearer tokens automatically.

### UI System

- shadcn/ui component pattern
- Radix UI accessibility primitives
- Tailwind CSS utility-based styling

---

## Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables (backend/.env)

```
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret
ARCJET_KEY=your_key
SENDGRID_API_KEY=your_key
```

### Run Dev Environment

```bash
npm run dev
```

---

