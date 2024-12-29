import { LuUser } from 'react-icons/lu';
import { fetchProfileImage } from '@/utils/actions';
import Image from 'next/image';

async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="User profile picture" // Provide meaningful alt text
        className="w-6 h-6 rounded-full object-cover"
        width={24} // Match width and height to CSS classes
        height={24}
      />
    );
  }

  return <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />;
}

export default UserIcon;

