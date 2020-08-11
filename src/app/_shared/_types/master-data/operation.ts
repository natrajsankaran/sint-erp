import { Doc } from "../doc";

export interface Operation {
  operationName: string;
  // remove description, isEnabledInHouse & isEnabledSubContract, it is only for demo
  description: string;
  isEnabledInHouse: boolean;
  isEnabledSubContract: boolean;
  isEnabled: boolean;
}

export interface OperationDoc extends Operation, Doc { }
