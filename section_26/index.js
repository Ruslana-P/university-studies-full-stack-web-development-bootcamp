import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let nextId = 1;

const posts = [
  {
    id: nextId++,
    title: "Write the First Draft Badly",
    body: "The blank page feels heavier than the work itself. A first draft only has one job: to exist. Sentences can be clumsy. The point can wander. You can fix all of that later, but you cannot edit a page that was never written.\n\nSet a small target, such as one paragraph, and stop when you reach it. The next session starts from something real instead of from nothing.",
  },
  {
    id: nextId++,
    title: "Keep the Page Quiet",
    body: "A page full of boxes, badges, and sidebars asks the reader to work before they have even started reading. A title, a few paragraphs, and a clear link back home are enough for an essay.\n\nDecoration is easy to add and hard to remove. Start with the words. Add a color or a button only when the page is hard to use without it.",
  },
  {
    id: nextId++,
    title: "Small Tools, Finished Work",
    body: "A blog does not need a database on the first day. An array in memory is enough to learn how a post is created, shown, changed, and removed.\n\nThe limit is honest: restart the server and the new posts are gone. That is a feature of this version, not a surprise. Once the routes feel solid, saving the posts is a separate problem.",
  },
];

function findPost(id) {
  return posts.find((post) => post.id === Number(id));
}

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/new", (req, res) => {
  res.render("form.ejs", {
    pageTitle: "New Essay",
    heading: "New Essay",
    action: "/new",
    post: { title: "", body: "" },
    button: "Publish",
  });
});

app.post("/new", (req, res) => {
  const title = req.body.title.trim();
  const body = req.body.body.trim();

  if (!title || !body) {
    return res.render("form.ejs", {
      pageTitle: "New Essay",
      heading: "New Essay",
      action: "/new",
      post: { title, body },
      button: "Publish",
      error: "A title and some text are both required.",
    });
  }

  posts.unshift({ id: nextId++, title, body });
  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).render("missing.ejs", { pageTitle: "Not found" });
  }
  res.render("post.ejs", { post, pageTitle: post.title });
});

app.get("/posts/:id/edit", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).render("missing.ejs", { pageTitle: "Not found" });
  }
  res.render("form.ejs", {
    pageTitle: "Edit Essay",
    heading: "Edit Essay",
    action: `/posts/${post.id}/edit`,
    post,
    button: "Save",
  });
});

app.post("/posts/:id/edit", (req, res) => {
  const post = findPost(req.params.id);
  if (!post) {
    return res.status(404).render("missing.ejs", { pageTitle: "Not found" });
  }

  const title = req.body.title.trim();
  const body = req.body.body.trim();

  if (!title || !body) {
    return res.render("form.ejs", {
      pageTitle: "Edit Essay",
      heading: "Edit Essay",
      action: `/posts/${post.id}/edit`,
      post: { title, body },
      button: "Save",
      error: "A title and some text are both required.",
    });
  }

  post.title = title;
  post.body = body;
  res.redirect(`/posts/${post.id}`);
});

app.post("/posts/:id/delete", (req, res) => {
  const index = posts.findIndex((post) => post.id === Number(req.params.id));
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
