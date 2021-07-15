import store from "../store";

export const get = async (path, opts = { useAuth: true }) => {
  const response = await fetch(`${process.env.VUE_APP_BASE_API_URL}${path}`, {
    method: "GET",
    headers: opts.useAuth
      ? {
          Authorization: `Bearer ${store.getters.authToken}`,
        }
      : {},
  });

  return response.json();
};

export const post = async (path, body) =>
  requestWithBody({ method: "POST", path, body });

export const put = async (path, body) =>
  requestWithBody({ method: "PUT", path, body });

export const deletion = async (path, body) =>
  requestWithBody({ method: "DELETE", path, body });

const requestWithBody = async ({ method, path, body }) => {
  const response = await fetch(`${process.env.VUE_APP_BASE_API_URL}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.getters.authToken}`,
    },
  });

  return response.status !== 200
    ? { status: response.status }
    : response.json();
};
