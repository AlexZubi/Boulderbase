import { Boulder } from "../components/types/common";

export const retrieveUserBoulders = async (setFetch: (res: Boulder[]) => void) => {
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

export const insertUserBoulder = (boulder_id: number) => {
  //Sends the climbed boulders to the database
  const URL = "http://127.0.0.1:3000/" + boulder_id;

  function postData(url = "") {
    fetch(url, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  postData(URL);
};

export const deleteUserBoulder = (boulder_id: number) => {
  //Sends a delete request from the "boulders"-database to the middleware
  const URL = "http://127.0.0.1:3000/boulders/" + boulder_id;

  function deleteBoulder(url = "") {
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
  deleteBoulder(URL);
};
