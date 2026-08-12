import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import HowItWorks from '@/components/HowItWorks';
import FeaturesBento from '@/components/FeaturesBento';
import BenefitsSection from '@/components/BenefitsSection';
import HomeContentGuide from '@/components/HomeContentGuide';
import FAQPreview from '@/components/FAQPreview';
import CTABanner from '@/components/CTABanner';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner />
      </div>
      <StatsBar />
      <HowItWorks />
      <FeaturesBento />
      <div className="max-w-7xl mx-auto px-4">
        <AdBanner />
      </div>
      <BenefitsSection />
      <HomeContentGuide />
      <FAQPreview />
      <CTABanner />
    </div>
  );
}
