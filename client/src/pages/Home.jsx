import HeroSlider from '../components/home/HeroSlider';
import VehicleSearch from '../components/home/VehicleSearch';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import StatsSection from '../components/home/StatsSection';
import CTABanner from '../components/home/CTABanner';

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <VehicleSearch />
      <FeaturedVehicles />
      <StatsSection />
      <CTABanner />
    </div>
  );
};

export default Home;
