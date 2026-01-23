import http from "./http";

export const addPayment = (data) => http.post("/payments", data);
