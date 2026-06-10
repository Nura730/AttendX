import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export async function exportAttendancePDF(
  semesterName: string,
  subjects: any[],
  targetAttendance: number
) {
  const subjectRows = subjects
    .map(
      (subject) => `
      <tr>
        <td>${subject.name}</td>
        <td>${subject.percentage.toFixed(1)}%</td>
      </tr>
    `
    )
    .join("");

const html = `
<html>
  <body>

    <h1>🎓 AttendX</h1>

    <h2>Attendance Report</h2>

    <p>Date: ${new Date().toLocaleDateString()}</p>

    <p>Semester: ${semesterName}</p>

    <table border="1" cellpadding="10">
      <tr>
        <th>Subject</th>
        <th>Attendance</th>
      </tr>

      ${subjectRows}
    </table>

  </body>
</html>
`;

  const { uri } =
    await Print.printToFileAsync({
      html,
    });

  await Sharing.shareAsync(uri);
}