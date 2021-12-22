import { FaFolder } from "react-icons/fa";

const Folder = ({ title, clickHandler, breadcrumbsHandler, parentKey }) => {
  return (
    <div
      onClick={() => {
        clickHandler(title);
        breadcrumbsHandler(title, parentKey);
      }}
      className="folderContainer"
    >
      <FaFolder className="folderImg" />
      <span className="clickable title">{title}</span>
    </div>
  );
};

export default Folder;
