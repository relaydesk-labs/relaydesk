import type { AskResponse, Ticket } from "../types/api";

export async function askRelayDesk(message: string): Promise<AskResponse> {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("RelayDesk API request failed");
  }

  return response.json();
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch("/api/tickets");
  if (!response.ok) {
    throw new Error("Ticket API request failed");
  }
  return response.json();
}
