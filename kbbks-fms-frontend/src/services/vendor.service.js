import http from "./http";

export const getVendors = () => http.get("/vendors");
export const addVendor = (data) => http.post("/vendors", data);
