import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SAMPLE_RATE = 16000;
const DURATION = 8;
const CHANNELS = 1;
const BITS = 16;

const outDir = path.resolve("public/music");
const outFile = path.join(outDir, "wedding-placeholder.wav");

const notes = [220, 293.66, 329.63, 440, 329.63, 293.66, 261.63, 220];
const noteLength = DURATION / notes.length;

const totalSamples = SAMPLE_RATE * DURATION;
const samples = new Float64Array(totalSamples);

for (let index = 0; index < notes.length; index += 1) {
  const freq = notes[index];
  const start = Math.floor(index * noteLength * SAMPLE_RATE);
  const length = Math.floor(noteLength * SAMPLE_RATE);

  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const progress = i / length;
    const envelope = Math.min(1, progress / 0.08) * Math.pow(1 - progress, 1.6);
    const fundamental = Math.sin(2 * Math.PI * freq * t);
    const overtone = Math.sin(2 * Math.PI * freq * 2 * t) * 0.22;
    const shimmer = Math.sin(2 * Math.PI * freq * 3 * t) * 0.08;
    samples[start + i] += (fundamental + overtone + shimmer) * envelope * 0.32;
  }
}

const fade = Math.floor(0.25 * SAMPLE_RATE);
for (let i = 0; i < fade; i += 1) {
  const ratio = i / fade;
  samples[i] *= ratio;
  samples[totalSamples - 1 - i] *= ratio;
}

const bytesPerSample = BITS / 8;
const dataSize = totalSamples * bytesPerSample * CHANNELS;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write("RIFF", 0, "ascii");
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8, "ascii");
buffer.write("fmt ", 12, "ascii");
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(CHANNELS, 22);
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(SAMPLE_RATE * CHANNELS * bytesPerSample, 28);
buffer.writeUInt16LE(CHANNELS * bytesPerSample, 32);
buffer.writeUInt16LE(BITS, 34);
buffer.write("data", 36, "ascii");
buffer.writeUInt32LE(dataSize, 40);

for (let i = 0; i < totalSamples; i += 1) {
  const clamped = Math.max(-1, Math.min(1, samples[i]));
  buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * bytesPerSample);
}

await mkdir(outDir, { recursive: true });
await writeFile(outFile, buffer);
console.log(`wrote ${outFile} (${(buffer.length / 1024).toFixed(0)} kB)`);
