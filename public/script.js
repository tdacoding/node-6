document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id)
      .then((data) => data.text())
      .then((html) => {
        document.documentElement.innerHTML = html;
      });
  } else if (event.target.dataset.type === "edit") {
    const newTitle = prompt("Enter the new title");
    if (newTitle) {
      const id = event.target.dataset.id;
      update(id, newTitle)
        .then((data) => data.text())
        .then((html) => {
          document.documentElement.innerHTML = html;
        });
    }
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  add(title)
    .then((data) => data.text())
    .then((html) => {
      document.documentElement.innerHTML = html;
    });
  document.getElementById("title").value = "";
});

const add = (title) => {
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
};

const remove = (id) => {
  return fetch(`/${id}`, { method: "DELETE" });
};

const update = (id, newTitle) => {
  return fetch("/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, newTitle }),
  });
};
