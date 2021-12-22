const AddFolder = ({
  folderName,
  addFolderClickHandler,
  changeInputForFolderNameCallback,
}) => {
  return (
    <>
      <input
        value={folderName}
        type="text"
        onChange={(e) => changeInputForFolderNameCallback(e)}
      />
      <button
        onClick={() => addFolderClickHandler()}
        type="button"
        className="addFolderButton"
      >
        Add Folder
      </button>
    </>
  );
};

export default AddFolder;
