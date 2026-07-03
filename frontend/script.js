async function sendQuestion() {
    const question = document.getElementById("question").value;
    const responseDiv = document.getElementById("response");

    // Check if input is empty
    if (question.trim() === "") {
        responseDiv.innerHTML = "<p>Please enter a question.</p>";
        return;
    }

    // Show loading message
    responseDiv.innerHTML = "<p>Searching...</p>";

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

        responseDiv.innerHTML = `
            <h3>${data.scheme ?? "No Scheme Found"}</h3>

            <p><strong>Category:</strong> ${data.category ?? "-"}</p>

            <p><strong>Description:</strong> ${data.description ?? "-"}</p>

            <p><strong>Eligibility:</strong> ${data.eligibility ?? "-"}</p>

            <p><strong>Benefits:</strong> ${data.benefits ?? "-"}</p>

            <p><strong>Documents:</strong> ${
                Array.isArray(data.documents)
                    ? data.documents.join(", ")
                    : "-"
            }</p>

            ${
                data.official_website
                    ? `<p><a href="${data.official_website}" target="_blank">Official Website</a></p>`
                    : ""
            }
        `;
    } catch (error) {
        responseDiv.innerHTML =
            "<p style='color:red;'>Error connecting to backend.</p>";
        console.error(error);
    }
}