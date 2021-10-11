import Header from "../../components/header/Header";
import { Area } from "../../components/SearchArea";
import { ShowClimbedButton } from "../../components/ShowClimbedButton";
import { Table } from "../../components/Table";
import { retrieveUserBoulders } from "../../helper/requestHelper";
import { Boulder } from "../../components/types/common";

interface HomePageProps {
  fetchedBoulders: Boulder[];
  setFetchedBoulders: (boulders: Boulder[]) => void;
  searchedBoulders: Boulder[];
  setSearched: (boulders: Boulder[]) => void;
}

const HomePage = ({
  fetchedBoulders,
  searchedBoulders,
  setFetchedBoulders,
  setSearched,
}: HomePageProps) => {
  const onClick = () => {
    retrieveUserBoulders(setFetchedBoulders);
  };
  return (
    <>
      <Header title="Search Area...">
        <Area onSearch={setSearched} />
        <ShowClimbedButton onClick={onClick} />
      </Header>
      {searchedBoulders ? (
        <Table
          boulderData={searchedBoulders}
          setFetchedBoulders={retrieveUserBoulders(setFetchedBoulders)}
          fetchedBoulders={fetchedBoulders}
          headingColumns={["Name", "Grade"]}
        />
      ) : null}
    </>
  );
};

export default HomePage;
