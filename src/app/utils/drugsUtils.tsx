const CheckAvailability = (quantity: number, expiryDate: string): boolean => {
  let available: boolean = false;
  const currentDate = new Date();
  const inputDate = new Date(expiryDate);

  if (quantity > 0) {
    if (inputDate < currentDate) {
      console.log("The provided date has already expired.");
      available = false;
    } else if (inputDate > currentDate) {
      console.log("The provided date is in the future.");
      available = true;
    } else {
      console.log("The provided date is incorrect.");
      available = false;
    }
    return available;
  } else {
    console.log("The quantity is 0.");
    return available;
  }
};

export { CheckAvailability };
