# Series Character Tree

Welcome to the **Series Character Tree** project! This repository hosts a web application that allows users to select characters from popular series like "Friends" and "The Big Bang Theory" and manage their family trees.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
  - [Implemented Features](#implemented-features)
  - [Potential Improvements](#potential-improvements)
    - [Frontend Improvements](#frontend-improvements)
    - [Backend Improvements](#backend-improvements)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Setup Instructions](#setup-instructions)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

---

## Introduction

This project consists of two main parts:
1. **Backend**: An API server built with ASP.NET Core responsible for managing series data.
2. **Frontend**: A user interface built with **React** and **Next.js**, interacting with the backend to provide an interactive and seamless experience.

The application allows you to:
- Select series.
- Display character family trees.
- Customize the user interface, such as dropdown width.

---

## Features

### Implemented Features

#### Frontend Features:
1. **Interactive Series Selection**:
   - Users can select between "Friends" and "The Big Bang Theory."
   - Highlights the selected series with smooth visual transitions (hover and click effects).
2. **Dropdown with Width Adjustment**:
   - Dynamic dropdown width adjustment via a slider.
   - Real-time UI updates supported by the slider.
   - Focus is automatically directed to the search bar when the dropdown opens, while still scrolling the list to the selected item.
   - Animation for opening/closing the dropdown, accompanied by a visual arrow indicator reflecting the current state.
   - Long names are truncated with ellipsis (`...`), and a tooltip shows the full name when hovered over (both in the list and for the selected item).
   - The dropdown opens starting from the current selected value when an item is chosen.
   - Keyboard-friendly interactions:
      - **Enter Key**: Opens the dropdown when focused.
3. **Responsive Design**:
   - Works seamlessly across various screen sizes, including mobile, tablet, and desktop.
4. **Loading State**:
   - Displays a centered spinner while fetching data dynamically from the backend API.
5. **Error Handling**:
   - Shows clear error messages in case of connection or data fetching issues.

#### Backend Features:
1. **Family Tree Logic**:
   - Supports managing hierarchical family tree structures for characters in a series.
2. **Mock Data Support**:
   - Can be easily switched between mock data and a real database.
3. **REST API**:
   - Provides clear and structured endpoints for communication with the frontend.
4. **ASP.NET Core Robustness**:
   - Backend built with cutting-edge .NET technology for reliable and efficient performance.

---

### Potential Improvements

#### Frontend Improvements:
1. Enhance keyboard interaction by enabling:
   - **Arrow Keys**: Traverse the dropdown items even when the list is closed.
   - Filter the dropdown content with case-sensitive filtering, offering options such as `startsWith`, `contains`, or `endsWith`.
2. Add animation options with an `animationSettings` parameter, supporting effects like SlideDown and Fade-in.
3. Implement tree-like dropdown functionality to handle nested data structures.
4. Allow multiple item selection with checkboxes.
5. Improve localization support for additional languages.
6. Use `React.memo` to minimize unnecessary re-renders triggered by non-essential changes (e.g., highlight or selected state).
7. Add advanced keyboard support, such as `Home`, `Page Up`, and `Page Down` keys, for faster navigation within large lists.
8. Optimize large dropdowns using **react-window** for virtualized scrolling, which limits rendering to visible items and boosts performance.

#### Backend Improvements:
1. Enable API response caching to reduce server load and improve response times.
2. Introduce pagination support for handling large datasets efficiently.
3. Add a logging system to track errors and operations (e.g., logging who accessed the tree and when).
4. Incorporate coding guidelines using an `.editorconfig` file to ensure consistent standards across the codebase.

#### General Improvements:
1. Add an editor configuration file (`.editorconfig`) for both frontend and backend to enforce project coding guidelines.

---

## Prerequisites

Before starting, make sure you have the following tools installed:
- **Node.js** (v18 or higher): [Download Node.js](https://nodejs.org)
- **.NET SDK** (version 8.0 or compatible): [Download .NET](https://dotnet.microsoft.com/download)
- **Git**: [Download Git](https://git-scm.com/)

Additionally:
- Use an editor such as **VS Code** or **Visual Studio 2022** for an enhanced development experience.

---

## Installation

### Setup Instructions

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/nunezmichaelsp/family-tree-project
   cd family-tree-project
   ```

2. Make sure you're in the root directory of the project.

---

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore the project's dependencies:
   ```bash
   dotnet restore
   ```

3. Make sure you're in the root directory of the project: <user-route>/family-tree-project/backend/.

4. Run the project:
   ```bash
   dotnet run
   ```

   OR run the solution in Debug mode and http from Visual Studio 2022.

4. By default, the backend will be available at `http://localhost:5118`, and the API endpoint will be accessible at `http://localhost:5118/api`.

---

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   cd family-tree-ui
   ```

2. Make sure you're in the root directory of the project: <user-route>/family-tree-project/frontend/family-tree-ui/.


2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root of the `family-tree-ui` directory with the following variables (customize according to your backend's port):
   ```env
   REACT_APP_API_URL=http://localhost:5118/api
   REACT_APP_CLIENT_ID=my-constant-client-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the project in your browser at `http://localhost:3000`.

---

## Usage

1. Open the application in your browser (`http://localhost:3000`).
2. Select a series (e.g., "Friends" or "The Big Bang Theory").
3. View the character tree and explore their relationships.
4. Adjust the dropdown width using the slider located in the bottom right corner.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Contact

If you have any questions or suggestions, please reach out to the developer:

- **Michael Nunez**
- **Email**: nunezmichaelsp@gmail.com
- **GitHub**: [michaelnunezsp](https://github.com/michaelnunezsp)