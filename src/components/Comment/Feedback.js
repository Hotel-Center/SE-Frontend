import React, { useState, useEffect } from "react";
import "./Components/Styles/App.scss";
import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";
import axios from "axios";
import { cookies, makeURL } from "../../Utils/common";
import references from "../../assets/References.json";
// import im from  '../../../statics/img/pics/avatar.jpg';

const Feedback = (props) => {
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const [c, setc] = useState(null);
  const [c1, setc1] = useState(null);
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [first, setFirst] = useState("");
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  const [last, setlast] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [hotelid, sethotelid] = useState(null);
  const [Comwriter, setComWriter] = useState(null);
  // const [ date1, setDate ] = useState("22:44:55");

  // console.log(date1 , "date1");
  // const [hour, min, sec] = date1.split(':');
  // hour = parseInt(hour) ;
  // min = parseInt(min);
  // sec = parseInt(sec);

  // // const date = (hour + 4) + ":" +  (min+34) +  ":" +  sec;

  // const getData = async () => {
  // 	const res = await fetch('./data/data.json');
  // 	const data = await res.json();
  // 	updateComments(data.comments);
  // };

  // console.log(first);
  // console.log(last);

  useEffect(() => {
    {
      localStorage.getItem("deleteAll") === ""
        ? setc(localStorage.getItem("deleteAll"))
        : setc("l");
    }
    const hotelid = props.id;
    sethotelid(props.id);
    //get al hotel
    axios
      .get(makeURL("/hotel/" + hotelid + "/" + "comments/"))
      .then((response) => {
        console.log("hotel comments", response.data);
        setc(response.data);

        setc1(
          response.data.slice(
            response.data.length - 5,
            response.data.length - 1
          )
        );
      })
      .catch((error) => {
        console.log(error, "comment error");
      });

    //get my comments
    axios
      .get(makeURL("/hotel/" + hotelid + "/" + "mycomment/"), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((response) => {
        console.log("my hotel comments", response.data);
        setComWriter(response.data[0].writer);
      })
      .catch((error) => {
        console.log(error, "comment error");
      });

    axios
      .get(makeURL(references.url_edit_profile), {
        headers: {
          Authorization: cookies.get("Authorization"),
        },
      })
      .then((res) => {
        // console.log('response of profile: ', res.data);
        setAvatar(res.data.avatar);
      });

    //send comment
    // axios
    // 	.post(
    // 		makeURL('/hotel/' + hotelid + '/' + 'comments/'),
    // 		{
    // 			rate :3 ,
    // 			text :"ouuuii"
    // 		},
    // 		{
    // 			headers: {
    // 				Authorization: cookies.get('Authorization')
    // 			}
    // 		}
    // 	)
    // 	.then((response) => {
    // 		console.log(response, 'posted');
    // 	})
    // 	.catch((error) => {
    // 		console.log(error, 'post error');
    // 	});

    //update
    // axios
    // 	.put(

    // 		makeURL("/hotel/1/comments/2/"),
    // 		{
    // 			rate:1,
    // 			text: "dsffffd"
    // 		},
    // 		{
    // 			headers: {
    // 				Authorization: cookies.get('Authorization')
    // 			}
    // 		}
    // 	)
    // 	.then((response) => {
    // 		console.log(response, 'commnet changed');
    // 	})
    // 	.catch((error) => {
    // 		console.log(error, 'comment change error');
    // 	});

    // 	//delete

    // axios
    // 	.delete(makeURL('/hotel/' + hotelid + '/' + 'comments/17/'), {
    // 		headers: {
    // 			Authorization: cookies.get('Authorization')
    // 		}
    // 	})
    // 	.then((response) => {
    // 		console.log(response, 'commnet delted');
    // 	})
    // 	.catch((error) => {
    // 		console.log(error, 'comment delete error');
    // 	});
  }, []);
  // console.log(writer, 'writer');

  useEffect(() => {
    // localStorage.getItem('comments') !== null
    // 	? updateComments(JSON.parse(localStorage.getItem('comments')))
    // 	: getData();
  }, []);

  useEffect(() => {
    // localStorage.setItem('comments', JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [deleteModalState]);

  // add comments
  let addComments = (newComment, text, rate) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
    // send comment

    // console.log(rate);
    // console.log(text);
    let a = null;
    axios
      .post(
        makeURL("/hotel/" + hotelid + "/" + "comments/"),
        {
          rate: rate / 20,
          text: text,
        },
        {
          headers: {
            Authorization: cookies.get("Authorization"),
          },
        }
      )
      .then((response) => {
        console.log(response.data, "posted");
        a = response.data;
        // setNewCom(a) ;
        // setStudents([...students, studentObject]);
        // c.splice(0, 0, a);
        // c.push(a);
        setc([...c, a]);

        setc1([...c1, a]);
      })
      .catch((error) => {
        console.log(error, "post error");
      });

    // console.log(newCom , "ffff");
    // console.log(a , "ffff2");
    // axios
    // 	.get(makeURL('/hotel/' + hotelid + '/' + 'comments/'))
    // 	.then((response) => {
    // 		console.log('hotel comments', response.data);
    // 		setc(response.data);
    // 		// setCart([...cart, item]);

    // 		// setDate((response.data)[0].created_at.split('T')[1].split('.')[0]);
    // 		setc1(response.data.slice(0, 4));
    // 		console.log('http://localhost:8000/media/' + response.data[0].user_info.avatar, 'BBBBBa');
    // 	})
    // 	.catch((error) => {
    // 		console.log(error, 'comment error');
    // 	});

    // axios
    // .get(makeURL('/hotel/' + hotelid + '/' + 'comments/'))
    // .then((response) => {
    // 	console.log('hotel comments', response.data);
    // 	setc(response.data);

    // 	setc1(response.data.slice(0, 4));
    // })
    // .catch((error) => {
    // 	console.log(error, 'comment error');
    // });
  };

  // add replies

  // edit comment
  let editComment = (content, id) => {
    let updatedComments = [...comments];

    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.content = content;
      }
    });

    updateComments(updatedComments);
  };

  // delete comment
  let commentDelete = (id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    }
    updateComments(updatedComments);
  };

  return (
    <main className="Feedback">
      <div className="col-lg-8">
        <div className="row">
          <div className="col">
            <div className="mb-3 row">
              <div className="col">
                {Array.isArray(c1)
                  ? c1.map((e) =>
                      e.writer === Comwriter ? (
                        <Comment
                          setc1={setc1}
                          setc={setc}
                          c={c}
                          c1={c1}
                          key={e.id}
                          commentData={e.text}
                          rate={e.rate}
                          time={e.created_at.split("T")[1].split(".")[0]}
                          first={e.user_info.firstName}
                          last={e.user_info.lastName}
                          // avatar={references.url_address + e.user_info.avatar}
                          hotelid={hotelid}
                          comId={e.id}
                          avatar={e.user_info.avatar}
                          editComment={editComment}
                          commentDelete={commentDelete}
                          setDeleteModalState={setDeleteModalState}
                          writer={true}
                        />
                      ) : (
                        <Comment
                          setc1={setc1}
                          setc={setc}
                          c={c}
                          c1={c1}
                          key={e.id}
                          commentData={e.text}
                          rate={e.rate}
                          time={e.created_at.split("T")[1].split(".")[0]}
                          first={first}
                          last={last}
                          // avatar={avatar}
                          avatar={e.user_info.avatar}
                          hotelid={hotelid}
                          comId={e.id}
                          editComment={editComment}
                          commentDelete={commentDelete}
                          setDeleteModalState={setDeleteModalState}
                          writer={false}
                        />
                      )
                    )
                  : null}
                <AddComment
                  buttonValue={"send"}
                  addComments={addComments}
                  avatar={avatar}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mb-3 btn btn-secondary room-facilities"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
        >
          See all comment
        </button>
        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="AllFacilities"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered  modal-lg  modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="AllFacilities">
                  Hotel Comments
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="container">
                  {Array.isArray(c)
                    ? c.map((e) =>
                        e.writer === Comwriter ? (
                          <Comment
                            setc1={setc1}
                            setc={setc}
                            c={c}
                            c1={c1}
                            key={e.id}
                            commentData={e.text}
                            rate={e.rate}
                            time={e.created_at.split("T")[1].split(".")[0]}
                            first={e.user_info.firstName}
                            last={last}
                            avatar={e.user_info.avatar}
                            hotelid={hotelid}
                            comId={e.id}
                            editComment={editComment}
                            commentDelete={commentDelete}
                            setDeleteModalState={setDeleteModalState}
                            writer={true}
                          />
                        ) : (
                          <Comment
                            setc1={setc1}
                            setc={setc}
                            c={c}
                            c1={c1}
                            key={e.id}
                            commentData={e.text}
                            rate={e.rate}
                            avatar={e.user_info.avatar}
                            time={e.created_at.split("T")[1].split(".")[0]}
                            first={first}
                            last={last}
                            // avatar={avatar}
                            hotelid={hotelid}
                            comId={e.id}
                            editComment={editComment}
                            commentDelete={commentDelete}
                            setDeleteModalState={setDeleteModalState}
                            writer={false}
                          />
                        )
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </main>
  );
};

export default Feedback;
