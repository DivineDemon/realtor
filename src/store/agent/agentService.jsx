const getAgent = async (agent_id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_AGENT_ENDPOINT}/${agent_id}`
  );
  const data = await response.json();

  return data.response;
};

const agentService = {
  getAgent,
};

export default agentService;
