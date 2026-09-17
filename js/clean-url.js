(() => {
  const { protocol, pathname, search, hash } = window.location;

  if (protocol !== "http:" && protocol !== "https:") {
    return;
  }

  let cleanPath = pathname;

  if (cleanPath.endsWith("/index.html")) {
    cleanPath = cleanPath.slice(0, -"index.html".length) || "/";
  } else if (cleanPath.endsWith(".html")) {
    cleanPath = cleanPath.slice(0, -".html".length);
  }

  if (cleanPath !== pathname) {
    window.history.replaceState(
      window.history.state,
      "",
      `${cleanPath}${search}${hash}`,
    );
  }
})();
