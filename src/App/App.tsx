import { Header } from "../components/Header";
import { RunsHeader } from "../components/RunsHeader";
import { RunsTable } from "../components/RunsTable";
import { RunsToolbar } from "../components/RunsToolbar";
import { Sidebar } from "../components/Sidebar";
import { runs } from "../data/runs";
import s from "./App.module.scss";

export const App = () => (
  <div className={s.page}>
    <Sidebar />
    <div className={s.pageWorkspace}>
      <Header />
      <main className={s.pageMain} aria-labelledby="runs-heading">
        <RunsHeader count={runs.length} />
        <RunsToolbar />
        <RunsTable runs={runs} />
        <p className={s.pageNote}>
          A little less busywork. A lot more building.
        </p>
      </main>
    </div>
  </div>
);
