import { Doc } from "../doc";

export interface RawMaterial {
  powderCode: string;
  powderManufacturer: string;
  powderManufacturerCode: string;
  baseIronPowderType: string;
  ni: string;
  cu: string;
  mo: string;
  mn: string;
  mns: string;
  c: string;
  si: string;
  cr: string;
  s: string;
  p: string;
  ot: string;
  k_lube: string;
  a_wax: string;
  znS: string;
  fe: string;
  flowRate: string;
  ad: string;
  isEnabled: boolean;
}

export interface RawMaterialDoc extends RawMaterial, Doc { }
