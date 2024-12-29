import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';

type PageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

async function HomePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams; // Await the promise

  return (
    <section>
      <CategoriesList
        category={resolvedSearchParams.category}
        search={resolvedSearchParams.search}
      />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          category={resolvedSearchParams.category}
          search={resolvedSearchParams.search}
        />
      </Suspense>
    </section>
  );
}

export default HomePage;



// 'use client';

// import { useSearchParams } from 'next/navigation';
// import CategoriesList from '@/components/home/CategoriesList';
// import PropertiesContainer from '@/components/home/PropertiesContainer';
// import LoadingCards from '@/components/card/LoadingCards';
// import { Suspense } from 'react';

// function HomePage() {
//   const searchParams = useSearchParams();
//   const category = searchParams.get('category') || '';
//   const search = searchParams.get('search') || '';

//   return (
//     <section>
//       <CategoriesList category={category} search={search} />
//       <Suspense fallback={<LoadingCards />}>
//         <PropertiesContainer category={category} search={search} />
//       </Suspense>
//     </section>
//   );
// }

// export default HomePage;

