const defaultState = {
  count: 0,
  key: ""
};

export default class PhoneController {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._timeout = null;
    view.on("buttonPressed", idx => this.changeMessage(idx));
  }

  changeMessage = ({ key: eKey }) => {
    let { key, message, count, numMode, setPhone } = this._model;

    !!this._timeout && clearTimeout(this._timeout);

    if (eKey === "reset") return setPhone({ message: "" });
    if (eKey === "delete") return setPhone({ message: message.slice(0, -1) });
    if (eKey === "123/abc") return setPhone({ numMode: !numMode });
    if (!eKey || (!this._model.buttons[eKey] && eKey !== "1")) return;
    if (numMode) return setPhone({ message: (message += eKey) });

    const pressedLetter = this._model.buttons[eKey];
    if (!pressedLetter) return;
    if (key === eKey && eKey !== "0") {
      message =
        message.slice(0, -1) +
        `${pressedLetter[count] ||
          pressedLetter[count % pressedLetter.length]}`;
      setPhone({ count: ++count, message });
    } else {
      setPhone({ count: 1, key: eKey, message: (message += pressedLetter[0]) });
    }
    this._timeout = setTimeout(() => setPhone({ ...defaultState }), 500);
  };
}
