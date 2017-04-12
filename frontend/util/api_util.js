export const uploadCSV = (file) => {
  return $.ajax({
    url: 'api/users/import',
    method: "POST",
    contentType: false,
    processData: false,
    data: file,
  });
};

export const fetchUsers = () => {
  return $.ajax({
    url: 'api/users',
    method: "GET",
  });
};

export const deleteUsers = () => {
  return $.ajax({
    url: 'api/users/1',
    method: "DELETE"
  });
};
