import PhoneController from "./js/phone.controller";
import PhoneModel from "./js/phone.model";
import PhoneView from "./js/phone.view";

import "./scss/styles.scss";

window.addEventListener("load", () => {
  const model = new PhoneModel();
  const view = new PhoneView(model, {
    buttons: document.querySelectorAll(".button"),
    message: document.querySelector(".message"),
    resetButton: document.querySelector(".reset-btn")
  });
  new PhoneController(model, view);
});
