const getHouses = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_HOUSE_ENDPOINT}`
  );
  const data = await response.json();
  return data.response;
};

const houseService = {
  getHouses,
};

export default houseService;
