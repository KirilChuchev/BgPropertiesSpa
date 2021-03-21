function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        console.log(error);
        return Promise.reject(error);
      }
    //   console.log(data);
      return data;
    });
  }

  const queryService = {
    handleResponse,
  }

  export default queryService;