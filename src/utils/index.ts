export const getDateString = (data: string) => {
  const dateArr = data.split("");
  dateArr.splice(10, 1, " ");
  dateArr.splice(19, 1);
  return dateArr.join("");
};

export const getSortKeyword = (sort: string) => {
  if (sort === "Most commented") {
    return "comments";
  }
  if (sort === "Newest") {
    return "created";
  }
  return "updated";
};

export const SORT_LIST = ["Most commented", "Newest", "Recently updated"];
