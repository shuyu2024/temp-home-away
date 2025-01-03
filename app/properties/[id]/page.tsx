// import { fetchPropertyDetails } from '@/utils/actions';
// import { redirect } from 'next/navigation';
// import BreadCrumbs from '@/components/properties/BreadCrumbs';
// import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
// import ImageContainer from '@/components/properties/ImageContainer';
// import PropertyDetails from '@/components/properties/PropertyDetails';
// import ShareButton from '@/components/properties/ShareButton';
// import PropertyRating from '@/components/card/PropertyRating';
// import BookingCalendar from '@/components/properties/BookingCalendar';
// import UserInfo from '@/components/properties/UserInfo';
// import Description from '@/components/properties/Description';
// import Amenities from '@/components/properties/Amenities';
// import {Separator} from '@/components/ui/separator';
// // import {Skeleton} from '@/components/ui/skeleton';
// // import dynamic from 'next/dynamic';
// import DynamicMapClient from '@/components/properties/DynamicMapClient'; // New Client Component


// // const DynamicMap = dynamic(
// //     () => import('@/components/properties/PropertyMap'),
// //     {
// //       ssr: false,
// //       loading: () => <Skeleton className='h-[400px] w-full' />,
// //     }
// //   );

// async function PropertyDetailsPage({ params }: { params: { id: string } }) {
//   const property = await fetchPropertyDetails(params.id);
//   if (!property) redirect('/');
//   const { baths, bedrooms, beds, guests } = property;
//   const details = { baths, bedrooms, beds, guests };
//   const firstName = property.profile.firstName;
//   const profileImage = property.profile.profileImage;  

// return (
//     <section>
//       <BreadCrumbs name={property.name} />
//       <header className='flex justify-between items-center mt-4'>
//         <h1 className='text-4xl font-bold '>{property.tagline}</h1>
//         <div className='flex items-center gap-x-4'>
//           {/* share button */}
//         <ShareButton name={property.name} propertyId={property.id} />
//         <FavoriteToggleButton propertyId={property.id} />
//         </div>
//       </header>
//       <ImageContainer mainImage={property.image} name={property.name} />
//       <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
//         <div className='lg:col-span-8'>
//           <div className='flex gap-x-4 items-center'>
//             <h1 className='text-xl font-bold'>{property.name} </h1>
//             <PropertyRating inPage propertyId={property.id} />
//         </div>
//         <PropertyDetails details={details} />
//         <UserInfo profile={{ firstName, profileImage }} />
//         <Separator className='mt-4' />
//         <Description description={property.description} />
//         <Amenities amenities={property.amenities} />
//         {/* <DynamicMap countryCode={property.country} />; */}
//         <DynamicMapClient countryCode={property.country} />
//         </div>
//           <div className='lg:col-span-4 flex flex-col items-center'>
//           {/* calendar */}
//           <BookingCalendar />
//           </div>
//     </section>
//   </section>
// );
// }

// export default PropertyDetailsPage;


import { fetchPropertyDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';
import BreadCrumbs from '@/components/properties/BreadCrumbs';
import FavoriteToggleButton from '@/components/card/FavoriteToggleButton';
import ImageContainer from '@/components/properties/ImageContainer';
import PropertyDetails from '@/components/properties/PropertyDetails';
import ShareButton from '@/components/properties/ShareButton';
import PropertyRating from '@/components/card/PropertyRating';
import BookingCalendar from '@/components/properties/BookingCalendar';
import UserInfo from '@/components/properties/UserInfo';
import Description from '@/components/properties/Description';
import Amenities from '@/components/properties/Amenities';
import { Separator } from '@/components/ui/separator';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function PropertyDetailsPage({ params }: PageProps) {
  const resolvedParams = await params; // Await the promise for params

  const property = await fetchPropertyDetails(resolvedParams.id);
  if (!property) redirect('/');

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };

  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalendar />
        </div>
      </section>
    </section>
  );
}

export default PropertyDetailsPage;
