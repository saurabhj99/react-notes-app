const setLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
