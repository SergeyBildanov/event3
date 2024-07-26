export default class ImageWidget {
  constructor(element) {
    if (!element) {
      throw new Error("Виджет не найден.");
    }
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    this._element = element;
    this._container = element.querySelector(".img-container");
    this._form = element.querySelector(".img-form");

    this._form.addEventListener("submit", (e) => {
      let formData = new FormData(this._form);
      e.preventDefault();
      let block = document.createElement("div");
      block.classList.add("img-block");
      this.addImg(formData, (error, img) => {
        if (error) {
          console.log(error);
        } else {
          img.classList.add("image");
          block.appendChild(img);
          let button = document.createElement("div");
          button.classList.add("delete-image");
          block.appendChild(button);
          img.width = 175;
        }
      });
      if (block.firstChild) {
        let button = document.createElement("div");
        button.classList.add("delete-image");
        block.appendChild(button);
      }
      this._container.appendChild(block);
    });
    this._container.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-image")) {
        e.target.closest(".img-block").remove();
      }
    });
  }
  addImg(formData, callback) {
    let img = document.createElement("img");
    for (const pair of formData) {
      img[pair[0]] = pair[1];
    }

    img.onload = () => callback(null, img);
    img.onerror = () => callback(new Error(`Не удалось загрузить изображение`));
  }
}
