import fs from "fs";
import path from "path";
import sharp from "sharp";

const imgDir = path.join(process.cwd(), "public", "img");
const tempDir = path.join(process.cwd(), "public", "img", "temp_processing");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

async function processImages() {
  const files = fs.readdirSync(imgDir);

  // 1. Identify existing valid portfolio images (user kept these)
  const existingPortfolio = files.filter((f) =>
    /^portfolio-\d{2}\.jpg$/.test(f)
  );

  // 2. Identify NEW images to optimize
  const newImages = files.filter(
    (f) =>
      f.startsWith("portfolio_optimizar") &&
      (f.endsWith(".jpg") || f.endsWith(".png"))
  );

  console.log(`Found ${existingPortfolio.length} existing images.`);
  console.log(`Found ${newImages.length} new images to optimize.`);

  let allImages = [];

  // Copy existing images to temp, adding to our list
  for (const file of existingPortfolio) {
    const src = path.join(imgDir, file);
    const dest = path.join(tempDir, file); // Keep name for now, we'll rename later
    fs.copyFileSync(src, dest);
    allImages.push({ path: dest, isNew: false });
  }

  // Optimize new images to temp
  for (const file of newImages) {
    const inputPath = path.join(imgDir, file);
    const tempName = `temp_${file}`;
    const outputPath = path.join(tempDir, tempName);

    console.log(`Optimizing: ${file}`);

    try {
      await sharp(inputPath)
        .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(outputPath);

      allImages.push({ path: outputPath, isNew: true });
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }

  // 3. Renumber EVERYTHING to portfolio-01.jpg ... portfolio-N.jpg
  // First, delete the old portfolio files in public/img to avoid collisions/leftovers
  // (We have copies in tempDir)
  existingPortfolio.forEach((f) => fs.unlinkSync(path.join(imgDir, f)));
  newImages.forEach((f) => fs.unlinkSync(path.join(imgDir, f)));

  console.log("Renaming and moving back...");

  for (let i = 0; i < allImages.length; i++) {
    const entry = allImages[i];
    const newName = `portfolio-${String(i + 1).padStart(2, "0")}.jpg`;
    const finalPath = path.join(imgDir, newName);

    fs.renameSync(entry.path, finalPath);
    console.log(`Saved: ${newName}`);
  }

  // Cleanup temp
  fs.rmdirSync(tempDir);

  console.log(`\nTotal Portfolio Images: ${allImages.length}`);
}

processImages();
