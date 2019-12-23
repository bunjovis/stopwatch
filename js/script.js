/* MultiStop
*   This controls and adds stopwatches to index.html.
*/

// Array to store stopwatches and counter for their ids
let stopwatches = [];
let stopwatchCount = 0;

// eventlistener for "Add new stopwatch"-button
document.getElementById("addstopwatch").addEventListener("click", addStopwatch);

// Stopwatch class
class Stopwatch {
    constructor(id) {
        this.id = id;
        this.timeElapsed = 0;
        this.running = false;
        this.stopwatch;
        // Get all html elements ready
        this.stopwatchDiv = document.getElementById(`stopwatch${id}`);
        this.stopwatchText = document.getElementById(`stopwatchtext${id}`);
        this.stopwatchSpan = document.getElementById(`stopwatchspan${id}`);
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
        // Remove stopwatch element from document 
        this.stopwatchDiv.parentElement.removeChild(this.stopwatchDiv);
        // Call deletestopwatch to remove this instance of Stopwatch class
        deleteStopwatch(this.id);
    }

    // Returns time formatted to document
    timeFormatted = () => {
        return (this.timeElapsed/1000)+"s";
    }

    // Update time to document
    update = () => {
        // Add 100ms to elapsed time and update it to document
        this.timeElapsed += 100;
        this.stopwatchSpan.innerHTML = this.timeFormatted();
    }

    // Start stopwatch
    startStopwatch = () => {
        this.running = true;
        this.stopwatch = setInterval(this.update,100);
    }

    // Stop stopwatch
    stopStopwatch = () => {  
        this.running = false;
        clearInterval(this.stopwatch);
    }

    // Reset stopwatch
    reset = () => {
        // Set time to 0 and stop stopwatch
        this.timeElapsed = 0;
        this.stopStopwatch();
        // Change startbutton color
        this.startButton.classList.add("btn-success");
        this.startButton.classList.remove("btn-warning");
        // Change startbutton text
        this.startButton.innerHTML = "Start";
        // Stop time from blinking and set is as 0
        this.stopwatchSpan.classList.remove("paused");
        this.stopwatchSpan.innerHTML = this.timeFormatted();
        // Change border color
        this.stopwatchDiv.classList.remove("border-success");
        this.stopwatchDiv.classList.add("border-warning");
        // Change stopwatch name color
        this.stopwatchText.classList.remove("text-success");
        this.stopwatchText.classList.add("text-warning");
    }
    
    // Handle click of startstop-button
    startStop = () => {
        if (this.running) {
            // Stop stopwatch
            this.stopStopwatch();
            // Change startbutton color
            this.startButton.classList.add("btn-success");
            this.startButton.classList.remove("btn-warning");
            // Change startbutton text
            this.startButton.innerHTML = "Continue";
            // Start blinking time
            this.stopwatchSpan.classList.add("paused");
            // Change border color
            this.stopwatchDiv.classList.remove("border-success");
            this.stopwatchDiv.classList.add("border-warning");
            // Change stopwatch name color
            this.stopwatchText.classList.remove("text-success");
            this.stopwatchText.classList.add("text-warning");
        }
        else {
            // Start stopwatch
            this.startStopwatch();
            // Change startbutton color
            this.startButton.classList.add("btn-warning");
            this.startButton.classList.remove("btn-success");
            // Change startbutton text
            this.startButton.innerHTML = "Stop";
            // Stop time from blinking
            this.stopwatchSpan.classList.remove("paused");
             // Change border color
            this.stopwatchDiv.classList.add("border-success");
            this.stopwatchDiv.classList.remove("border-warning");
            // Change stopwatch name color
            this.stopwatchText.classList.add("text-success");
            this.stopwatchText.classList.remove("text-warning");
        }
    }
}

// Function to add new stopwatch
function addStopwatch() {
    // Create new element with id of stopwatchid
    let newElement = document.createElement("div");
    newElement.classList = "p-0 col-5 card border-warning mb-3";
    newElement.id = `stopwatch${stopwatchCount}`;
    // Create HTML element for stopwatch
    newElement.innerHTML = 
    `<div class="card-header">
        <h5 class="card-title text-warning" contenteditable="true" id="stopwatchtext${stopwatchCount}">Edit name by clicking here</h5>
        <a role="button" class="float-right btn btn-danger" id="delete${stopwatchCount}">Delete this</a>
    </div>
    <div class="card-body">
        <span id="stopwatchspan${stopwatchCount}" class="stopwatch">0s</span>
        <a role="button" class="float-right btn btn-danger" id="reset${stopwatchCount}">Reset</a>
        <a role="button" class="float-right btn btn-success" id="startstop${stopwatchCount}">Start</a>
    </div>`;
    // Append stopwatch element to document
    document.getElementById("stopwatches").appendChild(newElement);
    // Create new stopwatch to stopwatches array and increase count
    let newStopwatch = new Stopwatch(stopwatchCount);
    stopwatches.push(newStopwatch);
    stopwatchCount++;
}

// Function to delete stopwatch 
function deleteStopwatch(id) {
    delete stopwatches[id];
}