import EventEmitter from "./utils/eventEmiter";

export default class PhoneModel extends EventEmitter {
  constructor() {
    super();
    this.setPhone = this.setPhone.bind(this);
    this._buttons = {
      "0": [" "],
      "2": ["a", "b", "c"],
      "3": ["d", "e", "f"],
      "4": ["g", "h", "i"],
      "5": ["j", "k", "l"],
      "6": ["m", "n", "o"],
      "7": ["p", "q", "r", "s"],
      "8": ["t", "u", "v"],
      "9": ["w", "x", "y", "z"]
    };
    this._message = "";
    this._key = "";
    this._count = 0;
    this._numMode = false;
  }

  get buttons() {
    return this._buttons;
  }

  get message() {
    return this._message;
  }

  get key() {
    return this._key;
  }

  get count() {
    return this._count;
  }

  get numMode() {
    return this._numMode;
  }

  setPhone({
    message = this.message,
    key = this._key,
    count = this._count,
    numMode = this._numMode
  }) {
    this._message = message;
    this._key = key;
    this._count = count;
    this._numMode = numMode;
    this.emit("messageChanged", message);
  }
}
