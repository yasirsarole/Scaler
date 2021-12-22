import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FileExplorer from "./FileExplorer";

ReactDOM.render(
  <React.StrictMode>
    <FileExplorer />
  </React.StrictMode>,
  document.getElementById("root")
);

// root;
// "file1", "file2";
//   yasir;
//   "f1", "f2";
//     sarole;
//     "f11", "f22";
//       arfat;
//       "f111", "f222";
//       sandeep;
//       "f12", "f13";

// var mainObj = {
//   root: { parent: "main", type: 'folder' },
//   yasir: { parent: "root", type: 'folder', title: 'Yasir', delete: false },
//   sarole: { parent: "yasir", type: 'folder' },
//   arfat: { parent: "sarole", type: 'folder' },
//   sandeep: { parent: "sarole", type: 'folder' },
//   file1: {parent: 'root', type: 'file'}
// };
