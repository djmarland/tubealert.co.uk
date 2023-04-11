import { Line } from "../services/Line";
import { ALL_LINES } from "../services/Line";
import styles from "./Lines.module.css";

export const Lines = () => {
  return (
    <ul class={styles.Lines}>
      {ALL_LINES.map((line: Line) => (
        <li class={styles.Line} key={line.tflKey} data-line={line.tflKey}>
          {line.name}
        </li>
      ))}
    </ul>
  );
};
