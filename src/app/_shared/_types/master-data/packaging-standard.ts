import { Doc } from "../doc";

export interface PackagingStandard {
  packagingStandardName: string;
  code: string;
  isEnabled: boolean;
}

export interface PackagingStandardDoc extends PackagingStandard, Doc { }
