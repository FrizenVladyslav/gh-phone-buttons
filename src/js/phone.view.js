import EventEmitter from "./utils/eventEmiter";

export default class PhoneView extends EventEmitter {
  constructor(model, elements) {
    super();
    this._model = model;
    this._elements = elements;

    model.on("messageChanged", () => this.renderMessage());

    document.addEventListener("keypress", e => this.handleButtonPresseed(e));
    document.addEventListener("keydown", this.onKeyDown);
    elements.resetButton.addEventListener("click", () =>
      this.handleButtonPresseed({ key: "reset" })
    );
    elements.buttons.forEach(btn =>
      btn.addEventListener("click", e =>
        this.handleButtonPresseed(e.target.dataset)
      )
    );
  }

  handleButtonPresseed = ({ key }) => {
    this.emit("buttonPressed", { key });
  };

  onKeyDown = ({ key }) => {
    if (key === "Backspace") this.handleButtonPresseed({ key: "delete" });
  };

  renderMessage = () => {
    const { message } = this._model;
    if (!message) {
      this._elements.message.classList.add("empty-message");
      this._elements.message.innerText = "New message...";
    } else {
      this._elements.message.classList.remove("empty-message");
      this._elements.message.innerText = message;
    }
  };
}
