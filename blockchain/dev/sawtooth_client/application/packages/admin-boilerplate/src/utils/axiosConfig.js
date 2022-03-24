export const axiosConfigHeader = () => ({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
  },
});

export const axiosConfigUploadFile = () => ({
  headers: {
    'Content-Type': 'multipart/form-data;charset=UTF-8',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
  },
});
