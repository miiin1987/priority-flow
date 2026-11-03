import type { QuadrantConfig, Task } from "@/lib/types";

type Props = {
  config: QuadrantConfig;
  tasks: Task[];
  onDelete: (id: string) => void;
};

const colorMap: Record<string, string> = {
  UrgentImportant: "bg-red-50 border-red-200",
  NotUrgentImportant: "bg-blue-50 border-blue-200",
  UrgentNotImportant: "bg-yellow-50 border-yellow-200",
  NotUrgentNotImportant: "bg-gray-50 border-gray-200",
};

export default function Quadrant({ config, tasks, onDelete }: Props) {
  return (
    <section
      className={`rounded-lg border p-4 ${colorMap[config.key]}`}
      aria-labelledby={`quadrant-${config.key}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2
            id={`quadrant-${config.key}`}
            className="text-base font-bold text-gray-800"
          >
            {config.label}
          </h2>
          <p className="text-xs text-gray-500">{config.description}</p>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-sm font-semibold text-gray-700 shadow-sm">
          {tasks.length}件
        </span>
      </div>

      <p className="mb-3 text-sm text-gray-600">→ {config.guideline}</p>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400">タスクなし</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-2 rounded bg-white px-3 py-2 shadow-sm"
            >
              <span className="break-all text-sm text-gray-800">
                {task.name}
              </span>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                aria-label={`${task.name}を削除`}
                className="shrink-0 rounded px-2 py-1 text-xs text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
