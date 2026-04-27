const defaultState = {
  name: "Your Name",
  bio: "One page for all your links.",
  links: [
    { label: "GitHub", url: "https://github.com" },
    { label: "Portfolio", url: "https://example.com" }
  ]
};

const getState = () => {
  const saved = localStorage.getItem("tera-link-state");
  return saved ? JSON.parse(saved) : defaultState;
};

const setState = (state) => {
  localStorage.setItem("tera-link-state", JSON.stringify(state));
};

const render = () => {
  const state = getState();
  document.getElementById("name").textContent = state.name;
  document.getElementById("bio").textContent = state.bio;

  const linksRoot = document.getElementById("links");
  linksRoot.innerHTML = "";
  state.links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.label;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    linksRoot.appendChild(a);
  });

  document.getElementById("nameInput").value = state.name;
  document.getElementById("bioInput").value = state.bio;
};

const bind = () => {
  document.getElementById("nameInput").addEventListener("input", (e) => {
    const state = getState();
    state.name = e.target.value;
    setState(state);
    render();
  });

  document.getElementById("bioInput").addEventListener("input", (e) => {
    const state = getState();
    state.bio = e.target.value;
    setState(state);
    render();
  });

  document.getElementById("addBtn").addEventListener("click", () => {
    const label = document.getElementById("linkLabel").value.trim();
    const url = document.getElementById("linkUrl").value.trim();
    if (!label || !url) return;

    const state = getState();
    state.links.push({ label, url });
    setState(state);

    document.getElementById("linkLabel").value = "";
    document.getElementById("linkUrl").value = "";
    render();
  });
};

render();
bind();
