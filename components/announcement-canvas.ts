import { MARK_HEIGHT, MARK_WIDTH, brandMarkPaths } from "@/components/Logo";

const WIDTH = 1200;
const HEIGHT = 630;

export async function renderAnnouncementPng(input: { name: string; tagline: string; url: string }) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not draw the announcement.");
  const font = getComputedStyle(document.body).fontFamily || "Inter, sans-serif";
  drawAnnouncement(ctx, font, input);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not prepare the announcement image.");
  return blob;
}

function drawAnnouncement(
  ctx: CanvasRenderingContext2D,
  font: string,
  input: { name: string; tagline: string; url: string },
) {
  ctx.fillStyle = "#F3F6FA";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  circle(ctx, -40, -120, 260, "rgba(47,157,255,0.18)");
  circle(ctx, 220, 520, 210, "rgba(20,184,166,0.16)");
  circle(ctx, 520, -30, 140, "rgba(224,176,74,0.22)");

  roundRect(ctx, 748, 36, 416, 558, 36);
  const panel = ctx.createLinearGradient(748, 36, 1164, 594);
  panel.addColorStop(0, "#123456");
  panel.addColorStop(0.58, "#0B1F33");
  panel.addColorStop(1, "#0E3A4A");
  ctx.fillStyle = panel;
  ctx.fill();
  circle(ctx, 860, 90, 150, "rgba(47,157,255,0.28)");
  circle(ctx, 1020, 430, 100, "rgba(62,225,200,0.2)");
  drawMark(ctx, 848, 230, 210);

  ctx.fillStyle = "#0B1F33";
  ctx.font = `700 34px ${font}`;
  ctx.fillText("AI Agents", 68, 92);
  ctx.fillStyle = "#7A560C";
  ctx.font = `700 16px ${font}`;
  ctx.fillText("INFO", 68, 118);

  const nameSize = fitSize(ctx, font, input.name, 640, 58, 36, 3);
  ctx.fillStyle = "#0B1F33";
  ctx.font = `700 ${nameSize}px ${font}`;
  const nameLines = wrap(ctx, input.name, 640, 3);
  let y = 230;
  for (const line of nameLines) {
    ctx.fillText(line, 68, y);
    y += nameSize * 1.12;
  }

  ctx.fillStyle = "#0C5CAD";
  ctx.font = `600 28px ${font}`;
  y += 18;
  ctx.fillText("is now listed on AI Agents Info", 68, y);

  if (input.tagline.trim()) {
    ctx.fillStyle = "#3A5168";
    ctx.font = `400 22px ${font}`;
    y += 48;
    for (const line of wrap(ctx, input.tagline.trim(), 640, 2)) {
      ctx.fillText(line, 68, y);
      y += 30;
    }
  }

  ctx.fillStyle = "#0C746E";
  const url = displayUrl(ctx, font, input.url, 640);
  ctx.fillText(url, 68, 572);
}

function displayUrl(ctx: CanvasRenderingContext2D, font: string, url: string, maxWidth: number) {
  const text = url.replace(/^https:\/\//, "");
  for (const size of [18, 15, 13]) {
    ctx.font = `600 ${size}px ${font}`;
    if (ctx.measureText(text).width <= maxWidth) return text;
  }
  return ellipsis(ctx, text, maxWidth);
}

function fitSize(
  ctx: CanvasRenderingContext2D,
  font: string,
  text: string,
  maxWidth: number,
  start: number,
  min: number,
  maxLines: number,
) {
  for (let size = start; size >= min; size -= 2) {
    ctx.font = `700 ${size}px ${font}`;
    if (wrap(ctx, text, maxWidth, maxLines + 1).length <= maxLines) return size;
  }
  return min;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    const next = current ? `${current} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
      continue;
    }
    if (!current) {
      lines.push(ellipsis(ctx, word, maxWidth));
      if (lines.length === maxLines) return lines;
      continue;
    }
    if (current) lines.push(current);
    current = word;
    if (lines.length === maxLines - 1) {
      const rest = [current, ...words.slice(i + 1)].join(" ");
      lines.push(ellipsis(ctx, rest, maxWidth));
      return lines;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function ellipsis(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let cut = text;
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) cut = cut.slice(0, -1);
  return `${cut.trimEnd()}…`;
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawMark(ctx: CanvasRenderingContext2D, x: number, y: number, height: number) {
  const scale = height / MARK_HEIGHT;
  const width = (MARK_WIDTH * height) / MARK_HEIGHT;
  ctx.save();
  ctx.translate(x + (220 - width) / 2, y);
  ctx.scale(scale, scale);
  const shape = ctx.createLinearGradient(18, 0, 576, 340);
  shape.addColorStop(0, "#FFFFFF");
  shape.addColorStop(0.58, "#F7FBFC");
  shape.addColorStop(1, "#E4F6F5");
  ctx.fillStyle = shape;
  ctx.fill(new Path2D(brandMarkPaths.body));
  ctx.fill(new Path2D(brandMarkPaths.rightFoot));
  const star = ctx.createLinearGradient(226, 150, 366, 318);
  star.addColorStop(0, "#F8E7A2");
  star.addColorStop(0.48, "#E0B04A");
  star.addColorStop(1, "#C4921A");
  ctx.fillStyle = star;
  ctx.fill(new Path2D(brandMarkPaths.star));
  ctx.restore();
}
