// Function to display notes from local storage
document.addEventListener('DOMContentLoaded', () => {
    function displayNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const notesContainer = document.getElementById('notesContainer');
    
        // Clear the existing notes
        notesContainer.innerHTML = '';
    
        // Loop through each saved note and display it
        savedNotes.forEach(function (noteText) {
            // Create a paragraph element for each note
            const noteParagraph = document.createElement('p');
            noteParagraph.textContent = noteText;
            notesContainer.appendChild(noteParagraph);
        });
    }
    
    // Initial display of notes
    displayNotes();
    
    // Listen for changes in local storage and update notes
    window.addEventListener('storage', function (e) {
        if (e.key === 'notes') {
            displayNotes();
        }
    });
    function updateTime() {
        const currentTimeElement = document.getElementById('currentTime');
        const now = new Date();
        const timeString = now.toLocaleTimeString(); // Get the current time as a string
    
        currentTimeElement.textContent = 'Current Time: ' + timeString;
    }
    
    // Call updateTime() to display the initial time
    updateTime();
    
    // Update the time every second (1000 milliseconds)
    setInterval(updateTime, 2500);
    
})