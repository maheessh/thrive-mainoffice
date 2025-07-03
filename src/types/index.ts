
declare const __app_id: string;
declare const __firebase_config: string;
declare const __initial_auth_token: string;

export interface Scholar {
  id: string;
  name: string;
  floorPoints: number;
}

export interface Mail {
  id: string;
  scholarId: string;
  scholarName: string; 
  status: 'Ready to Pick Up' | 'Picked Up';
  lastUpdated: string; 
}

export interface AdminAuth {
  username: string;
  token: string;
}
