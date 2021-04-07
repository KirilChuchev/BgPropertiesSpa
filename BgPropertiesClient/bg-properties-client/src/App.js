import { Switch, Route } from "react-router-dom";
import IsAuthenticated from "./hoc/IsAuthenticated";
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
    /*the paths' order is important */
    /* paths with parameters must be after other without */
    <Switch>
      <Route
        path="/"
        exact
        component={() => <IsAuthenticated Component={Home} />}
      />
      <Route
        path="/Home"
        exact
        component={() => <IsAuthenticated Component={Home} />}
      />
      {/* <Route path="/" exact component={IsAuthenticated(Home)} /> */}
      {/* <Route path="/home" exact component={IsAuthenticated(Home)} /> */}
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <Route
        // path="/searchsets/all" exact component={() => <SearchSets />}
        path="/searchsets"
        exact
        // component={() => <SearchSets />}
        component={() => <IsAuthenticated Component={SearchSets} />}
      />
      <Route
        path={`/searchsets/create`}
        exact
        // component={() => <CreateEditSearchSet />}
        component={() => <IsAuthenticated Component={CreateEditSearchSet} />}
      />
      <Route
        path={`/searchsets/edit/:searchSetId`}
        exact
        // component={() => <CreateEditSearchSet />}
        component={() => <IsAuthenticated Component={CreateEditSearchSet} />}
      />
      <Route
        path={`/searchsets/:searchSetId`}
        exact
        // component={() => <SearchSet />}
        component={() => <IsAuthenticated Component={SearchSet} />}
      />

      <Route
        // path="/searchsets/all/bg-properties/all-tracked/" exact component={() => <BgProperties />}
        path="/searchsets/all/bg-properties/all-tracked"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />
      <Route
        path="/searchsets/all/bg-properties/all-new"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />

      <Route
        // path="/searchsets/:searchSetId/bg-properties/all/" exact component={() => <BgProperties />}
        path="/searchsets/:searchSetId/bg-properties"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />

      <Route
        // path="/searchsets/:searchSetId/bg-properties/all-tracked/" exact component={() => <BgProperties />}
        path="/searchsets/:searchSetId/bg-properties/all-tracked"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />

      <Route
        path="/searchsets/:searchSetId/bg-properties/:bgPropertyId"
        exact
        // component={() => <BgProperty />}
        component={() => <IsAuthenticated Component={BgProperty} />}
      />

      <Route
        path="/statistics/top-profitable/:searchSetId"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />
      <Route
        path="/statistics/searchsets/all/bg-properties/all-newly"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />
      <Route
        path="/statistics/searchsets/:searchSetId/bg-properties/all-newly"
        exact
        // component={() => <BgProperties />}
        component={() => <IsAuthenticated Component={BgProperties} />}
      />
    </Switch>
  );
};

export default App;
