import { Doc } from "../doc";

export interface Tax {
  taxName: string;
  // remove percent, it is only for demo
  percentage: number;
  options?: [{
    value: string;
    label: string;
    isDefault: boolean;
  }],
  isEnabled: boolean;
}

export interface TaxDoc extends Tax, Doc { }
