import { Doc } from "../doc";

export interface Machine {
  code: string;
  machineName: string;
  isEnabled: boolean;
  // remove make,countryOfOrigin,purchaseDate,lastServiceDate,dueServiceDate,criticalSpares,criticalSparesString,operation, it is only for demo
  make: string;
  countryOfOrigin: string;
  purchaseDate: string;
  lastServiceDate: string;
  dueServiceDate: string;
  criticalSpares: string;
  operation: string;
}

export interface MachineDoc extends Machine, Doc { }
