const gradePoints: Record<string, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  U: 0,
};

export function calculateSGPA(
  subjects: {
    credits: number;
    grade: string;
  }[],
) {
  let totalCredits = 0;
  let weightedPoints = 0;

  subjects.forEach((subject) => {
    totalCredits += subject.credits;

    weightedPoints += subject.credits * gradePoints[subject.grade];
  });

  return totalCredits === 0 ? 0 : weightedPoints / totalCredits;
}

export function calculateCGPA(semesters: number[]) {
  return semesters.length === 0
    ? 0
    : semesters.reduce((a, b) => a + b, 0) / semesters.length;
}
