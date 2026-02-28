const fs = require('fs');
const path = require('path');

const SOURCE_DIRS = [
  'docs/leaderai_brand',
  'docs/leaderai_ecommerce'
];
const OUTPUT_JSON_PATH = 'src/data/prompts.json';
const OUTPUT_IMAGE_DIR = 'public/images/gallery';

// Ensure output directories exist
if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}
if (!fs.existsSync(OUTPUT_IMAGE_DIR)) {
  fs.mkdirSync(OUTPUT_IMAGE_DIR, { recursive: true });
}

let allPrompts = [];

SOURCE_DIRS.forEach(dir => {
  const metaDir = path.join(dir, 'meta');
  const imgDir = path.join(dir, 'images');
  
  if (!fs.existsSync(metaDir)) return;
  
  const files = fs.readdirSync(metaDir).filter(f => f.endsWith('.json'));
  
  files.forEach(file => {
    const jsonPath = path.join(metaDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      
      // Expected image name usually matches title
      const originalImageName = data.title + '.webp';
      const sourceImagePath = path.join(imgDir, originalImageName);
      
      const newImageName = data.uuid + '.webp';
      const destImagePath = path.join(OUTPUT_IMAGE_DIR, newImageName);
      
      let imageExists = false;
      if (fs.existsSync(sourceImagePath)) {
        fs.copyFileSync(sourceImagePath, destImagePath);
        imageExists = true;
      }
      
      if (imageExists) {
        // Classify based on folder for now
        let category = dir.includes('brand') ? '品牌视觉' : '电商静物';
        
        // Try to infer better tags/categories from title or prompt
        const tags = [];
        if (data.title.includes('海报')) tags.push('海报设计');
        if (data.title.includes('3D')) tags.push('3D渲染');
        if (data.title.includes('摄影')) tags.push('摄影感');
        if (data.title.includes('包装')) tags.push('包装设计');
        if (data.title.includes('小红书') || data.title.includes('爆款')) tags.push('小红书风');
        if (data.title.includes('极简')) tags.push('极简主义');
        if (data.title.includes('超现实')) tags.push('超现实');
        if (data.title.includes('写实')) tags.push('超写实');
        if (tags.length === 0) tags.push('创意生成');

        allPrompts.push({
          id: data.uuid,
          title: data.title,
          author: data.author || 'LeaderAI',
          image: `/images/gallery/${newImageName}`,
          category: category,
          tags: tags.slice(0, 3), // max 3 tags
          prompt: data.prompt_cn || data.prompt_origin
        });
      }
    } catch (e) {
      console.error(`Error processing ${file}:`, e.message);
    }
  });
});

fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(allPrompts, null, 2));
console.log(`Successfully processed ${allPrompts.length} prompts.`);