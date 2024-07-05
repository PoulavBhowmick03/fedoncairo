import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const filePath = path.resolve(".", "public/Fedlearn/client.py"); // Ensure this path is correct
  const fileContents = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename=client.py`);
  res.send(fileContents);
}
