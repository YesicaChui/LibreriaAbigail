
const GetUsuarios = async (token) => {
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};

const PostUsuarios = async (usuario) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};


const UpdateUsuarios = async (id,category, token) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(category),
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};