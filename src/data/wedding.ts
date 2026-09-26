export const BISMILLAH = "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";

export interface ContactEntry {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
}

export interface WishEntry {
  message: string;
  name: string;
}

export interface ProgrammeItem {
  title: string;
  time: string;
}

export interface NavItem {
  id: "contact" | "song" | "location" | "rsvp";
  label: string;
  ariaLabel: string;
}

export interface WeddingData {
  meta: {
    title: string;
    description: string;
    ogImage: string;
    favicon: string;
  };
  cover: {
    invitationType: string;
    brideNick: string;
    groomNick: string;
    joiner: string;
    dateShort: string;
    image: string;
  };
  greeting: {
    bismillah: string;
    gratitude: string;
    rule: string;
  };
  families: {
    brideParents: [string, string];
    joiner: string;
    groomParents: [string, string];
  };
  invite: {
    lines: string[];
  };
  couple: {
    bride: string;
    groom: string;
    joiner: string;
  };
  details: {
    venue: { label: string; value: string };
    date: {
      label: "DATE";
      lead: string;
      day: string;
      ordinal: string;
      tail: string;
    };
    time: { label: string; value: string };
  };
  dressCode: {
    label: string;
    value: string;
  };
  calendar: {
    buttonLabel: string;
    date: string;
    time: string;
    appleLabel: string;
    googleLabel: string;
  };
  programme: {
    items: ProgrammeItem[];
  };
  venue: {
    label: string;
    address: string;
    note: string;
    mapUrl: string;
  };
  gallery: {
    images: string[];
  };
  wishes: {
    title: string;
    entries: WishEntry[];
    visibleCount: number;
    moreLabel: string;
    rsvpLabel: string;
    messageLabel: string;
  };
  rsvp: {
    title: string;
    attendingLabel: string;
    decliningLabel: string;
    nameLabel: string;
    guestsLabel: string;
    noteLabel: string;
    notePlaceholder: string;
    submitLabel: string;
    cancelLabel: string;
    successMessage: string;
    declineMessage: string;
    nameRequiredMessage: string;
    maxGuests: number;
  };
  message: {
    title: string;
    nameLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    successMessage: string;
    nameRequiredMessage: string;
    messageRequiredMessage: string;
  };
  contacts: ContactEntry[];
  song: {
    title: string;
    src: string;
    volume: number;
    playLabel: string;
    pauseLabel: string;
  };
  nav: NavItem[];
  theme: {
    bodyBg: string;
    bodyText: string;
    coverText: string;
    coverSubText: string;
    titleText: string;
    inviteText: string;
    venueText: string;
    dressText: string;
    panelBg: string;
    panelOverlay: string;
    surface: string;
    footerBg: string;
    dotInactive: string;
  };
}

export const weddingData: WeddingData = {
  meta: {
    title: "Tasnia & Rajib — The Nikkah Of",
    description:
      "Tasnia Wahid and Mehadi Rajib Hassan invite you to their Nikkah on Friday, 24 October 2025 at Al Noor Banquet Hall, Norcross, Georgia.",
    ogImage: "/images/couple/og-image.jpg",
    favicon: "/decorations/favicon.svg",
  },

  cover: {
    invitationType: "The Nikkah Of",
    brideNick: "Tasnia",
    groomNick: "Rajib",
    joiner: "&",
    dateShort: "Friday• 10.24.25",
    image: "/patterns/cover-vintage.svg",
  },

  greeting: {
    bismillah: BISMILLAH,
    gratitude: "With Joy & Gratitude to Almighty Allah",
    rule: "___________________________________",
  },

  families: {
    brideParents: ["Md Wahid Uz Zaman", "Yasmin Sultana"],
    joiner: "together with",
    groomParents: ["Abul Hussain Jitu", "Kawsarun Nessa Begum"],
  },

  invite: {
    lines: ["Cordially invite you", "to the Nikkah ceremony of our daughter and son"],
  },

  couple: {
    bride: "Tasnia Wahid",
    groom: "Mehadi Rajib Hassan",
    joiner: "&",
  },

  details: {
    venue: { label: "VENUE", value: "Al Noor Banquet Hall" },
    date: {
      label: "DATE",
      lead: "Friday,",
      day: "24",
      ordinal: "th",
      tail: "October 2025",
    },
    time: { label: "TIME", value: "4:00 PM - 11:30 PM" },
  },

  dressCode: {
    label: "Dress Code",
    value: "Ivory/Golden (No Red/Black)",
  },

  calendar: {
    buttonLabel: "Save The Date",
    date: "Friday, 24 October 2025",
    time: "4:00 PM - 11:30 PM",
    appleLabel: "Apple",
    googleLabel: "Google",
  },

  programme: {
    items: [
      { title: "Nikkah Ceremony", time: "4:30 PM - 5:30 PM" },
      { title: "Snacks", time: "5:30 PM - 6:30 PM" },
      { title: "Entertainment", time: "6:30 PM - 8:00 PM" },
      { title: "Dinner", time: "8:00 PM - 9:30 PM" },
      { title: "Rusmat", time: "10:00 PM - 11:30 PM" },
      { title: "Program Ends", time: "11:30 PM" },
    ],
  },

  venue: {
    label: "Venue Address",
    address: "6010 Singleton Rd, Norcross, GA 30093",
    note: "We look forward to celebrating with you!",
    mapUrl: "https://share.google/nDyJTfYirYyOYKEwN",
  },

  gallery: {
    images: ["/images/gallery/image-1.jpg", "/images/gallery/image-2.jpg"],
  },

  wishes: {
    title: "WISHES",
    entries: [
      { message: "May Allah bless you both and fill your new life with love and barakah.", name: "A Friend" },
      { message: "Wishing you a lifetime of happiness, health and togetherness.Congratulations!", name: "Family & Friends" },
      { message: "Alhamdulillah for this beautiful journey. May your home always be a place of peace.", name: "Well Wishers" },
      { message: "So happy for you two. May every step ahead bring you closer together.", name: "With Love" },
    ],
    rsvpLabel: "RSVP Now",
    messageLabel: "Write a Message",
    visibleCount: 5,
    moreLabel: "More wishes are on the way",
  },

  rsvp: {
    title: "RSVP & Wishes",
    attendingLabel: "Attending",
    decliningLabel: "Not Attending",
    nameLabel: "Your name",
    guestsLabel: "Total Attendance",
    noteLabel: "Wishes",
    notePlaceholder: "Share a wish for the couple…",
    submitLabel: "Submit",
    cancelLabel: "Cancel",
    successMessage: "Thank you — your response has been noted.",
    declineMessage: "We will miss you — thank you for letting us know.",
    nameRequiredMessage: "Please tell us your name.",
    maxGuests: 10,
  },

  message: {
    title: "Write a Message",
    nameLabel: "Your name",
    messageLabel: "Your message",
    messagePlaceholder: "Write a wish for Tasnia & Rajib…",
    submitLabel: "Send",
    successMessage: "Thank you — your message has been added to the wishes.",
    nameRequiredMessage: "Please tell us your name.",
    messageRequiredMessage: "Please write a message.",
  },

  contacts: [
    {
      name: "Md Wahid Uz Zaman",
      role: "Father of Bride",
      phone: "6789865433",
      whatsapp: "16789865433",
    },
    {
      name: "Abul Hussain Jitu",
      role: "Father of Groom",
      phone: "6464640666",
      whatsapp: "16464640666",
    },
  ],

  song: {
    title: "Background Music",
    src: "/music/wedding-placeholder.wav",
    volume: 0.35,
    playLabel: "Play background music",
    pauseLabel: "Pause background music",
  },

  nav: [
    { id: "contact", label: "Contact", ariaLabel: "Open the contact details" },
    { id: "song", label: "Song", ariaLabel: "Play the wedding song" },
    { id: "location", label: "Location", ariaLabel: "Open the venue location" },
    { id: "rsvp", label: "RSVP", ariaLabel: "Open the RSVP form" },
  ],

  theme: {
    bodyBg: "#cec4c0",
    bodyText: "#2f2222",
    coverText: "#231f1f",
    coverSubText: "#2c2626",
    titleText: "#2f2222",
    inviteText: "#3f3131",
    venueText: "#312626",
    dressText: "#2e2222",
    panelBg: "rgba(228, 223, 221, 0.4)",
    panelOverlay: "rgba(255, 255, 255, 0.7)",
    surface: "rgba(148, 126, 122, 0.7)",
    footerBg: "rgba(148, 126, 122, 0.7)",
    dotInactive: "#d2d4d4",
  },
};
