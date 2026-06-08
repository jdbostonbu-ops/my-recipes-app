// app/tasks/[id]/page.js
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TaskDetailPage({ params }) {
  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id: parseInt(id, 10) },
    include: { assignee: true },
  });

  if (!task) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1>Task Not Found</h1>
        <p>No task with ID {id} exists.</p>
        <Link href="/tasks" style={{ color: "#3498db" }}>
          Back to all tasks
        </Link>
      </div>
    );
  }

  const statusColors = {
    "todo": "#95a5a6",
    "in-progress": "#f39c12",
    "done": "#2ecc71",
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <Link
        href="/tasks"
        style={{ color: "#3498db", textDecoration: "none", fontSize: "14px" }}
      >
        &larr; Back to all tasks
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
        <h1 style={{ margin: 0 }}>{task.title}</h1>
        <span style={{
          backgroundColor: statusColors[task.status] || "#95a5a6",
          color: "white",
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: "bold",
        }}>
          {task.status}
        </span>
      </div>

      <div style={{
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        padding: "24px",
        margin: "20px 0",
      }}>
        <p style={{ lineHeight: "1.6", color: "#444" }}>
          {task.description || "No description provided."}
        </p>
      </div>

      <div style={{ fontSize: "14px", color: "#888" }}>
        {task.priority && <p>Priority: <strong>{task.priority}</strong></p>}
        {task.assignee && <p>Assigned to: <strong>{task.assignee.name}</strong></p>}
        <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}