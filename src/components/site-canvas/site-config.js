export const siteCamera = {
  position: [10, 15, 40],
  fov: 50,
  near: 0.01,
  far: 1000,
};

export const canvasStyle = {
  background: "#354c74",
  borderRadius: "8px",
};

export const perf = {
  current: 1,
  min: 0.1,
  max: 1,
  debounce: 200,
  regress: () => null,
};
