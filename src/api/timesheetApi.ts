import { mockTimesheetEntries, buildWeeklyTimesheets } from '../data/mockData';
import type { TimesheetEntry, WeeklyTimesheet } from '../types';

export const timesheetApi = {
  getAllEntries: async (): Promise<TimesheetEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockTimesheetEntries];
  },

  getWeeklyTimesheets: async (): Promise<WeeklyTimesheet[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Rebuild from current entries to reflect changes
    return buildWeeklyTimesheets();
  },

  getEntriesByWeek: async (weekNumber: number): Promise<TimesheetEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTimesheetEntries.filter(e => e.weekNumber === weekNumber);
  },

  createEntry: async (entry: Omit<TimesheetEntry, 'id' | 'status'>): Promise<TimesheetEntry> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newEntry: TimesheetEntry = {
      ...entry,
      id: `new-${Date.now()}`,
      status: 'Pending'
    };

    mockTimesheetEntries.push(newEntry);
    return newEntry;
  },

  updateEntry: async (id: string, updates: Partial<TimesheetEntry>): Promise<TimesheetEntry> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockTimesheetEntries.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Entry not found');
    }

    // Update the entry
    mockTimesheetEntries[index] = { 
      ...mockTimesheetEntries[index], 
      ...updates 
    };
    
    return mockTimesheetEntries[index];
  },

  deleteEntry: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockTimesheetEntries.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Entry not found');
    }

    // Remove the entry
    mockTimesheetEntries.splice(index, 1);
  }
};
