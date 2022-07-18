// Autodesk Forge configuration
module.exports = {
  // Set environment variables or hard-code here
  credentials: {
    client_id: "DWLQZI9t0jDgbBt5CcZ5sulQVCqgmM4j",
    client_secret: "Nt4EFVAJo77BbWZv",
    callback_url: "http://localhost:3000/",
  },
  scopes: {
    // Required scopes for the server-side application
    internal: [
      "bucket:create",
      "bucket:read",
      "bucket:delete",
      "data:read",
      "data:create",
      "data:write",
    ],
    // Required scope for the client-side viewer
    public: ["viewables:read"],
  },
};
