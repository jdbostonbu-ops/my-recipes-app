// app/tasks/page.js
import { prisma } from "@/lib/prisma";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    include: { assignee: true },
  });

  return (
    <div>
      <h1>All Tasks</h1>
      <p>{tasks.length} tasks found</p>

      {tasks.length === 0 ? (
        <p style={{ color: "#999" }}>No tasks yet. Check your seed data.</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                margin: "12px 0",
                backgroundColor: task.status === "done" ? "#f0fff0" : "#fafafa",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: "0 0 8px 0" }}>{task.title}</h2>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: task.status === "done" ? "#2ecc71" : task.status === "in-progress" ? "#f39c12" : "#95a5a6",
                  color: "white",
                }}>
                  {task.status}
                </span>
              </div>
              <p style={{ color: "#666", margin: "4px 0" }}>{task.description}</p>
              <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#888" }}>
                {task.priority && <span>Priority: {task.priority}</span>}
                {task.assignee && <span>Assigned to: {task.assignee.name}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}