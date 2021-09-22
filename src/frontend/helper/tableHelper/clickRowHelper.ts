export default function clickRowHelper(boulder: { area?: String }) {
  //Checks if the supplied boulder has an area-key
  return boulder.area == null ? true : false;
}
