const setLocalStorage = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  localStorage.setItem(key, stringifiedValue);
};

const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export { setLocalStorage, getLocalStorage };
