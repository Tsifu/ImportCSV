export const uploadCSV = (file) => {
  return $.ajax({
    url: 'api/users/import',
    method: "POST",
    dataType: 'text/csv',
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
