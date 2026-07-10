// ===============================
// BharatSaarthi AI
// Professional Script
// ===============================

// Press ENTER to search
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("question").addEventListener("keypress", function(event){

        if(event.key==="Enter"){
            sendQuestion();
        }

    });

});

// Quick Search Buttons
function fillQuestion(text){

    document.getElementById("question").value=text;

    sendQuestion();

}

// Voice Recognition

const voiceBtn=document.getElementById("voiceBtn");

if(voiceBtn){

voiceBtn.addEventListener("click",startVoiceRecognition);

}

function startVoiceRecognition(){

const SpeechRecognition=
window.SpeechRecognition||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

alert("Speech Recognition is not supported in this browser.");

return;

}

const recognition=new SpeechRecognition();

recognition.lang="en-IN";

recognition.interimResults=false;

recognition.maxAlternatives=1;

voiceBtn.innerHTML="🎙 Listening...";

recognition.start();

recognition.onresult=function(event){

const transcript=event.results[0][0].transcript;

document.getElementById("question").value=transcript;

voiceBtn.innerHTML="🎤 Voice";

sendQuestion();

};

recognition.onerror=function(){

voiceBtn.innerHTML="🎤 Voice";

alert("Voice recognition failed.");

};

recognition.onend=function(){

voiceBtn.innerHTML="🎤 Voice";

};

}

// ===============================
// AI Voice Reply
// ===============================

function speakText(text){

    const speech = new SpeechSynthesisUtterance();

    speech.text = text;

    speech.lang = "en-IN";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

}



// ===============================
// Search Government Scheme
// ===============================

async function sendQuestion(){

    const question = document.getElementById("question").value;

    const responseDiv = document.getElementById("response");



    if(question.trim()==""){

        responseDiv.innerHTML=`
        <div class="result-card">

        <h2>⚠️ Empty Question</h2>

        <p>Please enter your question.</p>

        </div>
        `;

        return;

    }



responseDiv.innerHTML=`

<div class="result-card">

<h2>🤖 BharatSaarthi AI</h2>

<p>Searching Government Schemes...</p>

</div>

`;



try{

const response=await fetch("http://127.0.0.1:8001/ask",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

question:question

})

});



const data=await response.json();



if(!data.scheme){

responseDiv.innerHTML=`

<div class="result-card">

<h2>❌ No Scheme Found</h2>

<p>

Sorry!

No Government Scheme matched your query.

</p>

</div>

`;

speakText("Sorry. No Government Scheme found.");

return;

}



responseDiv.innerHTML=`

<div class="result-card">

<h2>🤖 ${data.scheme}</h2>

<p><strong>Category</strong><br>${data.category}</p>

<p><strong>Description</strong><br>${data.description}</p>

<p><strong>Eligibility</strong><br>${data.eligibility}</p>

<p><strong>Benefits</strong><br>${data.benefits}</p>

<p><strong>Documents</strong><br>

${data.documents.join(", ")}

</p>

<p>

<a href="${data.official_website}"

target="_blank">

🌐 Visit Official Website

</a>

</p>

</div>

`;



speakText(

"You may be eligible for " +

data.scheme

);



}

catch(error){

responseDiv.innerHTML=`

<div class="result-card">

<h2>❌ Error</h2>

<p>

Unable to connect to backend.

</p>

</div>

`;

console.log(error);

}

}