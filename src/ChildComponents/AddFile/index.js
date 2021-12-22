const AddFile = ({ onChangeHandlerForFile }) => {
  return <input type="file" onChange={(e) => onChangeHandlerForFile(e)} />;
};

export default AddFile;
