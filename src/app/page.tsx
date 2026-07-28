import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import HowItWorks from '@/components/HowItWorks';
import FeaturesBento from '@/components/FeaturesBento';
import BenefitsSection from '@/components/BenefitsSection';
import HomeContentGuide from '@/components/HomeContentGuide';
import FAQPreview from '@/components/FAQPreview';
import CTABanner from '@/components/CTABanner';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <FeaturesBento />
      <BenefitsSection />
      <HomeContentGuide />
      <FAQPreview />
      <CTABanner />
    </div>
  );
}
