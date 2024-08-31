document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No previous projects found.</p>';
        return;
    }

    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        
        const projectDate = document.createElement('p');
        projectDate.textContent = `Date: ${project.date}`;
        
        const projectFiles = document.createElement('p');
        projectFiles.textContent = `Files: ${project.files.join(', ')}`;
        
        const projectModifications = document.createElement('p');
        projectModifications.textContent = `Modifications: ${project.modifications}`;
        
        projectDiv.appendChild(projectDate);
        projectDiv.appendChild(projectFiles);
        projectDiv.appendChild(projectModifications);
        
        projectsContainer.appendChild(projectDiv);
    });
});