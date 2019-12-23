/* MultiStop
*   This controls and adds stopwatches to index.html.
*   Also, I forgot what they were called when I first started this,
*   so everything is named after timers...
*
*   
*/

// Array to store timers and counter for them
let timers = [];
let timerCount = 0;

// eventlistener for "Add new timer"-button
document.getElementById("addtimer").addEventListener("click", addTimer);

// Timer class
class Timer {
    constructor(id) {
        this.id = id;
        this.timeElapsed = 0;
        this.running = false;
        this.timer;
        // Get all html elements ready
        this.timerDiv = document.getElementById(`timer${id}`);
        this.timerText = document.getElementById(`timertext${id}`);
        this.timerSpan = document.getElementById(`timerspan${id}`);
        this.startButton = document.getElementById(`startstop${id}`);
        this.resetButton = document.getElementById(`reset${id}`);
        this.deleteButton = document.getElementById(`delete${id}`);
        // Add event listeners for buttons
        this.startButton.addEventListener("click",this.startStop);
        this.resetButton.addEventListener("click",this.reset);
        this.deleteButton.addEventListener("click",this.delete);
    }

    // Remove element
    delete = () => {
        // Remove timer element from document 
        this.timerDiv.parentElement.removeChild(this.timerDiv);
        // Call deletetimer to remove this instance of Timer class
        deleteTimer(this.id);
    }

    // Returns time formatted to document
    timeFormatted = () => {
        return (this.timeElapsed/1000)+"s";
    }

    // Update time to document
    update = () => {
        // Add 100ms to elapsed time and update it to document
        this.timeElapsed += 100;
        this.timerSpan.innerHTML = this.timeFormatted();
    }

    // Start timer
    startTimer = () => {
        this.running = true;
        this.timer = setInterval(this.update,100);
    }

    // Stop timer
    stopTimer = () => {  
        this.running = false;
        clearInterval(this.timer);
    }

    // Reset timer
    reset = () => {
        // Set time to 0 and stop timer
        this.timeElapsed = 0;
        this.stopTimer();
        // Change startbutton color
        this.startButton.classList.add("btn-success");
        this.startButton.classList.remove("btn-warning");
        // Change startbutton text
        this.startButton.innerHTML = "Start";
        // Stop time from blinking and set is as 0
        this.timerSpan.classList.remove("paused");
        this.timerSpan.innerHTML = this.timeFormatted();
        // Change border color
        this.timerDiv.classList.remove("border-success");
        this.timerDiv.classList.add("border-warning");
        // Change timer name color
        this.timerText.classList.remove("text-success");
        this.timerText.classList.add("text-warning");
    }
    
    // Handle click of startstop-button
    startStop = () => {
        if (this.running) {
            // Stop timer
            this.stopTimer();
            // Change startbutton color
            this.startButton.classList.add("btn-success");
            this.startButton.classList.remove("btn-warning");
            // Change startbutton text
            this.startButton.innerHTML = "Continue";
            // Start blinking time
            this.timerSpan.classList.add("paused");
            // Change border color
            this.timerDiv.classList.remove("border-success");
            this.timerDiv.classList.add("border-warning");
            // Change timer name color
            this.timerText.classList.remove("text-success");
            this.timerText.classList.add("text-warning");
        }
        else {
            // Start timer
            this.startTimer();
            // Change startbutton color
            this.startButton.classList.add("btn-warning");
            this.startButton.classList.remove("btn-success");
            // Change startbutton text
            this.startButton.innerHTML = "Stop";
            // Stop time from blinking
            this.timerSpan.classList.remove("paused");
             // Change border color
            this.timerDiv.classList.add("border-success");
            this.timerDiv.classList.remove("border-warning");
            // Change timer name color
            this.timerText.classList.add("text-success");
            this.timerText.classList.remove("text-warning");
        }
    }
}

// Function to add new timer
function addTimer() {
    // Create new element with id of timerid
    let newElement = document.createElement("div");
    newElement.classList = "p-0 col-5 card border-warning mb-3";
    newElement.id = `timer${timerCount}`;
    // Create HTML element for timer
    newElement.innerHTML = 
    `<div class="card-header">
        <h5 class="card-title text-warning" contenteditable="true" id="timertext${timerCount}">Edit name by clicking here</h5>
        <a role="button" class="float-right btn btn-danger" id="delete${timerCount}">Delete this</a>
    </div>
    <div class="card-body">
        <span id="timerspan${timerCount}" class="timer">0s</span>
        <a role="button" class="float-right btn btn-danger" id="reset${timerCount}">Reset</a>
        <a role="button" class="float-right btn btn-success" id="startstop${timerCount}">Start</a>
    </div>`;
    // Append timer element to document
    document.getElementById("timers").appendChild(newElement);
    // Create new timer to timers array and increase count
    let newTimer = new Timer(timerCount);
    timers.push(newTimer);
    timerCount++;
}

// Function to delete timer 
function deleteTimer(id) {
    delete timers[id];
}