import { ReactComponent as IconDelete } from "../Assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../Assets/images/icon-edit.svg";

const CommentBtn = ({
  setDeleting,
  setDeleteModalState,
  setEditing,
  writer,
}) => {
  // delete comment
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  // edit comment
  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      {writer ? (
        <button
          className={`delete-btn ${writer ? "" : "display--none"}`}
          onClick={showDeleteModal}
        >
          <IconDelete /> Delete
        </button>
      ) : null}

      {writer ? (
        <button
          className={`edit-btn ${writer ? "" : "display--none"}`}
          onClick={showEditComment}
        >
          <IconEdit /> Edit
        </button>
      ) : null}
    </div>
  );
};

export default CommentBtn;
