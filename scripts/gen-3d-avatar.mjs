// Transform the user's photo into a 3D-illustrated avatar using z-ai-web-dev-sdk.
// Generates 3 style variations in parallel so the user can pick their favorite.
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const SOURCE = '/home/z/my-project/upload/image.jpg';
const OUT_DIR = '/home/z/my-project/public';

const buf = fs.readFileSync(SOURCE);
const b64 = buf.toString('base64');
const dataUrl = `data:image/jpeg;base64,${b64}`;

const variations = [
  {
    name: 'hardik-3d-style1.png',
    prompt:
      'Transform this photo of a young man with a neat beard, short black hair and a red plaid shirt into a high-quality 3D animated Pixar/Dreamworks-style character render. Keep the same facial features, beard, hairstyle and red plaid shirt. Stylized 3D cartoon character with smooth subsurface-scattering skin, expressive eyes, soft cinematic lighting. Clean studio background in deep navy with subtle purple and cyan rim lighting. 3D animation movie character quality. Square portrait, head and shoulders.',
  },
  {
    name: 'hardik-3d-style2.png',
    prompt:
      'Transform this photo of a young man with a neat beard, short black hair and a red plaid shirt into a stylized 3D character avatar render (like a developer mascot). Keep the same facial features, beard, hairstyle and red plaid shirt. Glossy 3D render with soft shadows, dramatic purple and cyan neon rim lighting, dark charcoal background with subtle glowing particles, cinematic tech aesthetic. Square portrait, head and shoulders, looking confident.',
  },
  {
    name: 'hardik-3d-style3.png',
    prompt:
      'Transform this photo of a young man with a neat beard, short black hair and a red plaid shirt into a 3D stylized illustration character (modern flat-3D hybrid, like a Notion/Linear hero illustration). Keep the same facial features, beard, hairstyle and red plaid shirt. Smooth gradients, soft gradient mesh background in purple-to-cyan-to-amber, gentle bloom, clean minimal 3D shapes. Square portrait, head and shoulders.',
  },
];

async function run() {
  const zai = await ZAI.create();
  console.log('SDK ready. Generating', variations.length, 'variations in parallel...');

  const results = await Promise.allSettled(
    variations.map(async (v) => {
      const t0 = Date.now();
      const resp = await zai.images.generations.edit({
        prompt: v.prompt,
        images: [{ url: dataUrl }],
        size: '1024x1024',
      });
      const imageB64 = resp.data[0].base64;
      const outBuf = Buffer.from(imageB64, 'base64');
      const outPath = path.join(OUT_DIR, v.name);
      fs.writeFileSync(outPath, outBuf);
      return { name: v.name, path: outPath, size: outBuf.length, ms: Date.now() - t0 };
    })
  );

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === 'fulfilled') {
      console.log(`OK  ${r.value.name}  ${(r.value.size / 1024).toFixed(0)}KB  ${r.value.ms}ms`);
    } else {
      console.log(`FAIL variation ${i + 1}:`, r.reason?.message || r.reason);
    }
  }
}

run().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
