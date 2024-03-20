import React from "react";

const icons = [
  <i className="bi bi-emoji-angry-fill"></i>,
  <i className="bi bi-emoji-astonished-fill"></i>,
  <i className="bi bi-emoji-dizzy-fill"></i>,
  <i className="bi bi-emoji-expressionless-fill"></i>,
  <i className="bi bi-emoji-frown-fill"></i>,
  <i className="bi bi-emoji-grimace-fill"></i>,
  <i className="bi bi-emoji-grin-fill"></i>,
  <i className="bi bi-emoji-heart-eyes-fill"></i>,
  <i className="bi bi-emoji-kiss-fill"></i>,
  <i className="bi bi-emoji-laughing-fill"></i>,
  <i className="bi bi-emoji-neutral-fill"></i>,
  <i className="bi bi-emoji-smile-fill"></i>,
  <i className="bi bi-emoji-smile-upside-down-fill"></i>,
  <i className="bi bi-emoji-sunglasses-fill"></i>,
  <i className="bi bi-emoji-surprise-fill"></i>,
  <i className="bi bi-emoji-tear-fill"></i>,
  <i className="bi bi-emoji-wink-fill"></i>,
];

function RandomIcon() {
    const icon = Math.floor(Math.random() * 10);

  return <div>{icons[icon]}</div>;
}

export default RandomIcon;
