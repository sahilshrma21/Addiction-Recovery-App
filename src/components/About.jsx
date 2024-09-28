// import React from 'react';
// import '../styles/About.css';

// const About = () => {
//   return (
//     <section id="about" className="about">
//       <h2>About Us</h2>
//       <p>We are a leading rehabilitation center focused on helping individuals improve their physical and mental well-being.</p>
//     </section>
//   );
// }

// export default About;
import React from "react";
import "../styles/About.css";

function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        We serve a comprehensive addiction recovery app designed to support
        individuals on their journey to recovery.
      </p>
      <section className="core-features">
        <h2>Core Features</h2>
        <ol>
          <h3>Daily Targets</h3>
          <p>
            Set and track daily goals and targets to help you stay on track with
            your recovery.
          </p>
          <h3>Progress Reports</h3>
          <p>
            View your progress through interactive graphs and charts, helping
            you to identify patterns and trends in your behavior.
          </p>
          <h3>AI Diary</h3>
          <p>
            Write down your thoughts, feelings, and experiences in our
            AI-powered diary, which uses natural language processing to identify
            patterns and provide insights into your behavior.
          </p>
          <h3>Motivational Content</h3>
          <p>
            Access a library of motivational content, including videos,
            articles, and quotes, to help you stay motivated and inspired on
            your recovery journey.
          </p>
          <h3>Reward System</h3>
          <p>
            Earn rewards and badges for reaching milestones and achieving your
            goals, providing a sense of accomplishment and motivation to
            continue on your recovery journey.
          </p>
        </ol>
      </section>
      <section className="how-it-works">
        <h2>How it Works</h2>
        <ol>
          <h3>Download and Install</h3>
          <p>Download and install the app on your mobile device.</p>
          <h3>Create an Account</h3>
          <p>
            Create an account and set up your profile, including your goals and
            targets.
          </p>
          <h3>Track Your Progress</h3>
          <p>
            Use the app to track your progress, including your daily targets and
            progress reports.
          </p>
          <h3>Access Motivational Content</h3>
          <p>
            Access our library of motivational content, including
            videos,articles, and quotes.
          </p>
          <h3>Earn Rewards</h3>
          <p>
            Earn rewards and badges for reaching milestones and achieving your
            goals.
          </p>
        </ol>
      </section>
      <section className="benefits">
        <h2>Benefits</h2>
        <ol>
          <h3>Increased Motivation</h3>
          <p>
            Stay motivated and inspired on your recovery journey with our
            motivational content and reward system.
          </p>
          <h3>Improved Accountability</h3>
          <p>
            Track your progress and stay accountable with our daily targets and
            progress reports.
          </p>
          <h3>Enhanced Self-Awareness</h3>
          <p>
            Gain insights into your behavior and patterns with our AI-powered
            diary.
          </p>
          <h3>Supportive Community</h3>
          <p>
            Connect with others who are going through similar experiences in our
            online community.
          </p>
        </ol>
      </section>
      <section className="get-started">
        <h2>Get Started</h2>
        <p>
          Ready to get started on your recovery journey? Download and install
          the app today and start tracking your progress, setting goals, and
          connecting with others who are on a similar journey.
        </p>
        <button>Download Now</button>
      </section>
      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or need support, please don't hesitate to
          contact us. We're here to help.
        </p>
        <ul>
          <li>
            <h3>Email</h3>
            <p>support@recoveryhub.com</p>
          </li>
          <li>
            <h3>Phone</h3>
            <p>555-555-5555</p>
          </li>
          <li>
            <h3>Website</h3>
            <p>recoveryhub.com</p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default About;