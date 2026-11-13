import s from "./App.module.scss";

const App = () => {
  return (
    <main className={s.page}>
      <section className={s.intro}>
        <span className={s.eyebrow}>Runforge</span>
        <h1>AI agent runs, all in one place.</h1>
        <p>The project is ready for the Runs dashboard implementation.</p>
      </section>
    </main>
  );
};

export default App;
