import { IReaction } from "../types";

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

export const getReactions = (reaction: IReaction) => {
  const reactionArr = Object.entries(reaction);
  reactionArr.splice(0, 2);
  const newReactionArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < reactionArr.length; i++) {
    switch (reactionArr[i][0]) {
      case "+1":
        newReactionArr.push(["👍🏻", reactionArr[i][1]]);
        break;
      case "-1":
        newReactionArr.push(["👎🏻", reactionArr[i][1]]);
        break;
      case "laugh":
        newReactionArr.push(["😄", reactionArr[i][1]]);
        break;
      case "hooray":
        newReactionArr.push(["🙌🏻", reactionArr[i][1]]);
        break;
      case "confused":
        newReactionArr.push(["😕", reactionArr[i][1]]);
        break;
      case "heart":
        newReactionArr.push(["💜", reactionArr[i][1]]);
        break;
      case "rocket":
        newReactionArr.push(["🚀", reactionArr[i][1]]);
        break;
      case "eyes":
        newReactionArr.push(["👀", reactionArr[i][1]]);
        break;
    }
  }
  return newReactionArr;
};
