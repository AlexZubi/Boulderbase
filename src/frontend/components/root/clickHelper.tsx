export default function clickHelper(boulder: { area?: String }) {
  if (boulder.area == null) {
    return true;
  } else {
    return false;
  }
}
