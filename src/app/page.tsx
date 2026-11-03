"use client";

import { useEffect, useState } from "react";
import Matrix from "@/components/Matrix";
import TaskForm from "@/components/TaskForm";
import { loadTasks, saveTasks } from "@/lib/storage";
import type { Task } from "@/lib/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // SSR/hydration 後に localStorage を読み込むための意図的な呼び出し
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasks(loadTasks());
  }, []);

  function handleAdd(partial: Omit<Task, "id">) {
    const task: Task = { id: crypto.randomUUID(), ...partial };
    const next = [...tasks, task];
    setTasks(next);
    saveTasks(next);
  }

  function handleDelete(id: string) {
    const target = tasks.find((t) => t.id === id);
    const label = target ? `「${target.name}」` : "このタスク";
    if (!window.confirm(`${label}を削除しますか？`)) return;
    const next = tasks.filter((t) => t.id !== id);
    setTasks(next);
    saveTasks(next);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">PriorityFlow</h1>
          <p className="mt-1 text-sm text-gray-500">
            タスクを緊急度・重要度で分類して、何から取りかかるか判断しやすくします。
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="mb-4 text-lg font-semibold text-gray-800">
            タスクを登録する
          </h2>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <TaskForm onAdd={handleAdd} />
          </div>
        </section>

        <section aria-labelledby="matrix-heading">
          <h2 id="matrix-heading" className="mb-4 text-lg font-semibold text-gray-800">
            優先度マトリクス
          </h2>
          <Matrix tasks={tasks} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="mx-auto max-w-3xl px-4 pb-8">
        <p className="text-xs text-gray-400">
          タスクはこのブラウザ内にのみ保存されます。ブラウザデータの消去やプライベートブラウズ使用時には消える場合があります。端末間の同期はされません。
        </p>
      </footer>
    </div>
  );
}
