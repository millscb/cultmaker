/* ---- Foundry Hooks ---- */
import { MODULE_ID, CultMakerWindow } from "../src/index.jsx";

Hooks.once("init", () => {
  console.log("CultMaker | Initialising …");
  game.settings.register(MODULE_ID, "state", {
    scope: "world",
    config: false,
    type: Object,
    default: null,
  });

  game.cultmaker = {
    open: () => new CultMakerWindow().render(true),
  };
});

Hooks.once("ready", () => {
  // Add a control‑bar button to open the app
  const layer = ui.controls.controls.find((c) => c.name === "token");
  if (layer) {
    layer.tools.push({
      name: "cultmaker",
      title: "CultMaker",
      icon: "fas fa-hat-wizard",
      button: true,
      onClick: () => game.cultmaker.open(),
    });
    ui.controls.render();
  }
});
