import "./css/animations.css";

const mountedStyle = {
  animation: "inAnimation 600ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 600ms ease-out",
  animationFillMode: "forwards",
};

export { mountedStyle, unmountedStyle };
