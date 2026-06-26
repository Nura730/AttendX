import { AttendanceStatus } from '../types';

/**
 * Calculates attendance percentage based on raw counts.
 * Excludes OD, Leave, Holiday, and Cancelled from the calculation denominator.
 */
export const calculateAttendancePercentage = (
  present: number,
  absent: number
): number => {
  const activePeriods = present + absent;
  if (activePeriods === 0) return 100.0; // Default to 100% if no sessions are marked yet
  return parseFloat(((present / activePeriods) * 100).toFixed(2));
};

/**
 * Calculates the number of upcoming periods a student can afford to miss 
 * without dropping below the target attendance goal.
 */
export const calculatePeriodsCanMiss = (
  present: number,
  absent: number,
  targetGoal: number
): number => {
  const target = targetGoal / 100;
  const activePeriods = present + absent;
  
  if (activePeriods === 0) return 0;
  
  // Math: present / (activePeriods + missCount) >= target
  // => present / target >= activePeriods + missCount
  // => missCount <= (present / target) - activePeriods
  const maxSessions = Math.floor(present / target);
  const canMiss = maxSessions - activePeriods;
  
  return Math.max(0, canMiss);
};

/**
 * Calculates the number of consecutive periods a student must attend 
 * to restore their percentage to the target attendance goal.
 */
export const calculatePeriodsNeedToAttend = (
  present: number,
  absent: number,
  targetGoal: number
): number => {
  const currentPercentage = calculateAttendancePercentage(present, absent);
  if (currentPercentage >= targetGoal) return 0;

  const target = targetGoal / 100;
  
  // Math: (present + attendCount) / (activePeriods + attendCount) >= target
  // => present + attendCount >= target * activePeriods + target * attendCount
  // => attendCount * (1 - target) >= target * activePeriods - present
  // => attendCount >= (target * activePeriods - present) / (1 - target)
  const activePeriods = present + absent;
  const numerator = target * activePeriods - present;
  const denominator = 1 - target;
  
  if (denominator <= 0) return 0; // Avoid divide by zero if target is 100% (handled separately or restricted)

  const attendCount = Math.ceil(numerator / denominator);
  return Math.max(0, attendCount);
};

/**
 * Gets a human-readable display label for an attendance status
 */
export const getStatusLabel = (status: AttendanceStatus): string => {
  const labels: Record<AttendanceStatus, string> = {
    present: 'Present',
    absent: 'Absent',
    od: 'On Duty (OD)',
    leave: 'Leave',
    holiday: 'Holiday',
    cancelled: 'Cancelled',
  };
  return labels[status];
};
