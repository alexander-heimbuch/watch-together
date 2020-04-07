import { v4 as uuid } from "uuid";

export default (cb) => {
  const session = uuid();

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.width = "350px";
  overlay.style.zIndex = "9999";
  overlay.style.left = "50%";
  overlay.style.top = "50%";
  overlay.style.marginTop = "-100px";
  overlay.style.marginLeft = "-175px";
  overlay.style.background = "#F1F1F1";
  overlay.style.padding = "30px";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignContent = "center";
  overlay.style.justifyContent = "center";
  overlay.style.borderRadius = "5px";
  overlay.style.fontFamily =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

  const logo = document.createElement("div");
  logo.style.color = "#333";
  logo.style.fontSize = "1.75em";
  logo.style.marginBottom = "10px";
  logo.style.textAlign = "center";
  logo.innerHTML = "🍿 Watch Together 🍿";
  overlay.append(logo);

  const info = document.createElement("div");
  info.style.color = "#333";
  info.style.fontSize = "1em";
  info.style.fontStyle = "italic";
  info.style.marginBottom = "20px";
  info.style.textAlign = "center";
  info.innerHTML = "Enter your party id or share this one";
  overlay.append(info);

  const input = document.createElement("input");
  input.style.color = "#333";
  input.style.fontSize = "1em";
  input.style.border = "1px solid #E64415";
  input.style.marginBottom = "20px";
  input.style.textAlign = "center";
  input.style.borderRadius = "5px";
  input.style.padding = "5px";
  input.value = session;
  overlay.append(input);

  const button = document.createElement("button");
  button.style.color = "#444";
  button.style.fontSize = "1.25em";
  button.style.padding = "5px";
  button.style.background = "#E64415";
  button.style.textTransform = "uppercase";
  button.style.color = "white";
  button.style.borderRadius = "5px";
  button.style.boxShadow = "0 10px 10px -5px #ccc";
  button.style.pointer = "cursor";
  button.style.textAlign = "center";
  button.innerHTML = "Get the party started!";

  overlay.append(button);

  button.addEventListener("click", () => {
    cb(input.value);
    overlay.remove();
  });

  document.body.append(overlay);
};
