/* export const searchAreas = (setAreas) => async (area: string) => {
  try {
    let URL = "http://localhost:3000/area/" + area;

    const res = await fetch(URL, { method: "GET", credentials: "same-origin" });
    const data = await res.json();
    setAreas(data);
  } catch (err) {
    console.log(area);
  }
}; */

export const searchBoulders = (setBoulders) => async (area: string) => {
  try {
    let URL = "http://localhost:3000/boulder/" + area;

    const res = await fetch(URL, { method: "GET", credentials: "same-origin" });
    const data = await res.json();
    setBoulders(data);
  } catch (err) {
    console.log(err);
  }
};
