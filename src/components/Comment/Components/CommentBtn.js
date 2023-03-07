import { ReactComponent as IconDelete } from '../Assets/images/icon-delete.svg';
import { ReactComponent as IconEdit } from '../Assets/images/icon-edit.svg';
import axios from 'axios';
import { cookies, makeURL, set_cookie } from '../../../Utils/common';

const CommentBtn = ({ commentData, setDeleting, setDeleteModalState, setEditing, writer }) => {
	let counter = false;
	const showAddComment = () => {
		counter = true;
	};

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
				<button className={`delete-btn ${writer ? '' : 'display--none'}`} onClick={showDeleteModal}>
					<IconDelete /> Delete
				</button>
			) : null}

			{writer ? (
				<button
					className={`edit-btn ${writer ? '' : 'display--none'}`}
					onClick={showEditComment}
				>
					<IconEdit /> Edit
				</button>
			) : null}
		</div>
	);
};

export default CommentBtn;
