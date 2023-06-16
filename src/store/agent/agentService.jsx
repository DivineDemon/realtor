const getAgent = async (user_id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AGENT_ENDPOINT}/${user_id}`
  );
  const data = await response.json();
  return data;
};

const agentService = {
  getAgent,
};

export default agentService;
