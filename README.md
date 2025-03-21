# Talent Lens

Talent Lens is a tool designed to analyze resumes and provide insights into the predominant nature of the candidate's skills—whether they lean towards soft skills or hard skills. 


## Transition to React

The decision to switch to React for Talent Lens was made to reassess and test some core front-end concepts. While Svelte offered an excellent experience and i appreciate its simplicity and performance benefits, React provides a robust ecosystem and a component-based architecture that is beneficial for this simple project.


## Overview

Talent Lens serves as a platform where recruiters and HR professionals can upload candidates' resumes. The application then processes these resumes to highlight key areas such as:

- **Skills Assessment**: Categorizes listed skills into 'soft' and 'hard' skills.
- **Skill Profiling**: Determines if the candidate is more oriented towards soft skills or hard skills based on the analysis.

The final output presents a profile that aids decision-makers in understanding the candidate's potential and suitability for roles requiring specific skill sets.


## Running Talent Lens Locally

### Prerequisites
- **Docker** or **Podman** (or any other containerization tool that supports Docker Compose)
- Python

### Step 1: Clone the Repository
``` bash
git clone --recurse-submodules https://github.com/edvardsanta/TalentLens.git
```
### Step 2: Build and Run the Containers
To generate the necessary environment variables, run the Python script:
This script will:
- Initialize a SQLite database (config.db) to store some configuration.
- Ask for a JWT Secret if it’s not already in the database.
- Generate .env files for the backend and frontend
``` bash
python ./run_locally.py
```
The Python script also starts Docker Compose to build and run the services for the application.

### Step 3: Access the Application
Once the containers are up and running:
- Access the application at http://localhost:3000.

### Step 4: Register a User
- Go to the application and register a user.
- Do login

Step 5: Use the Application
- Use the application to upload multiple resumes and see whether the skills identified in the resumes are categorized as soft skills or hard skills.


## Tech Stack
<img src="https://skillicons.dev/icons?i=go,cs,react,javascript,typescript,bootstrap,scss,mongo,postgres,sqlite,rabbitmq" /><br>
