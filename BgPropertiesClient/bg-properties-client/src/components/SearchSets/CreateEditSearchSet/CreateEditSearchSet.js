import { useParams } from "react-router-dom";

import CreateForm from "./CreateForm/CreateForm";
import EditForm from "./EditForm/EditForm";

const SearchSetCreate = () => {

  let { searchSetId } = useParams();

  console.log(searchSetId);

  if (searchSetId) {
    return <EditForm searchSetId={searchSetId} /> 
  } else {
    return <CreateForm />;
  }

};

export default SearchSetCreate;
