export const getDateString = (data: string) => {
  const dateArr = data.split("");
  dateArr.splice(10, 1, " ");
  dateArr.splice(19, 1);
  return dateArr.join("");
};
