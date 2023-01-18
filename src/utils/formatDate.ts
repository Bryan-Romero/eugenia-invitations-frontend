export const formDateOfEntry = (date: string) => {
  const dateOfEntry = new Date(date);
  return `${dateOfEntry.getUTCDate()}/${
    dateOfEntry.getUTCMonth() + 1 < 10
      ? `0${dateOfEntry.getUTCMonth() + 1}`
      : dateOfEntry.getUTCMonth() + 1
  }/${dateOfEntry.getUTCFullYear()} ${dateOfEntry.getUTCHours()}:${
    dateOfEntry.getUTCMinutes() < 10
      ? `0${dateOfEntry.getUTCMinutes()}`
      : dateOfEntry.getUTCMinutes()
  }`;
};

export const formExpirationDate = (date: string) => {
  const expirationDate = new Date(date);
  console.log(expirationDate.getUTCDate())
  return `${expirationDate.getUTCDate()}/${
    expirationDate.getUTCMonth() + 1 < 10
      ? `0${expirationDate.getUTCMonth() + 1}`
      : expirationDate.getUTCMonth() + 1
  }/${expirationDate.getUTCFullYear()}`;
};
