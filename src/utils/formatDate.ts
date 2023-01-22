export const formDateOfEntry = (date: string) => {
  const dateOfEntry = new Date(date);
  return `${dateOfEntry.getUTCDate()}/${
    dateOfEntry.getUTCMonth() + 1 < 10
      ? `0${dateOfEntry.getUTCMonth() + 1}`
      : dateOfEntry.getUTCMonth() + 1
  }/${dateOfEntry.getUTCFullYear()} - ${
    dateOfEntry.getHours() < 10
      ? `0${dateOfEntry.getHours()}`
      : dateOfEntry.getHours()
  }:${
    dateOfEntry.getMinutes() < 10
      ? `0${dateOfEntry.getMinutes()}`
      : dateOfEntry.getMinutes()
  }`;
};

export const formExpirationDate = (date: string) => {
  const expirationDate = new Date(date);
  return `${expirationDate.getUTCDate()}/${
    expirationDate.getUTCMonth() + 1 < 10
      ? `0${expirationDate.getUTCMonth() + 1}`
      : expirationDate.getUTCMonth() + 1
  }/${expirationDate.getUTCFullYear()}`;
};
