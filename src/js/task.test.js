import ImageWidget from "./img-widget";

test("imageWidget creating", () => {
  expect(() => {
    new ImageWidget();
  }).toThrow(new Error("Виджет не найден."));
});
