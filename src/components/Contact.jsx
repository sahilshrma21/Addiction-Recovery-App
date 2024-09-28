// import React from 'react';
// import '../styles/Contact.css';

// const Contact = () => {
//   return (
//     <section id="contact" className="contact">
//       <h2>Contact Us</h2>
//       <form>
//         <label>Name</label>
//         <input type="text" name="name" />
//         <label>Email</label>
//         <input type="email" name="email" />
//         <label>Message</label>
//         <textarea name="message"></textarea>
//         <button type="submit">Send Message</button>
//       </form>
//     </section>
//   );
// }

// export default Contact;
import React from "react";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <h1>Get in Touch</h1>
      <p>
        Have a question or want to learn more about our addiction recovery app?
        We'd love to hear from you!
      </p>
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
        <br />
        <label for="message">Message:</label>
        <textarea id="message" name="message" />
        <br />
        <button type="submit">Send Message</button>
      </form>
      <h2>Our Address</h2>
      <p>123 Main St, Anytown, USA 12345</p>
      <h2>Phone Number</h2>
      <p>(555) 555-5555</p>
      <h2>Email Address</h2>
      <p>info@addictionrecoveryapp.com</p>
    </div>
  );
}

export default Contact;