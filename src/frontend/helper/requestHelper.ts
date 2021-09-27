export const fetchDatabase = async (setFetch: any) => {
  //Gets the boulders from the database
  try {
    let URL = "http://localhost:3000/database/";

    const res = await fetch(URL, { method: "GET", credentials: "same-origin" });
    const data = await res.json();
    setFetch(data);
  } catch (err) {
    console.log(err);
  }
};

export const sendClimbed = (selectBoulders: any) => {
  //Sends the climbed boulders to the database
  const URL = "http://127.0.0.1:3000/";

  function postData(url = "", data = {}) {
    fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  postData(URL, selectBoulders);
};

export const deleteClimbed = (boulder) => {
  //Sends a delete request from the "boulders"-database to the middleware
  const URL = "http://127.0.0.1:3000/";

  function deleteBoulder(url = "", data = {}) {
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  deleteBoulder(URL, boulder);
};
