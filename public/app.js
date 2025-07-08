document.addEventListener("click", async (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    await remove(id);
    event.target.closest("li").remove();
  } else if (event.target.dataset.type === "edit") {
    const newTitle = prompt("Enter the new title");
    if (newTitle) {
      const id = event.target.dataset.id;
      await update(id, newTitle);
    }
  }
});

const remove = async (id) => await fetch(`/${id}`, { method: "DELETE" });

const update = async (id, newTitle) =>
  await fetch(`/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, newTitle }),
  });
