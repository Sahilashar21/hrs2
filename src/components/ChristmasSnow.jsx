// import { useEffect } from "react";

// const ChristmasSnow = () => {
//   useEffect(() => {
//     const snowflakes = [];
//     const snowCount = window.innerWidth < 768 ? 20 : 40;

//     for (let i = 0; i < snowCount; i++) {
//       const snow = document.createElement("div");
//       snow.className = "snowflake";
//       snow.innerText = "❄";
//       snow.style.left = Math.random() * 100 + "vw";
//       snow.style.fontSize = Math.random() * 10 + 12 + "px";
//       snow.style.animationDuration = Math.random() * 5 + 6 + "s";
//       snow.style.opacity = Math.random();
//       document.body.appendChild(snow);
//       snowflakes.push(snow);
//     }

//     return () => {
//       snowflakes.forEach(s => s.remove());
//     };
//   }, []);

//   return (
//     <style>{`
//       .snowflake {
//         position: fixed;
//         top: -10px;
//         color: white;
//         z-index: 3;
//         pointer-events: none;
//         animation-name: fall;
//         animation-timing-function: linear;
//         animation-iteration-count: infinite;
//       }

//       @keyframes fall {
//         to {
//           transform: translateY(110vh);
//         }
//       }
//     `}</style>
//   );
// };

// export default ChristmasSnow;



import { useEffect } from "react";

const ChristmasSnow = () => {
  useEffect(() => {
    const icons = ["❄️", "🎄", "🎅", "🎁", "⭐"];
    const elements = [];
    const count = window.innerWidth < 768 ? 25 : 45;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "christmas-fall";
      el.innerText = icons[Math.floor(Math.random() * icons.length)];

      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = Math.random() * 12 + 14 + "px";
      el.style.animationDuration = Math.random() * 6 + 6 + "s";
      el.style.animationDelay = Math.random() * 5 + "s";
      el.style.opacity = Math.random() * 0.8 + 0.2;

      document.body.appendChild(el);
      elements.push(el);
    }

    return () => {
      elements.forEach(el => el.remove());
    };
  }, []);

  return (
    <style>{`
      .christmas-fall {
        position: fixed;
        top: -20px;
        z-index: 3;
        pointer-events: none;
        animation-name: christmasFall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        user-select: none;
        filter: drop-shadow(0 0 6px rgba(255,255,255,0.4));
      }

      @keyframes christmasFall {
        0% {
          transform: translateY(-10vh) translateX(0) rotate(0deg);
        }
        100% {
          transform: translateY(110vh) translateX(40px) rotate(360deg);
        }
      }
    `}</style>
  );
};

export default ChristmasSnow;
