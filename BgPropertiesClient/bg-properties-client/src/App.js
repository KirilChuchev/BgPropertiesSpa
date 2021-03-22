import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchSet from "./components/SearchSets/SearchSet";
import SearchSets from "./components/SearchSets";
import BgProperties from "./components/BgProperties";
import BgProperty from "./components/BgProperties/BgProperty";
import CreateEditSearchSet from "./components/SearchSets/CreateEditSearchSet";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
// import logo from './logo.svg';


const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <Route
        path="/searchsets/" exact component={() => <SearchSets />}
      />
      <Route
        path={`/searchsets/create`} exact component={() => <CreateEditSearchSet />}
      />
      <Route path={`/searchsets/:searchSetId`} exact component={() => <SearchSet />}
      />
      
       {/* /searchsets/all/bg-properties/all-tracked/ */}
      
      <Route
        path="/searchsets/all/bg-properties/all-tracked/" exact component={() => <BgProperties />}
      />
      {/* paths with parameters must be after other without */}
      <Route
        path="/searchsets/:searchSetId/bg-properties/all/" exact component={() => <BgProperties />}
      />
      <Route
        path="/searchsets/:searchSetId/bg-properties/all-tracked/" exact component={() => <BgProperties />}
      />
      <Route
        path="/searchsets/:searchSetId/bg-properties/:bgPropertyId" exact component={(props) => <BgProperty props={props} />}
      />
      
      <Route
        path="/statistics/top-profitable/:searchSetId" exact component={() => <BgProperties />}
      />
    </Switch>
  );
};

export default App;
