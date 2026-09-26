
export const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

export interface Person {
  name: string;
  fullName: string;
  title?: string;
}

export interface EventParents {
  sideA: string[];
  joiner: string;
  sideB: string[];
}

export interface WeddingEvent {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  dateShort?: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  bismillah?: boolean;
  bismillahText?: string;
  gratitudeLine?: string;
  parents: EventParents;
  note?: string;
}

export interface WeddingData {
  meta: {
    title: string;
    description: string;
    ogImage: string;
    favicon: string;
  };
  bride: Person;
  groom: Person;
  joiner: string;
  wedding: {
    dateShort: string;
    date: string;
    time: string;
    countdownDate: string;
    countdownCompleteMessage: string;
  };
  events: WeddingEvent[];
  venue: {
    name: string;
    address: string;
    mapUrl: string;
    directionsLabel: string;
  };
  story: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: { year: string; title: string; description: string }[];
  };
  gallery: { images: string[]; caption: string };
  contact: {
    label: string;
    phone: string;
    phoneHref: string;
    lines: { label: string; value: string; href: string }[];
  };
  rsvp: {
    title: string;
    description: string;
    attendingOptions: string[];
    maxGuests: number;
    submitLabel: string;
    successMessage: string;
  };
  music: {
    enabled: boolean;
    src: string;
    label: string;
  };
  nav: {
    contact: { label: string; target: string; ariaLabel: string };
    music: { label: string; target: string; ariaLabel: string };
    location: { label: string; target: string; ariaLabel: string };
    rsvp: { label: string; target: string; ariaLabel: string };
  };
  closing: {
    eyebrow: string;
    line: string;
    signature: string;
  };
  footer: {
    line: string;
    backToTop: string;
  };
  copy: WeddingCopy;
}

export interface WeddingCopy {
  cover: {
    eyebrow: string;
    heading: string;
    open: string;
    namesLine: string;
    dialogLabel: string;
  };
  hero: {
    eyebrow: string;
    gratitude: string;
    request: string;
    scrollCue: string;
  };
  couple: {
    eyebrow: string;
    title: string;
    brideRole: string;
    groomRole: string;
  };
  saveTheDate: {
    eyebrow: string;
    title: string;
    labels: { date: string; time: string; venue: string };
  };
  countdown: {
    eyebrow: string;
    title: string;
    units: { days: string; hours: string; minutes: string; seconds: string };
    completeLabel: string;
  };
    events: {
      eyebrow: string;
      title: string;
      progress: string;
      labels: { date: string; time: string; venue: string; address: string };
      directions: string;
    };
  gallery: {
    eyebrow: string;
    title: string;
    openImage: string;
    close: string;
    previous: string;
    next: string;
    counter: string;
  };
  venue: {
    eyebrow: string;
    title: string;
    labels: { venue: string; address: string };
    directions: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    call: string;
  };
  rsvp: {
    eyebrow: string;
    fields: {
      name: string;
      attendance: string;
      guests: string;
      message: string;
      messagePlaceholder: string;
    };
      submitting: string;
      nameError: string;
      successReset: string;
  };
}

export const weddingData: WeddingData = {
  meta: {
    title: "Tasnia & Rajib — Wedding Invitation",
    description:
      "You are warmly invited to the wedding of Tasnia Akter and Rajib Hossain on Friday, 24 October 2025 in Dhaka, Bangladesh.",
    ogImage: "/images/couple/og-image.jpg",
    favicon: "/decorations/favicon.svg",
  },

  groom: {
    name: "Rajib",
    fullName: "Rajib Hossain",
    title: "Son of",
  },

  bride: {
    name: "Tasnia",
    fullName: "Tasnia Akter",
    title: "Daughter of",
  },

  joiner: "&",

  wedding: {
    dateShort: "Friday • 10.24.25",
    date: "Friday, 24 October 2025",
    time: "7:00 PM onwards",
    countdownDate: "2025-10-24T19:00:00",
    countdownCompleteMessage: "Today is the day — thank you for celebrating with us.",
  },

  events: [
    {
      id: "engagement",
      title: "Engagement",
      subtitle: "Ring Ceremony",
      date: "Sunday, 19 October 2025",
      dateShort: "19.10.25",
      time: "5:00 PM",
      venue: "Rose Garden Hall",
      address: "Gulshan Avenue, Gulshan 1, Dhaka 1212",
      mapUrl: "https://maps.google.com/?q=Gulshan+Dhaka+Bangladesh",
      bismillah: true,
      gratitudeLine: "With Joy & Gratitude to Almighty Allah",
      parents: {
        sideA: ["Md Wahid Uz Zaman", "Yasmin Sultana"],
        joiner: "together with",
        sideB: ["Abul Hussain Jitu", "Kawsarun Nessa Begum"],
      },
      note: "Formal attire requested.",
    },
    {
      id: "holud",
      title: "Holud & Mehendi",
      subtitle: "Gaye Holud Ceremony",
      date: "Tuesday, 21 October 2025",
      dateShort: "21.10.25",
      time: "11:00 AM",
      venue: "Lotus Convention Centre",
      address: "Road 11, Banani, Dhaka 1213",
      mapUrl: "https://maps.google.com/?q=Banani+Dhaka+Bangladesh",
      bismillah: true,
      gratitudeLine: "With Joy & Gratitude to Almighty Allah",
      parents: {
        sideA: ["Md Wahid Uz Zaman", "Yasmin Sultana"],
        joiner: "together with",
        sideB: ["Abul Hussain Jitu", "Kawsarun Nessa Begum"],
      },
      note: "Yellow and green are most welcome.",
    },
    {
      id: "wedding",
      title: "Wedding",
      subtitle: "Baraat & Nikah",
      date: "Friday, 24 October 2025",
      dateShort: "24.10.25",
      time: "7:00 PM",
      venue: "Bismillah Rosewood Hall",
      address: "Shyamoli, Mohammadpur, Dhaka 1207",
      mapUrl: "https://maps.google.com/?q=Mohammadpur+Dhaka+Bangladesh",
      bismillah: true,
      gratitudeLine: "With Joy & Gratitude to Almighty Allah",
      parents: {
        sideA: ["Md Wahid Uz Zaman", "Yasmin Sultana"],
        joiner: "together with",
        sideB: ["Abul Hussain Jitu", "Kawsarun Nessa Begum"],
      },
      note: "Dinner served after the nikah.",
    },
    {
      id: "reception",
      title: "Reception",
      subtitle: "Dinner & Family Gathering",
      date: "Saturday, 25 October 2025",
      dateShort: "25.10.25",
      time: "6:30 PM",
      venue: "The Courtyard, Gulshan",
      address: "Gulshan 2, Dhaka 1212",
      mapUrl: "https://maps.google.com/?q=Gulshan+2+Dhaka+Bangladesh",
      bismillah: true,
      gratitudeLine: "With Joy & Gratitude to Almighty Allah",
      parents: {
        sideA: ["Md Wahid Uz Zaman", "Yasmin Sultana"],
        joiner: "together with",
        sideB: ["Abul Hussain Jitu", "Kawsarun Nessa Begum"],
      },
      note: "All relatives and friends are warmly invited.",
    },
  ],

  venue: {
    name: "Bismillah Rosewood Hall",
    address: "Shyamoli, Mohammadpur, Dhaka 1207, Bangladesh",
    mapUrl: "https://maps.google.com/?q=Mohammadpur+Dhaka+Bangladesh",
    directionsLabel: "Open in Google Maps",
  },

  story: {
    eyebrow: "Our Story",
    title: "Two families, one blessing",
    description:
      "Our families crossed paths long before either of us knew it was written. What began as a simple introduction grew into daily conversations, quiet laughter and a love we could not have planned for. Surrounded by the people we love most, we are grateful to begin this chapter together.",
    highlights: [
      {
        year: "2019",
        title: "The first hello",
        description: "Introduced by family at a quiet afternoon gathering.",
      },
      {
        year: "2022",
        title: "Falling slowly",
        description: "Long walks, shared playlists and a friendship that deepened.",
      },
      {
        year: "2025",
        title: "A promise kept",
        description: "A wedding day, surrounded by everyone we love.",
      },
    ],
  },

  gallery: {
    images: [
      "/images/gallery/image-1.jpg",
      "/images/gallery/image-2.jpg",
      "/images/gallery/image-3.jpg",
      "/images/gallery/image-4.jpg",
      "/images/gallery/image-5.jpg",
      "/images/gallery/image-6.jpg",
    ],
    caption: "Moments from the days leading up to our wedding",
  },

  contact: {
    label: "Contact",
    phone: "+880 1700 000000",
    phoneHref: "tel:+8801700000000",
    lines: [
      { label: "Rajib Hossain", value: "+880 1700 000000", href: "tel:+8801700000000" },
      { label: "Tasnia Akter", value: "+880 1800 000000", href: "tel:+8801800000000" },
    ],
  },

  rsvp: {
    title: "Kindly respond",
    description:
      "Please let us know if you can join us. Your reply helps us plan the seating and the table count.",
    attendingOptions: ["Joyfully accepts", "Regretfully declines"],
    maxGuests: 6,
    submitLabel: "Send RSVP",
    successMessage: "Thank you — your response has been noted.",
  },

  music: {
    enabled: true,
    src: "/music/wedding-placeholder.wav",
    label: "Wedding song",
  },

  nav: {
    contact: {
      label: "Contact",
      target: "contact",
      ariaLabel: "Jump to the contact section",
    },
    music: {
      label: "Song",
      target: "music",
      ariaLabel: "Play or pause the wedding song",
    },
    location: {
      label: "Location",
      target: "venue",
      ariaLabel: "Jump to the venue and map",
    },
    rsvp: { label: "RSVP", target: "rsvp", ariaLabel: "Jump to the RSVP form" },
  },

  closing: {
    eyebrow: "With love",
    line: "With love, gratitude and endless blessings,",
    signature: "Rajib & Tasnia",
  },

  footer: {
    line: "Made with love for our family and friends.",
    backToTop: "Back to the top",
  },

  copy: {
    cover: {
      eyebrow: "Together with their families",
      heading: "The Wedding of",
      open: "Open",
      namesLine: "{bride} & {groom}",
      dialogLabel: "Wedding invitation from {groom} and {bride}",
    },
    hero: {
      eyebrow: "Together with their families",
      gratitude: "With Joy & Gratitude to Almighty Allah",
      request: "request the honour of your presence at their wedding",
      scrollCue: "Continue",
    },
    couple: {
      eyebrow: "The Couple",
      title: "Two names, one family",
      brideRole: "The Bride",
      groomRole: "The Groom",
    },
    saveTheDate: {
      eyebrow: "Save the date",
      title: "The day we say yes",
      labels: { date: "Date", time: "Time", venue: "Venue" },
    },
    countdown: {
      eyebrow: "Counting down",
      title: "Until we say I do",
      units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
      completeLabel: "The day has arrived",
    },
    events: {
      eyebrow: "The Celebrations",
      title: "You are invited to each moment",
      progress: "Celebration {current} of {total}",
      labels: { date: "Date", time: "Time", venue: "Venue", address: "Address" },
      directions: "Get directions",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Cherished moments",
      openImage: "Open photo",
      close: "Close",
      previous: "Previous photo",
      next: "Next photo",
      counter: "Photo",
    },
    venue: {
      eyebrow: "Location",
      title: "Where we will celebrate",
      labels: { venue: "Venue", address: "Address" },
      directions: "Open in Google Maps",
    },
    contact: {
      eyebrow: "Contact",
      title: "Call or message us",
      call: "Call",
    },
    rsvp: {
      eyebrow: "RSVP",
      fields: {
        name: "Your name",
        attendance: "Will you join us?",
        guests: "Number of guests",
        message: "A note for us (optional)",
        messagePlaceholder: "Share a wish, a memory or a song request…",
      },
      submitting: "Sending…",
      nameError: "Please tell us your name.",
      successReset: "Send another response",
    },
  },
};
