export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function hasToken() {
  const token = localStorage.getItem("token");
  // insta jwt decode here
  return token ? true : false;
}

export function removeLocalStorageData() {
  const removeItems = ["user", "token", "bgColor"];
  removeItems.forEach((element) => {
    localStorage.removeItem(element);
  });
}
