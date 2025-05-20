
import { MainLayout } from '../components/layout/MainLayout';
import { HeroSection } from '../components/sections/HeroSection';
import { OverviewSection } from '../components/sections/OverviewSection';
import { TracksSection } from '../components/sections/TracksSection';
import { PrizesSection } from '../components/sections/PrizesSection';
import { TimelineSection } from '../components/sections/TimelineSection';
import { TimeCapsuleSection } from '../components/sections/TimeCapsuleSection';
import { NewSponsorsSection } from '../components/sections/NewSponsorsSection';
import { FAQPageSection } from '../components/sections/FAQPageSection';
import { Footer } from '../components/layout/Footer';
import { useTheme } from '../lib/theme-context';
import Themes from '../components/themes';

export const Home = () => {
  const { theme } = useTheme();

  return (
    <MainLayout>
      {/* Sections with KeyboardCanvas */}
      <div className="relative">
        <HeroSection theme={theme} />
      </div>

      {/* All other sections without KeyboardCanvas */}
      <div className="relative w-full">
        
        <TimeCapsuleSection />
        <PrizesSection />
        <TracksSection />
        <TimelineSection />
        <NewSponsorsSection />
        <FAQPageSection />

        <Footer />
      </div>
    </MainLayout>
  );
};



