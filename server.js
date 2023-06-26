const cron = require("node-cron");
const express = require("express");
const axios = require("axios");
const moment = require("moment");

const app = express();

job = cron.schedule("*/60 * * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 60 seconds");

  // check accomodation

  axios
    .get(
      "https://online.tirupatibalaji.ap.gov.in/sdn/rest/v1/acc/get_availability?for=dashboard&location=TIRUMALA"
    )
    .then((res) => {
      for (const [key, value] of Object.entries(res.data.result)) {
        if (value.avl > 0) {
          console.log(
            "accomodation seats available for day " +
              key +
              "total available " +
              value.avl
          );

          let msg =
            "accomodation seats available for day " +
            key +
            "total available " +
            value.avl;

          let month = moment(key).format("M");
          let day = moment(key).format("DD");
          if (month === "9" && day === "07") {
            axios
              .get(
                `https://api.telegram.org/bot6179873592:AAHas290B6LJ2gV7pvReRCdr8iT4gdx9dRs/sendMessage?chat_id=-727230961&text=${msg}`
              )
              .then((response) => {
                console.log("message sent" + response);
              });
          }
        } else {
          console.log("seats not available for the day " + key);
        }
      }
    })
    .catch((err) => {
      let msg = "error occured " + err;
      axios
        .get(
          `https://api.telegram.org/bot6179873592:AAHas290B6LJ2gV7pvReRCdr8iT4gdx9dRs/sendMessage?chat_id=-727230961&text=${msg}`
        )
        .then((response) => {
          console.log("message sent" + response);
        });
    });

  axios
    .get(
      "https://online.tirupatibalaji.ap.gov.in/sdn/rest/v1/acc/get_availability?for=dashboard&location=TIRUPATI"
    )
    .then((res) => {
      for (const [key, value] of Object.entries(res.data.result)) {
        if (value.avl > 0) {
          console.log(
            "accomodation seats available for day " +
              key +
              "total available " +
              value.avl
          );

          let msg =
            "accomodation seats available for day " +
            key +
            "total available " +
            value.avl;

          let month = moment(key).format("M");
          let day = moment(key).format("DD");
          if (month === "9" && day === "07") {
            axios
              .get(
                `https://api.telegram.org/bot6179873592:AAHas290B6LJ2gV7pvReRCdr8iT4gdx9dRs/sendMessage?chat_id=-727230961&text=${msg}`
              )
              .then((response) => {
                console.log("message sent" + response);
              });
          }
        } else {
          console.log("seats not available for the day " + key);
        }
      }
    })
    .catch((err) => {
      let msg = "error occured " + err;
      axios
        .get(
          `https://api.telegram.org/bot6179873592:AAHas290B6LJ2gV7pvReRCdr8iT4gdx9dRs/sendMessage?chat_id=-727230961&text=${msg}`
        )
        .then((response) => {
          console.log("message sent" + response);
        });
    });
});

//check running status 0 * * * *

jobAvailability = cron.schedule("0 * * * *", function () {
  let msg = "I am running";
  axios
    .get(
      `https://api.telegram.org/bot6179873592:AAHas290B6LJ2gV7pvReRCdr8iT4gdx9dRs/sendMessage?chat_id=-727230961&text=${msg}`
    )
    .then((response) => {
      console.log("message sent" + response);
    });
  set.clear();
});

app.head("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(moment().format());
  console.log("application listening.....");
});
//ssh -i C:\Users\akhil\Downloads\ssh-key-2023-06-12.key opc@
