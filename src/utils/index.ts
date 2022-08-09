export const getDateString = (data: string) => {
  const dateArr = data.split("");
  dateArr.splice(10, 1, " ");
  dateArr.splice(19, 1);
  return dateArr.join("");
};

export const SORT_LIST = ["Most commented", "Newest", "Recently updated"];
