import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

let pTag = " ";
let iTag1 = " ";
let spanTag1 = " ";
let iTag2 = "";
let spanTag2 = "";
let formTag = "";
let textContent = "";
let pId = "";
let updateBtn = "";
let changedComment = " ";
// let currentComment = " ";

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleDelete = async event => {
  const deleteId =
    event.currentTarget.parentNode.parentNode.parentNode.childNodes[0]
      .childNodes[1].childNodes[1].id;
  const li = event.currentTarget.parentNode.parentNode.parentNode;

  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId: deleteId
    }
  });
  if (response.status === 200) {
    li.remove();
    decreaseNumber();
  }
};

const newComment = async (comment, event) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/updateComment`,
    method: "POST",
    data: {
      comment,
      commentId: pId
    }
  });

  if (response.status === 200) {
    changedComment = comment;
    handleCancle(event, comment);
  }
};

const handleUpdateComment = event => {
  event.preventDefault();
  const updateInput = event.target.querySelector("input");
  const comment = updateInput.value;
  newComment(comment, event);
};

const handleCancle = (event, comment) => {
  if (event.target.tagName === "FORM") {
    formTag = event.target;
    iTag1 =
      event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]
        .childNodes[0].childNodes[0];
    spanTag1 =
      event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]
        .childNodes[0].childNodes[1];
    iTag2 =
      event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]
        .childNodes[1].childNodes[0];
    spanTag2 =
      event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]
        .childNodes[1].childNodes[1];

    const p = document.createElement("p");
    const inputComment = event.target.querySelector("input").value;
    p.innerText = inputComment;
    p.id = pId;
    formTag.replaceWith(p);
    iTag1.className = "fas fa-pencil-alt ";
    spanTag1.innerHTML = "update";
    iTag2.className = "fas fa-trash-alt";
    spanTag2.innerHTML = "delete";
    iTag1.parentNode.addEventListener("click", handleChangeForm, {
      once: true
    });
  } else {
    formTag =
      event.currentTarget.parentNode.parentNode.parentNode.childNodes[0]
        .childNodes[1].childNodes[1];
    iTag1 = event.currentTarget.parentNode.childNodes[0].childNodes[0];
    spanTag1 = event.currentTarget.parentNode.childNodes[0].childNodes[1];
    iTag2 = event.currentTarget.childNodes[0];
    spanTag2 = event.currentTarget.childNodes[1];

    const p = document.createElement("p");
    p.innerText = textContent;
    p.id = pId;
    formTag.replaceWith(p);
    iTag1.className = "fas fa-pencil-alt ";
    spanTag1.innerHTML = "update";
    iTag2.className = "fas fa-trash-alt";
    spanTag2.innerHTML = "delete";
    event.currentTarget.parentNode.childNodes[0].addEventListener(
      "click",
      handleChangeForm,
      {
        once: true
      }
    );
  }
};

const handleChangeForm = event => {
  pTag =
    event.currentTarget.parentNode.parentNode.parentNode.childNodes[0]
      .childNodes[1].childNodes[1];

  iTag1 = event.currentTarget.childNodes[0];
  spanTag1 = event.currentTarget.childNodes[1];
  iTag2 = event.currentTarget.parentNode.childNodes[1].childNodes[0];
  spanTag2 = event.currentTarget.parentNode.childNodes[1].childNodes[1];

  pId = pTag.id;
  textContent = pTag.textContent;

  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "wirte hear";
  form.appendChild(input);
  pTag.replaceWith(form);
  iTag1.className = "fas fa-check-circle ";
  spanTag1.innerHTML = "enter plz";
  iTag2.className = "fas fa-times-circle";
  spanTag2.innerHTML = "cancel";

  spanTag2.parentNode.addEventListener("click", handleCancle, {
    once: true
  });
  form.addEventListener("submit", handleUpdateComment);
};

const handleCloseComment = event => {
  event.currentTarget.parentNode.childNodes[1].classList.add(
    "update__list-show"
  );

  event.currentTarget.removeEventListener("click", handleCloseComment);
  event.currentTarget.addEventListener("click", handleOpenComment);
};

const handleOpenComment = event => {
  event.currentTarget.parentNode.childNodes[1].classList.remove(
    "update__list-show"
  );
  updateBtn = event.currentTarget.parentNode.childNodes[1].childNodes[0];
  updateBtn.addEventListener("click", handleChangeForm, {
    once: true
  });
  if (
    event.currentTarget.parentNode.childNodes[1].childNodes[1].childNodes[1]
      .textContent === "delete"
  ) {
    event.currentTarget.parentNode.childNodes[1].childNodes[1].addEventListener(
      "click",
      handleDelete
    );
  }
  event.currentTarget.removeEventListener("click", handleOpenComment);
  event.currentTarget.addEventListener("click", handleCloseComment);
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, commentor, commentorAvatar, commentorId) => {
  const li = document.createElement("li");

  const div1 = document.createElement("div");
  div1.className = "comment__creator-div";
  const img = document.createElement("img");
  img.src = commentorAvatar;
  const div2 = document.createElement("div");
  div2.className = "comment__creator-info";
  const span1 = document.createElement("span");
  span1.innerHTML = commentor;
  const p = document.createElement("p");
  p.id = commentorId;
  p.innerHTML = comment;
  div2.appendChild(span1);
  div2.appendChild(p);
  div1.appendChild(img);
  div1.appendChild(div2);

  const div3 = document.createElement("div");
  div3.className = "comment__update";
  const div4 = document.createElement("div");
  div4.className = "comment__update-image";
  const i1 = document.createElement("i");
  i1.className = "fas fa-ellipsis-v";
  div4.appendChild(i1);
  div3.appendChild(div4);
  const div5 = document.createElement("div");
  div5.className = "comment__update-list";
  div5.classList.add("update__list-show");
  const div6 = document.createElement("div");
  div6.className = "update-update";
  const i2 = document.createElement("i");
  i2.className = "fas fa-pencil-alt";
  const span2 = document.createElement("span");
  span2.innerHTML = "update";
  div6.appendChild(i2);
  div6.appendChild(span2);
  div5.appendChild(div6);
  const div7 = document.createElement("div");
  div7.className = "update-delete";
  const i3 = document.createElement("i");
  i3.className = "fas fa-trash-alt";
  const span3 = document.createElement("span");
  span3.innerHTML = "delete";
  div7.appendChild(i3);
  div7.appendChild(span3);
  div5.appendChild(div7);
  div3.appendChild(div5);

  li.appendChild(div1);
  li.appendChild(div3);
  commentList.prepend(li);

  increaseNumber();

  div4.addEventListener("click", handleOpenComment);
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  const commentor = response.data.content.name;
  const commentorAvatar = response.data.content.avatarUrl;
  const commentorId = response.data.commentId;
  if (response.status === 200) {
    addComment(comment, commentor, commentorAvatar, commentorId);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
