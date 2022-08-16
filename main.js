import APP from "./App.js";

const $ = select => document.querySelector(select);

const root = $('#app');
const app = new APP(root);