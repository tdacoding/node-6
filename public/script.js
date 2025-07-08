document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    const data = await remove(id);
    const html = await data.text();
    document.documentElement.innerHTML = html;
  } else if (event.target.dataset.type === "edit") {
    const newTitle = prompt("Enter the new title");
    if (newTitle) {
      const id = event.target.dataset.id;
      const data = await update(id, newTitle);
      const html = await data.text();
      document.documentElement.innerHTML = html;
    }
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const data = await add(title);
  const html = await data.text();
  document.documentElement.innerHTML = html;
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
