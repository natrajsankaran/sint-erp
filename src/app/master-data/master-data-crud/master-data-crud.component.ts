import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Question, ControlType, ValidatorType } from '../../_shared/_types/_form/question';
import { EdittableListItem } from '../../_shared/_types/_form/edittableListItem';
import { FormQuestionUtilityService } from '../../_shared/_services/_form/form-question-utility.service';
import { Currency } from '../../_shared/_types/master-data/currency';
import { Tax } from '../../_shared/_types/master-data/tax';
import { Operation } from '../../_shared/_types/master-data/operation';
import { Machine } from '../../_shared/_types/master-data/machine';
import { PackagingStandard } from '../../_shared/_types/master-data/packaging-standard';
import { Equipment } from '../../_shared/_types/master-data/equipment';
import { RawMaterial } from '../../_shared/_types/master-data/raw-material';
import { Blend } from '../../_shared/_types/master-data/blend';
import { CurrencyService } from '../../_shared/_services/master-data/currency.service';
import { TaxService } from '../../_shared/_services/master-data/tax.service';
import { OperationService } from '../../_shared/_services/master-data/operation.service';
import { MachineService } from '../../_shared/_services/master-data/machine.service';
import { PackagingStandardService } from '../../_shared/_services/master-data/packaging-standard.service';
import { EquipmentService } from '../../_shared/_services/master-data/equipment.service';
import { RawMaterialService } from '../../_shared/_services/master-data/raw-material.service';
import { BlendService } from '../../_shared/_services/master-data/blend.service';

interface MasterDataCRUDTerminology {
  singular: string;
  plural: string;
  icon: string;
}

enum MasterDataType {
  CURRENCY = "CURRENCY",
  TAX = "TAX",
  OPERATION = "OPERATION",
  MACHINE = "MACHINE",
  PACKAGING_STANDARD = "PACKAGING_STANDARD",
  EQUIPMENT = "EQUIPMENT",
  RAW_MATERIAL = "RAW_MATERIAL",
  BLEND = "BLEND",
}

interface CurrencyEdittableListItem extends Currency, EdittableListItem { };
interface TaxEdittableListItem extends Tax, EdittableListItem { };
interface OperationEdittableListItem extends Operation, EdittableListItem { };
interface MachineEdittableListItem extends Machine, EdittableListItem { };
interface PackagingStandardEdittableListItem extends PackagingStandard, EdittableListItem { };
interface EquipmentEdittableListItem extends Equipment, EdittableListItem { };
interface RawMaterialEdittableListItem extends RawMaterial, EdittableListItem { };
interface BlendEdittableListItem extends Blend, EdittableListItem { };

const CURRENCY_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "currencyName",
    controlType: ControlType.TEXTBOX,
    label: "Name",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Currency Name",
        cssClasses: "col-md-3",
      }
    },
  },
  {
    privateKey: "code",
    controlType: ControlType.TEXTBOX,
    label: "Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Code",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "symbol",
    controlType: ControlType.TEXTBOX,
    label: "Symbol",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -3,
    options: {
      columnHeading: {
        label: "Symbol",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "symbolHTML",
    controlType: ControlType.TEXTBOX,
    label: "Symbol (In HTML)",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -4,
    options: {
      columnHeading: {
        label: "Symbol (In HTML)",
        cssClasses: "col-md-2",
      },
      cellView: {
        isInnerHTML: true
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

const TAX_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "taxName",
    controlType: ControlType.TEXTBOX,
    label: "Name",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Tax Name",
        cssClasses: "col-md-6",
      }
    },
  },
  {
    privateKey: "percentage",
    controlType: ControlType.TEXTBOX,
    label: "Percentage",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Percentage",
        cssClasses: "col-md-3",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

const OPERATION_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "operationName",
    controlType: ControlType.TEXTBOX,
    label: "Name",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Operation Name",
        cssClasses: "col-md-3",
      }
    },
  },
  {
    privateKey: "description",
    controlType: ControlType.TEXTBOX,
    label: "Description",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Description",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabledInHouse",
    controlType: ControlType.CHECKBOX,
    label: "In-House",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "In-House",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabledSubContract",
    controlType: ControlType.CHECKBOX,
    label: "Sub-Contract",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Sub-Contract",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

const MACHINE_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "code",
    controlType: ControlType.TEXTBOX,
    label: "Machine Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Machine Code",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "machineName",
    controlType: ControlType.TEXTBOX,
    label: "Machine Name",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Machine Name",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-1",
      }
    },
  },
  {
    privateKey: "make",
    controlType: ControlType.TEXTBOX,
    label: "Make",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Make",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "countryOfOrigin",
    controlType: ControlType.TEXTBOX,
    label: "Country Of Origin",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Country Of Origin",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "purchaseDate",
    controlType: ControlType.TEXTBOX,
    label: "Purchase Date",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Purchase Date",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "lastServiceDate",
    controlType: ControlType.TEXTBOX,
    label: "Last Service Date",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Last Service Date",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "dueServiceDate",
    controlType: ControlType.TEXTBOX,
    label: "Due Service Date",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Due Service Date",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "criticalSpares",
    controlType: ControlType.TEXTBOX,
    label: "Critical Spares",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Critical Spares",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "operation",
    controlType: ControlType.TEXTBOX,
    label: "Operation",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Operation",
        cssClasses: "col-md-2",
      }
    },
  },
];

const PACKAGING_STANDARD_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "packagingStandardName",
    controlType: ControlType.TEXTBOX,
    label: "Packaging Standard Name",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Packaging Standard Name",
        cssClasses: "col-md-5",
      }
    },
  },
  {
    privateKey: "code",
    controlType: ControlType.TEXTBOX,
    label: "Packaging Standard Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Packaging Standard Code",
        cssClasses: "col-md-4",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

const EQUIPMENT_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "code",
    controlType: ControlType.TEXTBOX,
    label: "Equipment Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Equipment Code",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "equipmentName",
    controlType: ControlType.TEXTBOX,
    label: "Equipment Name",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Equipment Name",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "make",
    controlType: ControlType.TEXTBOX,
    label: "Make",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Make",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "purchaseDate",
    controlType: ControlType.TEXTBOX,
    label: "Purchase Date",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Purchase Date",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "lastCalibrationDate",
    controlType: ControlType.TEXTBOX,
    label: "Last Calibration Date",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Last Calibration Date",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "dueCalibrationDate",
    controlType: ControlType.TEXTBOX,
    label: "Due Calibration Date",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Due Calibration Date",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "leastCount",
    controlType: ControlType.TEXTBOX,
    label: "Least Count",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Least Count",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "operatingRange",
    controlType: ControlType.TEXTBOX,
    label: "Operating Range",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Operating Range",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "location",
    controlType: ControlType.TEXTBOX,
    label: "Location",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Location",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

const RAW_MATERIAL_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "powderCode",
    controlType: ControlType.TEXTBOX,
    label: "Powder Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Powder Code",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "powderManufacturer",
    controlType: ControlType.TEXTBOX,
    label: "Powder Manufacturer",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Powder Manufacturer",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "powderManufacturerCode",
    controlType: ControlType.TEXTBOX,
    label: "Powder Manufacturer Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Powder Manufacturer Code",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "baseIronPowderType",
    controlType: ControlType.TEXTBOX,
    label: "Base Iron Powder Type",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Base Iron Powder Type",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "ni",
    controlType: ControlType.TEXTBOX,
    label: "NI",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "NI",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "cu",
    controlType: ControlType.TEXTBOX,
    label: "CU",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "CU",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "mo",
    controlType: ControlType.TEXTBOX,
    label: "MO",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "MO",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "mn",
    controlType: ControlType.TEXTBOX,
    label: "MN",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "MN",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "mns",
    controlType: ControlType.TEXTBOX,
    label: "MNS",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "MNS",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "c",
    controlType: ControlType.TEXTBOX,
    label: "C",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "C",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "si",
    controlType: ControlType.TEXTBOX,
    label: "SI",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "SI",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "cr",
    controlType: ControlType.TEXTBOX,
    label: "CR",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "CR",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "s",
    controlType: ControlType.TEXTBOX,
    label: "S",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "S",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "p",
    controlType: ControlType.TEXTBOX,
    label: "P",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "P",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "ot",
    controlType: ControlType.TEXTBOX,
    label: "OT",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "OT",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "k_lube",
    controlType: ControlType.TEXTBOX,
    label: "K_LUBE",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "K_LUBE",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "a_wax",
    controlType: ControlType.TEXTBOX,
    label: "A_WAX",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "A_WAX",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "znS",
    controlType: ControlType.TEXTBOX,
    label: "ZNS",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "ZNS",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "fe",
    controlType: ControlType.TEXTBOX,
    label: "FE",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "FE",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "flowRate",
    controlType: ControlType.TEXTBOX,
    label: "FLOWRATE",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "FLOWRATE",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "ad",
    controlType: ControlType.TEXTBOX,
    label: "AD",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "AD",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

const BLEND_EDIT_FORM_QUESTIONS: Question[] = [
  {
    privateKey: "blendCode",
    controlType: ControlType.TEXTBOX,
    label: "Blend Code",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Blend Code",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "powderGrade",
    controlType: ControlType.TEXTBOX,
    label: "Powder Grade",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Powder Grade",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "powderType",
    controlType: ControlType.TEXTBOX,
    label: "Powder Type",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -1,
    options: {
      columnHeading: {
        label: "Powder Type",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "baseIronPowderType",
    controlType: ControlType.TEXTBOX,
    label: "Base Iron Powder Type",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "Base Iron Powder Type",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "ni",
    controlType: ControlType.TEXTBOX,
    label: "NI",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "NI",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "cu",
    controlType: ControlType.TEXTBOX,
    label: "CU",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "CU",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "mo",
    controlType: ControlType.TEXTBOX,
    label: "MO",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "MO",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "mns",
    controlType: ControlType.TEXTBOX,
    label: "mNS",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "MNS",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "c",
    controlType: ControlType.TEXTBOX,
    label: "C",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "C",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "kenolube",
    controlType: ControlType.TEXTBOX,
    label: "KENOLUBE",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "KENOLUBE",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "acrawax",
    controlType: ControlType.TEXTBOX,
    label: "ACRAWAX",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "ACRAWAX",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "zincSterate",
    controlType: ControlType.TEXTBOX,
    label: "ZINCSTERATE",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "ZINCSTERATE",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "fe",
    controlType: ControlType.TEXTBOX,
    label: "FE",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -2,
    options: {
      columnHeading: {
        label: "FE",
        cssClasses: "col-md-2",
      }
    },
  },
  {
    privateKey: "isEnabled",
    controlType: ControlType.CHECKBOX,
    label: "Enabled",
    validators: [
      ValidatorType.REQUIRED
    ],
    displayOrderWeight: -5,
    options: {
      columnHeading: {
        label: "Enabled",
        cssClasses: "col-md-2",
      }
    },
  },
];

@Component({
  selector: 'app-master-data-crud',
  templateUrl: './master-data-crud.component.html',
  styleUrls: ['./master-data-crud.component.css']
})
export class MasterDataCRUDComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();
  selectedCollection: MasterDataType;
  terminology: MasterDataCRUDTerminology;
  listData: Currency[] | Tax[] | Operation[] | Machine[] | PackagingStandard[] | Equipment[] | RawMaterial[] | Blend[];
  edittableList: CurrencyEdittableListItem[] | TaxEdittableListItem[] | OperationEdittableListItem[] | MachineEdittableListItem[] | PackagingStandardEdittableListItem[] | EquipmentEdittableListItem[] | RawMaterialEdittableListItem[] | BlendEdittableListItem[];
  editFormQuestions: Question[];

  constructor(
    private route: ActivatedRoute,
    private formQuestionUtilityService: FormQuestionUtilityService,
    private currencyService: CurrencyService,
    private taxService: TaxService,
    private operationService: OperationService,
    private machineService: MachineService,
    private packagingStandardService: PackagingStandardService,
    private equipmentService: EquipmentService,
    private rawMaterialService: RawMaterialService,
    private blendService: BlendService,
  ) { }

  ngOnInit(): void {
    /* set loading statuses */

    /* initialise with default values */
    switch (this.route.snapshot.paramMap.get('master-data-type')) {
      case "currencies":
        this.selectedCollection = MasterDataType.CURRENCY;
        break;
      case "taxes":
        this.selectedCollection = MasterDataType.TAX;
        break;
      case "operations":
        this.selectedCollection = MasterDataType.OPERATION;
        break;
      case "machines":
        this.selectedCollection = MasterDataType.MACHINE;
        break;
      case "packaging-standards":
        this.selectedCollection = MasterDataType.PACKAGING_STANDARD;
        break;
      case "equipments":
        this.selectedCollection = MasterDataType.EQUIPMENT;
        break;
      case "raw-materials":
        this.selectedCollection = MasterDataType.RAW_MATERIAL;
        break;
      case "blends":
        this.selectedCollection = MasterDataType.BLEND;
        break;
      default:
        break;
    }
    this.listData = [];
    this.edittableList = [];
    switch (this.selectedCollection) {
      case MasterDataType.CURRENCY:
        this.terminology = {
          singular: 'currency',
          plural: 'currencies',
          icon: 'local_atm'
        }
        this.editFormQuestions = CURRENCY_EDIT_FORM_QUESTIONS
        break;
      case MasterDataType.TAX:
        this.terminology = {
          singular: 'tax',
          plural: 'taxes',
          icon: 'toll'
        }
        this.editFormQuestions = TAX_EDIT_FORM_QUESTIONS
        break;
      case MasterDataType.OPERATION:
        this.terminology = {
          singular: 'operation',
          plural: 'operations',
          icon: 'construction'
        }
        this.editFormQuestions = OPERATION_EDIT_FORM_QUESTIONS;
        break;
      case MasterDataType.MACHINE:
        this.terminology = {
          singular: 'machine',
          plural: 'machines',
          icon: 'countertops'
        }
        this.editFormQuestions = MACHINE_EDIT_FORM_QUESTIONS;
        break;
      case MasterDataType.PACKAGING_STANDARD:
        this.terminology = {
          singular: 'packaging standard',
          plural: 'packaging standards',
          icon: 'backpack'
        }
        this.editFormQuestions = PACKAGING_STANDARD_EDIT_FORM_QUESTIONS;
        break;
      case MasterDataType.EQUIPMENT:
        this.terminology = {
          singular: 'equipment',
          plural: 'equipments',
          icon: 'carpenter'
        }
        this.editFormQuestions = EQUIPMENT_EDIT_FORM_QUESTIONS;
        break;
      case MasterDataType.RAW_MATERIAL:
        this.terminology = {
          singular: 'raw material',
          plural: 'raw materials',
          icon: 'ac_unit'
        }
        this.editFormQuestions = RAW_MATERIAL_EDIT_FORM_QUESTIONS;
        break;
      case MasterDataType.BLEND:
        this.terminology = {
          singular: 'blend',
          plural: 'blends',
          icon: 'toys'
        }
        this.editFormQuestions = BLEND_EDIT_FORM_QUESTIONS;
        break;
      default:
        break;
    }

    /* initialise with values from server */
    switch (this.selectedCollection) {
      case MasterDataType.CURRENCY:
        this.currencyService.list().pipe(takeUntil(this.destroySubject$)).subscribe((currencies: Currency[]) => {
          this.processListDataFromAPI(currencies);
        });
        break;
      case MasterDataType.TAX:
        this.taxService.list().pipe(takeUntil(this.destroySubject$)).subscribe((taxes: Tax[]) => {
          this.processListDataFromAPI(taxes);
        });
        break;
      case MasterDataType.OPERATION:
        this.operationService.list().pipe(takeUntil(this.destroySubject$)).subscribe((operations: Operation[]) => {
          this.processListDataFromAPI(operations);
        });
        break;
      case MasterDataType.MACHINE:
        this.machineService.list().pipe(takeUntil(this.destroySubject$)).subscribe((machines: Machine[]) => {
          this.processListDataFromAPI(machines);
        });
        break;
      case MasterDataType.PACKAGING_STANDARD:
        this.packagingStandardService.list().pipe(takeUntil(this.destroySubject$)).subscribe((packagingStandards: PackagingStandard[]) => {
          this.processListDataFromAPI(packagingStandards);
        });
        break;
      case MasterDataType.EQUIPMENT:
        this.equipmentService.list().pipe(takeUntil(this.destroySubject$)).subscribe((equipments: Equipment[]) => {
          this.processListDataFromAPI(equipments);
        });
        break;
      case MasterDataType.RAW_MATERIAL:
        this.rawMaterialService.list().pipe(takeUntil(this.destroySubject$)).subscribe((rawMaterials: RawMaterial[]) => {
          this.processListDataFromAPI(rawMaterials);
        });
        break;
      case MasterDataType.BLEND:
        this.blendService.list().pipe(takeUntil(this.destroySubject$)).subscribe((blends: Blend[]) => {
          this.processListDataFromAPI(blends);
        });
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  processListDataFromAPI(masterDataPlural: Currency[] | Tax[] | Operation[] | Machine[] | PackagingStandard[] | Equipment[] | RawMaterial[] | Blend[]) {
    this.listData = masterDataPlural;
    this.edittableList = [];
    for (const masterData of this.listData) {
      this.pushListItemAsEdittableListItem(masterData);
    }
  }

  pushListItemAsEdittableListItem(masterData: Currency | Tax | Operation | Machine | PackagingStandard | Equipment | RawMaterial | Blend) {
    let newEdittableListItem: CurrencyEdittableListItem | TaxEdittableListItem | OperationEdittableListItem | MachineEdittableListItem | PackagingStandardEdittableListItem | EquipmentEdittableListItem | RawMaterialEdittableListItem | BlendEdittableListItem;
    switch (this.selectedCollection) {
      case MasterDataType.CURRENCY:
        newEdittableListItem = masterData as CurrencyEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as CurrencyEdittableListItem[]).push(newEdittableListItem as CurrencyEdittableListItem);
        break;
      case MasterDataType.TAX:
        newEdittableListItem = masterData as TaxEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as TaxEdittableListItem[]).push(newEdittableListItem as TaxEdittableListItem);
        break;
      case MasterDataType.OPERATION:
        newEdittableListItem = masterData as OperationEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as OperationEdittableListItem[]).push(newEdittableListItem as OperationEdittableListItem);
        break;
      case MasterDataType.MACHINE:
        newEdittableListItem = masterData as MachineEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as MachineEdittableListItem[]).push(newEdittableListItem as MachineEdittableListItem);
        break;
      case MasterDataType.PACKAGING_STANDARD:
        newEdittableListItem = masterData as PackagingStandardEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as PackagingStandardEdittableListItem[]).push(newEdittableListItem as PackagingStandardEdittableListItem);
        break;
      case MasterDataType.EQUIPMENT:
        newEdittableListItem = masterData as EquipmentEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as EquipmentEdittableListItem[]).push(newEdittableListItem as EquipmentEdittableListItem);
        break;
      case MasterDataType.RAW_MATERIAL:
        newEdittableListItem = masterData as RawMaterialEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as RawMaterialEdittableListItem[]).push(newEdittableListItem as RawMaterialEdittableListItem);
        break;
      case MasterDataType.BLEND:
        newEdittableListItem = masterData as BlendEdittableListItem;
        newEdittableListItem.isEditted = false;
        newEdittableListItem.editForm = null;
        (this.edittableList as BlendEdittableListItem[]).push(newEdittableListItem as BlendEdittableListItem);
        break;
      default:
        break;
    }
  }

  newMasterData() {
    let newEdittableListItem: CurrencyEdittableListItem | TaxEdittableListItem | OperationEdittableListItem | MachineEdittableListItem | PackagingStandardEdittableListItem | EquipmentEdittableListItem | RawMaterialEdittableListItem | BlendEdittableListItem;

    (newEdittableListItem as { [k: string]: any }) = {};
    for (const question of this.editFormQuestions) {
      (newEdittableListItem as { [k: string]: any })[question.privateKey] = this.formQuestionUtilityService.initializeDefaultValueForQuestion(question);
    }
    newEdittableListItem.isEditted = false;
    newEdittableListItem.editForm = null;

    this.pushListItemAsEdittableListItem(newEdittableListItem);
    this.editEdittableListItem(newEdittableListItem);
  }

  saveEdittableListItem(edittableListItem: CurrencyEdittableListItem | TaxEdittableListItem | OperationEdittableListItem | MachineEdittableListItem | PackagingStandardEdittableListItem | EquipmentEdittableListItem | RawMaterialEdittableListItem | BlendEdittableListItem) {
    let editFormData = edittableListItem.editForm.value;
    for (const question of this.editFormQuestions) {
      (edittableListItem as { [k: string]: any })[question.privateKey] = editFormData[question.privateKey];
    }
    edittableListItem.isEditted = false;
  }

  editEdittableListItem(edittableListItem: CurrencyEdittableListItem | TaxEdittableListItem | OperationEdittableListItem | MachineEdittableListItem | PackagingStandardEdittableListItem | EquipmentEdittableListItem | RawMaterialEdittableListItem | BlendEdittableListItem) {
    edittableListItem.editForm = this.formQuestionUtilityService.buildFormFromQuestions(this.editFormQuestions, edittableListItem, true);
    edittableListItem.isEditted = true;
  }

}
