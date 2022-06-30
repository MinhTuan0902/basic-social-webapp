const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formatedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );

  return formatedDate;
};

export default formatDate;
