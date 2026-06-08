import Background from './components/Background';
import Header from './components/Header';
import Main from './components/Main';
import useConfigStore from './stores/config';

function App() {
  const config = useConfigStore((state) => state.config);
  const configKey = `${config.break}${config.focus}${config.focusTotal}${config.longBreak}`;

  return (
    <>
      <Background />
      <Header />
      <Main key={configKey} />
    </>
  );
}

export default App;
