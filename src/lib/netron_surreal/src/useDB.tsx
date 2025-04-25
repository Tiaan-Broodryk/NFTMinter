// import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type Queries } from "~/generated/combined";
import { NSurreal } from "./NSurreal";
import { create } from "zustand";
import { api } from "~/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { env } from "~/env";
import { fe_env } from "~/fe_env";
import { type NSurrealOptions } from "./NSurrealOptions";
import { ConnectionStatus } from "surrealdb";

interface DBState {
  db: NSurreal<Queries>;
  guestmode: boolean | null;
  uid: string;
  pass: string;
  set: (state: Partial<DBState>) => void;
}

const useDBState = create<DBState>()((set) => ({
  db: new NSurreal<Queries>(),
  guestmode: null,
  uid: crypto.randomUUID(),
  pass: crypto.randomUUID(),
  set,
}));
