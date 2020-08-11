import { TaxDoc } from "../../_shared/_types/master-data/tax";

export const TAXES: TaxDoc[] = [
  /* 1 */
  {
    "_id": "1",
    "taxName": "CGST",
    "percentage": 5,
    "isEnabled": true,
    "createdBy": "0",
    "createdAt": new Date("2020-01-22T15:59:00.785Z"),
    "updatedAt": new Date("2020-01-22T15:59:00.785Z"),
    "__v": 0
  },
  /* 2 */
  {
    "_id": "2",
    "taxName": "SGST",
    "percentage": 5,
    "isEnabled": false,
    "createdBy": "0",
    "createdAt": new Date("2020-01-22T15:59:00.785Z"),
    "updatedAt": new Date("2020-01-22T15:59:00.785Z"),
    "__v": 0
  },
  /* 3 */
  {
    "_id": "3",
    "taxName": "IGST",
    "percentage": 5,
    "isEnabled": true,
    "createdBy": "0",
    "createdAt": new Date("2020-01-22T15:59:00.785Z"),
    "updatedAt": new Date("2020-01-22T15:59:00.785Z"),
    "__v": 0
  },
];
