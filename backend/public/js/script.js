function removeRouteExplain(parent) {
  const routes = parent.querySelectorAll(".route__explain");
  const links = parent.querySelectorAll(".route__link");

  routes.forEach((item) => {
    item.classList.remove("route__explain--visible");
  });

  links.forEach((item) => {
    item.classList.remove("route__link--selected");
  });
}

function addEventsToLink() {
  const parents = document.querySelectorAll(".route");

  parents.forEach((route) => {
    const links = route.querySelectorAll(".route__link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const { target } = link.dataset;

        const element = document.querySelector(`[data-identifier="${target}"]`);
        removeRouteExplain(route);
        link.classList.add("route__link--selected");
        element.classList.add("route__explain--visible");
      });
    });
  });
}

addEventsToLink();
