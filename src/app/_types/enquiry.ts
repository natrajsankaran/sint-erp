import { Doc } from "../_shared/_types/doc";

export interface Enquiry {
  referenceCode: string;
  customerName: string;
  contactInformation: string;
  sector: string;
  partReference: string;
  partQuantity: string;
  drawing: string;
  status: string;
}

export interface EnquiryDoc extends Enquiry, Doc { }
