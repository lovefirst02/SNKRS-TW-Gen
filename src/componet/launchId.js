function launchId(id) {
  fetch(`https://api.nike.com/launch/launch_views/v2/?filter=productId(${id})`)
    .then((res) => res.json())
    .then((json) => {
      const id = json.objects.id;
      return id;
    });
}

export default launchId;
