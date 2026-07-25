import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import HowItWorks from '@/components/HowItWorks';
import FeaturesBento from '@/components/FeaturesBento';
import FAQPreview from '@/components/FAQPreview';
import CTABanner from '@/components/CTABanner';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <FeaturesBento />
      <FAQPreview />
      <CTABanner />
    </div>
  );
}
