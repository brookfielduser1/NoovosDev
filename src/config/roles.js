// src/config/roles.js

export const ROLES = {
  BUSINESS_OWNER: 'business-owner',
  BUSINESS_STAFF: 'business-staff',
  CUSTOMER_STANDARD: 'customer-standard',
  CUSTOMER_PREMIUM: 'customer-premium',
  ADMIN: 'admin',
};

// Define which roles can access specific pages.
// Adjust as needed based on your project requirements.
export const ROLE_ACCESS = {
  // For example, the dashboard can be accessed by all roles.
  dashboard: [
    ROLES.BUSINESS_OWNER,
    ROLES.BUSINESS_STAFF,
    ROLES.CUSTOMER_STANDARD,
    ROLES.CUSTOMER_PREMIUM,
    ROLES.ADMIN,
  ],
  // Only admins can access the admin panel.
  admin: [ROLES.ADMIN],
  // You can define additional route rules here.
};
