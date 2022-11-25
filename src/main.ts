import { createApp, type DirectiveBinding } from "vue";
import App from "./App.vue";

import "virtual:windi.css";

const app = createApp(App);

app.directive("loading", (el: Element, binding: DirectiveBinding) => {
  if (binding.value) {
    el.classList.add("loading", "relative");
    el.setAttribute("disabled", "");
  } else {
    el.classList.remove("loading", "relative");
    el.removeAttribute("disabled");
  }
});

app.mount("#app");
