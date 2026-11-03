/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Programme slugs renamed in Nov 2026 (content rebuilt from documented outreaches).
  async redirects() {
    const moved = [
      ["/projects/youth-welfare", "/projects/child-protection"],
      ["/projects/mobile-crisis", "/projects/displaced-families"],
      ["/projects/education", "/projects/back-to-school"],
      ["/fr/projets/protection-des-jeunes", "/fr/projets/protection-de-l-enfance"],
      ["/fr/projets/intervention-mobile-de-crise", "/fr/projets/familles-deplacees"],
      ["/fr/projets/bourses-d-etudes", "/fr/projets/rentree-scolaire"],
      ["/fr/projets/autonomisation-des-femmes", "/fr/projets/femmes-et-partenariats"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
