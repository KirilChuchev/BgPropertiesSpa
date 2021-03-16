import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchSet from "./components/SearchSets/SearchSet";
import SearchSets from "./components/SearchSets";
import BgProperties from "./components/BgProperties";
import BgProperty from './components/BgProperties/BgProperty';
import CreateEditSearchSet from "./components/SearchSets/CreateEditSearchSet";
import "./App.css";
// import logo from './logo.svg';

const userId = "kickz23b-5930-418e-90ad-03c749554101";

const App = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Home" exact component={Home} />
      <Route path="/searchsets/" exact component={() => (<SearchSets userId={userId} />)} />
      <Route path={`/searchsets/create`} exact component={() => <CreateEditSearchSet />} />
      <Route path={`/searchsets/:searchSetId`} exact component={() => (<SearchSet />)} />
      <Route path="/searchsets/:searchSetId/bg-properties/" exact component={() => (<BgProperties />)} />
      <Route path="/searchsets/:searchSetId/bg-properties/:bgPropertyId" exact component={() => (<BgProperty />)} />
    </Switch>
);

export default App;
