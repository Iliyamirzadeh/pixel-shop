import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import DiscountSection from '../components/home/DiscountSection'
import PerksSection from '../components/home/PerksSection'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'

function Home() {
  return (
    <div className="space-y-24">
      <Hero />
      <CategoryGrid />

      <section>
        <SectionHeading
          tag="Top rated"
          title="تجهیزات پرچم‌دار با گارانتی بی‌قیدوشرط"
          to="/products"
          linkLabel="مشاهده همه"
        />
        <ProductGrid params={{ _sort: 'reviews', _order: 'desc', _limit: 4 }} skeletonCount={4} />
      </section>

      <DiscountSection />
      <PerksSection />
    </div>
  )
}

export default Home