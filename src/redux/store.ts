import React from "react";
import { reduce } from "./reducer"
import { createStore } from "redux";

export const store = createStore(reduce);
