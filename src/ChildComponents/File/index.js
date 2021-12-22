import { FaFileAlt } from "react-icons/fa";

const File = ({ title }) => {
  return (
    <div className="fileContainer">
      <FaFileAlt className="fileImg" />
      <span className="title">{title}</span>
    </div>
  );
};

export default File;
