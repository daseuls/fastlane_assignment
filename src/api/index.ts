import axios from "axios";

const BASE_URL = " https://api.github.com/repos/facebook/create-react-app/issues";

export const getIssueList = async (page: number = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page,
        per_page: 20,
        sort: "comments",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return {
      data: [],
    };
  }
};
