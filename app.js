const form = document.querySelector("#searchForm");
const container = document.querySelector("#info");

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    if (form.elements.query.value) {
      const search = form.elements.query.value;
      const updatedName = formatSearch(search);
      const base = await getCharacter(updatedName);
      container.innerHTML = "";
      combine(base);
      form.elements.query.value = "";
    }
  } catch (e) {
    return "Oh so sorry, fairy is very busy at the moment!";
  }
});

const getCharacter = async (name) => {
  try {
    const res = await axios.get(
      "https://api.disneyapi.dev/character?name=" + name
    );
    return res.data.data;
  } catch (e) {
    return "Oh so sorry, fairy is very busy at the moment!";
  }
};

const formatSearch = (input) => {
  const array = input.trim().split(" ");
  let fullname = "";
  for (let name of array) {
    let word = name.slice(0, 1).toUpperCase().concat(name.slice(1));
    fullname = fullname.concat("%20", word);
  }
  fullname = fullname.slice(3);
  return fullname;
};

const combine = (data) => {
  try {
    for (let i in data) {
      const span = document.createElement("span");
      const h4 = document.createElement("h4");
      h4.innerText = `${data[i].name}`;
      span.append(h4);
      if (data[i].films[0]) {
        const p = document.createElement("p");
        p.append(data[i].films[0]);
        span.append(p);
      }
      const img = document.createElement("img");
      img.src = data[i].imageUrl;
      span.append(img);
      container.append(span);
    }
  } catch (e) {
    return "Oh so sorry, fairy is very busy at the moment!";
  }
};
