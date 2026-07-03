document.getElementById("sendBtn").addEventListener("click", function () {

    const question = document.getElementById("question").value;

    if (question.trim() === "") {
        document.getElementById("response").innerHTML =
            "Please enter a question.";
        return;
    }

    document.getElementById("response").innerHTML =
        "<b>You asked:</b><br>" + question;

});