import { BottomNavBar } from "@/components/wedding/BottomNavBar";
import { ContactSection } from "@/components/wedding/ContactSection";
import { Countdown } from "@/components/wedding/Countdown";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { ClosingSection } from "@/components/wedding/ClosingSection";
import { EventsSection } from "@/components/wedding/EventsSection";
import { GallerySection } from "@/components/wedding/GallerySection";
import { HeroSection } from "@/components/wedding/HeroSection";
import { InvitationProvider } from "@/components/wedding/InvitationProvider";
import { InvitationShell } from "@/components/wedding/InvitationShell";
import { MusicButton } from "@/components/wedding/MusicButton";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { SectionDivider } from "@/components/wedding/SectionDivider";
import { StickyHeader } from "@/components/wedding/StickyHeader";
import { StorySection } from "@/components/wedding/StorySection";
import { VenueSection } from "@/components/wedding/VenueSection";
import { WeddingDate } from "@/components/wedding/WeddingDate";

export default function Page() {
  return (
    <InvitationProvider>
      <StickyHeader />

      <InvitationShell>
        <main id="invitation" className="safe-bottom-nav">
          <HeroSection />
          <SectionDivider tone="solid" />
          <CoupleSection />
          <SectionDivider tone="soft" />
          <WeddingDate />
          <SectionDivider tone="soft" />
          <Countdown />
          <SectionDivider tone="solid" />
          <StorySection />
          <SectionDivider tone="solid" />
          <EventsSection />
          <SectionDivider tone="solid" />
          <GallerySection />
          <SectionDivider tone="soft" />
          <VenueSection />
          <SectionDivider tone="soft" />
          <ContactSection />
          <SectionDivider tone="solid" />
          <RSVPSection />
          <SectionDivider tone="soft" />
          <ClosingSection />
        </main>
      </InvitationShell>

      <MusicButton />
      <BottomNavBar />
    </InvitationProvider>
  );
}
