# Monopod

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern monorepo setup with Next.js frontend and FastAPI backend, designed for building multi-agent workflows. This template provides a solid foundation for full-stack TypeScript and Python development.

## Features

- 🚀 Next.js frontend with Tailwind CSS for styling
- 🐍 FastAPI backend with example endpoints
- 📦 Monorepo structure using Nx
- 🔄 Full-stack TypeScript support
- 🎨 Clean architecture and component structure
- ⚡ Hot-reloading for both frontend and backend

## Project Structure

```
monopod/
├── apps/
│   ├── frontend/     # Next.js application
│   └── api/         # FastAPI backend
```

## Requirements

- Python 3.9 or higher
- Node.js 18 or higher
- pnpm (Node package manager)

## First-Time Setup

1. Clone the repository:
```bash
git clone https://github.com/joshcoolman-smc/monopod.git
cd monopod
```

2. Set up the FastAPI Backend:
```bash
# Navigate to the API directory
cd apps/api

# Create and activate Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

3. Set up the Next.js Frontend:
```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
pnpm install
```

## Regular Usage

You'll need two terminal windows to run the application:

1. Start the Backend (Terminal 1):
```bash
cd apps/api
source venv/bin/activate  # On Windows use: venv\Scripts\activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

2. Start the Frontend (Terminal 2):
```bash
cd apps/frontend
pnpm dev -p 4200
```

3. Access the Application:
- Frontend: Open [http://localhost:4200](http://localhost:4200) in your browser
- Backend API endpoints:
  - [http://localhost:8000](http://localhost:8000) - Returns welcome message
  - [http://localhost:8000/items/{id}](http://localhost:8000/items/123) - Returns item message (replace {id} with a number)

## Development

The application features hot-reloading:
- Frontend changes will automatically refresh in the browser
- Backend changes will automatically restart the server

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Feel free to use it as-is if you find it useful.
