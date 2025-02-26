(function () {
  emailjs.init("FuIH6T1s-Jcg7xS9h");
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    const successMsg = document.getElementById("success-message");
    const errorMsg = document.getElementById("error-message");

    emailjs
      .send("service_l1kf9nr", "template_appv0i9", templateParams)
      .then(function (response) {
        successMsg.style.display = "block";
        errorMsg.style.display = "none";

        setTimeout(() => {
          successMsg.style.display = "none";
        }, 3000);

        document.getElementById("contact-form").reset();
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch(function (error) {
        successMsg.style.display = "none";
        errorMsg.style.display = "block";

        setTimeout(() => {
          errorMsg.style.display = "none";
        }, 5000);

        console.error("FAILED...", error);
      });
  });
