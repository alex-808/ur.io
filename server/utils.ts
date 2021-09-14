const makeID = (number: number) => {
  const arr = [];
  for (let i = 0; i < number; i++) {
    const digit = Math.floor(Math.random() * 10);
    arr.push(digit);
  }
  return arr.join('');
};

export { makeID };
