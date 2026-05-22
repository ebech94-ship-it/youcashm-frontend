export const saveAuth = (
  token: string,
  user: Record<string, unknown>
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};