// import { FaHeart } from 'react-icons/fa';
// import { Button } from '../ui/button';
// import { auth } from '@clerk/nextjs/server';
// import { CardSignInButton } from '../form/Buttons';
// import { fetchFavoriteId } from '@/utils/actions';
// import FavoriteToggleForm from './FavoriteToggleForm';
// async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
//   const { userId } = auth();
//   if (!userId) return <CardSignInButton />;
//   const favoriteId = await fetchFavoriteId({ propertyId });
//   return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
// }
// export default FavoriteToggleButton;


import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId } from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  const { userId } = auth();

  // Server-side logic
  if (!userId) {
    return <CardSignInButton />;
  }

  const favoriteId = await fetchFavoriteId({ propertyId });

  // Client-side rendering
  return (
    <FavoriteToggleClient
      favoriteId={favoriteId}
      propertyId={propertyId}
    />
  );
}

// Subcomponent for client-side rendering
function FavoriteToggleClient({
  favoriteId,
  propertyId,
}: {
  favoriteId: string | null;
  propertyId: string;
}) {
  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
}

export default FavoriteToggleButton;
