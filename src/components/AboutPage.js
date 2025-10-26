// import React from "react";
// import 'AboutPage.css';
// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
//       {/* About Us Section */}
//       <div className="max-w-4xl text-center">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
//         <p className="text-lg text-gray-700 leading-relaxed">
//           Established in 2018, <span className="font-semibold">HRS Events</span> began as a platform dedicated to organizing creative and engaging events across Mumbai. 
//           In 2021, we expanded our vision and founded <span className="font-semibold">HRS Studio</span> — the first karaoke studio in the entire city. 
//           What started as a humble 100 sq. ft. space quickly grew within a year into a bigger, better, and more advanced studio environment. 
//           Today, HRS Studio stands as a vibrant space for individuals of all levels — from passionate beginners to professional singers — 
//           to express their musical talents. Our studio offers high-quality, soundproof recording facilities and a comfortable, creative atmosphere 
//           for all music lovers to sing, record, and shine.
//         </p>
//       </div>

//       {/* Meet Our Team Section */}
//       <div className="max-w-4xl text-center mt-16">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>

//         <div className="flex flex-col items-center">
//           <img
//             src="https://via.placeholder.com/200"
//             alt="Hetal Ashar"
//             className="rounded-full w-48 h-48 object-cover shadow-lg mb-4"
//           />
//           <h3 className="text-2xl font-semibold text-gray-800">Hetal Ashar</h3>
//           <p className="text-gray-600 text-sm uppercase tracking-wide">Founder & Singer</p>
//           <p className="max-w-2xl mt-4 text-gray-700 leading-relaxed">
//             HRS Studio is led by <span className="font-semibold">Hetal Ashar</span>, the founder and a passionate singer 
//             who turned her love for music into an inspiring venture. With a deep understanding of melody, performance, 
//             and vocal expression, she built HRS Studio to create a welcoming space for music lovers of all levels. 
//             Her vision is to provide a platform where everyone — from beginners to seasoned performers — can experience 
//             the joy of singing, recording, and growing as artists in a professional yet friendly environment.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;


import React from "react";
import "./AboutPage.css"; // import the CSS file
import studio7 from '../images/studio7.jpg';
const AboutUs = () => {
  return (
    <div className="about-container">
      {/* About Us Section */}
      <section className="about-section">
        <h1>About Us</h1>
        <p className="about-text">
          Established in 2018, <strong>HRS Events</strong> began as a platform dedicated to organizing creative and engaging
          events across Mumbai. What started as a small initiative to bring people together through music and entertainment
          soon transformed into a full-fledged passion project that celebrated creativity, performance, and community.
          <br /><br />
          In 2021, our journey took a new turn with the birth of <strong>HRS Studio</strong> — the first-ever karaoke studio in
          the entire city of Vasai-Virar. It was founded with a simple dream: to create a space where every person, whether a beginner
          or a professional, could experience the joy of singing in a professional environment. Starting out in a cozy 100 sq. ft.
          room, the overwhelming love and response from our guests encouraged us to expand into a larger and more advanced space
          within just a year.
          <br /><br />
          Today, <strong>HRS Studio</strong> stands as a vibrant and inclusive hub for music enthusiasts from all walks of life.
          We’re proud to offer high-quality, soundproof recording facilities designed for comfort, creativity, and performance.
          Whether you want to host karaoke sessions with friends, record your next big track, or simply experience the magic of
          professional acoustics, HRS Studio provides an inspiring space to do it all.
          <br /><br />
          Over the years, we’ve built more than just a studio — we’ve built a <strong>community</strong>. A community of artists,
          dreamers, and performers who share one belief — that music has the power to connect, heal, and uplift. At HRS Studio,
          every voice matters, and every performance tells a story. So come, step into the spotlight, and let your melody echo
          beyond the walls of our studio.
        </p>

      </section>

      {/* Meet The Founder Section */}
      <section className="team-section">
        <h2>Meet The Founder</h2>
        <div className="team-member">
          <img
            src={studio7}
            alt="Hetal Ashar"
            className="team-photo"
          />
          <h3>Hetal Ashar</h3>
          <p className="designation">Founder & Singer</p>
          <p className="description">
            HRS Studio is led by <strong>Hetal Ashar</strong>, the founder and a passionate singer who turned her love
            for music into an inspiring venture. With a deep understanding of melody, performance, and vocal expression,
            she built HRS Studio to create a welcoming space for music lovers of all levels. Her vision is to provide a
            platform where everyone — from beginners to seasoned performers — can experience the joy of singing,
            recording, and growing as artists in a professional yet friendly environment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
