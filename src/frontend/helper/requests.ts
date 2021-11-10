import { Boulder } from "../../models/common";

export const retrieveBoulders = (areaName: string) => {
  const URL = "http://localhost:3000/boulders/" + areaName;

  return fetch(URL, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((boulders) => {
      
      return boulders.json();
    })
    .then((boulder) => {
      if (boulder.length === 0) {
        console.error("Area not found");
      } else {

        return boulder;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const retrieveUserBoulders = async (
  setFetch: (res: Boulder[]) => void
) => {
  //Gets the boulders from the database
  try {
    let URL = "http://localhost:3000/boulders";

    const res = await fetch(URL, { method: "GET", credentials: "same-origin" });
    const data = await res.json();

    setFetch(data);
  } catch (error) {
    console.error(error);
  }
};

export const insertUserBoulder = (boulder_id: number) => {
  //Sends the climbed boulders to the database
  const URL = "http://127.0.0.1:3000/boulders/" + boulder_id;

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
      },
    });
  }
  deleteBoulder(URL);
};
