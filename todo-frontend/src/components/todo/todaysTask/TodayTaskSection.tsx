"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { apiRequest, type Todo, type TodoInput } from "@/src/lib/api";

type TodayTaskSectionProps = { mode?: "today" | "upcoming" };

const emptyForm: TodoInput = {
  title: "",
  description: null,
  completed: false,
  priority: "MEDIUM",
  dueDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

const TodayTaskSection = ({ mode = "today" }: TodayTaskSectionProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      const response = await apiRequest<{ userTodos: { todos?: Todo[] } | Todo[] }>("/todo/get-todos?limit=50&sort=dueDate&order=asc");
      const result = response.userTodos;
      setTodos(Array.isArray(result) ? result : result.todos ?? []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTodos();
    const openForm = () => setIsFormOpen(true);
    window.addEventListener("taskflow:add-task", openForm);
    return () => window.removeEventListener("taskflow:add-task", openForm);
  }, []);

  const visibleTodos = todos.filter((todo) => {
    if (!todo.dueDate) return mode === "today";
    const due = new Date(todo.dueDate);
    const now = new Date();
    return mode === "today" ? due.toDateString() === now.toDateString() : due > now;
  });

  const createTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      const response = await apiRequest<{ createdTodo: Todo }>("/todo/create-todo", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setTodos((current) => [response.createdTodo, ...current]);
      setForm(emptyForm);
      setIsFormOpen(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to create task");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await apiRequest<{ todo: Todo }>(`/todo/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      });
      setTodos((current) => current.map((item) => item._id === todo._id ? response.todo : item));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update task");
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await apiRequest(`/todo/${todoId}`, { method: "DELETE" });
      setTodos((current) => current.filter((todo) => todo._id !== todoId));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete task");
    }
  };

  return (
    <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      {/* Tasks */}
      <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            {`Today's Tasks`}
          </h2>

          <p className="text-sm text-gray-500">
            {visibleTodos.filter((todo) => !todo.completed).length} tasks remaining
          </p>
        </div>

        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {isFormOpen && <form onSubmit={createTodo} className="mb-5 grid gap-3 rounded-xl bg-[#f7f7f4] p-4 sm:grid-cols-2">
          <input required minLength={3} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Task title" className="rounded-lg border border-gray-200 bg-white px-3 py-2 sm:col-span-2" />
          <input type="datetime-local" required value={form.dueDate.slice(0, 16)} onChange={(event) => setForm({ ...form, dueDate: new Date(event.target.value).toISOString() })} className="rounded-lg border border-gray-200 bg-white px-3 py-2" />
          <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="rounded-lg border border-gray-200 bg-white px-3 py-2">
            <option value="LOW">Low priority</option><option value="MEDIUM">Medium priority</option><option value="HIGH">High priority</option>
          </select>
          <button disabled={isSaving} className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white sm:col-span-2">{isSaving ? "Saving..." : "Save task"}</button>
        </form>}
        <div className="flex flex-col gap-3">
          {isLoading ? <p className="text-sm text-gray-500">Loading tasks...</p> : visibleTodos.length === 0 ? <p className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">No tasks here yet. Add one to get started.</p> : visibleTodos.map((todo) => <div key={todo._id} className="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
            <button type="button" onClick={() => void toggleTodo(todo)} aria-label={`Mark ${todo.title} ${todo.completed ? "active" : "complete"}`} className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${todo.completed ? "border-black bg-black" : "border-gray-300"}`} />
            <div className="min-w-0 flex-1"><p className={`font-medium ${todo.completed ? "text-gray-400 line-through" : "text-gray-900"}`}>{todo.title}</p><p className="text-xs text-gray-500">{todo.dueDate ? new Date(todo.dueDate).toLocaleString() : "No due date"} · {todo.priority}</p></div>
            <button type="button" onClick={() => void deleteTodo(todo._id)} className="text-xs font-semibold text-gray-500 hover:text-red-600">Delete</button>
          </div>)}
        </div>
      </div>

      {/* Summary */}
      <aside className="rounded-2xl border border-gray-200 bg-[#F4F4F4] p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Summary
        </h2>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {todos.filter((todo) => todo.completed).length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-gray-500">
              Remaining
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {todos.filter((todo) => !todo.completed).length}
            </p>
          </div>
        </div>
      </aside>
    </section>
  )
}

export default TodayTaskSection