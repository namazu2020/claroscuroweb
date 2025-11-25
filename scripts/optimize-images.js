import fs from "fs";
import path from "path";
import sharp from "sharp";

const imgDir = path.join(process.cwd(), "public", "img");
const outputDir = path.join(process.cwd(), "public", "img", "optimized");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function optimizeImages() {
  const files = fs.readdirSync(imgDir);

  // Filter for portfolio images
  const portfolioFiles = files.filter((file) => {
    const lower = file.toLowerCase();
    return (
      (lower.startsWith("portfolio") || lower.startsWith("portfoliousar")) &&
      (lower.endsWith(".jpg") ||
        lower.endsWith(".png") ||
        lower.endsWith(".jpeg"))
    );
  });

  console.log(`Found ${portfolioFiles.length} portfolio images.`);

  let counter = 1;

  for (const file of portfolioFiles) {
    const inputPath = path.join(imgDir, file);
    const extension = path.extname(file);
    const newName = `portfolio-${String(counter).padStart(2, "0")}.jpg`; // Convert all to jpg
    const outputPath = path.join(imgDir, newName);

    // Check if it's a "heavy" file (arbitrary > 2MB) or just optimize all for consistency
    const stats = fs.statSync(inputPath);
    const sizeMB = stats.size / (1024 * 1024);

    console.log(`Processing: ${file} (${sizeMB.toFixed(2)} MB) -> ${newName}`);

    try {
      // We process to a temp buffer or file first to avoid overwriting issues if names collide
      // But to be safe, let's write to a temp folder then move back?
      // Actually, let's write to 'optimized' folder first.

      await sharp(inputPath)
        .resize(1920, 1920, {
          // Max width/height
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(path.join(outputDir, newName));

      counter++;
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(
    "Optimization complete. Optimized images are in public/img/optimized."
  );
}

optimizeImages();
