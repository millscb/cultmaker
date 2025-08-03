/* ===== src/index.js ===== */
<<<<<<< HEAD:src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import CultMakerApp from "./CultMakerApp.jsx";
=======
import "..sytles/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import CultMakerApp from "../src/CultMakerApp";
>>>>>>> main:src/index.js

export const MODULE_ID = "cultmaker";

export class CultMakerWindow extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "cultmaker-window",
      title: "CultMaker",
      width: 920,
      height: 600,
      resizable: true,
      template: `modules/${MODULE_ID}/templates/cultmaker.html`,
    });
  }

  /** Render then mount React */
  async _render(...args) {
    await super._render(...args);
    const container = this.element.find("#cultmaker-root")[0];
    if (container && !container._reactRoot) {
      container._reactRoot = createRoot(container);
      container._reactRoot.render(<CultMakerApp />);
    }
    return this;
  }
}
