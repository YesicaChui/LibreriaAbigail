
const GetAllProducts = async (token) => {
  // let query_params = new URLSearchParams()
  // if (preferencia_id) {
  //   query_params.append('preferencia', preferencia_id)
  // }
  // const response = await fetch(`${API_URL}/productos/productos/list?${query_params}`)
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};

const GetProductById = async (id) => {
  const response = await fetch(`${API_URL}/productos/productos/${id}`);
  const data = await response.json();
  return data;
};

const PostProductForm = async (product,token) => {
  let formData = new FormData();
  formData.append("image", product.image.files[0]);
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("category_id", product.category_id);
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};

const DeleteProduct = async (id, token) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const status = response.status;
  const data = await response.json();
  return { data, status };
};