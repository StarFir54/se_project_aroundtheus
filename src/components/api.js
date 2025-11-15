class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "cc198a46-cc75-4d47-84b9-642ac9354b28",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  //Other Methods for Working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "cc198a46-cc75-4d47-84b9-642ac9354b28",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    // process the result
    console.log("Promise made: ", result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "GET",
  headers: {
    authorization: "cc198a46-cc75-4d47-84b9-642ac9354b28",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
