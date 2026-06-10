import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export async function exportBackup(
  data: any
) {
  const uri =
    FileSystem.documentDirectory +
    "attendx-backup.json";

  await FileSystem.writeAsStringAsync(
    uri,
    JSON.stringify(data, null, 2)
  );

  await Sharing.shareAsync(uri);
}