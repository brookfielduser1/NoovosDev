"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const router = useRouter();
  const userRole = "ADMIN"; // Replace this with actual role-checking logic

  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      router.push("/login"); // Redirect unauthorized users to login
    }
  }, [allowedRoles, userRole, router]);

  return allowedRoles.includes(userRole) ? children : null;
};

export default ProtectedRoute;
