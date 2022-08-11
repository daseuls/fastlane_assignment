import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
