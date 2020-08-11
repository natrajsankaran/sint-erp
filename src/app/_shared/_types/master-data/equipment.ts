import { Doc } from "../doc";

export interface Equipment {
  code: string;
  equipmentName: string;
  make: string;
  purchaseDate: string;
  lastCalibrationDate: string;
  dueCalibrationDate: string;
  leastCount: string;
  operatingRange: string;
  location: string;
  isEnabled: boolean;
}

export interface EquipmentDoc extends Equipment, Doc { }
