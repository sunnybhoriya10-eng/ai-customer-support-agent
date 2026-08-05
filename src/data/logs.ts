export interface AgentLog {
  id: number;
  step: string;
  status: "success" | "processing" | "failed";
  message: string;
}

export const agentLogs: AgentLog[] = [
  {
    id: 1,
    step: "Customer Lookup",
    status: "success",
    message: "Customer found in CRM database.",
  },
  {
    id: 2,
    step: "Refund Policy Check",
    status: "success",
    message: "Refund policy validated successfully.",
  },
  {
    id: 3,
    step: "Decision",
    status: "success",
    message: "Refund approved.",
  },
];
