import axios from "axios";

const BASE_URL = "https://api.github.com/repos/facebook/create-react-app/issues";

export const getIssueList = async (page: number = 1, state: string = "open", sort: string = "comments") => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page,
        state,
        sort,
        per_page: 20,
      },
    });
    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return {
      data: [],
    };
  }
};
