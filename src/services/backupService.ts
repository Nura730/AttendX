import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";

export async function exportBackup(data: any) {
  const uri = FileSystem.Paths.document.uri + "attendx-backup.json";

  await FileSystem.writeAsStringAsync(uri, JSON.stringify(data, null, 2));

  await Sharing.shareAsync(uri);
}

export async function importBackup() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/json",
  });

  if (result.canceled) {
    return null;
  }

  const file = result.assets[0];

  const content = await FileSystem.readAsStringAsync(file.uri);

  return JSON.parse(content);
}
