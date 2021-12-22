import Folder from "../ChildComponents/Folder";
import File from "../ChildComponents/File";
import AddFile from "../ChildComponents/AddFile";
import AddFolder from "../ChildComponents/AddFolder";
import { useState, useEffect, useCallback } from "react";

const FileExplorer = () => {
  const [currentFolder, changeFolderName] = useState("");
  const [mainObj, createFilesOrFolders] = useState({
    root: { parent_key: "", type: "folder", title: "root", delete: false },
  });
  const [folderName, changeInputForFolderName] = useState("");
  const [breadcrumbs, addFolders] = useState([{ name: "root", parent: "" }]);

  const uuid = useCallback(() => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }, []);

  const addFolderClickHandler = useCallback(() => {
    if (folderName) {
      console.log("Add folder over here", folderName + uuid());
      const mainObjTemp = { ...mainObj };

      // add new key to main object with type folder
      const newKey = folderName + uuid();
      mainObjTemp[newKey.replace(/ /g, "").toLowerCase()] = {
        parent_key: currentFolder,
        type: "folder",
        title: folderName,
        delete: false,
      };

      console.log("mainObjTemp", mainObjTemp);
      createFilesOrFolders(mainObjTemp);

      // empty input for folder name
      changeInputForFolderName("");
    } else {
      console.log("folder name is empty");
    }
  });

  const changeInputForFolderNameCallback = useCallback((e) => {
    changeInputForFolderName(e.target.value);
  });

  const breadcrumbsHandler = useCallback((name, parent) => {
    const breadcrumbsTemp = [...breadcrumbs];
    breadcrumbsTemp.forEach((elem, index) => {
      if (elem.parent === parent) {
        breadcrumbsTemp.splice(index, 1);
      }
    })

    breadcrumbsTemp.push({ name, parent });

    breadcrumbsTemp.indexOf(name) === -1 && addFolders(breadcrumbsTemp);
  });

  const onChangeHandlerForFile = useCallback((e) => {
    if (e.target.files[0].name) {
      const fileName = e.target.files[0].name;
      const mainObjTemp = { ...mainObj };

      // add new key to main object with type folder
      const newKey = fileName + uuid();
      mainObjTemp[newKey.replace(/ /g, "").toLowerCase()] = {
        parent_key: currentFolder,
        type: "file",
        title: fileName,
        delete: false,
      };

      console.log("mainObjTemp", mainObjTemp);
      createFilesOrFolders(mainObjTemp);

      // empty input for folder name
      changeInputForFolderName("");
    } else {
      console.log("file name is empty");
    }
  });

  return (
    <div className="mainContainer">
      {!currentFolder && (
        <Folder
          parentKey=""
          breadcrumbsHandler={() => ""}
          clickHandler={changeFolderName}
          title="root"
        />
      )}
      {currentFolder && (
        <>
          <AddFile onChangeHandlerForFile={onChangeHandlerForFile} />
          <AddFolder
            folderName={folderName}
            addFolderClickHandler={addFolderClickHandler}
            changeInputForFolderNameCallback={changeInputForFolderNameCallback}
          />
          <div className="breadcrumbs">
            {breadcrumbs.map((elem, index) => {
              return (
                <div key={uuid()}>
                  <span
                    onClick={() => changeFolderName(elem.name)}
                    className="breadcrumb"
                  >
                    {elem.name}
                  </span>
                  {breadcrumbs.length - 1 !== index && <span>{">"}</span>}
                </div>
              );
            })}
          </div>
          <div className="filesAndFoldersContainer">
            <h2 className="currentFolderName">
              Current Folder: {currentFolder}
            </h2>
            <div className="displayFiles">
              <h3>Files:</h3>
              {Object.keys(mainObj).map((elem) => {
                return (
                  mainObj[elem]["type"] === "file" &&
                  mainObj[elem]["parent_key"] === currentFolder &&
                  !mainObj[elem]["delete"] && (
                    <File title={mainObj[elem]["title"]} key={uuid()} />
                  )
                );
              })}
            </div>
            <div className="displayFolders">
              <h3>Folders:</h3>
              {Object.keys(mainObj).map((elem) => {
                return (
                  mainObj[elem]["type"] === "folder" &&
                  mainObj[elem]["parent_key"] === currentFolder &&
                  !mainObj[elem]["delete"] && (
                    <Folder
                      clickHandler={changeFolderName}
                      title={mainObj[elem]["title"]}
                      breadcrumbsHandler={breadcrumbsHandler}
                      key={uuid()}
                      parentKey={mainObj[elem]["parent_key"]}
                    />
                  )
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileExplorer;

// var mainObj = {
//   root: { parent: "main", type: 'folder' },
//   yasir: { parent: "root", type: 'folder', title: 'Yasir', delete: false },
//   sarole: { parent: "yasir", type: 'folder' },
//   arfat: { parent: "sarole", type: 'folder' },
//   sandeep: { parent: "sarole", type: 'folder' },
//   file1: {parent: 'root', type: 'file'}
// };
