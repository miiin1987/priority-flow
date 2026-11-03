"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";

type Props = {
  onAdd: (task: Omit<Task, "id">) => void;
};

type SelectValue = "high" | "low" | "";

export default function TaskForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [urgent, setUrgent] = useState<SelectValue>("");
  const [important, setImportant] = useState<SelectValue>("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.trim() === "") {
      setError("タスク名を入力してください");
      return;
    }
    if (name.trim().length > 100) {
      setError("タスク名は100文字以内で入力してください");
      return;
    }
    if (urgent === "") {
      setError("緊急度を選択してください");
      return;
    }
    if (important === "") {
      setError("重要度を選択してください");
      return;
    }

    setError("");
    onAdd({
      name: name.trim(),
      urgent: urgent === "high",
      important: important === "high",
    });
    setName("");
    setUrgent("");
    setImportant("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="task-name" className="text-sm font-medium text-gray-700">
          タスク名 <span aria-hidden="true">*</span>
        </label>
        <input
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：企画書を作成する"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-required="true"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="task-urgent" className="text-sm font-medium text-gray-700">
            緊急度 <span aria-hidden="true">*</span>
          </label>
          <select
            id="task-urgent"
            value={urgent}
            onChange={(e) => setUrgent(e.target.value as SelectValue)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-required="true"
          >
            <option value="">選択してください</option>
            <option value="high">高（急ぎ）</option>
            <option value="low">低（急がない）</option>
          </select>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="task-important" className="text-sm font-medium text-gray-700">
            重要度 <span aria-hidden="true">*</span>
          </label>
          <select
            id="task-important"
            value={important}
            onChange={(e) => setImportant(e.target.value as SelectValue)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-required="true"
          >
            <option value="">選択してください</option>
            <option value="high">高（重要）</option>
            <option value="low">低（重要でない）</option>
          </select>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 sm:w-auto"
      >
        登録する
      </button>
    </form>
  );
}
