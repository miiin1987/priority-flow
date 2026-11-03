import { QUADRANTS } from "@/lib/types";
import type { Task } from "@/lib/types";
import Quadrant from "./Quadrant";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

export default function Matrix({ tasks, onDelete }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {QUADRANTS.map((config) => (
        <Quadrant
          key={config.key}
          config={config}
          tasks={tasks.filter(
            (t) => t.urgent === config.urgent && t.important === config.important
          )}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
