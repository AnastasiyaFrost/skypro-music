import { toMMSS } from "./toMMSS";

describe("Функция форматирования времени", () => {
  it("правильно форматирует число в строку", () => {
    const result = toMMSS(6);
    expect(result).toBe("00:06");
  });
    it("правильно форматирует ноль в строку", () => {
    const result = toMMSS(0);
    expect(result).toBe("00:00");
  });

});
