import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const FormTemplate = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const formMessage = document.querySelector(".form-message");

    emailjs
      .sendForm(
        "service_a3gek0d",
        "template_8l0ozvk",
        form.current,
        process.env.REACT_APP_ID
      )
      .then(
        (result) => {
          // console.log(result.text);
          // Reset form after sending email
          form.current.reset();
          // Show success message after email has sent
          formMessage.innerHTML =
            "<p class='success'>Message envoyé avec succès ! Je vous répondrai dès que possible.</p>";

          // Remove success message after 3 seconds
          setTimeout(() => {
            formMessage.innerHTML = "";
          }, 3000);
        },
        (error) => {
          // console.log(error.text);
          // Show error message if email was not sent
          formMessage.innerHTML =
            "<p class='error'>Une erreur est survenue, veuillez réessayer.</p>";
            
          // Remove success message after 3 seconds
          setTimeout(() => {
            formMessage.innerHTML = "";
          }, 3000);
        }
      );
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" required autoComplete="off" />
        <label>Email</label>
        <input type="email" name="email" required autoComplete="off" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Envoyer" required />
      </form>
      <div className="form-message"></div>
    </div>
  );
};

export default FormTemplate;
