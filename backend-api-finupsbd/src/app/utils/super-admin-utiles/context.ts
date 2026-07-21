// context.ts
import type { Request } from 'express';
import { UAParser } from 'ua-parser-js';
import geoip from 'fast-geoip';

export async function getRequestContext(req: Request) {
  // 1) Parse IP address
  // The HTTP header "x-forwarded-for" is often set by proxies/load balancers
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;
  console.log(req.socket.remoteAddress);
  const ip = forwarded?.split(',').shift() || req.socket.remoteAddress || 'Unknown IP';

  // 2) Parse the User-Agent to determine device & browser
  const parser = new UAParser(req.headers['user-agent']);
  const deviceModel = parser.getDevice().model;
  const browserName = parser.getBrowser().name;

  const device = deviceModel || 'Unknown device';
  const browser = browserName || 'Unknown browser';

  // 3) Lookup approximate location by IP (optional, depends on your compliance policy)
  let location = 'Unknown location';
  try {
    const geo = await geoip.lookup(ip);
    if (geo) {
      // E.g., "New York, US"
      location = `${geo.city || 'Unknown City'}, ${geo.country || 'Unknown Country'}`;
    }
  } catch (error) {
    console.error(error);
  }

  return { ip, device, browser, location };
}
