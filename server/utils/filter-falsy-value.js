export const filterFalsyValue = (object) =>
  Object.entries(object).reduce((acc, ittr) => {
    const [key, value] = ittr;
    if (!value) return acc;
    return { ...acc, [key]: value };
  }, {});
