export const convertIntelliData = (d) => {
  return Object.entries(d)
    .map(([k, v], i) => {
      const m = {};
      v.forEach((p) => {
        m[p.mnemonic_name] = p.value;
      });
      return { ...m, "Pump Position": k };
    })
    .sort((a, b) => a["Pump Position"].localeCompare(b["Pump Position"]));
};
