"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { ROLES } from "@/config/roles";

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <p>Only admins can see this page.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
