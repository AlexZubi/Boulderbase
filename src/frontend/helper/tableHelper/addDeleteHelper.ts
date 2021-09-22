import clickRowHelper from "./clickRowHelper";
import { sendClimbed, deleteClimbed } from "../rootHelper/toMiddlewareHelper";

export default function toDatabase(boulder: Object) {
  //Adds or deletes from the table with climbed boulders based on which table sent the request
  if (clickRowHelper(boulder)) {
    sendClimbed(boulder, function (res) {});
    return true;
  } else {
    deleteClimbed(boulder, function (res) {});
  }
  return false;
}
