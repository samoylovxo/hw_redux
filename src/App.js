import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { Notes } from "./components/Notes";

const App = () => {
  return (
    <Provider store={configureStore()}>
      <Notes />
    </Provider>
  );
};

export { App };
