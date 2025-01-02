
# Nx Monorepo: Next.js Frontend with FastAPI Backend

This document outlines the steps and considerations for setting up a monorepo using Nx, with a Next.js frontend and a FastAPI backend.

## 1. Project Setup & Initialization

### 1.1. Install Nx CLI

   ```bash
   npm install -g nx
   ```

### 1.2. Create the Nx Workspace

   ```bash
   npx create-nx-workspace@latest your-workspace-name --preset=empty
   cd your-workspace-name
   ```
   * Replace `your-workspace-name` with your desired project name.
   * Using the `empty` preset gives us a blank slate for full control.

### 1.3. Add Necessary Nx Plugins

   ```bash
   npm install -D @nx/next @nx/python @nx/js
   ```
   * `@nx/next`:  Provides generators and executors for Next.js applications.
   * `@nx/python`: Provides generators and executors for Python (FastAPI) applications.
    * `@nx/js`:  Provides generic JavaScript tools and executors, needed for building with Next.js
   
## 2. Backend: FastAPI App

### 2.1. Generate FastAPI Application

   ```bash
   nx g @nx/python:application api --project-name-and-root-format=as-provided --root=apps/api
   ```
   *  This creates a FastAPI app in `apps/api`. 
   *  `--project-name-and-root-format=as-provided --root=apps/api` uses the 'api' project name and sets it in the `apps/api` directory.

### 2.2. FastAPI Structure

   * **`apps/api/main.py` (Main Entry Point):**
     ```python
     from fastapi import FastAPI

     app = FastAPI()

     @app.get("/")
     def read_root():
         return {"message": "Hello from FastAPI"}

      @app.get("/items/{item_id}")
      def read_item(item_id: int):
        return {"item_id": item_id, "message": f"Item {item_id} received"}
     ```
   *  **`apps/api/Dockerfile` (Docker configuration)**

    ```dockerfile
    FROM python:3.10-slim-buster
    
    WORKDIR /app
    
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    
    COPY . .
    
    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```
  * **`apps/api/requirements.txt`**

    ```txt
    fastapi
    uvicorn[standard]
    ```
    * **`apps/api/pyproject.toml` (Project configuration)**

    ```toml
    [project]
    name = "api"
    version = "0.1.0"
    dependencies = [
        "fastapi",
        "uvicorn[standard]"
    ]
    
    [build-system]
    requires = ["setuptools>=61", "wheel"]
    build-backend = "setuptools.build_meta"
    ```

### 2.3. Run FastAPI

   ```bash
   nx serve api
   ```

   *  Access the API at `http://localhost:8000`

## 3. Frontend: Next.js App

### 3.1. Generate Next.js Application

   ```bash
   nx g @nx/next:application web --project-name-and-root-format=as-provided --root=apps/web
   ```
   * Creates a Next.js app in `apps/web`.
    * `--project-name-and-root-format=as-provided --root=apps/web` uses the 'web' project name and sets it in the `apps/web` directory.

### 3.2. Simple Frontend Component

   * **`apps/web/pages/index.tsx`:**

     ```tsx
     import React, { useEffect, useState } from 'react';

     const Home = () => {
         const [message, setMessage] = useState('Loading...');
         const [itemId, setItemId] = useState<number | null>(null);
         const [apiItemMessage, setApiItemMessage] = useState("Waiting for Item message...")

         useEffect(() => {
            fetch('http://localhost:8000')
              .then(res => res.json())
              .then(data => setMessage(data.message));
          }, []);

         const fetchItem = async () => {
            if(!itemId) return
             try {
                  const response = await fetch(`http://localhost:8000/items/${itemId}`);
                  if(response.ok){
                      const itemData = await response.json()
                      setApiItemMessage(itemData.message);
                  } else {
                    setApiItemMessage("Error retrieving item.");
                  }
             } catch (error) {
                    setApiItemMessage("Error connecting to API")
                    console.error("Error fetching item:", error)
             }
         }

       return (
         <div>
           <h1>Next.js Frontend</h1>
           <p>API Message: {message}</p>
           <hr/>
           <h2>Get Item Message</h2>
            <input 
                type="number" 
                placeholder="Enter item ID" 
                onChange={(e)=>setItemId(Number(e.target.value))}
             />
            <button onClick={fetchItem}>Fetch Item</button>
             <p>{apiItemMessage}</p>

         </div>
       );
     };

     export default Home;
     ```

### 3.3. Run Next.js

   ```bash
   nx serve web
   ```
   *  Access the frontend at `http://localhost:4200`

## 4. Development Workflow

### 4.1. Running Both Simultaneously

   You'll need two terminal sessions to run both the backend and frontend.

   *   **Terminal 1:** `nx serve api`
   *   **Terminal 2:** `nx serve web`

### 4.2. Changes and Hot Reloading
 * With `nx serve`, changes to either the api or web code will trigger hot module replacement and a refresh of the corresponding server
 * If using Docker or containerization of the api, you might need to build a new image or restart the container to see changes.

### 4.3. Testing

 *  **Backend Testing:** Use `@nx/python`'s test tooling: `nx test api`
 * **Frontend Testing:** Use `@nx/next`'s test tooling: `nx test web`

## 5. Important Considerations

*   **API Calls:**
    *   The frontend makes API calls to `http://localhost:8000`.  Consider using environment variables for production vs. development API URLs.

*   **Cross-Origin Resource Sharing (CORS):**
    *  If you need to call the api from a different domain name, you'll need to configure CORS in your fastapi app.  See FastAPI documentation on how to do this.

*   **Environment Variables:**
    * Use Nx's built-in environment variable support for sensitive configuration like API keys.
    * Nx will auto load `.env` files located at the root of each project directory.

*   **Production Build:**
    *   Build both apps separately using `nx build <app-name>`
    * You will likely need to define how to serve your api (Docker, PaaS) and the frontend (static file server)

*   **Shared Code:**
    *  Consider creating Nx libraries for shared code/logic between the frontend and backend.

## 6. Next Steps

*   Set up proper authentication for your api.
*   Define your data models and data storage mechanism.
*   Add automated deployment via CI/CD.
*   Add robust testing to both applications.
*  Explore using Nx plugins to create docker images for your API and frontend.

This template should give you a solid foundation for building a modern web application with Nx, Next.js, and FastAPI.  Remember to adapt it to your specific needs and requirements.

