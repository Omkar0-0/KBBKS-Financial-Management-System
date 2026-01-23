import http from "./http";

export const addExpense = (data) => http.post("/expenses", data);
