import type { APIRoute } from 'astro';
import { PROJECT_VIDEOS } from '../data/videos';

const DEFAULT_SITE = 'https://a2reklam.com';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getDurationSeconds(duration: string): string {
  const secondsMatch = duration.match(/^PT(\d+)S$/);
  if (secondsMatch) return secondsMatch[1];

  const minuteSecondMatch = duration.match(/^PT(\d+)M(\d+)S$/);
  if (minuteSecondMatch) {
    const total = Number(minuteSecondMatch[1]) * 60 + Number(minuteSecondMatch[2]);
    return String(total);
  }

  return '30';
}

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL(DEFAULT_SITE)).toString().replace(/\/$/, '');
  const now = new Date().toISOString();

  // Individual video pages — each video has its own dedicated page
  const videoPageItems = PROJECT_VIDEOS.map((video) => {
    const loc = `${base}/videolar/${video.id}/`;
    const thumbnail = `${base}${video.poster}`;
    const contentLoc = `${base}${video.file}`;
    const publicationDate = `${video.uploadDate}T00:00:00+00:00`;
    const duration = getDurationSeconds(video.duration);

    return `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(now)}</lastmod>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title.tr)}</video:title>
      <video:description>${escapeXml(video.description.tr)}</video:description>
      <video:content_loc>${escapeXml(contentLoc)}</video:content_loc>
      <video:duration>${escapeXml(duration)}</video:duration>
      <video:publication_date>${escapeXml(publicationDate)}</video:publication_date>
    </video:video>
  </url>`;
  }).join('\n');

  // Homepage — all videos are embedded on the main page too
  const homepageVideos = PROJECT_VIDEOS.map((video) => {
    const thumbnail = `${base}${video.poster}`;
    const contentLoc = `${base}${video.file}`;
    const publicationDate = `${video.uploadDate}T00:00:00+00:00`;
    const duration = getDurationSeconds(video.duration);

    return `
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnail)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title.tr)}</video:title>
      <video:description>${escapeXml(video.description.tr)}</video:description>
      <video:content_loc>${escapeXml(contentLoc)}</video:content_loc>
      <video:player_loc>${escapeXml(`${base}/videolar/${video.id}/`)}</video:player_loc>
      <video:duration>${escapeXml(duration)}</video:duration>
      <video:publication_date>${escapeXml(publicationDate)}</video:publication_date>
    </video:video>`;
  }).join('\n');

  const homepageItem = `
  <url>
    <loc>${escapeXml(base)}/</loc>
    <lastmod>${escapeXml(now)}</lastmod>
${homepageVideos}
  </url>`;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${homepageItem}
${videoPageItems}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
