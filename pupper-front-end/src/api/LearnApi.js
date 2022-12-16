const LearnApi = {
  GetPupInformation: async (searchTerm) => {
    const transformSearchTerm = searchTerm.replaceAll(' ', '%20');
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4a7a12f70bmsh354c4e76be8cdf6p1b69d3jsnf8c18f063789',
        'X-RapidAPI-Host': 'dogs-by-api-ninjas.p.rapidapi.com',
      },
    };
    const result = await fetch(`https://dogs-by-api-ninjas.p.rapidapi.com/v1/dogs?name=${transformSearchTerm}`, options);
    if (result.status !== 200) {
      return null;
    }
    const jsonResult = await result.json();
    return jsonResult;
  },
};

export default LearnApi;
