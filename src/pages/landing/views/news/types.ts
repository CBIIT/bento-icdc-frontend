export type NewsRelease = {
  label: string;
  value: string;
  date: string;
  url?: string;
  body?: string;
};

export type NewsPublication = {
  title: string;
  doi?: string;
  doiUrl?: string;
  pubmedId?: string;
  pubmedUrl?: string;
};

export type StaticAnnouncement = {
  id: string;
  label: string;
  blurb?: string;
  paragraph?: string;
  link?:
    | string
    | {
        label?: string;
        url?: string;
      };
};

export type ReleaseVersion = {
  label: string;
  value: string;
};

export type ReleaseListContent = {
  changes: string[];
  fallback: string;
};

export type SoftwareReleaseContent = ReleaseListContent & {
  versions: ReleaseVersion[];
};

export type ReleaseCardConfig = {
  singularTitle: string;
  icon: string;
  repository: string;
  showsBuildVersions: boolean;
};

export type NewsImage = {
  img: string;
  label: string;
  alt: string;
  caption?: string;
};

export type NewsVideo = {
  id?: string;
  vid: string;
  label: string;
  description?: string;
};

export type NewsSection =
  | {
      type: 'dataModelReleases' | 'softwareReleases' | 'publications';
      title: string;
    }
  | {
      type: 'announcements';
      title: string;
      cardTitle: string;
      enabled: boolean;
      items: StaticAnnouncement[];
    }
  | {
      type: 'social';
      title: string;
      posts: string[];
    }
  | {
      type: 'images';
      title: string;
      items: NewsImage[];
    }
  | {
      type: 'videos';
      featuredHeading: string;
      otherHeading: string;
      featured: NewsVideo;
      others: NewsVideo[];
    };

export type NewsPageData = {
  pageTitle: string;
  sections: NewsSection[];
};
