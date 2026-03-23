import { NavBar } from './NavBar';
import { BackToTop } from './BackToTop';
import { HeroSection } from '../sections/HeroSection';
import { ConceptSection } from '../sections/ConceptSection';
import { LocationSection } from '../sections/LocationSection';
import { EntranceSection } from '../sections/EntranceSection';
import { LeisureSection } from '../sections/LeisureSection';
import { AerialSection } from '../sections/AerialSection';
import { FamilySection } from '../sections/FamilySection';
import { UnitsSection } from '../sections/UnitsSection';
import { InteriorSection } from '../sections/InteriorSection';
import { PrivateAreaSection } from '../sections/PrivateAreaSection';
import { MapSection } from '../sections/MapSection';
import { CTASection } from '../sections/CTASection';

export const LandingPage = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ConceptSection />
      <LocationSection />
      <MapSection />
      <EntranceSection />
      <AerialSection />
      <LeisureSection />
      <FamilySection />
      <UnitsSection />
      <InteriorSection />
      <PrivateAreaSection />
      <CTASection />
      <BackToTop />
    </>
  );
};

export default LandingPage;
