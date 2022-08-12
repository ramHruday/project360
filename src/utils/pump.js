export const convertIntelliData = (d) => {
  return Object.entries(d)
    .map(([k, v], i) => {
      const m = {};
      v.forEach((p) => {
        m[p.mnemonic_name] = Number(p.value).toFixed(1);
      });
      return { ...m, "Pump Position": k };
    })
    .sort((a, b) => a["Pump Position"].localeCompare(b["Pump Position"]));
};
