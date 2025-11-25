import fs from "fs";
import path from "path";

const imgDir = path.join(process.cwd(), "public", "img");

// Files to KEEP (Optimized images + specific assets found in code)
// We keep portfolio-XX.jpg
// We keep new-gallery-1.jpg (About section)
// We keep logos and other assets that don't look like raw portfolio dumps
const keepPatterns = [
  /^portfolio-\d{2}\.jpg$/, // The new optimized images
  /^new-gallery-1\.jpg$/, // Used in About
  /^favicon\.svg$/,
  /logo/i, // Keep logos
  /\.png$/i, // Keep PNGs (often assets/logos)
];

// Files to DELETE (The raw/duplicate portfolio dumps)
// These match the user's description: "portfolio", "portfoliousar_2025", etc.
const deletePatterns = [
  /^portfolio \(\d+\)\.jpg$/,
  /^portfolio-\d\.jpg$/, // e.g. portfolio-1.jpg (old)
  /^portfoliousar/, // portfoliousar...
  /^portfolio1/,
  /^portfolio_1/,
  /^JMP_/, // Raw camera exports?
  /^DSC_/, // Raw camera exports?
  /^Foto-/,
  /^LANDSCAPE-/,
  /^gallery-add-/, // Old gallery adds
  /^new-gallery-[2-5]\.jpg$/, // Old gallery unused
];

function cleanup() {
  const files = fs.readdirSync(imgDir);
  let deletedCount = 0;
  let savedSpace = 0;

  files.forEach((file) => {
    const filePath = path.join(imgDir, file);

    // 1. Check if it matches a KEEP pattern
    const shouldKeep = keepPatterns.some((pattern) => pattern.test(file));

    if (shouldKeep) {
      console.log(`KEEPING: ${file}`);
      return;
    }

    // 2. Check if it matches a DELETE pattern OR is a large jpg not in keep list
    // To be safe, let's strictly match the delete patterns the user implied
    const shouldDelete = deletePatterns.some((pattern) => pattern.test(file));

    if (shouldDelete) {
      const stats = fs.statSync(filePath);
      const sizeMB = stats.size / (1024 * 1024);

      console.log(`DELETING: ${file} (${sizeMB.toFixed(2)} MB)`);
      fs.unlinkSync(filePath);
      deletedCount++;
      savedSpace += sizeMB;
    } else {
      console.log(`SKIPPING (Unknown): ${file}`);
    }
  });

  console.log(`\nCleanup Complete.`);
  console.log(`Deleted ${deletedCount} files.`);
  console.log(`Freed up ${savedSpace.toFixed(2)} MB.`);
}

cleanup();
