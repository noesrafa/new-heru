export interface TaxpayerInfo {
  source_id: string;
  user_id: number;
  link_id: string;
  name: string;
  code: string;
  person_type: string;
  official_id: null;
  is_national: null;
  full_address: null;
  registered_at: Date;
  created_at: Date;
  id: number;
  compliance: Compliance;
  status: Status;
  address: Address;
  register_status: null;
  supported: boolean;
}

export interface Address {
  id: number;
  state: string;
  locality: string;
  postal_code: string;
  street_name: string;
  street_type: string;
  municipality: string;
  neighborhood: string;
  street_number: string;
  building_number: string;
  street_references: string;
  taxpayer_id: number;
}

export interface Compliance {
  id: number;
  file: File;
}

export interface Status {
  status: string;
  created_at: Date;
  fiscal_obligations: FiscalObligation[];
  economic_activities: EconomicActivity[];
  tax_regimes: TaxRegime[];
  file: File;
}

export interface EconomicActivity {
  id: number;
  name: string;
  order: number;
  start_date: Date;
  end_date: null;
  percentage: number;
  taxpayer_status_id: number;
}

export interface File {
  file_uuid: string;
  file_url: string;
  url: string;
}

export interface FiscalObligation {
  id: number;
  due_date: string;
  description: string;
  start_date: Date;
  end_date: null;
  taxpayer_status_id: number;
}

export interface TaxRegime {
  name: string;
  start_date: Date;
  end_date: null;
  regime_id: null;
  code: string;
  fiscal_obligations: any[];
}
