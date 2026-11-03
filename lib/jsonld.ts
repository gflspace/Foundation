import { founder, profiles, site } from "./content";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    founder: { "@id": `${site.url}/#founder` },
    sameAs: [profiles.facebook, profiles.youtube],
    areaServed: ["Cameroon", "Africa"],
  };
}

export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#founder`,
    name: founder.name,
    alternateName: founder.legalName,
    birthDate: "1993-11-21",
    birthPlace: { "@type": "Place", name: founder.birthplace },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Buea" },
    jobTitle: ["Actress", "Film Producer", "Philanthropist"],
    worksFor: { "@type": "Organization", name: "Blue Rain Entertainment" },
    sameAs: Object.values(profiles),
  };
}
