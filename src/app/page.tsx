"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkRefund() {
    try {
      if (!email) {
        setError("Please enter customer email");
        return;
      }

      setLoading(true);
      setError("");
      setResponse(null);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setResponse(data);
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">
          🤖 AI Customer Support Agent
        </h1>

        <p className="text-gray-600 mb-6">
          Check customer refund eligibility instantly.
        </p>

        {/* Search Section */}

        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="border rounded-lg p-3 flex-1"
            placeholder="Enter customer email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={checkRefund}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Refund"}
          </button>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-5 bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Result */}

        {response?.customer && (
          <div className="mt-8 space-y-5">
            {/* Customer */}

            <div className="border rounded-lg p-5">
              <h2 className="text-xl font-bold mb-3">Customer Details</h2>

              <p>
                <b>Name:</b> {response.customer.name}
              </p>

              <p>
                <b>Email:</b> {response.customer.email}
              </p>

              <p>
                <b>Order ID:</b> {response.customer.orderId}
              </p>

              <p>
                <b>Product:</b> {response.customer.product}
              </p>

              <p>
                <b>Purchase Date:</b> {response.customer.purchaseDate}
              </p>
            </div>

            {/* Refund */}

            <div className="border rounded-lg p-5">
              <h2 className="text-xl font-bold mb-3">Refund Decision</h2>

              <p className="mb-2">
                Status:{" "}
                {response.decision.approved ? (
                  <span className="text-green-600 font-bold">✅ Approved</span>
                ) : (
                  <span className="text-red-600 font-bold">❌ Rejected</span>
                )}
              </p>

              <p>
                <b>Reason:</b> {response.decision.reason}
              </p>
            </div>

            {/* AI Reply */}

            <div className="bg-gray-900 text-white rounded-lg p-5">
              <h2 className="text-xl font-bold mb-3">AI Support Reply</h2>

              <p className="whitespace-pre-line leading-7">
                {response.aiReply}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
