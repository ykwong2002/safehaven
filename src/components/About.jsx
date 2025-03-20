import React from 'react';

const About = ({ onOpenChatbot }) => {
  return (
    <div className="About">
      <h2><strong>About SafeHaven</strong></h2>
      <p>
        SafeHaven is a platform designed to help individuals find <strong>mental peace</strong>,{' '}
        <strong>support</strong>, and <strong>guidance</strong>. Our goal is to create a safe,{' '}
        welcoming space where people can explore resources, access self-help tools, and connect with{' '}
        others. Whether you're struggling with stress, anxiety, or just need a space to relax,{' '}
        SafeHaven provides the support you need to thrive.
      </p>
      
      <div className="separator"></div>
      
      <div className="chatbot-invite">
        <p>
          If you're feeling down or just need someone to talk to, feel free to reach out to Shelby,{' '}
          our friendly AI chatbot! She's here to listen anytime you need support.
        </p>
        <button onClick={onOpenChatbot}>Speak to Shelby!</button>
      </div>
    </div>
  );
};

export default About; 