export const queryKeys = {
  dashboard: {
    home: ["dashboard", "home"] as const,
  },
  applications: {
    all: ["applications"] as const,
    byId: (id: string) => ["applications", id] as const,
    events: (id: string) => ["applications", "events", id] as const,
  },
  users: {
    all: ["users"] as const,
    byId: (id: string) => ["users", id] as const,
  },
  modules: {
    all: ["modules"] as const,
    cards: {
      byId: (id: string) => ["modules", "cards", id] as const,
    },
    loans: {
      byId: (id: string) => ["modules", "loans", id] as const,
    },
  },
  auth: {
    me: ["auth", "me"] as const,
  },
};
