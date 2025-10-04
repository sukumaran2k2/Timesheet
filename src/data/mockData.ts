import { User, TimesheetEntry, WeeklyTimesheet } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@tentwenty.com',
    password: 'admin123',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'developer@tentwenty.com',
    password: 'dev123',
    name: 'Developer User'
  }
];

// Helper function to get Monday of a week
function getWeekDates(year: number, weekNumber: number) {
  const jan4 = new Date(year, 0, 4);
  const daysOffset = (weekNumber - 1) * 7;
  const weekStart = new Date(jan4);
  weekStart.setDate(jan4.getDate() - jan4.getDay() + 1 + daysOffset);
  
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  return {
    startDate: weekStart.toISOString().split('T')[0],
    endDate: weekEnd.toISOString().split('T')[0]
  };
}

const projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta', 'Project Epsilon'];
const descriptions = [
  'Frontend development',
  'API integration',
  'Code review',
  'Bug fixes',
  'Testing',
  'Database optimization',
  'UI/UX improvements',
  'Documentation',
  'Meeting with client'
];
const statuses: ('Pending' | 'Approved' | 'Rejected')[] = ['Pending', 'Approved', 'Rejected'];

// Generate sample timesheet entries
export let mockTimesheetEntries: TimesheetEntry[] = [];
let entryId = 1;

// Generate entries for weeks 1-52
for (let week = 1; week <= 52; week++) {
  const { startDate } = getWeekDates(2025, week);
  const numEntries = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < numEntries; i++) {
    const entryDate = new Date(startDate);
    entryDate.setDate(entryDate.getDate() + Math.floor(Math.random() * 7));
    
    const entry: TimesheetEntry = {
      id: String(entryId++),
      weekNumber: week,
      date: entryDate.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      hours: Math.floor(Math.random() * 8) + 1,
      project: projects[Math.floor(Math.random() * projects.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)]
    };
    
    mockTimesheetEntries.push(entry);
  }
}

// Function to rebuild weekly timesheets from entries
export function buildWeeklyTimesheets(): WeeklyTimesheet[] {
  const weeklySheets: WeeklyTimesheet[] = [];
  
  for (let week = 1; week <= 52; week++) {
    const { startDate, endDate } = getWeekDates(2025, week);
    const weekEntries = mockTimesheetEntries.filter(e => e.weekNumber === week);
    const totalHours = weekEntries.reduce((sum, e) => sum + e.hours, 0);
    
    weeklySheets.push({
      weekNumber: week,
      startDate,
      endDate,
      totalHours,
      entries: weekEntries
    });
  }
  
  return weeklySheets;
}

export const mockWeeklyTimesheets = buildWeeklyTimesheets();
