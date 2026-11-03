import { profiles, site } from "./content";
import { localePath, type Locale } from "./i18n/config";
import type { Dictionary } from "./i18n/dictionaries/en";

export function organizationJsonLd(locale: Locale, t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: "Fondation Syndy Emade",
    url: `${site.url}${localePath(locale, "/")}`,
    description: t.meta.description,
    inLanguage: locale,
    email: site.email,
    founder: { "@id": `${site.url}/#founder` },
    sameAs: [profiles.facebook, profiles.youtube],
    areaServed: ["Cameroon", "Africa"],
  };
}

export function founderJsonLd(t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#founder`,
    name: t.founder.name,
    alternateName: t.founder.legalName,
    birthDate: "1993-11-21",
    birthPlace: { "@type": "Place", name: "Kumba, Cameroon" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Buea" },
    jobTitle: ["Actress", "Film Producer", "Philanthropist"],
    worksFor: { "@type": "Organization", name: "Blue Rain Entertainment" },
    sameAs: Object.values(profiles),
  };
}
