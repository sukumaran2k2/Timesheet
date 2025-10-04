import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { timesheetApi } from '../api/timesheetApi';
import type { WeeklyTimesheet, TimesheetEntry } from '../types';
import { EditModal } from '../components/EditModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

export const Dashboard = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyTimesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<TimesheetEntry | null>(null);
  const { user, logout } = useAuth();

  const WEEKS_PER_PAGE = 5;

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const data = await timesheetApi.getWeeklyTimesheets();
      setWeeklyData(data);
    } catch (err) {
      setError('Failed to load timesheets');
    } finally {
      setLoading(false);
    }
  };

 const handleEdit = async (id: string, updates: Partial<TimesheetEntry>) => {
  try {
    await timesheetApi.updateEntry(id, updates);
    // Refresh data
    const updatedData = await timesheetApi.getWeeklyTimesheets();
    setWeeklyData(updatedData);
    setEditingEntry(null);
  } catch (err) {
    setError('Failed to update entry');
  }
};

const handleDelete = async (id: string) => {
  try {
    await timesheetApi.deleteEntry(id);
    // Refresh data
    const updatedData = await timesheetApi.getWeeklyTimesheets();
    setWeeklyData(updatedData);
    setDeletingEntry(null);
  } catch (err) {
    setError('Failed to delete entry');
  }
};


  // Pagination logic
  const totalWeeks = weeklyData.length;
  const totalPages = Math.ceil(totalWeeks / WEEKS_PER_PAGE);
  const startIndex = (currentPage - 1) * WEEKS_PER_PAGE;
  const endIndex = startIndex + WEEKS_PER_PAGE;
  const currentWeeks = weeklyData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const totalEntries = weeklyData.reduce((sum, week) => sum + week.entries.length, 0);
  const totalHours = weeklyData.reduce((sum, week) => sum + week.totalHours, 0);
  const pendingCount = weeklyData.reduce(
    (sum, week) => sum + week.entries.filter(e => e.status === 'Pending').length,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="text-lg font-medium text-gray-600">Loading timesheets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modals */}
      {editingEntry && (
        <EditModal
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onSave={handleEdit}
        />
      )}

      {deletingEntry && (
        <DeleteConfirmModal
          entryName={deletingEntry.project}
          onClose={() => setDeletingEntry(null)}
          onConfirm={() => handleDelete(deletingEntry.id)}
        />
      )}

      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Timesheet</h1>
              {user && (
                <div className="ml-6 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{user.name}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    viewMode === 'table'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
              </div>
              
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-800 hover:text-red-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600">Total Entries</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{totalEntries}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600">Total Hours</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{totalHours}h</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600">Pending Approval</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">{pendingCount}</div>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Weekly Timesheets - 2025</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing weeks {startIndex + 1} - {Math.min(endIndex, totalWeeks)} of {totalWeeks}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                + Add Entry
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Week #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Hours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Entries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentWeeks.map((week, index) => {
                    const approvedCount = week.entries.filter(e => e.status === 'Approved').length;
                    const pendingCount = week.entries.filter(e => e.status === 'Pending').length;
                    const rejectedCount = week.entries.filter(e => e.status === 'Rejected').length;
                    
                    let weekStatus = 'Empty';
                    let statusClass = 'bg-gray-100 text-gray-700 border-gray-200';
                    
                    if (week.entries.length > 0) {
                      if (approvedCount === week.entries.length) {
                        weekStatus = 'Approved';
                        statusClass = 'bg-green-100 text-green-700 border-green-200';
                      } else if (pendingCount > 0) {
                        weekStatus = 'Pending';
                        statusClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
                      } else if (rejectedCount > 0) {
                        weekStatus = 'In Review';
                        statusClass = 'bg-orange-100 text-orange-700 border-orange-200';
                      }
                    }
                    
                    return (
                      <tr key={week.weekNumber} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          Week {week.weekNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(week.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(week.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {week.totalHours}h
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {week.entries.length} {week.entries.length === 1 ? 'entry' : 'entries'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${statusClass}`}>
                            {weekStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-800 font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, totalWeeks)}</span> of{' '}
                <span className="font-medium">{totalWeeks}</span> weeks
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === pageNum
                          ? 'text-white bg-blue-600 border border-blue-600'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Weekly Timesheets - 2025</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing weeks {startIndex + 1} - {Math.min(endIndex, totalWeeks)} of {totalWeeks}
                </p>
              </div>
            </div>

            {currentWeeks.map((week) => {
              const approvedCount = week.entries.filter(e => e.status === 'Approved').length;
              const pendingCount = week.entries.filter(e => e.status === 'Pending').length;
              const rejectedCount = week.entries.filter(e => e.status === 'Rejected').length;
              
              let weekStatus = 'Empty';
              let statusClass = 'bg-gray-100 text-gray-700 border-gray-200';
              
              if (week.entries.length > 0) {
                if (approvedCount === week.entries.length) {
                  weekStatus = 'Approved';
                  statusClass = 'bg-green-100 text-green-700 border-green-200';
                } else if (pendingCount > 0) {
                  weekStatus = 'Pending';
                  statusClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
                } else if (rejectedCount > 0) {
                  weekStatus = 'In Review';
                  statusClass = 'bg-orange-100 text-orange-700 border-orange-200';
                }
              }

              return (
                <div key={week.weekNumber} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-bold text-gray-900">Week {week.weekNumber}</h3>
                        <span className="text-sm text-gray-600">
                          {new Date(week.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(week.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${statusClass}`}>
                          {weekStatus}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-900">{week.totalHours}h total</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    {week.entries.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No entries for this week</p>
                    ) : (
                      <div className="space-y-3">
                        {week.entries.map((entry) => (
                          <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-900">{entry.project}</span>
                                <span className={`px-2 py-0.5 inline-flex text-xs font-semibold rounded-full border ${getStatusColor(entry.status)}`}>
                                  {entry.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                <span>•</span>
                                <span className="font-medium">{entry.hours}h</span>
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button 
                                onClick={() => setEditingEntry(entry)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => setDeletingEntry(entry)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            <div className="mt-6 px-6 py-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, totalWeeks)}</span> of{' '}
                <span className="font-medium">{totalWeeks}</span> weeks
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === pageNum
                          ? 'text-white bg-blue-600 border border-blue-600'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
