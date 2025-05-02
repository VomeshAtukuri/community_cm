import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('community-monitor')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import './index.css'
// import App from "./App.tsx";

// const stylesUrl = "http://localhost:3000/assets/community-monitor.css";

// const Container = () => {
//   return (
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// };

// export const containerName = "community-monitor";
// let container = document.getElementById(containerName);

// if (!container) {
//   container = document.createElement("div");
//   container.id = containerName;
//   document.body.appendChild(container);
// }

// export const shadowRoot = container.attachShadow({ mode: "open" });

// const mountPoint = document.createElement("div");
// shadowRoot.appendChild(mountPoint);

// export const dialogContainer = document.createElement("div");
// shadowRoot.appendChild(dialogContainer);

// function mountApp() {
//   fetch(stylesUrl)
//     .then((response) => response.text())
//     .then((css) => {
//       const style = document.createElement("style");
//       style.textContent = css;
//       shadowRoot.appendChild(style);
//     });
//   createRoot(mountPoint).render(<Container />);
// }

// mountApp();

// class MyReactApp extends HTMLElement {
//   connectedCallback() {
//     const shadowRoot = this.attachShadow({ mode: "open" });
//     const mountPoint = document.createElement("div");
//     shadowRoot.appendChild(mountPoint);
//     createRoot(mountPoint).render(<Container />);
//   }
// }

// console.log("defining custom element");
// customElements.define("my-react-app", MyReactApp);

