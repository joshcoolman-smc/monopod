# Monorepo Setup Guide for Agentic Workflows

This guide provides a high-level overview of setting up a monorepo for creating multi-agent workflows with Next.js frontend and Python backend using PydanticAI.

## Project Structure

```
monorepo/
├── apps/
│   ├── frontend/          # Next.js application
│   └── backend/           # Python backend
├── libs/
│   ├── shared/            # Shared types and utilities
│   └── agents/            # Agent definitions and workflows
├── tools/                 # Development tools and scripts
├── .env                   # Environment variables
├── nx.json                # Nx workspace configuration
├── package.json           # Node.js dependencies
├── pyproject.toml         # Python dependencies
└── README.md              # Project documentation
```

## Key Components

### 1. Nx Configuration
1. Install Node.js (v18 or later) and Python (v3.9 or later)

2. Install Nx globally:
```bash
npm install -g nx@latest
```

3. Create workspace (select "integrated" when prompted):
```bash
npx create-nx-workspace@latest monorepo --preset=ts
cd monorepo
```

4. Install required Nx plugins:
```bash
npm install --save-dev @nrwl/next@latest @nrwl/python@latest
```

5. Add Next.js app:
```bash
nx g @nrwl/next:app frontend --style=css --e2e-test-runner=none
```

6. Add Python app:
```bash
nx g @nrwl/python:app backend
```

7. The commands above will create the basic structure. You'll need to manually create the following directories and files in apps/frontend/src/:
```bash
# Create directory structure
mkdir -p apps/frontend/src/{features,core/{types,utils,errors},lib/api,components/ui,store}

# Create and populate AppError.ts
cat > apps/frontend/src/core/errors/AppError.ts << 'EOL'
export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}
EOL
```

### 2. Frontend (Next.js)
The frontend app should follow this structure to support feature module development:
```
apps/frontend/
  src/
    app/
      api/
      layout.tsx
      page.tsx
    features/        # Feature modules
    core/
      types/
      utils/
      errors/
        AppError.ts
    lib/
      api/
    components/
      ui/
    store/          # Optional, for state management
```

Key aspects:
- API routes for backend communication
- UI components for workflow visualization
- TypeScript types aligned with Pydantic models
- Clean architecture structure for feature modules
- Shared UI components in components/ui
- Core utilities and error handling

### 3. Backend (Python)
- PydanticAI for agent orchestration
- FastAPI for backend API
- Poetry for dependency management
- Structured agent workflows

### 4. Shared Libraries
- TypeScript/Python type definitions
- Common utilities and helpers
- Configuration management

## Development Workflow

1. Install dependencies:
```bash
# Install Node.js dependencies
npm install

# Install Poetry (Python package manager)
curl -sSL https://install.python-poetry.org | python3 -

# Install Python dependencies
cd apps/backend
poetry install
cd ../..
```

2. Run development servers:
   - Frontend: `nx serve frontend`
   - Backend: `nx serve backend`

3. Run tests:
   - Frontend: `nx test frontend`
   - Backend: `nx test backend`

4. Build project:
   - Frontend: `nx build frontend`
   - Backend: `nx build backend`

## Configuration Files

### nx.json
```json
{
  "extends": "nx/presets/npm.json",
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"]
      }
    }
  }
}
```

### pyproject.toml
```toml
[tool.poetry]
name = "backend"
version = "0.1.0"
description = ""
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.9"
fastapi = "^0.95.2"
pydantic-ai = "^0.1.0"

[tool.poetry.dev-dependencies]
pytest = "^7.3.1"
mypy = "^1.3.0"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

## Next Steps

1. Define agent workflows using PydanticAI
2. Create API endpoints for workflow execution
3. Implement frontend components for workflow management
4. Set up CI/CD pipeline
5. Configure monitoring and logging

This setup provides a solid foundation for developing and maintaining agentic workflows in a monorepo environment.
