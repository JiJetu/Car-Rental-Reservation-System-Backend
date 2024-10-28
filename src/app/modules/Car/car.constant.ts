export const CarStatus = {
  available: "available",
  unavailable: "unavailable",
} as const;

export const CarSearchableField = [
  "name",
  "color",
  "isElectric",
  "pricePerHour",
  "features",
  "type",
  "status",
  "location",
  "isDeleted",
];
