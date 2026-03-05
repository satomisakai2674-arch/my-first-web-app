// ここからコードを書いてください
import { setupConverter } from "./js/converter.js";
import { setupTabs } from "./js/tabs.js";

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupConverter();
});
