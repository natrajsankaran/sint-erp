import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Questionnaire, Question, ControlType, ValidatorType } from '../../_shared/_types/_form/question';
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
  editFormQuestionnaire: Questionnaire;

  constructor(
    private route: ActivatedRoute,
    private formQuestionUtilityService: FormQuestionUtilityService,
    private formBuilder: FormBuilder,
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
    this.editFormQuestionnaire = this.formQuestionUtilityService.convertQuestionsToQuestionnaire(this.editFormQuestions);

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
    switch (this.selectedCollection) {
      case MasterDataType.CURRENCY:
        (newEdittableListItem as CurrencyEdittableListItem) = {
          currencyName: "",
          code: "",
          symbol: "",
          symbolHTML: "",
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.TAX:
        (newEdittableListItem as TaxEdittableListItem) = {
          taxName: "",
          percentage: 0,
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.OPERATION:
        (newEdittableListItem as OperationEdittableListItem) = {
          operationName: "",
          description: "",
          isEnabledInHouse: true,
          isEnabledSubContract: true,
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.MACHINE:
        (newEdittableListItem as MachineEdittableListItem) = {
          code: "",
          machineName: "",
          isEnabled: true,
          make: "",
          countryOfOrigin: "",
          purchaseDate: "",
          lastServiceDate: "",
          dueServiceDate: "",
          criticalSpares: "",
          operation: "",
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.PACKAGING_STANDARD:
        (newEdittableListItem as PackagingStandardEdittableListItem) = {
          packagingStandardName: "",
          code: "",
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.EQUIPMENT:
        (newEdittableListItem as EquipmentEdittableListItem) = {
          code: "",
          equipmentName: "",
          make: "",
          purchaseDate: "",
          lastCalibrationDate: "",
          dueCalibrationDate: "",
          leastCount: "",
          operatingRange: "",
          location: "",
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.RAW_MATERIAL:
        (newEdittableListItem as RawMaterialEdittableListItem) = {
          powderCode: "",
          powderManufacturer: "",
          powderManufacturerCode: "",
          baseIronPowderType: "",
          ni: "",
          cu: "",
          mo: "",
          mn: "",
          mns: "",
          c: "",
          si: "",
          cr: "",
          s: "",
          p: "",
          ot: "",
          k_lube: "",
          a_wax: "",
          znS: "",
          fe: "",
          flowRate: "",
          ad: "",
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      case MasterDataType.BLEND:
        (newEdittableListItem as BlendEdittableListItem) = {
          blendCode: "",
          powderGrade: "",
          powderType: "",
          baseIronPowderType: "",
          ni: "",
          cu: "",
          mo: "",
          mns: "",
          c: "",
          kenolube: "",
          acrawax: "",
          zincSterate: "",
          fe: "",
          isEnabled: true,
          isEditted: false,
          editForm: null
        };
        break;
      default:
        break;
    }
    this.pushListItemAsEdittableListItem(newEdittableListItem);
    this.editEdittableListItem(newEdittableListItem);
  }

  saveEdittableListItem(edittableListItem: CurrencyEdittableListItem | TaxEdittableListItem | OperationEdittableListItem | MachineEdittableListItem | PackagingStandardEdittableListItem | EquipmentEdittableListItem | RawMaterialEdittableListItem | BlendEdittableListItem) {
    let editFormData = edittableListItem.editForm.value;
    switch (this.selectedCollection) {
      case MasterDataType.CURRENCY:
        (edittableListItem as CurrencyEdittableListItem).currencyName = editFormData.currencyName;
        (edittableListItem as CurrencyEdittableListItem).code = editFormData.code;
        (edittableListItem as CurrencyEdittableListItem).symbol = editFormData.symbol;
        (edittableListItem as CurrencyEdittableListItem).symbolHTML = editFormData.symbolHTML;
        (edittableListItem as CurrencyEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      case MasterDataType.TAX:
        (edittableListItem as TaxEdittableListItem).taxName = editFormData.taxName;
        (edittableListItem as TaxEdittableListItem).percentage = editFormData.percentage;
        (edittableListItem as TaxEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      case MasterDataType.OPERATION:
        (edittableListItem as OperationEdittableListItem).operationName = editFormData.operationName;
        (edittableListItem as OperationEdittableListItem).description = editFormData.description;
        (edittableListItem as OperationEdittableListItem).isEnabledInHouse = editFormData.isEnabledInHouse;
        (edittableListItem as OperationEdittableListItem).isEnabledSubContract = editFormData.isEnabledSubContract;
        (edittableListItem as OperationEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      case MasterDataType.MACHINE:
        (edittableListItem as MachineEdittableListItem).code = editFormData.code;
        (edittableListItem as MachineEdittableListItem).machineName = editFormData.machineName;
        (edittableListItem as MachineEdittableListItem).isEnabled = editFormData.isEnabled;
        (edittableListItem as MachineEdittableListItem).make = editFormData.make;
        (edittableListItem as MachineEdittableListItem).countryOfOrigin = editFormData.countryOfOrigin;
        (edittableListItem as MachineEdittableListItem).purchaseDate = editFormData.purchaseDate;
        (edittableListItem as MachineEdittableListItem).lastServiceDate = editFormData.lastServiceDate;
        (edittableListItem as MachineEdittableListItem).dueServiceDate = editFormData.dueServiceDate;
        (edittableListItem as MachineEdittableListItem).criticalSpares = editFormData.criticalSpares;
        (edittableListItem as MachineEdittableListItem).operation = editFormData.operation;
        break;
      case MasterDataType.PACKAGING_STANDARD:
        (edittableListItem as PackagingStandardEdittableListItem).packagingStandardName = editFormData.packagingStandardName;
        (edittableListItem as PackagingStandardEdittableListItem).code = editFormData.code;
        (edittableListItem as PackagingStandardEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      case MasterDataType.EQUIPMENT:
        (edittableListItem as EquipmentEdittableListItem).code = editFormData.code;
        (edittableListItem as EquipmentEdittableListItem).equipmentName = editFormData.equipmentName;
        (edittableListItem as EquipmentEdittableListItem).make = editFormData.make;
        (edittableListItem as EquipmentEdittableListItem).purchaseDate = editFormData.purchaseDate;
        (edittableListItem as EquipmentEdittableListItem).lastCalibrationDate = editFormData.lastCalibrationDate;
        (edittableListItem as EquipmentEdittableListItem).dueCalibrationDate = editFormData.dueCalibrationDate;
        (edittableListItem as EquipmentEdittableListItem).leastCount = editFormData.leastCount;
        (edittableListItem as EquipmentEdittableListItem).operatingRange = editFormData.operatingRange;
        (edittableListItem as EquipmentEdittableListItem).location = editFormData.location;
        (edittableListItem as EquipmentEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      case MasterDataType.RAW_MATERIAL:
        (edittableListItem as RawMaterialEdittableListItem).powderCode = editFormData.powderCode;
        (edittableListItem as RawMaterialEdittableListItem).powderManufacturer = editFormData.powderManufacturer;
        (edittableListItem as RawMaterialEdittableListItem).powderManufacturerCode = editFormData.powderManufacturerCode;
        (edittableListItem as RawMaterialEdittableListItem).baseIronPowderType = editFormData.baseIronPowderType;
        (edittableListItem as RawMaterialEdittableListItem).si = editFormData.si;
        (edittableListItem as RawMaterialEdittableListItem).cr = editFormData.cr;
        (edittableListItem as RawMaterialEdittableListItem).s = editFormData.s;
        (edittableListItem as RawMaterialEdittableListItem).p = editFormData.p;
        (edittableListItem as RawMaterialEdittableListItem).ot = editFormData.ot;
        (edittableListItem as RawMaterialEdittableListItem).k_lube = editFormData.k_lube;
        (edittableListItem as RawMaterialEdittableListItem).a_wax = editFormData.a_wax;
        (edittableListItem as RawMaterialEdittableListItem).znS = editFormData.znS;
        (edittableListItem as RawMaterialEdittableListItem).fe = editFormData.fe;
        (edittableListItem as RawMaterialEdittableListItem).flowRate = editFormData.flowRate;
        (edittableListItem as RawMaterialEdittableListItem).ad = editFormData.ad;
        (edittableListItem as RawMaterialEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      case MasterDataType.BLEND:
        (edittableListItem as BlendEdittableListItem).blendCode = editFormData.blendCode;
        (edittableListItem as BlendEdittableListItem).powderGrade = editFormData.powderGrade;
        (edittableListItem as BlendEdittableListItem).powderType = editFormData.powderType;
        (edittableListItem as BlendEdittableListItem).baseIronPowderType = editFormData.baseIronPowderType;
        (edittableListItem as BlendEdittableListItem).ni = editFormData.ni;
        (edittableListItem as BlendEdittableListItem).cu = editFormData.cu;
        (edittableListItem as BlendEdittableListItem).mo = editFormData.mo;
        (edittableListItem as BlendEdittableListItem).mns = editFormData.mns;
        (edittableListItem as BlendEdittableListItem).c = editFormData.c;
        (edittableListItem as BlendEdittableListItem).kenolube = editFormData.kenolube;
        (edittableListItem as BlendEdittableListItem).acrawax = editFormData.acrawax;
        (edittableListItem as BlendEdittableListItem).zincSterate = editFormData.zincSterate;
        (edittableListItem as BlendEdittableListItem).fe = editFormData.fe;
        (edittableListItem as RawMaterialEdittableListItem).isEnabled = editFormData.isEnabled;
        break;
      default:
        break;
    }
    edittableListItem.isEditted = false;
  }

  editEdittableListItem(edittableListItem: CurrencyEdittableListItem | TaxEdittableListItem | OperationEdittableListItem | MachineEdittableListItem | PackagingStandardEdittableListItem | EquipmentEdittableListItem | RawMaterialEdittableListItem | BlendEdittableListItem) {
    let editForm: FormGroup;
    switch (this.selectedCollection) {
      case MasterDataType.CURRENCY:
        editForm = this.formBuilder.group({
          _id: (edittableListItem as CurrencyEdittableListItem)._id,
          currencyName: (edittableListItem as CurrencyEdittableListItem).currencyName,
          code: (edittableListItem as CurrencyEdittableListItem).code,
          symbol: (edittableListItem as CurrencyEdittableListItem).symbol,
          symbolHTML: (edittableListItem as CurrencyEdittableListItem).symbolHTML,
          isEnabled: edittableListItem.isEnabled,
        });
        break;
      case MasterDataType.TAX:
        editForm = this.formBuilder.group({
          _id: (edittableListItem as TaxEdittableListItem)._id,
          taxName: (edittableListItem as TaxEdittableListItem).taxName,
          percentage: (edittableListItem as TaxEdittableListItem).percentage,
          isEnabled: (edittableListItem as TaxEdittableListItem).isEnabled,
        });
        break;
      case MasterDataType.OPERATION:
        editForm = this.formBuilder.group({
          _id: edittableListItem._id,
          operationName: (edittableListItem as OperationEdittableListItem).operationName,
          description: (edittableListItem as OperationEdittableListItem).description,
          isEnabledInHouse: (edittableListItem as OperationEdittableListItem).isEnabledInHouse,
          isEnabledSubContract: (edittableListItem as OperationEdittableListItem).isEnabledSubContract,
          isEnabled: (edittableListItem as OperationEdittableListItem).isEnabled,
        });
        break;
      case MasterDataType.MACHINE:
        editForm = this.formBuilder.group({
          _id: edittableListItem._id,
          code: (edittableListItem as MachineEdittableListItem).code,
          machineName: (edittableListItem as MachineEdittableListItem).machineName,
          isEnabled: (edittableListItem as MachineEdittableListItem).isEnabled,
          make: (edittableListItem as MachineEdittableListItem).make,
          countryOfOrigin: (edittableListItem as MachineEdittableListItem).countryOfOrigin,
          purchaseDate: (edittableListItem as MachineEdittableListItem).purchaseDate,
          lastServiceDate: (edittableListItem as MachineEdittableListItem).lastServiceDate,
          dueServiceDate: (edittableListItem as MachineEdittableListItem).dueServiceDate,
          criticalSpares: (edittableListItem as MachineEdittableListItem).criticalSpares,
          operation: (edittableListItem as MachineEdittableListItem).operation,
        });
        break;
      case MasterDataType.PACKAGING_STANDARD:
        editForm = this.formBuilder.group({
          _id: edittableListItem._id,
          packagingStandardName: (edittableListItem as PackagingStandardEdittableListItem).packagingStandardName,
          code: (edittableListItem as PackagingStandardEdittableListItem).code,
          isEnabled: (edittableListItem as PackagingStandardEdittableListItem).isEnabled,
        });
        break;
      case MasterDataType.EQUIPMENT:
        editForm = this.formBuilder.group({
          _id: edittableListItem._id,
          code: (edittableListItem as EquipmentEdittableListItem).code,
          equipmentName: (edittableListItem as EquipmentEdittableListItem).equipmentName,
          make: (edittableListItem as EquipmentEdittableListItem).make,
          purchaseDate: (edittableListItem as EquipmentEdittableListItem).purchaseDate,
          lastCalibrationDate: (edittableListItem as EquipmentEdittableListItem).lastCalibrationDate,
          dueCalibrationDate: (edittableListItem as EquipmentEdittableListItem).dueCalibrationDate,
          leastCount: (edittableListItem as EquipmentEdittableListItem).leastCount,
          operatingRange: (edittableListItem as EquipmentEdittableListItem).operatingRange,
          location: (edittableListItem as EquipmentEdittableListItem).location,
          isEnabled: (edittableListItem as EquipmentEdittableListItem).isEnabled,
        });
        break;
      case MasterDataType.RAW_MATERIAL:
        editForm = this.formBuilder.group({
          _id: edittableListItem._id,
          powderCode: (edittableListItem as RawMaterialEdittableListItem).powderCode,
          powderManufacturer: (edittableListItem as RawMaterialEdittableListItem).powderManufacturer,
          powderManufacturerCode: (edittableListItem as RawMaterialEdittableListItem).powderManufacturerCode,
          baseIronPowderType: (edittableListItem as RawMaterialEdittableListItem).baseIronPowderType,
          ni: (edittableListItem as RawMaterialEdittableListItem).ni,
          cu: (edittableListItem as RawMaterialEdittableListItem).cu,
          mo: (edittableListItem as RawMaterialEdittableListItem).mo,
          mn: (edittableListItem as RawMaterialEdittableListItem).mn,
          mns: (edittableListItem as RawMaterialEdittableListItem).mns,
          c: (edittableListItem as RawMaterialEdittableListItem).c,
          si: (edittableListItem as RawMaterialEdittableListItem).si,
          cr: (edittableListItem as RawMaterialEdittableListItem).cr,
          s: (edittableListItem as RawMaterialEdittableListItem).s,
          p: (edittableListItem as RawMaterialEdittableListItem).p,
          ot: (edittableListItem as RawMaterialEdittableListItem).ot,
          k_lube: (edittableListItem as RawMaterialEdittableListItem).k_lube,
          a_wax: (edittableListItem as RawMaterialEdittableListItem).a_wax,
          znS: (edittableListItem as RawMaterialEdittableListItem).znS,
          fe: (edittableListItem as RawMaterialEdittableListItem).fe,
          flowRate: (edittableListItem as RawMaterialEdittableListItem).flowRate,
          ad: (edittableListItem as RawMaterialEdittableListItem).ad,
          isEnabled: (edittableListItem as RawMaterialEdittableListItem).isEnabled,
        });
        break;
      case MasterDataType.BLEND:
        editForm = this.formBuilder.group({
          _id: edittableListItem._id,
          blendCode: (edittableListItem as BlendEdittableListItem).blendCode,
          powderGrade: (edittableListItem as BlendEdittableListItem).powderGrade,
          powderType: (edittableListItem as BlendEdittableListItem).powderType,
          baseIronPowderType: (edittableListItem as BlendEdittableListItem).baseIronPowderType,
          ni: (edittableListItem as BlendEdittableListItem).ni,
          cu: (edittableListItem as BlendEdittableListItem).cu,
          mo: (edittableListItem as BlendEdittableListItem).mo,
          mns: (edittableListItem as BlendEdittableListItem).mns,
          c: (edittableListItem as BlendEdittableListItem).c,
          kenolube: (edittableListItem as BlendEdittableListItem).kenolube,
          acrawax: (edittableListItem as BlendEdittableListItem).acrawax,
          zincSterate: (edittableListItem as BlendEdittableListItem).zincSterate,
          fe: (edittableListItem as BlendEdittableListItem).fe,
          isEnabled: (edittableListItem as RawMaterialEdittableListItem).isEnabled,
        });
        break;
      default:
        break;
    }
    edittableListItem.editForm = editForm;
    edittableListItem.isEditted = true;
  }

}
