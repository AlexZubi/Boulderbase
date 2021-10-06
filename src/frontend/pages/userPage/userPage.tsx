import Header from "../../components/header/Header";
import { Table } from "../../components/Table";
import { GoBackButton } from "../../components/GoBackButton";
import { BoulderType } from "../../components/types/boulderType";

interface ResultsPageProps {
  fetchedBoulders: BoulderType[];
  setFetchedBoulders: (boulders: BoulderType[]) => void;
}

const UserPage = ({
  fetchedBoulders,
  setFetchedBoulders,
}: ResultsPageProps) => {
  const deleteBoulder = (boulderToDelete: BoulderType) => {
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
