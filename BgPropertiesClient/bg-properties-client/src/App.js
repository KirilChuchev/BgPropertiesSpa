import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import BgProperties from "./components/BgProperties";
import Home from "./components/Home";
import SearchSet from "./components/SearchSets/SearchSet";
import SearchSets from "./components/SearchSets";
import CreateEditSearchSet from "./components/SearchSets/CreateEditSearchSet";
import BgProperty from './components/BgProperties/BgProperty';
// import logo from './logo.svg';

// const searchSetId = "4e80ee26-4ec6-408f-9e64-b7cd4f3b3404";
const userId = "kickz23b-5930-418e-90ad-03c749554101";

const App = () => (
  <Router history={{}}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Home" exact component={Home} />
      <Route path="/searchsets/all" exact component={() => (<SearchSets userId={userId} />)} />
      <Route path={`/searchsets/one/:searchSetId`} exact component={() => (<SearchSet />)} />
      {/* <Route path={`/searchsets/create/`} exact component={(props) => (<CreateEditSearchSet {...props} />)} /> */}
      <Route path={`/searchsets/create/`} exact component={() => <CreateEditSearchSet />} />
      <Route path="/bg-properties/all/:searchSetId" exact component={() => (<BgProperties />)} />
      <Route path="/bg-properties/one/:bgPropertyId/:searchSetId" exact component={() => (<BgProperty />)} />
    </Switch>
  </Router>
  // <BgPropertiesList searchSetId={searchSetId} />

  // TODO: How to use this roue with path="/bg-property/all"
);

export default App;
