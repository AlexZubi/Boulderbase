import Header from "../../components/header/Header";
import { Table } from "../../components/Table";
import { GoBackButton } from "../../components/GoBackButton";
import { Boulder } from "../../../models/common"

interface ResultsPageProps {
  fetchedBoulders: Boulder[];
  setFetchedBoulders: (boulders: Boulder[]) => void;
}

const UserPage = ({
  fetchedBoulders,
  setFetchedBoulders,
}: ResultsPageProps) => {
  const deleteBoulder = (boulderToDelete: Boulder) => {
    const newFetch = fetchedBoulders.filter((boulder) => {

      return boulder != boulderToDelete;
    });
    setFetchedBoulders(newFetch);
  };

  return (
    <>
      <Header title="Results">
        <GoBackButton />
      </Header>
      <Table
        boulderData={fetchedBoulders}
        headingColumns={["Name", "Grade", "Area"]}
        deleteBoulder={deleteBoulder}
      />
    </>
  );
};

export default UserPage;
