export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface TimesheetEntry {
  id: string;
  weekNumber: number;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  hours: number;
  project: string;
  description: string;
}

export interface WeeklyTimesheet {
  weekNumber: number;
  startDate: string;
  endDate: string;
  totalHours: number;
  entries: TimesheetEntry[];
}

export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}
