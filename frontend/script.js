async function sendQuestion() {

    const question = document.getElementById("question").value;
    const responseDiv = document.getElementById("response");

    if (question.trim() === "") {

        responseDiv.innerHTML = `
            <div class="result-card">
                <h2>⚠️ Empty Question</h2>
                <p>Please enter your question.</p>
            </div>
        `;

        return;
    }

    responseDiv.innerHTML = `
        <div class="result-card">
            <h2>🤖 BharatSaarthi AI</h2>
            <p>🔍 Searching Government Schemes...</p>
        </div>
    `;

    try {

        const response = await fetch("http://127.0.0.1:8001/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        if (!data.scheme) {

            responseDiv.innerHTML = `
                <div class="result-card">

                    <h2>❌ No Scheme Found</h2>

                    <p>
                    Sorry! BharatSaarthi AI could not find a suitable Government Scheme.
                    </p>

                    <p>
                    Try using words like:
                    </p>

                    <ul>
                        <li>🌾 Farmer</li>
                        <li>🏥 Health</li>
                        <li>🏠 House</li>
                        <li>💰 Loan</li>
                        <li>👴 Pension</li>
                    </ul>

                </div>
            `;

            return;

        }

        responseDiv.innerHTML = `

        <div class="result-card">

            <h2>🤖 ${data.scheme}</h2>

            <p><strong>📂 Category:</strong> ${data.category}</p>

            <p><strong>📝 Description:</strong><br>${data.description}</p>

            <p><strong>✅ Eligibility:</strong><br>${data.eligibility}</p>

            <p><strong>💰 Benefits:</strong><br>${data.benefits}</p>

            <p><strong>📄 Documents:</strong><br>
            ${data.documents.join(", ")}
            </p>

            <a
                href="${data.official_website}"
                target="_blank"
            >
                🌐 Visit Official Website
            </a>

        </div>

        `;

    }

    catch(error){

        responseDiv.innerHTML = `

        <div class="result-card">

            <h2>❌ Connection Error</h2>

            <p>
            Unable to connect to the backend.
            </p>

        </div>

        `;

        console.log(error);

    }

}