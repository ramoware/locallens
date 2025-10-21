import HeroSection from '@/components/HeroSection';
import EventFeed from '@/components/EventFeed';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EventFeed />
    </main>
  );
}