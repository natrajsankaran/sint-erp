import { Doc } from "../doc";

export interface Blend {
  blendCode: string;
  powderGrade: string;
  powderType: string;
  baseIronPowderType: string;
  ni: string;
  cu: string;
  mo: string;
  mns: string;
  c: string;
  kenolube: string;
  acrawax: string;
  zincSterate: string;
  fe: string;
  isEnabled: boolean;
}

export interface BlendDoc extends Blend, Doc { }
