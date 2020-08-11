import { EnquiryDoc } from "../_types/enquiry";

export const ENQUIRIES: EnquiryDoc[] = [
  /* 1 */
  {
    "_id": "1",
    "referenceCode": "EN20AM001",
    "customerName": "John Doe",
    "contactInformation": "+1-234-567-890",
    "sector": "Automobile",
    "partReference": "AGSHD-776",
    "partQuantity": "500",
    "drawing": "",
    "status": "Query Raised",
    "createdBy": "0",
    "createdAt": new Date("2020-01-22T15:59:00.785Z"),
    "updatedAt": new Date("2020-01-22T15:59:00.785Z"),
    "__v": 0
  },
  /* 2 */
  {
    "_id": "2",
    "referenceCode": "EN20HA002",
    "customerName": "Chris Rucker",
    "contactInformation": "+1-890-234-567",
    "sector": "Home Appliances",
    "partReference": "KLS-231",
    "partQuantity": "1000",
    "drawing": "",
    "status": "PO Given",
    "createdBy": "0",
    "createdAt": new Date("2020-01-22T15:59:00.785Z"),
    "updatedAt": new Date("2020-01-22T15:59:00.785Z"),
    "__v": 0
  },
  /* 3 */
  {
    "_id": "3",
    "referenceCode": "EN20OE003",
    "customerName": "William White",
    "contactInformation": "+1-567-234-890",
    "sector": "OEM",
    "partReference": "UIAS-031",
    "partQuantity": "300",
    "drawing": "",
    "status": "Pending",
    "createdBy": "0",
    "createdAt": new Date("2020-01-22T15:59:00.785Z"),
    "updatedAt": new Date("2020-01-22T15:59:00.785Z"),
    "__v": 0
  },
];
