
const GetCarrito = async (token) => {
  const response = await fetch(`${API_URL}/shopping_carts`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};

const CreateUpdateCarrito = async (productCarrito, token) => {
  const response = await fetch(`${API_URL}/shopping_carts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productCarrito),
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};

const DeleteCarrito = async (id, token) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};

