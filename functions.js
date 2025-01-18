function createCard(
  title,
  previewText,
  headerImgSrc,
  date,
  timeToRead,
  publicLink
) {
  const container = document.querySelector(".card-columns.listrecent");

  const card = document.createElement("div");
  card.classList.add("card");

  const anchor = document.createElement("a");
  card.appendChild(anchor);

  if (headerImgSrc) {
    const headerImg = document.createElement("img");
    headerImg.classList.add("img-fluid");
    headerImg.src = headerImgSrc;
    headerImg.alt = "";
    anchor.appendChild(headerImg);
  }

  const cardBlock = document.createElement("div");
  cardBlock.classList.add("card-block");
  card.appendChild(cardBlock);

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  const cardTitleLink = document.createElement("a");
  cardTitleLink.textContent = title;
  cardTitle.appendChild(cardTitleLink);
  cardBlock.appendChild(cardTitle);

  const cardText = document.createElement("h4");
  cardText.classList.add("card-text");
  cardText.textContent = previewText;
  cardBlock.appendChild(cardText);

  const metafooter = document.createElement("div");
  metafooter.classList.add("metafooter");
  cardBlock.appendChild(metafooter);

  const wrapfooter = document.createElement("div");
  wrapfooter.classList.add("wrapfooter");
  metafooter.appendChild(wrapfooter);

  const authorMeta = document.createElement("span");
  authorMeta.classList.add("author-meta");
  authorMeta.innerHTML = `<span class="post-date">${date}</span> - <span class="post-read">${timeToRead} min read</span>`;
  wrapfooter.appendChild(authorMeta);

  // Add an event listener to the card
  card.addEventListener("click", (event) => {
    event.preventDefault();
    /*
    window.location.href = `post.html?path=${encodeURIComponent(htmlFilePath)}`;
    */
    window.open(publicLink, "_blank");
  });

  container.appendChild(card);
}

// The sortBlogposts function
function sortBlogposts(property) {
  // Convert the blogposts object into an array of objects
  let blogpostsArray = Object.keys(blogposts).map((key) => ({
    ...blogposts[key],
    id: key,
  }));

  // Sort the array by the selected property
  blogpostsArray.sort((a, b) => {
    if (property === "title") {
      return a.title.localeCompare(b.title);
    } else if (property === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // sort by descending date
    } else if (property === "views") {
      return b.views - a.views; // sort by descending views
    }
  });

  // Clear the existing blogposts
  let container = document.querySelector(".listrecent");
  container.innerHTML = "";

  // Recreate the blogposts cards with new order
  for (let k in blogpostsArray) {
    createCard(
      (title = blogpostsArray[k]["title"]),
      (previewText = blogpostsArray[k]["previewText"]),
      (headerImageSrc = blogpostsArray[k]["headerImageSrc"]),
      (date = blogpostsArray[k]["date"]),
      (timeToRead = blogpostsArray[k]["timeToRead"]),
      (publicLink = blogpostsArray[k]["publicLink"])
    );
  }
}
