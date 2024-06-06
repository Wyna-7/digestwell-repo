const baseUrl = 'http://localhost:3000/entries';

const getEntries = async () => {
  // const entries = await fetch(baseUrl).then((resp) => resp.json());
  const entries = await fetch(baseUrl);
  console.log(entries);
};

export { getEntries };
