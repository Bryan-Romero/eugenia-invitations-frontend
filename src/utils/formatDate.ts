export const formDateOfEntry = (date: string) => {
  const dateOfEntry = new Date(date);
  return `${dateOfEntry.getDate()}/${
    dateOfEntry.getMonth() + 1 < 10
      ? `0${dateOfEntry.getMonth() + 1}`
      : dateOfEntry.getMonth() + 1
  }/${dateOfEntry.getFullYear()} ${dateOfEntry.getHours()}:${
    dateOfEntry.getMinutes() < 10
      ? `0${dateOfEntry.getMinutes()}`
      : dateOfEntry.getMinutes()
  }`;
};

export const formExpirationDate = (date: string) => {
  const expirationDate = new Date(date);
  return `${expirationDate.getDate()}/${
    expirationDate.getMonth() + 1 < 10
      ? `0${expirationDate.getMonth() + 1}`
      : expirationDate.getMonth() + 1
  }/${expirationDate.getFullYear()}`;
};
