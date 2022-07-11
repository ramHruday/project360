/* global Autodesk, THREE */

const { AuthClientTwoLegged } = require("forge-apis");

const config = require("../../forgeConfig");

/**
 * Initializes a Forge client for 2-legged authentication.
 * @param {string[]} scopes List of resource access scopes.
 * @returns {AuthClientTwoLegged} 2-legged authentication client.
 */
function getClient(scopes) {
  const { client_id, client_secret } = config.credentials;
  return new AuthClientTwoLegged(
    client_id,
    client_secret,
    scopes || config.scopes.internal
  );
}

let cache = {};
async function getToken(scopes) {
  const key = scopes.join("+");
  if (cache[key]) {
    return cache[key];
  }
  const client = getClient(scopes);
  let credentials = await client.authenticate();
  cache[key] = credentials;
  setTimeout(() => {
    delete cache[key];
  }, credentials.expires_in * 1000);
  return credentials;
}

/**
 * Retrieves a 2-legged authentication token for preconfigured public scopes.
 * @returns Token object: { "access_token": "...", "expires_at": "...", "expires_in": "...", "token_type": "..." }.
 */
async function getPublicToken() {
  return getToken(config.scopes.public);
}

/**
 * Retrieves a 2-legged authentication token for preconfigured internal scopes.
 * @returns Token object: { "access_token": "...", "expires_at": "...", "expires_in": "...", "token_type": "..." }.
 */
async function getInternalToken() {
  return getToken(config.scopes.internal);
}

export const initializeViewer = async (urn) => {
  const token = await getToken();

  const viewerOptions = {
    env: "AutodeskProduction",
    accessToken: token,
    api: "derivativeV2",
  };
  var viewerContainer = document.getElementById("viewerContainer");
  var viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerContainer, {});

  Autodesk.Viewing.Initializer(viewerOptions, () => {
    viewer.start();
    Autodesk.Viewing.Document.load(`urn:${urn}`, (doc) => {
      var defaultModel = doc.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(doc, defaultModel);
    });
  });
};
