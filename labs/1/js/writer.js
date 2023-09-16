let typingTimer;
        const doneTypingInterval = 2500; // 1 second (adjust as needed)

        // Define the Note constructor
        function Note() {
            this.text = '';
        }

        // Create an array to hold note objects
        const notesArray = [];

        // Function to add a new note input
        document.addEventListener('DOMContentLoaded', () => {
            function addNoteInput() {
                const notesContainer = document.getElementById('notesContainer');
                const noteInput = document.createElement('input');
                noteInput.type = 'text';
    
                // Create a "REMOVE" button for each note
                const removeButton = document.createElement('button');
                removeButton.textContent = 'REMOVE';
    
                // Create a container div for the note and the remove button
                const noteContainer = document.createElement('div');
                noteContainer.appendChild(noteInput);
                noteContainer.appendChild(removeButton);
    
                notesContainer.appendChild(noteContainer);
    
                // Create a new note object and add it to the array
                const newNote = new Note();
                notesArray.push(newNote);
    
                // Listen for changes in the input field
                noteInput.addEventListener('input', function () {
                    clearTimeout(typingTimer);
                    typingTimer = setTimeout(saveNotes, doneTypingInterval);
                });
    
                // Add click event listener to the "REMOVE" button
                removeButton.addEventListener('click', function () {
                    const index = notesArray.indexOf(newNote);
                    if (index !== -1) {
                        notesArray.splice(index, 1);
                    }
                    notesContainer.removeChild(noteContainer);
                    saveNotes(); // Save notes after removing one
                });
            }
    
            // Function to save notes in local storage
            function saveNotes() {
                const noteInputs = document.querySelectorAll('#notesContainer input');
    
                noteInputs.forEach(function (noteInput, index) {
                    notesArray[index].text = noteInput.value.trim();
                });
    
                // Filter out empty notes
                const savedNotes = notesArray.map(function (note) {
                    return note.text;
                }).filter(function (noteText) {
                    return noteText !== '';
                });
    
                localStorage.setItem('notes', JSON.stringify(savedNotes));
                updateTime();
            }
    
            // Function to load and display notes from local storage
            function loadNotes() {
                const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    
                const notesContainer = document.getElementById('notesContainer');
                savedNotes.forEach(function (noteText) {
                    const noteContainer = document.createElement('div');
                    const noteInput = document.createElement('input');
                    noteInput.type = 'text';
                    noteInput.value = noteText;
    
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'REMOVE';
    
                    noteContainer.appendChild(noteInput);
                    noteContainer.appendChild(removeButton);
                    notesContainer.appendChild(noteContainer);
    
                    const newNote = new Note();
                    newNote.text = noteText;
                    notesArray.push(newNote);
    
                    noteInput.addEventListener('input', function () {
                        clearTimeout(typingTimer);
                        typingTimer = setTimeout(saveNotes, doneTypingInterval);
                    });
    
                    removeButton.addEventListener('click', function () {
                        const index = notesArray.indexOf(newNote);
                        if (index !== -1) {
                            notesArray.splice(index, 1);
                        }
                        notesContainer.removeChild(noteContainer);
                        saveNotes();
                    });
                });
            }
    
            // Add event listener to the "Add Note" button
            document.getElementById('addButton').addEventListener('click', addNoteInput);
    
            // Load and display existing notes when the page loads
            loadNotes();
            function updateTime() {
                const currentTimeElement = document.getElementById('currentTime');
                const now = new Date();
                const timeString = now.toLocaleTimeString(); // Get the current time as a string
            
                currentTimeElement.textContent = 'Stored At: ' + timeString;
            }
            
            // Call updateTime() to display the initial time
            
            // Update the time every second (1000 milliseconds)
            setInterval(updateTime, 2500);
            
        })
       