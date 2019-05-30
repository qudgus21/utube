const userImage = document.getElementById("jsUserImage");

const setImage = () => {
  if (!userImage.src) {
    userImage.src = "uploads/profile.png";
  }
};

const init = () => {
  if (userImage) {
    setImage();
  }
};
init();
