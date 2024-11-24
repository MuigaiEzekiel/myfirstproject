const currentUseremail = [];
//const displayAppointmentDetails = require("./sectionone");
//Form one
const openSideBar = document.querySelector(".open--side--bar");
const userLogin = document.querySelector(".user--login");
const userSignUp = document.querySelector(".user--sign--up");
const closeSideBar = document.querySelector(".close--side--bar");
const sideBarOverlay = document.querySelector(".side--bar--overlay");
const sideBar = document.querySelector(".side--bar");
const formOne = document.querySelector(".form--one");
const overlay = document.querySelector(".overlay");
const closeLoginForm = document.querySelector(".login--form--cancel");
const inputOne = document.querySelector(".input--one");
//const loginForm = document.querySelector(".loginForm");

const passWord = document.getElementById("passWord");
const firstName = document.getElementById("first");
const registrationForm = document.querySelector(".registration--form--hidden");
const registrationBtn = document.querySelector(".registration--btn");
/// login form
const validationContainer = document.querySelector(
  ".user--validation--container"
);
const loginSuccesMessage = document.querySelector(".login--success-message");
const userLoginSubmit = document.querySelector(".user--login--submit");
let loginemailError = document.getElementById("loginemailError");
const loginNEmail = document.getElementById("logiNEmail");
let fullnameemailError = document.getElementById("fullnameemailError");
let loginPasswordError = document.getElementById("loginPasswordError");
let skipLogin = document.querySelector(".skip--login");

//registration form
//const passwordOne = document.getElementById("passwordOne");
let emailError = document.getElementById("emailError");
let ageError = document.getElementById("ageError");
let passwordOneError = document.getElementById("passwordError");
let sexError = document.getElementById("sexError");
let agreeError = document.getElementById("agreeError");
let fnameError = document.getElementById("fnameError");
let lnameError = document.getElementById("lnameError");
const registrationFormHide = document.querySelector(
  ".registration--form--hide"
);
const errorMessage = document.querySelector(".error--message");
const emailOne = document.getElementById("email1");
const passwordOne = document.getElementById("password1");
const ageOne = document.getElementById("age1");
const sexM = document.getElementById("sexM");
const sexF = document.getElementById("sexF");
const registrationFormContainer = document.getElementById(
  "registration--form--container"
);
const nativeCountry = document.getElementById("native--country");
const termsOne = document.getElementById("terms1");
const lastN = document.getElementById("lastN");
const fullN = document.getElementById("fullN");
const regfname = document.getElementById("regfname");
const reglname = document.getElementById("reglname");
const passWordR = document.getElementById("passWordR");
const registrationSubmitBtn = document.querySelector(
  ".registration--submit--btn"
);
//appointment booking
const displayAppointment = document.querySelector(".appointment--container");
const bookAppointment = document.querySelector(".appointment--booking");
const appointmentoverlay = document.querySelector(".appointmentoverlay");
const closeappointmentoverlay = document.querySelector(
  ".closeappointmentoverlay"
);
//listening to login button
userLogin.addEventListener("click", function () {
  formOne.classList.remove("hidden");
  validationContainer.style.display = "none";
});
//skipping login to access our website
skipLogin.addEventListener("click", function () {
  validationContainer.style.display = "none";
});
//opennning side nav
openSideBar.addEventListener("click", function () {
  sideBar.style.left = "0px";
  sideBarOverlay.style.left = "0px";
});
closeSideBar.addEventListener("click", function () {
  sideBar.style.left = "-150%";
  sideBarOverlay.style.left = "-200%";
});
sideBarOverlay.addEventListener("click", function () {
  sideBar.style.left = "-150%";
  sideBarOverlay.style.left = "-200%";
});
// userSignUp.addEventListener("click", function () {
//   // formOne.classList.remove("hidden");
//   // overlay.classList.remove("hidden");
// });
closeLoginForm.addEventListener("click", function () {
  formOne.classList.add("hidden");
  overlay.classList.add("hidden");
});
// login form  validation
const currentUser = {
  fullname: [],
  emai: [],
  password: [],
};
let userName = "";
//email function
let correctEmailFormat = true;
const validEmail = (email) => {
  return email.endsWith("@gmail.com")
    ? correctEmailFormat
    : !correctEmailFormat;
};
let loginNEmailcorrect = "";
const emailValidation = function () {
  //const html = `invalid email`;
  loginNEmailcorrect = loginNEmail.value;

  const responseAnswer = validEmail(loginNEmailcorrect);
  //validEmail(loginNEmailcorrect);
  responseAnswer === correctEmailFormat
    ? loginemailError.classList.add("hidden")
    : loginemailError.classList.remove("hidden");
};
// name function
const userNameValidation = function () {};
//name validation

const nameValidation = function (fullname) {
  const correctFullName = fullname;

  correctFullName
    ? fullnameemailError.classList.add("hidden")
    : fullnameemailError.classList.remove("hidden");
};
///password function
const userCorrectPassword = true;
//const correctPassword = passWordR.value;
const crP = function (password) {
  console.log(password.length);
  return password.length >= 8 ? userCorrectPassword : !userCorrectPassword;
};
const usertPasswordValidation = function () {
  const crrP = crP(passWordR.value);

  // console.log(correctPassword.length);
  crrP === userCorrectPassword
    ? loginPasswordError.classList.add("hidden")
    : loginPasswordError.classList.remove("hidden");
};
//hiding the login form
// function hideLoginForm() {
//   let x = true;
//   let ageOneNum = parseInt(ageOne.value);
//   let passwordOneNum = parseInt(passwordOne.value);
//   console.log(passwordOneNum);
//   passwordOneNum.length >= 0
//     ? console.log("validation passed")
//     : console.log("validation required");
// }

const loginsValidation = async (event) => {
  event.preventDefault();

  //username validation
  nameValidation(fullN.value);

  //email validation
  emailValidation();
  //pasword validation

  usertPasswordValidation();
  const email = loginNEmail.value;
  const password = passWordR.value;
  const name = fullN.value;
  currentUseremail.push(email);
  console.log(currentUseremail[0]);
  const loginRes = await fetch("http://localhost:3000/loginExistingUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const result = loginRes.json;
  if (loginRes.status === 200) {
    formOne.style.display = "none";

    setTimeout(() => {
      loginSuccesMessage.style.display = "block";
    }, 1000 * 1);
    setTimeout(() => {
      loginSuccesMessage.style.display = "none";
    }, 1000 * 3);

    const viewcurrprof = await fetch(
      "http://localhost:3000/viewProfileExistingUser",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        loadHhtmlTable(data[0]);
        console.log(data[0]);

        return data;
      });
    const dataone = viewcurrprof[0];
    function loadHhtmlTable(data) {
      const table = document.querySelector("tbody");
      console.log(table);

      if (data) {
        table.innerHTML = "";
        table.innerHTML = `<tr><td class = ' no-data' colspan = '5'>No Data<td><tr> `;
        return;
      }
      table.innerHTML = "";
      // const userdata = [];
      // for (const [key, value] of Object.entries(dataone)) {
      //   userdata.push(value);
      //   console.log(userdata);
      // }
      // table.innerHTML = `<tr><td>${data.first_name}<td><td>${data.email}<td><td>${data.phone}<td> <td>${data.gender}<td><td>${data.address}<td>`;
    }
    //console.log(viewcurrprof[0]);

    // console.log(dataone);
  } else {
    console.log("failed");
  }
};

userLoginSubmit.addEventListener(
  "click",

  loginsValidation

  //transmit the data
);
const registration = async (event) => {
  event.preventDefault();

  nameValidation(fullN.value);

  //email validation
  emailValidation();
  //pasword validation

  usertPasswordValidation();
};

console.log(loginNEmail.value);
// let correctFullName = fullN.value;
// correctFullName?.(crrP === userCorrectPassword)?.(
//   responseAnswer === correctEmailFormat
//)
//   ? formOne.classList.remove("hidden")
//   : formOne.classList.add("hidden");
//firstname validation

const newuser = async function (e) {
  e.preventDefault();
  console.log("submit");
  emailError.classList.add("hidden");
  let ageOneNum = parseInt(ageOne.value);
  const detgender = () => {
    if (sexF.checked) {
      return sexF.value;
    } else {
      return sexM.value;
    }
  };
  const userPassword = [];
  const password = passwordOne.value;
  const email = emailOne.value;
  const fname = regfname.value;
  const lname = reglname.value;
  const date_of_birth = "2000-12-01";
  const address = "55";
  const phone = "3245636737";
  userPassword.push(password);
  const gender = detgender();
  //username v(alidation

  const loginResponse = await fetch("http://localhost:3000/createaccount", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      fname,
      lname,
      email,
      password,
      date_of_birth,
      address,
      phone,
      gender,
    }),
  });
  const result = loginResponse.json;
  if (loginResponse.status === 200) {
    console.log("success");
  } else {
    console.log("failed");
  }
  !regfname.value
    ? fnameError.classList.remove("hidden")
    : fnameError.classList.add("hidden");
  !reglname.value
    ? lnameError.classList.remove("hidden")
    : lnameError.classList.add("hidden");

  ageOneNum >= 18 && ageOneNum <= 100
    ? ageError.classList.add("hidden")
    : ageError.classList.remove("hidden");

  !emailOne.value
    ? emailError.classList.remove("hidden")
    : emailError.classList.add("hidden");

  let passwordOneNum = parseInt(passwordOne.value);
  !passwordOneNum || passwordOneNum.length < 8
    ? passwordOneError.classList.remove("hidden")
    : passwordOneError.classList.add("hidden");

  !sexM.checked && !sexF.checked
    ? sexError.classList.remove("hidden")
    : sexError.classList.add("hidden");

  !termsOne.checked
    ? agreeError.classList.remove("hidden")
    : agreeError.classList.add("hidden");
};
registrationBtn.addEventListener("click", function () {
  registrationForm.classList.remove("hidden");
  validationContainer.style.display = "none";
});
registrationSubmitBtn.addEventListener("click", newuser);
registrationFormHide.addEventListener("click", function () {
  registrationForm.classList.add("hidden");
});
//handling appointment button
const displayAppointmentDetails = function () {
  displayAppointment.classList.remove("hidden");
  appointmentoverlay.classList.remove("hidden");
};
bookAppointment.addEventListener("click", displayAppointmentDetails);
closeappointmentoverlay.addEventListener("click", function () {
  displayAppointment.classList.add("hidden");
  appointmentoverlay.classList.add("hidden");
});
const slider = document.querySelectorAll(".service--img");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const maxserviceimg = slider.length;
let currserviceimg = 0;

btnRight.addEventListener("click", function () {
  if (currserviceimg === maxserviceimg - 1) {
    currserviceimg = 0;
  } else {
    currserviceimg++;
  }

  slider.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currserviceimg)}%)`;
  });
});
btnLeft.addEventListener("click", function () {
  if (currserviceimg === 0) {
    currserviceimg = maxserviceimg - 1;
  } else {
    currserviceimg--;
  }

  slider.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (currserviceimg - i)}%)`;
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  e.key === "ArrowRight" && nextSlide();
});
//responsive review
const reviewBtnLeft = document.querySelector(".review--slider__btn--left");
const reviewBtnRight = document.querySelector(".review--slider__btn--right");
const reviewImg = document.querySelectorAll(".reviews-img");
let currimg = 0;
const maximg = reviewImg.length;
reviewBtnRight.addEventListener("click", function () {
  if (currimg === maximg - 1) {
    currimg = 0;
  } else {
    currimg++;
  }
  reviewImg.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (currimg - i)}%)`;
  });
});
reviewBtnLeft.addEventListener("click", function () {
  if (currimg === 0) {
    currimg = maximg - 1;
  } else {
    currimg--;
  }
  reviewImg.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (currimg - i)}%)`;
  });
});
//responsive search button
const searchBtn = document.querySelector(".fa--search");
const searchContainer = document.querySelector(".search--container");
const removeSearchBar = document.querySelector(".remove--search--bar");
const searchOverlay = document.querySelector(".search--overlay");

searchBtn.addEventListener("click", function () {
  searchContainer.style.top = "110px";
  searchOverlay.style.top = "0";
});
removeSearchBar.addEventListener("click", function () {
  searchContainer.style.top = "-50%";
  searchOverlay.style.top = "-250%";
});
searchOverlay.addEventListener("click", function () {
  searchContainer.style.top = "-50%";
  searchOverlay.style.top = "-250%";
});
//responsive profile
const userProfile = document.querySelector(".user--profile");
const userProfileContainer = document.querySelector(
  ".user--profile--container"
);
const profileOverlay = document.querySelector(".profile--overlay");
userProfile.addEventListener("click", function () {
  if (
    (userProfileContainer.style.display = "none") &&
    (userProfileUpdate.style.display = "none")
  ) {
    userProfileContainer.style.display = "block";
  }
  userProfileContainer.style.transition = " top 1s ease";
  userProfileContainer.style.top = "150px";
  profileOverlay.style.top = "0";
});
profileOverlay.addEventListener("click", function () {
  userProfileContainer.style.top = "-100px";
  profileOverlay.style.top = "-150%";
  userProfileUpdate.style.display = "none";
});
//updating user
const updateUser = document.querySelector(".update--user");
const userProfileUpdate = document.querySelector(".user--profile--update");

const profileName = document.querySelector(".profile--name");
const profileEmail = document.querySelector(".profile--email");
const profilePhone = document.querySelector(".profile--phone");

updateUser.addEventListener("click", function () {
  userProfileContainer.style.display = "none";
  userProfileUpdate.style.display = "block";
  userProfileUpdate.style.top = "150px";
  const updatingUserDetails = async function () {
    const updatedName = profileName.value;
    const UpdatedEmail = profileEmail.value;
    const updatedPhone = profilePhone.value;
    const updating = await fetch("http://localhost:3000/updateUserDetails", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        updatedName,
        UpdatedEmail,
        updatedPhone,
        password,
      }),
    });
  };
});
//loading patient details
