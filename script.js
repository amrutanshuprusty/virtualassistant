// Selecting elements from the DOM for the button, content display, and voice UI.
let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

// Function to convert text to speech using SpeechSynthesisUtterance.
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1 // Speed of the speech
    text_speak.pitch=1 // Tone of the speech
    text_speak.volume=1 // Volume level
    text_speak.lang="hi-GB" // Language/accent setting (Hindi, British accent)
    window.speechSynthesis.speak(text_speak) // Trigger the speech synthesis
}

// Function to greet the user based on the time of day.
function wishMe(){
    let day=new Date() // Get the current date and time
    let hours=day.getHours() // Extract the current hour
    // Conditional greetings based on the time of day
    if(hours>=0 && hours<12){
        speak("Good Morning Boss")
    }
    else if(hours>=12 && hours<16){
        speak("Good Afternoon Boss")
    }
    else{
        speak("Good Evening Boss")
    }
}

// Event listener to call the wishMe function when the page loads
// window.addEventListener('load',()=>{
//         wishMe()
// })

// Speech recognition setup using either SpeechRecognition or webkitSpeechRecognition.
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition=new speechRecognition() // Create a new instance of speech recognition
// Event triggered when the speech recognition gets a result.
recognition.onresult=(event)=>{
   let currentIndex=event.resultIndex // Index of the recognized result
   let transcript=event.results[currentIndex][0].transcript // Get the spoken text
   content.innerText=transcript  // Display the spoken text in the content area
   takeCommand(transcript.toLowerCase()) // Process the command after converting to lowercase
}

// Event listener for the button click to start speech recognition.
btn.addEventListener("click", () => {
    recognition.start() // Start the speech recognition
    btn.style.display="none" // Hide the button
    voice.style.display="block" // Show the voice UI (e.g., recording indicator)
})

// Function to handle the recognized speech commands.
function takeCommand(message){
    btn.style.display="flex" // Show the button again after the command is taken
    voice.style.display="none" // Hide the voice UI
    // Respond to "hello" or "hey"
    if(message.includes("hello") || message.includes("hey")){
        speak("hello boss, what can i do for you?")
    }
    // Respond to "who are you"
    else if(message.includes("who are you")){
        speak("i am your virtual assistant")
    }
    // Command to open YouTube
    else if(message.includes("open youtube")){
        speak("opening youtube")
        window.open("https://www.youtube.com/","_blank")
    }
     // Command to open Google
    else if(message.includes("open google")){
        speak("opening google")
        window.open("https://www.google.com/","_blank")
    }
    // Command to open Facebook
    else if(message.includes("open facebook")){
        speak("opening facebook")
        window.open("https://www.facebook.com/","_blank")
    }
    // Command to open Instagram
    else if(message.includes("open instagram")){
        speak("opening instagram")
        window.open("https://www.instagram.com/","_blank")
    }
    // Command to open Calculator
    else if(message.includes("open calculator")){
        speak("opening calculator")
        window.open("calculator://")
    }
    // Command to tell time
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    // Command to tell date
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    // Command to announce battery percentage
    else if (message.includes("battery")) {
        // Get the battery status using the Battery Status API
        navigator.getBattery().then(function(battery) {
            // Calculate battery level as a whole number by rounding to nearest integer
            let level = Math.round(battery.level * 100);
            
            // Check if the battery is charging or not
            let charging = battery.charging ? "and is currently charging" : "and is not charging";
            
            // Use the speak function to announce the battery status
            speak(`The battery is at ${level}% ${charging}.`);
        });
    }
    // Default behavior for unrecognized commands
    else{
        // Modify the message by replacing certain words and speak a default response
        let finalText="this is what i found on internet regarding" + message.replace("abha","") || message.replace("ava","")
        speak(finalText)
        // Open a Google search for the unrecognized command
        window.open(`https://www.google.com/search?q=${message.replace("abha","")}`,"_blank")
    }
}
    
